/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import TodoItem from '../src/todoItem';

describe('Todo List Item', () => {
  test('TodoItem(params) to return object', () => {
    const shopping = TodoItem('Chritsmas shopping', 'Go to the mall', '2019-12-24', false, false);
    expect(shopping.todoItem).toEqual({
      title: 'Chritsmas shopping',
      note: 'Go to the mall',
      dueDate: '2019-12-24',
      priority: false,
      completed: false,
    });
  });
});
