class Borrowing < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :due_date, presence: true
  validates :user_id, uniqueness: { scope: :book_id, conditions: -> { where(returned_at: nil) },
                                  message: "You have already borrowed this book" }
  validate :book_must_be_available, on: :create

  before_validation :set_due_date, on: :create

  private

  def set_due_date
    self.due_date ||= 2.weeks.from_now
  end

  def book_must_be_available
    if book.present? && !book.available?
      errors.add(:book, "is already borrowed")
    end
  end
end
