class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :cat_name
      t.integer :dollars
      t.integer :cat_number

      t.timestamps
    end
  end
end
