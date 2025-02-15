require 'rails_helper'

RSpec.describe Book, type: :model do
  describe 'validations' do
    subject { build(:book) }

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:author) }
    it { should validate_presence_of(:isbn) }
    it { should validate_uniqueness_of(:isbn) }

    context 'isbn format' do
      it 'accepts valid ISBN-10' do
        book = build(:book, isbn: '0-321-12345-X')
        expect(book).to be_valid
      end

      it 'accepts valid ISBN-13' do
        book = build(:book, isbn: '978-0-321-12345-6')
        expect(book).to be_valid
      end

      it 'rejects invalid ISBN format' do
        book = build(:book, isbn: 'invalid-isbn')
        expect(book).not_to be_valid
      end
    end
  end

  describe 'scopes and methods' do
    let!(:available_book) { create(:book) }
    let!(:borrowed_book) { create(:book) }
    let!(:borrowing) { create(:borrowing, book: borrowed_book) }

    describe '#available?' do
      it 'returns true for available books' do
        expect(available_book.available?).to be true
      end

      it 'returns false for borrowed books' do
        expect(borrowed_book.available?).to be false
      end
    end
  end
end
