class Api::ReviewsController < ApplicationController
  # before_action :require_logged_in, only[:create]
  wrap_parameters include: Review.attribute_names + [:reviewId]

  # def index
  #   restaurantId = params[:restaurant_id]
  #   userId = params[:user_id]

  #   if (restaurantId != nil && userId != nil)
  #     @reviews = Review.find_by_resturantId_userId(restaurantId, userId)
  #   elsif (restaurantId != nil)
  #     @reviews = Review.find_by_resturantId(restaurantId)
  #   elsif (userId != nil)
  #     @reviews = Review.find_by_userId(userId)
  #   else
  #     @reviews = Review.all
  #   end

  #   render json: @reviews
  #   # render :index
  # end

  def index
    @reviews = Review.all
    render :index
  end

  def show
    @review = Review.where(restaurant_id: params[:restaurant_id])
    if @review
      render json: @review
      # render :show
    else
      render json: {}
    end
  end

  def create
    begin
      @review = Review.new(review_params)
      @review.save!
      render :show
    rescue => exception
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def update
    begin
      @review = Review.find(params[:id])
      @review.update!(review_params)
      render :show
    rescue => exception
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def destroy
    @review = current_user.reviews.find(params[:id])

    if !@review
      render json: { message: "Unauthorized" }, status: 401
      return
    end
    @review.destroy
    render :show
  end

  private

  def review_params
    params.require(:review).permit(:body, :rating, :restaurant_id, :user_id)
  end
end
