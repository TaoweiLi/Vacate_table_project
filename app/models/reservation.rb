# == Schema Information
#
# Table name: reservations
#
#  id            :bigint           not null, primary key
#  date          :datetime         not null
#  time          :datetime         not null
#  party_size    :integer          not null
#  restaurant_id :bigint           not null
#  user_id       :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Reservation < ApplicationRecord
  validates :date, :time, :party_size, :user_id, :restaurant_id, presence: true

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :restaurant,
             foreign_key: :restaurant_id,
             class_name: :Restaurant
end
