class TodoItemsController < ApplicationController
  before_action :set_todo_list, only: [:index, :new, :create, :edit, :update]
  before_action :set_todo_item, only: [:edit, :update]

  # GET /todo_lists/:todo_list_id/todo_items
  def index
  end

  # GET /todo_lists/:todo_list_id/todo_items/new
  def new
    @todo_item = @todo_list.todo_items.new
  end

  # POST /todo_lists/:todo_list_id/todo_items
  def create
    @todo_item = @todo_list.todo_items.new(todo_item_params)
    if @todo_item.save
      redirect_to todo_list_todo_items_url, notice: 'Todo item was successfully created.'
    else
      render :new
    end
  end

  # GET /todo_lists/1/edit
  def edit
  end

  # PATCH/PUT /todo_lists/:todo_list_id/todo_items/:id
  def update
    if @todo_item.update(todo_item_params)
      redirect_to todo_list_todo_items_url, notice: 'Todo item was successfully updated.'
    else
      render :new
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo_list
      @todo_list = TodoList.find(params[:todo_list_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_item_params
      params.require(:todo_item).permit(:content)
    end

    def set_todo_item
      @todo_item = @todo_list.todo_items.find(params[:id])
    end

end
