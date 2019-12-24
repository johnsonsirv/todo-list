/* eslint-disable no-undef */
import Todo from './todo';
import TodoItem from './todoItem';

const DisplayTodo = (() => {
  let myTodoList;
  let todoName;
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

  const setTargetId = (_handle, _key) => {
    const elem = _handle;
    elem.value = _key;
  };

  const setFocusOnElement = (_handle) => _handle.click();

  const addTodoItemsEventListener = (_target, _callback) => {
    Array.from(_target).forEach((elem) => {
      elem.addEventListener('click', () => {
        _callback(
          document.getElementById('todo-items-index').value,
          elem.getAttribute('data-id'),
        );
      });
    });
  };

  const handleRenderTodoListItems = (_handle, _key, _activeListIndex = null) => {
    const id = _key;
    const html = currentTodoListItems[id].map((listItem, index) => {
      const {
        title, note, dueDate, priority, completed,
      } = listItem.todoItem;
      const cssClass = (completed) ? 'todoitem-complete' : (priority) ? 'todoitem-priority' : '';
      return (`<div class="todo-list-item" data-id="${index}">
                <p class="${cssClass}">${title}</p>
                <p class="${cssClass}">${note}</p>
                <p class="${cssClass}">${dueDate}</p>
                <button data-id="${index}" class="delete-todo-item">Remove</button>
                <button data-id="${index}" class="complete-todo-item">Toggle Complete</button>
                <button data-id="${index}" class="prioritize-todo-item">Toggle Priority</button>
              </div>`);
    });

    _handle.addEventListener('click', () => {
      setTargetId(document.getElementById('todo-items-index'), _activeListIndex);
      render(html.join(''), document.getElementById('todo-items'));
      // eslint-disable-next-line no-use-before-define
      addTodoItemsEventListener(document.getElementsByClassName('delete-todo-item'), handleDeleteTodoItem);
      addTodoItemsEventListener(document.getElementsByClassName('complete-todo-item'), handleCompleteTodoItem);
      addTodoItemsEventListener(document.getElementsByClassName('prioritize-todo-item'), handlePrioritizeTodoItem);
    });
  };

  const handleDeleteTodoList = (_handle, objIndex, childList, _todoList) => {
    _handle.addEventListener('click', () => {
      _todoList.splice(objIndex, 1);
      persistToLocalStorage(_todoList);
      childList.parentElement.removeChild(childList);
      setFocusOnElement(document.getElementById(`show-todo-items-${myTodoList[0].id}`));
    });
  };

  const addTodoListEventListeners = (_elements) => {
    Array.from(_elements).forEach((elem, index) => {
      const key = elem.getAttribute('id');
      handleRenderTodoListItems(
        document.getElementById(`show-todo-items-${key}`),
        key,
        index,
      );
      handleDeleteTodoList(
        document.getElementById(`remove-todo-list-${index}`),
        index,
        elem,
        myTodoList,
      );
    });
  };

  const renderTodoLists = (_todoName = todoName) => {
    if (any(_todoName)) {
      const html = fetchFromLocalStorage(todoName).map((list, index) => {
        const { id, name, items } = Todo.instanceOf(list);
        currentTodoListItems[id] = items;
        return (`<div class="todo-list" id="${id}">
          <span class="show-todo-items" id="show-todo-items-${id}" data-id="${id}">${name}</span>
          <button class="remove-todo-list" id="remove-todo-list-${index}">Delete</button>
        </div>`);
      });

      render(html.join(''), document.getElementById('todo'));
      addTodoListEventListeners(document.getElementsByClassName('todo-list'));
    }
  };

  const handleCompleteTodoItem = (objKey, itemKey) => {
    const obj = Todo.instanceOf(myTodoList[objKey]);
    obj.items[itemKey].todoItem.completed = !obj.items[itemKey].todoItem.completed;
    persistToLocalStorage(myTodoList);
    renderTodoLists();
    setFocusOnElement(document.getElementById(`show-todo-items-${obj.id}`));
  };

  const handlePrioritizeTodoItem = (objKey, itemKey) => {
    const obj = Todo.instanceOf(myTodoList[objKey]);
    obj.items[itemKey].todoItem.priority = !obj.items[itemKey].todoItem.priority;
    persistToLocalStorage(myTodoList);
    renderTodoLists();
    setFocusOnElement(document.getElementById(`show-todo-items-${obj.id}`));
  };

  const handleDeleteTodoItem = (objKey, _deleteKey) => {
    const obj = Todo.instanceOf(myTodoList[objKey]);
    obj.removeItem(_deleteKey);
    persistToLocalStorage(myTodoList);
    renderTodoLists();
    setFocusOnElement(document.getElementById(`show-todo-items-${obj.id}`));
  };

  const resetForm = (_type = 'todo') => {
    if (_type === 'todo') {
      document.getElementById('inline-list-form').reset();
      document.getElementById('inline-todo-list-form-section')
        .setAttribute('class', 'no-display');
    } else {
      document.getElementById('inline-todo-item-form').reset();
      document.getElementById('inline-todo-item-form-section')
        .setAttribute('class', 'no-display');
    }
  };

  const submitTodoListParams = () => {
    let newName = document.getElementById('inline-list-form-input').value;
    newName = newName === '' ? 'No Name' : newName;
    const newList = new Todo(newName);
    updateTodoList(newList);
    persistToLocalStorage(myTodoList);
    renderTodoLists(todoName);
    setFocusOnElement(document.getElementById(`show-todo-items-${newList.id}`));
    resetForm();
  };

  const submitTodoListItemParams = () => {
    const newItem = TodoItem(
      document.getElementById('title').value,
      document.getElementById('note').value,
      document.getElementById('dueDate').value,
    );
    const index = document.getElementById('todo-items-index').value;
    const todo = Todo.instanceOf(myTodoList[index]);
    todo.items = newItem;
    persistToLocalStorage(myTodoList);
    renderTodoLists();
    setFocusOnElement(document.getElementById(`show-todo-items-${todo.id}`));
    resetForm('todo-item');
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

  const initializeDOM = (_todoListName) => {
    myTodoList = fetchFromLocalStorage(_todoListName);
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

    todoName = _todoListName;
    renderTodoLists(_todoListName);
  };

  return {
    initializeDOM,
  };
})();

export default DisplayTodo;
