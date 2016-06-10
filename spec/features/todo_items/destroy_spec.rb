require 'rails_helper'

describe "deleiting todo items" do
  let!(:todo_list) { TodoList.create(title: "Grocery List", description: "Grocery") }
  let!(:todo_item) { todo_list.todo_items.create(content: "Milk") }

  it "is successful when clickin the destroy link" do
    visit_todolist(todo_list)
    within("#todo_item_#{todo_item.id}") do
      click_link "Destroy"
    end
    expect(page).to have_content('Todo list was successfully destroyed.')
    expect(page).to_not have_content(todo_item.content)
    expect(TodoItem.count).to eq(0)
  end

end
