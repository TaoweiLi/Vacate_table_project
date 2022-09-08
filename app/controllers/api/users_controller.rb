class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ["password"]


  def create
    # render json: user_params
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show # why not render json: @user ?
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :phone_number, :password)
  end
end
