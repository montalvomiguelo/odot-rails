require 'rails_helper'

describe "Edditing todo items" do
  let!(:todo_list) { TodoList.create(title: "Grocery List", description: "Grocery") }
  let!(:todo_item) { todo_list.todo_items.create(content: "Milk") }

  def visit_todolist(todo_list)
    visit "/todo_lists"
    within "#todo_list_#{todo_list.id}" do
      click_link "List Items"
    end
  end

  def update_todo_item(options={})
    options[:content] ||= 'Milk'
    visit_todolist(todo_list)
    within("#todo_item_#{todo_item.id}") do
      click_link "Edit"
    end
    fill_in "Content", with: options[:content]
    click_button "Save"
    todo_item.reload
  end

  it "updates a todo item succesfully with valid content" do
    update_todo_item(content: "Lots of Milk")
    expect(page).to have_content('Todo item was successfully updated.')
    expect(todo_item.content).to eq("Lots of Milk")
  end

  it "displays an error with no content data" do
    update_todo_item(content: "")
    expect(page).to have_content('error')
    expect(todo_item.content).to eq('Milk')
  end

  it "displays an error with not valid content length" do
    update_todo_item(content: "hi")
    expect(page).to have_content("error")
    expect(todo_item.content).to eq('Milk')
  end

end
