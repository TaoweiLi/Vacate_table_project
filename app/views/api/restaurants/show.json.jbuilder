json.restaurant do
  json.extract! @restaurant, :id, :name, :address, :description, :cuisine, :expense, :neighborhood, :operation_hours, :dining_style, :dress_code, :parking_details, :payment_options, :website, :phone_number, :tag, :img, :created_at, :updated_at
end
