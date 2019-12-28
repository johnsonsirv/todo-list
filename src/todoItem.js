const TodoItem = (title, note, dueDate, priority = false, completed = false) => {
  const todoItem = {
    title,
    note,
    dueDate,
    priority,
    completed,
  };
  return {
    todoItem,
  };
};

export default TodoItem;
