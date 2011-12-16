class ChangeAmountToDecimal < ActiveRecord::Migration

  def up
    change_column("transactions", "trans_amount", :decimal, :precision => 8, :scale => 2)
  end

  def down
    change_column("transactions", "trans_amount", :integer)
  end
end
