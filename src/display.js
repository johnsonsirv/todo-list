/* eslint-disable no-undef */
import Todo from './todo';

const DisplayTodo = (() => {
  const myTodoList = [];
  const todoName = 'myList';
  const currentTodoListItems = {};
  const any = (_name) => localStorage.getItem(_name).length > 0;

  const updateTodoList = (_data) => myTodoList.unshift(_data);

  const persistToLocalStorage = (_data, _todoName = todoName) => {
    localStorage.setItem(_todoName, JSON.stringify(_data));
  };

  const fetchFromLocalStorage = (_todoName) => JSON.parse(localStorage.getItem(_todoName));

  const render = (_element, _target) => {
    const DOMTarget = _target;
    DOMTarget.innerHTML = _element;
  };

  const renderTodoListItems = (_todoList) => {
    const id = _todoList.getAttribute('data-id');
    const html = currentTodoListItems[id].map((listItem, index) => {
      const { title, note, dueDate } = listItem.todoItem;
      return `<div class="todo-list-item" data-id="${index}">
                <p>${title}</p><p>${note}</p><p>${dueDate}</p>Edit | Remove | Complete
              </div>`;
    });

    render(html.join(''), document.getElementById('todo-items'));
  };

  const addTodoListsEventListener = (_elements) => {
    Array.from(_elements).forEach(elem => {
      elem.addEventListener('click', () => {
        renderTodoListItems(elem);
      });
    });
  };
  const renderTodoLists = (_todoName) => {
    if (any(_todoName)) {
      const html = fetchFromLocalStorage(todoName).map(list => {
        const { id, name, items } = Object.assign(Object.create(Todo.prototype), list);
        currentTodoListItems[id] = items;
        return `<div class="todo-list" data-id="${id}">${name}</div>`;
      });

      render(html.join(''), document.getElementById('todo'));
      addTodoListsEventListener(document.getElementById('todo').children);
    }
  };

  const resetForm = () => {
    document.getElementById('inline-list-form').reset();
    document.getElementById('inline-list-form-input').value = '';
    document.getElementById('inline-list-form-section')
      .setAttribute('class', 'no-display');
  };

  const submitFormParams = () => {
    let newName = document.getElementById('inline-list-form-input').value;
    newName = newName === '' ? 'No Name' : newName;
    const newList = new Todo(newName);
    updateTodoList(newList);
    persistToLocalStorage(myTodoList);
    renderTodoLists(todoName);
    resetForm();
  };

  const showInlineFormEditor = () => {
    document.getElementById('inline-list-form-section').removeAttribute('class');
    document.getElementById('inline-list-form-submit')
      .addEventListener('click', () => {
        submitFormParams();
      }, { once: true });
  };

  const addNewListEventListener = () => {
    document.getElementById('add-new-list')
      .addEventListener('click', () => {
        showInlineFormEditor();
      });
  };

  const initializeDOM = (_defaultList = {}) => {
    updateTodoList(_defaultList);
    persistToLocalStorage(myTodoList);
    addNewListEventListener();
    renderTodoLists(todoName);
  };

  return {
    initializeDOM,
  };
})();

export default DisplayTodo;
