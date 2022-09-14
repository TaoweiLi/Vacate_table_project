@reviews.each do |review|
  json.set! review.id do
    json.partial 'review', review: review
    # json.extract! review, :id, :rating, :review, :user_id, :restaurant_id, :created_at, :updated_at
  end
end


