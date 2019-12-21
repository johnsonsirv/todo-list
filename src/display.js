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

  const renderTodoListItems = (_todoList) => {
    const id = _todoList.getAttribute('data-id');
    let html = '';
    currentTodoListItems[id].forEach((listItem, index) => {
      html = `${html}<div style="border: solid 1px;" class="todo-list-item" data-id="${index}">
                <p>${listItem.todoItem.title}</p>
                <p>${listItem.todoItem.note}</p>
                <p>${listItem.todoItem.dueDate}</p>
                Edit | Remove | Complete
              </div>`;
    });
    const TODOItemsSection = document.getElementById('todo-items');
    TODOItemsSection.innerHTML = html;
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
      let html = '';
      fetchFromLocalStorage(todoName).forEach(list => {
        const currentList = Object.assign(Object.create(Todo.prototype), list);
        currentTodoListItems[currentList.id] = currentList.items;
        html = `${html}<div style="border: solid 1px;" class="todo-list" data-id="${currentList.id}">
                  ${currentList.name}
                </div>`;
      });
      const TODOSection = document.getElementById('todo');
      TODOSection.innerHTML = html;
      addTodoListsEventListener(TODOSection.children);
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
      .addEventListener('click', e => {
        // e.preventDefault();
        // debugger;
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
