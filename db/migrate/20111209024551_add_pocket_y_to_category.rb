class AddPocketYToCategory < ActiveRecord::Migration
  def change
    add_column :categories, :pocket_y, :integer
  end
end
