class ChangeDateFormatInTodoItems < ActiveRecord::Migration
  def change
    change_column :todo_items, :completed_at, :datetime
  end
end
