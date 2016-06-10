require 'rails_helper'

describe "Adding todo items" do
  let!(:todo_list) { TodoList.create(title: "Grocery List", description: "Grocery") }

  def create_todo_item(options={})
    options[:content] ||= "My todo item"
    visit_todolist(todo_list)
    click_link "New Todo Item"
    fill_in "Content", with: options[:content]
    click_button "Save"
  end

  it "is successful with valid content" do
    create_todo_item(content: "Milk")
    expect(page).to have_content("Todo item was successfully created.")
    within("ul.todo_items") do
      expect(page).to have_content("Milk")
    end
  end

  it "displays an error with no content" do
    create_todo_item(content: "")
    expect(page).to have_content("error")
  end

  it "displays an error with content less than 3 characters long" do
    create_todo_item(content: "hi")
    expect(page).to have_content("error")
  end

end
