# app/views/api/users/show.json.jbuilder
json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :phone_number, :created_at, :updated_at
end
