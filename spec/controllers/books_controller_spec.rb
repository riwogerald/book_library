require 'rails_helper'

RSpec.describe BooksController, type: :controller do
  let(:user) { create(:user) }
  let(:book) { create(:book) }

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
    end

    it 'assigns @books' do
      get :index
      expect(assigns(:books)).to eq([ book ])
    end
  end

  describe 'POST #borrow' do
    context 'when user is logged in' do
      before { sign_in(user) }

      it 'creates a new borrowing' do
        expect {
          post :borrow, params: { id: book.id }
        }.to change(Borrowing, :count).by(1)
      end

      it 'redirects to the book page with success notice' do
        post :borrow, params: { id: book.id }
        expect(response).to redirect_to(book)
        expect(flash[:notice]).to be_present
      end
    end

    context 'when user is not logged in' do
      it 'redirects to login page' do
        post :borrow, params: { id: book.id }
        expect(response).to redirect_to(login_path)
      end
    end
  end
end
