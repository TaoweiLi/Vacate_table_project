json.extract! review, :id, :rating, :body, :restaurant_id, :user_id, :created_at, :updated_at
json.reviewerLast review.user.last_name
json.reviewerFirst review.user.first_name