class User < ApplicationRecord
  has_secure_password

  has_many :borrowings
  has_many :books, through: :borrowings

  validates :email, presence: true, uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, on: :create

  def currently_borrowed_books
    borrowings.where(returned_at: nil).includes(:book)
  end
end
