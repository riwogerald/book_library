require 'rails_helper'

RSpec.describe Borrowing, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:due_date) }

    it 'validates book availability on create' do
      book = create(:book)
      create(:borrowing, book: book, returned_at: nil)

      new_borrowing = build(:borrowing, book: book)
      expect(new_borrowing).not_to be_valid
      expect(new_borrowing.errors[:book]).to include('is already borrowed')
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:book) }
  end

  describe 'callbacks' do
    it 'sets due date before validation on create' do
      borrowing = build(:borrowing, due_date: nil)
      borrowing.valid?
      expect(borrowing.due_date).to be_present
      expect(borrowing.due_date).to be_within(1.second).of(2.weeks.from_now)
    end
  end
end
