class Api::RestaurantsController < ApplicationController
  def index
    tag = params[:tag]
    if (tag != nil)
      @restaurants = Restaurant.where("tag LIKE ?", "%#{tag}%")
    else
      @restaurants = Restaurant.all
    end

    render json: @restaurants
  end

  def show
    @restaurant = Restaurant.find_by(id: params[:id])
    
    render json: @restaurant
  end
end