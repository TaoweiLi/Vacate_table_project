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
#  payment_options :string
#  website         :string
#  phone_number    :string
#  tag             :string
#  img             :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Restaurant < ApplicationRecord
  validates :name, :address, :description, :cuisine, presence: true
  
  has_one_attached :photo
end
