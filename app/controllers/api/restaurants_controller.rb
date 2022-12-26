class Api::RestaurantsController < ApplicationController
  def search
    query = params[:query]    # get from restaurant store fetchQueryRestaurants
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
      @restaurants = Restaurant.where("tag LIKE ?", "%#{tag}%")    # Active Record query
    else
      @restaurants = Restaurant.all
    end

    @restaurant_ids = @restaurants.map { |res| res.id }
    @score_avg_by_id = Review.where(restaurant_id: @restaurant_ids).select(:restaurant_id, :rating).group(:restaurant_id).average(:rating)
    @review_number = Review.where(restaurant_id: @restaurant_ids).select(:restaurant_id, :id).group(:restaurant_id).count(:id)
    render :index    # render the views/restaurants/index.json.jbuilder
  end

  def show
    id_pram = params[:id]
    if id_pram.to_i.to_s != id_pram
      return nil
    end
    
    @restaurant = Restaurant.find_by_id(id_pram)
    if @restaurant.nil?
      render nil
    end

    @score_avg = Review.where(restaurant_id: params[:id]).average(:rating).to_f
    render :show    # render the views/restaurants/index.json.jbuilder
  end

end
