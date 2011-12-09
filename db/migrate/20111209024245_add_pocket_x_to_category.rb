class AddPocketXToCategory < ActiveRecord::Migration
  def change
    add_column :categories, :pocket_x, :integer
  end
end
