require 'rails_helper'
require 'spec_helper'

describe "Creating todo lists" do
  def create_todo_lists(options={})
    options[:title] ||= "My todo list"
    options[:title] ||= "This is my todo list."

    visit "/todo_lists"
    click_link "New Todo list"
    expect(page).to have_content("New Todo List")

    fill_in "Title", with: options[:title]
    fill_in "Description", with: options[:description]

    click_button "Create Todo list"
  end

  it "redirects to the todo list index page on success" do
    create_todo_lists(title: "My todo list", description: "This is what I'm doing today")
    expect(page).to have_content("Todo list was successfully created")
  end

  it "displays an error when the todo list has no title" do
    create_todo_lists(title: "", description: "This is what I'm doing today")

    expect(page).to have_content("error")
    expect(TodoList.count).to eq(0)

    visit "/todo_lists"
    expect(page).to_not have_content("This is what I'm doing today")
  end

  it "displays an error when todo list has a title less than 3 characters" do
    create_todo_lists(title: "Hi", description: "This is what I'm doing today")

    expect(page).to have_content("error")
    expect(TodoList.count).to eq(0)

    visit "/todo_lists"
    expect(page).to_not have_content("This is what I'm doing today")
  end

  it "displays an error when the todo list has no description" do
    create_todo_lists(title: "Hello", description: "")

    expect(page).to have_content("error")
    expect(TodoList.count).to eq(0)

    visit "/todo_lists"
    expect(page).to_not have_content("Hello")
  end

  it "displays an error when todo list has a description less than 5 characters" do
    create_todo_lists(title: "Hello", description: "Hi")

    expect(page).to have_content("error")
    expect(TodoList.count).to eq(0)

    visit "/todo_lists"
    expect(page).to_not have_content("Hello")
  end
end
