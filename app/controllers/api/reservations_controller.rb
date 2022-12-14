class Api::ReservationsController < ApplicationController

def index
  userId = params[:user_id]

  if (userId != nil)
    @reservations = Reservation.where(user_id: userId)
  else
    @reservations = Reservation.all
  end 
  render :index
end

def create
  @reservation = Reservation.new(reservation_params)
  if @reservation.save
    render :show
  else
    render json: @reservation.errors.full_messages, status: 422
  end
end

def update
  @reservation = Reservation.find(params[:id])
  if @reservation.update(reservation_params)
    render :show
  else
    render json: @reservation.errors.full_messages, status: 422
  end
end

def show
  @reservation = Reservation.find(params[:id])
  render :show
end

def destroy
  @reservation = Reservation.find(params[:id])
  @reservation.destroy

  render :show
end

private

def reservation_params
  params.require(:reservation).permit(:date, :time, :party_size, :restaurant_id, :user_id)
end

def user_id
  params[:userId]
end 

end
