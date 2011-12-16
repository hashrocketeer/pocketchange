# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111216202858) do

  create_table "categories", :force => true do |t|
    t.string   "cat_name"
    t.integer  "starting_balance"
    t.integer  "current_balance"
    t.integer  "pocket_balance"
    t.integer  "change_balance"
    t.integer  "graph_position_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "pocket_x"
    t.integer  "pocket_y"
  end

  create_table "transactions", :force => true do |t|
    t.string   "description"
    t.decimal  "trans_amount"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id"
  end

end
