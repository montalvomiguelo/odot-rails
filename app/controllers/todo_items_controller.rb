class TodoItemsController < ApplicationController

  # GET /todo_lists/:todo_list_id/todo_items
  def index
    @todo_list = TodoList.find(params[:todo_list_id])
  end

end
