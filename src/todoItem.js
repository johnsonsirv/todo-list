const TodoItem = (title, note, dueDate, priority = false, completed = false) => {
  const todoItem = {
    title,
    note,
    dueDate,
    priority,
    completed,
  };

  const changePriority = () => {
    todoItem.priority = !todoItem.priority;
  };
  const markComplete = () => {
    this.completed = !this.completed;
  };
  return {
    todoItem,
    changePriority,
    // markComplete,
  };
};

export default TodoItem;
