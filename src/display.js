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

  const handleRenderTodoListItems = (_handle, _key) => {
    const id = _key;
    const html = currentTodoListItems[id].map((listItem, index) => {
      const { title, note, dueDate } = listItem.todoItem;
      return `<div class="todo-list-item" data-id="${index}">
                <p>${title}</p><p>${note}</p><p>${dueDate}</p>Edit | Remove | Complete
              </div>`;
    });
    _handle.addEventListener('click', () => {
      render(html.join(''), document.getElementById('todo-items'));
    });
  };

  const handleDeleteTodoList = (_handle, objIndex, childList, _todoList) => {
    _handle.addEventListener('click', () => {
      _todoList.splice(objIndex, 1);
      persistToLocalStorage(_todoList);
      childList.parentElement.removeChild(childList);
    });
  };

  const addTodoListEventListeners = (_elements) => {
    Array.from(_elements).forEach((elem, index) => {
      const key = elem.getAttribute('id');
      handleRenderTodoListItems(document.getElementById(`show-todo-items-${key}`), key);
      handleDeleteTodoList(document.getElementById(`remove-todo-list-${index}`), index, elem, myTodoList);
    });
  };

  const renderTodoLists = (_todoName) => {
    if (any(_todoName)) {
      const html = fetchFromLocalStorage(todoName).map((list, index) => {
        const { id, name, items } = Object.assign(Object.create(Todo.prototype), list);
        currentTodoListItems[id] = items;
        return `<div class="todo-list" id="${id}">
          <span class="show-todo-items" id="show-todo-items-${id}" data-id="${id}">${name}</span>
          <button class="remove-todo-list" id="remove-todo-list-${index}">Delete</button>
        </div>`;
      });

      render(html.join(''), document.getElementById('todo'));
      addTodoListEventListeners(document.getElementsByClassName('todo-list'));
    }
  };

  const renderDefaultTodoListItems = (_todoItems) => {
    const html = _todoItems.map((list, index) => {
      const { title, note, dueDate } = list.todoItem;
      return `<div class="todo-list-item" data-id="${index}">
                <p>${title}</p><p>${note}</p><p>${dueDate}</p>Edit | Remove | Complete
              </div>`;
    });
    render(html, document.getElementById('todo-items'));
  };

  const resetForm = () => {
    document.getElementById('inline-list-form').reset();
    document.getElementById('inline-list-form-input').value = '';
    document.getElementById('inline-todo-list-form-section')
      .setAttribute('class', 'no-display');
  };

  const submitTodoListParams = () => {
    let newName = document.getElementById('inline-list-form-input').value;
    newName = newName === '' ? 'No Name' : newName;
    const newList = new Todo(newName);
    updateTodoList(newList);
    persistToLocalStorage(myTodoList);
    renderTodoLists(todoName);
    resetForm();
  };

  const submitTodoListItemParams = () => {
    
  };

  const showInlineFormEditor = (_form, submitHandle, callback) => {
    _form.removeAttribute('class');
    submitHandle.addEventListener('click', () => {
      callback();
    }, { once: true });
  };

  const handleAddNewTodo = (_handle, _form, _submitHandle, callback) => {
    _handle.addEventListener('click', () => {
      showInlineFormEditor(
        _form,
        _submitHandle,
        callback,
      );
    });
  };

  const initializeDOM = (_defaultList = {}) => {
    updateTodoList(_defaultList);
    persistToLocalStorage(myTodoList);

    handleAddNewTodo(
      document.getElementById('add-new-todo-list'),
      document.getElementById('inline-todo-list-form-section'),
      document.getElementById('add-todo'),
      submitTodoListParams,
    );

    handleAddNewTodo(
      document.getElementById('add-new-todo-item'),
      document.getElementById('inline-todo-item-form-section'),
      document.getElementById('add-todo-item'),
      submitTodoListItemParams,
    );

    renderTodoLists(todoName);
    renderDefaultTodoListItems(_defaultList.items);
  };

  return {
    initializeDOM,
  };
})();

export default DisplayTodo;
