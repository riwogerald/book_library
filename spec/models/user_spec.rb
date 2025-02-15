require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe 'associations' do
    it { should have_many(:borrowings) }
    it { should have_many(:books).through(:borrowings) }
  end

  describe '#currently_borrowed_books' do
    let(:user) { create(:user) }
    let(:book1) { create(:book) }
    let(:book2) { create(:book) }

    before do
      create(:borrowing, user: user, book: book1, returned_at: nil)
      create(:borrowing, user: user, book: book2, returned_at: Time.current)
    end

    it 'returns only currently borrowed books' do
      expect(user.currently_borrowed_books.count).to eq(1)
      expect(user.currently_borrowed_books.first.book).to eq(book1)
    end
  end
end
