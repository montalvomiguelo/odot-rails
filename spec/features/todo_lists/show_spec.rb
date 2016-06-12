require 'rails_helper'

describe "Viewing todo list detail" do
  let!(:todo_list) { TodoList.create(title: "New Todo List", description: "My todos") }

  it "displays no items when todo list is empty" do
    visit todo_lists_path
    within "#todo_list_#{todo_list.id}" do
      click_link "Show"
    end
    expect(page).to_not have_selector('.incomplete_items')
    expect(page).to_not have_selector('.complete_items')
  end

  it "displays incomplete todo items" do
    todo_list.todo_items.create(content: "todo uno")
    todo_list.todo_items.create(content: "todo dos")
    visit todo_lists_path
    within "#todo_list_#{todo_list.id}" do
      click_link "Show"
    end
    expect(page.all(".incomplete_items li").size).to eq(todo_list.todo_items.incomplete.count)
  end

  it "displays complete todo items" do
    todo_list.todo_items.create(content: "todo uno", completed_at: 2.minutes.ago)
    todo_list.todo_items.create(content: "todo dos", completed_at: 1.minute.ago)
    visit todo_lists_path
    within "#todo_list_#{todo_list.id}" do
      click_link "Show"
    end
    expect(page.all(".complete_items li").size).to eq(todo_list.todo_items.complete.count)
  end
end
