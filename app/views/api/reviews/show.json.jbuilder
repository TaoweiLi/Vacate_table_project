# json.extract! @review, :id, :rating, :review, :user_id, :restaurant_id, :created_at, :updated_at

json.partial! "review", review: @review
