json.extract! @restaurant, :id, :name, :address, :description, :cuisine, :expense, :neighborhood, :operation_hours, :dining_style, :dress_code, :parking_details, :payment_options, :website, :phone_number, :tag, :created_at, :updated_at
if @restaurant.photo.attached?
  json.img @restaurant.photo.url
else
  json.img ""
end



