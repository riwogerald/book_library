class UsersController < ApplicationController
  before_action :set_user, only: [:show]
  before_action :require_login, only: [:show]
  before_action :authorize_user, only: [:show]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Welcome to the Book Library!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @borrowed_books = @user.currently_borrowed_books
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def authorize_user
    unless @user == current_user
      flash[:error] = "You can only view your own profile"
      redirect_to root_path
    end
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
