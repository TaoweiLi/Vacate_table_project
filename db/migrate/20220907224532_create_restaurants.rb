class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false, index: true
      t.string :address, null: false
      t.text :description, null: false
      t.string :cuisine, null: false
      t.string :expense
      t.string :neighborhood
      t.string :operation_hours
      t.string :dining_style
      t.string :dress_code
      t.string :parking_details
      t.string :payment_options
      t.string :website
      t.string :phone_number
      t.string :tag
      t.string :img
      t.float :lng
      t.float :lat


      t.timestamps
    end
  end
end
