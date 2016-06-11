class TodoItem < ActiveRecord::Base
  validates :content, presence: true, length: { minimum: 3 }
  belongs_to :todo_list

  def completed?
    !completed_at.nil?
  end
end
