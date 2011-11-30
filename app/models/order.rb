class Order < ActiveRecord::Base
  
  has_many :budgets
  
end
