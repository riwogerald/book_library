require 'rails_helper'

RSpec.describe Book, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:author) }
    it { should validate_presence_of(:isbn) }
    it { should validate_uniqueness_of(:isbn) }
  end

  describe 'associations' do
    it { should have_many(:borrowings) }
    it { should have_many(:users).through(:borrowings) }
  end

  describe '#available?' do
    let(:book) { create(:book) }

    it 'returns true when book has no current borrowings' do
      expect(book.available?).to be true
    end

    it 'returns false when book is currently borrowed' do
      create(:borrowing, book: book, returned_at: nil)
      expect(book.available?).to be false
    end
  end
end
