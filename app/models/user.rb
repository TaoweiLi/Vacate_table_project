# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  phone_number    :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :first_name, :last_name,
    length: { in: 1..30 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }

  validates :email,
    uniqueness: true,
    length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :phone_number,
    presence: { :message => "Phone number should only contain numbers!" },
    numericality: true,
    length: { in: 10..15 }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :reviews,
    foreign_key: :user_id,
    class_name: :Review,
    dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.authenticate(password)
      return user
    else
      return nil
    end
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
