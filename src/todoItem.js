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
    todoItem.completed = !todoItem.completed;
  };
  return {
    todoItem,
  };
};

export default TodoItem;
