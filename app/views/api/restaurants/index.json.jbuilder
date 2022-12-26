@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.extract! restaurant, :id, :name, :address, :description, :cuisine, :expense, :neighborhood,
                  :operation_hours, :dining_style, :dress_code, :parking_details, :payment_options,
                  :website, :phone_number, :tag, :lat, :lng, :created_at, :updated_at
    json.set! :score_avg, @score_avg_by_id[restaurant.id].to_f    # add customer k-v pair, here key is :score_avg, value is @score_avg_by_id[restaurant.id].to_f
    json.set! :review_number, @review_number[restaurant.id]

    if restaurant.photo.attached?
      json.img restaurant.photo.url
    else
      json.img ""
    end
  end
end
