# == Schema Information
#
# Table name: reviews
#
#  id             :bigint           not null, primary key
#  rating         :integer          not null
#  review         :text             not null
#  user_id        :bigint           not null
#  reservation_id :bigint           not null
#  restaurant_id  :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Review < ApplicationRecord
  validates :rating, :review, :user_id, :reservation_id, :restaurant_id, presence: true

  belongs_to :reviewer,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :restaurant,
             foreign_key: :restaurant_id,
             class_name: :Restaurant

  def self.find_by_resturantId_userId(restaurantId, userId)
    reviews = Review.find_by(restaurant_id: restaurantId, user_id: userId)
    return reviews
  end

  def self.find_by_resturantId(restaurantId)
    reviews = Review.find_by(restaurant_id: restaurantId)
    p "aaaaaa"
    return reviews
  end

  def self.find_by_userId(userId)
    reviews = Review.find_by(user_id: userId)
    return reviews
  end
end
