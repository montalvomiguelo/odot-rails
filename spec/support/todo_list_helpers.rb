module TodoListHelpers
  def visit_todolist(todo_list)
    visit "/todo_lists"
    within "#todo_list_#{todo_list.id}" do
      click_link "List Items"
    end
  end
end
