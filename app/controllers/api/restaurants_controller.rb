class Api::RestaurantsController < ApplicationController
 
  def search
    query = params[:query]
    @restaurants = Restaurant.where("name ILIKE ? OR tag ILIKE ?", "%#{query}%", "%#{query}%")
    if @restaurants.length > 0
      render :index
    else
      render :index
    end
  end

  def index
    tag = params[:tag]
    if (tag != nil)
      @restaurants = Restaurant.where("tag LIKE ?", "%#{tag}%")
    else
      @restaurants = Restaurant.all
    end

    # render json: @restaurants
    render :index
  end

  def show
    @restaurant = Restaurant.find_by(id: params[:id])
    # render json: @restaurant
    render :show
  end
end
