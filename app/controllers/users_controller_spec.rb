require "rails_helper"

RSpec.describe UsersController, type: :controller do
  describe "GET #new" do
    it "returns a successful response" do
      get :new
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      let(:valid_params) do
        { user: { email: "test@example.com", password: "password123",
                 password_confirmation: "password123" } }
      end

      it "creates a new user" do
        expect {
          post :create, params: valid_params
        }.to change(User, :count).by(1)
      end

      it "logs in the user" do
        post :create, params: valid_params
        expect(session[:user_id]).to eq(User.last.id)
      end
    end

    context "with invalid parameters" do
      let(:invalid_params) do
        { user: { email: "invalid", password: "short" } }
      end

      it "does not create a user" do
        expect {
          post :create, params: invalid_params
        }.not_to change(User, :count)
      end

      it "renders the new template" do
        post :create, params: invalid_params
        expect(response).to render_template(:new)
      end
    end
  end
end
