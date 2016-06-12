require 'rails_helper'

describe "Viewing todo lists" do
  let!(:todo_list) { TodoList.create(title: "Groceries", description: "Grocery list")}

  context "with todo lists" do
    it "give the option to show detail" do
      visit(root_path)
      within "#todo_list_#{todo_list.id}" do
        click_link "Show"
      end
      expect(page).to have_content(todo_list.title)
      expect(page).to have_content(todo_list.description)
    end
  end
end
