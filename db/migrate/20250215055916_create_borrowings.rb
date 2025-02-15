class CreateBorrowings < ActiveRecord::Migration[8.0]
  def change
    create_table :borrowings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
      t.datetime :due_date
      t.datetime :returned_at

      t.timestamps

      t.index [ :book_id, :returned_at ]
    end
  end
end
