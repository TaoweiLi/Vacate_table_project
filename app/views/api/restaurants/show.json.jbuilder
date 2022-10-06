json.extract! @restaurant, :id, :name, :address, :description, :cuisine, :expense, :neighborhood, :operation_hours, :dining_style, :dress_code, :parking_details, :payment_options, :website, :phone_number, :tag, :lat, :lng, :created_at, :updated_at
json.set! :score_avg, @score_avg
if @restaurant.photo.attached?
  json.img @restaurant.photo.url
else
  json.img ""
end
