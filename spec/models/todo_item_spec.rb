require 'rails_helper'

RSpec.describe TodoItem, :type => :model do
  it { should belong_to(:todo_list) }

  # Name of the method
  describe "#completed?" do
    let(:todo_item) { TodoItem.create(content: "Hello") }

    it "is false when completed is nil" do
      expect(todo_item.completed?).to be_falsy
    end

    it "is true when comleted is not nil" do
      todo_item.completed_at = 5.minutes.ago
      expect(todo_item.completed?).to be_truthy
    end
  end
end
