class Api::ReviewsController < ApplicationController
  def index
    restaurantId = params[:restaurant_id]
    userId = params[:user_id]
    
    if (restaurantId != nil && userId != nil)
      @reviews = Review.find_by_resturantId_userId(restaurantId, userId)
    elsif (restaurantId != nil)
      @reviews = Review.find_by_resturantId(restaurantId)
    elsif (userId != nil)
      @reviews = Review.find_by_userId(userId)
    else
      @reviews = Review.all
    end

    render json: @reviews
  end
end
