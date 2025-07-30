class AddIndexesToBooks < ActiveRecord::Migration[8.0]
  def change
    add_index :books, :title
    add_index :books, :author
    add_index :books, :isbn, unique: true
  end
end
