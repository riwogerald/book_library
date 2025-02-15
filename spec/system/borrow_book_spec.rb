require 'rails_helper'

RSpec.describe 'Borrowing a book', type: :system do
  let(:user) { create(:user) }
  let!(:book) { create(:book) }
  let!(:borrowed_book) { create(:book) }
  let!(:existing_borrowing) { create(:borrowing, book: borrowed_book, user: create(:user)) }

  before do
    driven_by(:rack_test)
  end

  context 'when logged in' do
    before do
      login_as(user)
    end

    context 'with an available book' do
      before do
        visit book_path(book)
      end

      it 'allows borrowing an available book' do
        expect(page).to have_button('Borrow Book')

        click_button 'Borrow Book'

        expect(page).to have_content('Book was successfully borrowed')
        expect(page).to have_content('Status: Borrowed')
        expect(page).to have_button('Return Book')
      end

      it 'creates a new borrowing record' do
        expect {
          click_button 'Borrow Book'
        }.to change(Borrowing, :count).by(1)

        expect(book.borrowings.last.user).to eq(user)
      end
    end

    context 'with an already borrowed book' do
      before do
        visit book_path(borrowed_book)
      end

      it 'does not show the borrow button' do
        expect(page).not_to have_button('Borrow Book')
        expect(page).to have_content('Status: Borrowed')
      end
    end

    context 'returning a book' do
      let!(:user_borrowing) { create(:borrowing, book: book, user: user) }

      before do
        visit book_path(book)
      end

      it 'allows returning a borrowed book' do
        expect(page).to have_button('Return Book')

        click_button 'Return Book'

        expect(page).to have_content('Book was successfully returned')
        expect(page).to have_content('Status: Available')
        expect(page).to have_button('Borrow Book')
      end

      it 'updates the borrowing record' do
        click_button 'Return Book'

        user_borrowing.reload
        expect(user_borrowing.returned_at).to be_present
      end
    end
  end

  context 'when not logged in' do
    before do
      visit book_path(book)
    end

    it 'does not show the borrow button' do
      expect(page).not_to have_button('Borrow Book')
    end

    it 'prompts to log in' do
      expect(page).to have_link('Login')
    end
  end

  context 'viewing borrowed books on profile' do
    let!(:user_borrowing) { create(:borrowing, book: book, user: user) }

    before do
      login_as(user)
      visit user_path(user)
    end

    it 'shows currently borrowed books' do
      expect(page).to have_content(book.title)
      expect(page).to have_content(book.author)
      expect(page).to have_content(user_borrowing.due_date.strftime("%B %d, %Y"))
    end

    it 'allows returning books from profile' do
      expect {
        click_button 'Return Book'
      }.to change { user_borrowing.reload.returned_at }.from(nil)

      expect(page).to have_content("Book was successfully returned")
    end

    context 'with overdue books' do
      let!(:overdue_borrowing) do
        create(:borrowing,
          book: create(:book),
          user: user,
          due_date: 1.week.ago
        )
      end

      it 'highlights overdue books' do
        visit user_path(user)

        expect(page).to have_content("Overdue")
        expect(page).to have_content(overdue_borrowing.book.title)
      end
    end
  end
end
