/* eslint-disable no-undef */
import Todo from './todo';
import TodoItem from './todoItem';

const DisplayTodo = (() => {
  let myTodoList;
  let todoName;
  const currentTodoListItems = {};
  const any = (_name) => {
    if (localStorage.getItem(_name) === null) return false;
    return true;
  };

  const updateTodoList = _data => myTodoList.unshift(_data);

  const persistToLocalStorage = (_data, _todoName = todoName) => {
    localStorage.setItem(_todoName, JSON.stringify(_data));
  };

  const fetchFromLocalStorage = _todoName => JSON.parse(localStorage.getItem(_todoName));

  const render = (_element, _target) => {
    const DOMTarget = _target;
    DOMTarget.innerHTML = _element;
  };

  const setTargetId = (_handle, _key) => {
    const elem = _handle;
    elem.value = _key;
  };

  const setFocusOnElement = _handle => _handle.click();

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
      // eslint-disable-next-line no-nested-ternary
      const cssClass = (completed) ? 'todoitem-complete' : (priority) ? 'todoitem-priority' : '';
      return (`<div class="todo-list-item" data-id="${index}">
                <div class="item-info">
                <p class="${cssClass}">${title}</p>
                <p class="${cssClass}">${note}</p>
                <p class="${cssClass} due-date">Due: ${dueDate}</p>
                </div>
                <div class="item-actions">
                <button data-id="${index}" title="edit details" class="edit-todo-item">&#9997;</button>
                <button data-id="${index}" title="done" class="btn-add complete-todo-item">&#10003;</button>
                <button data-id="${index}" title="priority" class="prioritize-todo-item">!!</button>
                <button data-id="${index}" title="delete item" class="btn-danger delete-todo-item"> X </button>
                </div>
              </div>`);
    });

    _handle.addEventListener('click', () => {
      setTargetId(document.getElementById('todo-items-index'), _activeListIndex);
      render(html.join(''), document.getElementById('todo-items'));
      // eslint-disable-next-line no-use-before-define
      addTodoItemsEventListener(document.getElementsByClassName('edit-todo-item'), handleEditTodoItem);
      // eslint-disable-next-line no-use-before-define
      addTodoItemsEventListener(document.getElementsByClassName('delete-todo-item'), handleDeleteTodoItem);
      // eslint-disable-next-line no-use-before-define
      addTodoItemsEventListener(document.getElementsByClassName('complete-todo-item'), handleCompleteTodoItem);
      // eslint-disable-next-line no-use-before-define
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
          <span title="${name}" class="show-todo-items" id="show-todo-items-${id}" data-id="${id}">${name}</span>
          <button title="delete list" class="remove-todo-list btn-danger" id="remove-todo-list-${index}">X</button>
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
      document.getElementById('inline-list-form-input')
        .setAttribute('class', 'text-input');
    } else if (_type === 'todo-item') {
      document.getElementById('inline-todo-item-form').reset();
      document.getElementById('inline-todo-item-form-section')
        .setAttribute('class', 'no-display');
      document.getElementById('title')
        .setAttribute('class', 'text-input');
      document.getElementById('note')
        .setAttribute('class', 'text-input');
    } else { // Edit
      document.getElementById('inline-edit-todo-item-form').reset();
      document.getElementById('inline-edit-todo-item-form-section')
        .setAttribute('class', 'no-display');
      document.getElementById('edit-title')
        .setAttribute('class', 'text-input');
      document.getElementById('edit-note')
        .setAttribute('class', 'text-input');
    }
  };

  const showDOMWarning = _element => _element.setAttribute('class', 'input-warning');

  const validInput = (input1 = null, input2 = null) => {
    if (input1.value === '') {
      showDOMWarning(input1);
      return false;
    }
    if (input2 !== null && input2.value === '') {
      showDOMWarning(input2);
      return false;
    }
    return true;
  };

  const submitTodoListParams = () => {
    const newName = document.getElementById('inline-list-form-input');
    if (validInput(newName)) {
      const newList = new Todo(newName.value);
      updateTodoList(newList);
      persistToLocalStorage(myTodoList);
      renderTodoLists(todoName);
      setFocusOnElement(document.getElementById(`show-todo-items-${newList.id}`));
      resetForm();
    }
  };

  const submitTodoListItemParams = () => {
    const title = document.getElementById('title');
    const note = document.getElementById('note');
    const dueDate = document.getElementById('dueDate').value;
    if (validInput(title, note)) {
      const newItem = TodoItem(title.value, note.value, dueDate);
      const index = document.getElementById('todo-items-index').value;
      const todo = Todo.instanceOf(myTodoList[index]);
      todo.items = newItem;
      persistToLocalStorage(myTodoList);
      renderTodoLists();
      setFocusOnElement(document.getElementById(`show-todo-items-${todo.id}`));
      resetForm('todo-item');
    }
  };

  const editTodoItem = (objKey, itemKey) => {
    const editTitle = document.getElementById('edit-title');
    const editNote = document.getElementById('edit-note');
    const editDueDate = document.getElementById('edit-dueDate').value;
    if (validInput(editTitle, editNote)) {
      const obj = Todo.instanceOf(myTodoList[objKey]);
      obj.items[itemKey].todoItem.title = editTitle.value;
      obj.items[itemKey].todoItem.note = editNote.value;
      obj.items[itemKey].todoItem.dueDate = editDueDate;
      persistToLocalStorage(myTodoList);
      renderTodoLists();
      setFocusOnElement(document.getElementById(`show-todo-items-${obj.id}`));
      resetForm('edit-todo-item');
    }
  };

  const showInlineFormEditor = (_form, submitHandle, callback, closeHandle) => {
    _form.removeAttribute('class');
    submitHandle.addEventListener('click', () => {
      callback();
    });
    closeHandle.addEventListener('click', () => {
      _form.setAttribute('class', 'no-display');
    });
  };

  const preFillEditForm = (objKey, itemKey) => {
    const obj = Todo.instanceOf(myTodoList[objKey]);
    document.getElementById('edit-title').value = obj.items[itemKey].todoItem.title;
    document.getElementById('edit-note').value = obj.items[itemKey].todoItem.note;
    document.getElementById('edit-dueDate').value = obj.items[itemKey].todoItem.dueDate;
  };

  const handleEditTodoItem = (objKey, itemKey) => {
    document.getElementById('inline-edit-todo-item-form-section')
      .removeAttribute('class');

    preFillEditForm(objKey, itemKey);

    document.getElementById('save-todo-item-edit')
      .addEventListener('click', () => {
        editTodoItem(objKey, itemKey);
      }, { once: true });

    document.getElementById('close-edit-todolist-item-form-panel')
      .addEventListener('click', () => {
        document.getElementById('inline-edit-todo-item-form-section')
          .setAttribute('class', 'no-display');
      });
  };

  const handleAddNewTodo = (_handle, _form, _submitHandle, callback, closeHandle) => {
    _handle.addEventListener('click', () => {
      showInlineFormEditor(
        _form,
        _submitHandle,
        callback,
        closeHandle,
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
      document.getElementById('close-todolist-form-panel'),
    );

    handleAddNewTodo(
      document.getElementById('add-new-todo-item'),
      document.getElementById('inline-todo-item-form-section'),
      document.getElementById('add-todo-item'),
      submitTodoListItemParams,
      document.getElementById('close-todolist-item-form-panel'),
    );

    todoName = _todoListName;
    renderTodoLists(_todoListName);
  };

  return {
    initializeDOM,
    any,
  };
})();

export default DisplayTodo;
