class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.string :description
      t.integer :trans_amount

      t.timestamps
    end
  end
end
