require 'rails_helper'

RSpec.describe "books/show", type: :view do
  let(:book) { create(:book) }
  let(:user) { create(:user) }

  before do
    assign(:book, book)
    allow(view).to receive(:current_user).and_return(user)
    allow(view).to receive(:logged_in?).and_return(true)
  end

  context "when book is available" do
    before { render }

    it "displays book details" do
      expect(rendered).to have_content(book.title)
      expect(rendered).to have_content(book.author)
      expect(rendered).to have_content(book.isbn)
    end

    it "shows borrow button for logged in users" do
      expect(rendered).to have_button("Borrow Book")
    end
  end

  context "when book is borrowed" do
    before do
      create(:borrowing, book: book, user: user)
      render
    end

    it "shows return button for the borrower" do
      expect(rendered).to have_button("Return Book")
    end

    it "displays borrowed status" do
      expect(rendered).to have_content("Status: Borrowed")
    end
  end
end
