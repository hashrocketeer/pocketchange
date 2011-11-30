class Category < ActiveRecord::Base
  
  validates_uniqueness_of :cat_number
  validates_uniqueness_of :cat_name
  
end
