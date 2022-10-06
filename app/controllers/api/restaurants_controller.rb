class Api::RestaurantsController < ApplicationController
 
  def search
    query = params[:query]
    @restaurants = Restaurant.where("name ILIKE ? OR cuisine ILIKE ?", "%#{query}%", "%#{query}%")

    @restaurant_ids = @restaurants.map { |res| res.id }
    @score_avg_by_id = Review.where(restaurant_id: @restaurant_ids).select(:restaurant_id, :rating).group(:restaurant_id).average(:rating)

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

    @restaurant_ids = @restaurants.map{ |res| res.id }
    @score_avg_by_id = Review.where(restaurant_id: @restaurant_ids).select(:restaurant_id, :rating).group(:restaurant_id).average(:rating)

    render :index
  end

  def show
    @restaurant = Restaurant.find_by_id(params[:id])

    if @restaurant.nil?
      render nil
    end
    
    @score_avg = Review.where(restaurant_id: params[:id]).average(:rating).to_f
    render :show
  end
end
