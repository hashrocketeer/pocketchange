class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :cat_name
      t.integer :starting_balance
      t.integer :current_balance
      t.integer :pocket_balance
      t.integer :change_balance
      t.integer :graph_position_number

      t.timestamps
    end
  end
end
