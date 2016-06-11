require 'rails_helper'

describe "Completing todo items" do
  let!(:todo_list) { TodoList.create(title: "Grocery List", description: "Grocery") }
  let!(:todo_item) { todo_list.todo_items.create(content: "Milk") }

  it "is successful when marking a single item complete" do
    expect(todo_item.completed_at).to be_nil
    visit_todolist(todo_list)
    within("#todo_item_#{todo_item.id}") do
      click_link "Mark Complete"
    end
    todo_item.reload
    expect(todo_item.completed_at).to_not be_nil
  end

end
