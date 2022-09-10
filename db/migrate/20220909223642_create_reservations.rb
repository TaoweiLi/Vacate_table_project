class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.datetime :date, null: false
      t.datetime :time, null:false
      t.integer :party_size, null: false
      t.references :restaurant, null: false, foreign_key: { to_table: :restaurants }, index: { unique: true }
      t.references :user, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
