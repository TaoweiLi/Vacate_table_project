Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post "api/test", to: "application#test"

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :restaurants, only: [:index, :show]
    resources :reviews, only: [:index, :create, :update, :destroy, :show]
    resources :reservations, only: [:index, :create, :update, :destroy, :show]
    
    get "/search/:query", to: "restaurants#search"
  end

  get "*path", to: "static_pages#frontend_index"
end
