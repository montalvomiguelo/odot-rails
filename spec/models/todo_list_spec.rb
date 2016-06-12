require 'rails_helper'

RSpec.describe TodoList, :type => :model do
  it { should have_many(:todo_items) }

  describe "#has_complete_items?" do
    let(:todo_list) { TodoList.create(title: "Groceries", description: "Grocery list")}

    it "returns true with completed todo items" do
      todo_list.todo_items.create(content: "Eggs", completed_at: 1.minute.ago)
      expect(todo_list.has_complete_items?).to be_truthy
    end

    it "returns false with no completed todo items" do
      todo_list.todo_items.create(content: "Eggs")
      expect(todo_list.has_complete_items?).to be_falsy
    end
  end

  describe "#has_incomplete_items?" do
    let(:todo_list) { TodoList.create(title: "Groceries", description: "Grocery list")}

    it "returns true with incomplete todo items" do
      todo_list.todo_items.create(content: "Eggs")
      expect(todo_list.has_incomplete_items?).to be_truthy
    end

    it "returns false with no incomplete todo items" do
      todo_list.todo_items.create(content: "Eggs", completed_at: 1.minute.ago)
      expect(todo_list.has_incomplete_items?).to be_falsy
    end

  end


end
