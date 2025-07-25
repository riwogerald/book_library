require "rails_helper"

RSpec.describe SessionsController, type: :controller do
  let(:user) { create(:user) }

  describe "GET #new" do
    it "returns a successful response" do
      get :new
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid credentials" do
      it "logs in the user" do
        post :create, params: { email: user.email, password: "password123" }
        expect(session[:user_id]).to eq(user.id)
        expect(response).to redirect_to(root_path)
      end
    end

    context "with invalid credentials" do
      it "does not log in the user" do
        post :create, params: { email: user.email, password: "wrong" }
        expect(session[:user_id]).to be_nil
        expect(response).to render_template(:new)
      end
    end
  end

  describe "DELETE #destroy" do
    before { session[:user_id] = user.id }

    it "logs out the user" do
      delete :destroy
      expect(session[:user_id]).to be_nil
      expect(response).to redirect_to(root_path)
    end
  end
end
