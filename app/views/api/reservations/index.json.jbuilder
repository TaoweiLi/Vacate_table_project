@reservations.each do |reservation|
  json.set! reservation.id do
    json.extract! reservation, :id, :date, :time, :party_size, :restaurant_id, :user_id, :created_at, :updated_at

  end
end
