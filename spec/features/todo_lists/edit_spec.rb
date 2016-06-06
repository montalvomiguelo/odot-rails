require 'rails_helper'
require 'spec_helper'

describe "Editing todo lists" do
  let!(:todo_list) { TodoList.create(title: "Groceries", description: "Grocery list") }

  def update_todo_list(options={})
    options[:title] ||= "My todo list"
    options[:description] ||= "Grocery list"

    todo_list = options[:todo_list]

    visit "/todo_lists"
    within "#todo_list_#{todo_list.id}" do
      click_link "Edit"
    end

    fill_in "Title", with: options[:title]
    fill_in "Description", with: options[:description]
    click_button "Update Todo list"

    todo_list.reload
  end

  it "updates a todo list succesfully with correct information" do
    update_todo_list(todo_list: todo_list, title: "New title", description: "New description");
    expect(page).to have_content("Todo list was successfully updated")
    expect(todo_list.title).to eq("New title")
    expect(todo_list.description).to eq("New description")
  end

  it "displays an error when title is not filled" do
    update_todo_list(todo_list: todo_list, title: "", description: "New description");
    expect(page).to have_content("error")
  end

  it "displays an error when title is less than 3 length" do
    update_todo_list(todo_list: todo_list, title: "hi", description: "New description");
    expect(page).to have_content("error")
  end

  it "displays an error when description is not filled" do
    update_todo_list(todo_list: todo_list, title: "New title", description: "");
    expect(page).to have_content("error")
  end

  it "displays an error when description is less than 5 length" do
    update_todo_list(todo_list: todo_list, title: "New title", description: "N");
    expect(page).to have_content("error")
  end

end
