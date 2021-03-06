require 'rails_helper'

describe "Viewing todo items" do
  let!(:todo_list) { TodoList.create(title: "Grocery List", description: "Grocery") }

  it "displays the title of the todo list" do
    visit_todolist(todo_list)
    expect(page).to have_content(todo_list.title)
  end

  it "displays no items when a todo list is empty" do
    visit_todolist(todo_list)
    expect(page.all(".todo_items tbody tr").size).to eq(0)
  end

  it "displays todo items when a todo list is not empty" do
    todo_list.todo_items.create(content: "todo uno")
    todo_list.todo_items.create(content: "todo dos")
    visit_todolist(todo_list)
    expect(page.all(".todo_items tbody tr").size).to eq(todo_list.todo_items.count)
    within ".todo_items" do
      expect(page).to have_content("uno")
      expect(page).to have_content("dos")
    end
  end

  it "can go back to listing todo lists page" do
    visit_todolist(todo_list)
    click_link "Back"
    expect(page).to have_content("Listing Todo Lists")
  end

end
