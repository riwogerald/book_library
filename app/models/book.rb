class Book < ApplicationRecord
  has_many :borrowings
  has_many :users, through: :borrowings

  validates :title, presence: true
  validates :author, presence: true
  validates :isbn, presence: true, uniqueness: true,
            format: { with: /\A[0-9-]{10,17}\z/, message: "must be a valid ISBN" }

  def available?
    borrowings.where(returned_at: nil).empty?
  end

  def current_borrowing
    borrowings.find_by(returned_at: nil)
  end
end
