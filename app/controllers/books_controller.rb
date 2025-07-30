class BooksController < ApplicationController
  before_action :require_login, except: [ :index, :show ]
  before_action :set_book, only: [ :show, :edit, :update, :destroy, :borrow, :return ]

  def index
    @books = Book.includes(:borrowings).limit(50)
  end

  def show
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      redirect_to @book, notice: "Book was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def borrow
    borrowing = @book.borrowings.build(user: current_user)

    if borrowing.save
      redirect_to @book, notice: "Book was successfully borrowed."
    else
      redirect_to @book, alert: "Unable to borrow book."
    end
  end

  def return
    borrowing = @book.current_borrowing

    if borrowing&.update(returned_at: Time.current)
      redirect_to @book, notice: "Book was successfully returned."
    else
      redirect_to @book, alert: "Unable to return book."
    end
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author, :isbn)
  end
end
