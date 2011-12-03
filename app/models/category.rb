class Category < ActiveRecord::Base
  
  validates_uniqueness_of :graph_position_number
  validates_uniqueness_of :cat_name
  
end
