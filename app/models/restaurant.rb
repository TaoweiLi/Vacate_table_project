# == Schema Information
#
# Table name: restaurants
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  address         :string           not null
#  description     :text             not null
#  cuisine         :string           not null
#  expense         :string
#  neighborhood    :string
#  operation_hours :string
#  dining_style    :string
#  dress_code      :string
#  parking_details :string
#  payment_options :stri
#  website         :string
#  phone_number    :string
#  tag             :string
#  img             :string
#  lng             :float
#  lat             :float
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Restaurant < ApplicationRecord
  validates :name, :address, :description, :cuisine, :neighborhood, :dining_style, :lng, :lat, presence: true
  
  has_many :reviews,
    foreign_key: :restaurant_id,
    class_name: :Review,
    dependent: :destroy

  has_one_attached :photo
  has_many_attached :photos
end
