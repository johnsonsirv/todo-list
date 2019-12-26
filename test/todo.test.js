/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Todo from '../src/todo';

describe('Todo List', () => {
  test('new Todo(\'Test List\') creates a new todo list with name \'Test List\'', () => {
    const testList = new Todo('Test List');
    expect(testList.name).toBe('Test List');
  });
  test('new Todo(\'Test List\') creates Todo with random id', () => {
    const testList = new Todo('Test List');
    expect(testList.id).not.toBeNull();
  });
  test('new Todo(\'Test List\') initialize empty list items', () => {
    const testList = new Todo('Test List');
    expect(testList.items.length).toEqual(0);
  });
  test('testList.items = itemObj adds todoitem to current todo', () => {
    const testList = new Todo('Test List');
    testList.items = {};
    expect(testList.items.length).not.toBe(0);
  });
  test('testList.items = itemObj adds todoitem in reverse order', () => {
    const testList = new Todo('Test List');
    testList.items = { title: 'First title', note: 'First Note' };
    testList.items = { title: 'Second title', note: 'Second Note' };
    expect(testList.items[0].title).toEqual('Second title');
  });
  test('testList.removeItem(1) removes second item from todo items', () => {
    const testList = new Todo('Test List');
    testList.items = { title: 'First title', note: 'First Note' };
    testList.items = { title: 'Second title', note: 'Second Note' };
    testList.items = { title: 'Third title', note: 'Third Note' };
    testList.removeItem(1);
    expect(testList.items[1].title).toEqual('First title');
  });
  test('static method Todo.instaceOf creates instance from object literal', () => {
    const testList1 = new Todo('Test List 1');
    const testList2 = new Todo('Test List 2');
    const testList3 = new Todo('Test List 3');
    const collection = [testList1, testList2, testList3];
    const obj1Literal = collection[0];
    testList1.items = { title: 'First Title, Test List 1', note: 'First Note, Test List 1' };
    const newObj = Todo.instanceOf(obj1Literal);
    newObj.items = { title: 'Second Title, Test List 1', note: 'Second Note, Test List 1' };

    expect(newObj.items.length).toEqual(2);
    expect(testList1.items[1].title).toEqual('First Title, Test List 1');
  });
});
