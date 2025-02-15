require 'rails_helper'

RSpec.describe "books/index", type: :view do
  let!(:books) { create_list(:book, 2) }

  before do
    assign(:books, books)
    render
  end

  it "displays all books" do
    books.each do |book|
      expect(rendered).to have_content(book.title)
      expect(rendered).to have_content(book.author)
      expect(rendered).to have_content(book.isbn)
    end
  end

  it "shows availability status" do
    expect(rendered).to have_content("Available")
  end

  it "has links to book details" do
    books.each do |book|
      expect(rendered).to have_link("View Details", href: book_path(book))
    end
  end
end
