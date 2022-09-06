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
