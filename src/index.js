/* eslint-disable no-undef */
import { format, addYears } from 'date-fns';
import Todo from './todo';
import TodoItem from './todoItem';
import DisplayTodo from './display';
import './css/style.css';

const todoName = 'myList';
const any = (_name) => {
  if (localStorage.getItem(_name) === null) return false;
  return true;
};

const persistToLocalStorage = (_data, _todoName = todoName) => {
  localStorage.setItem(_todoName, JSON.stringify(_data));
};

const loadDefaultList = (_todoListName) => {
  const shopping = TodoItem('Chritsmas Shopping', 'Go to the mall', '2019-12-24');
  const swimming = TodoItem('Regular Swim', 'Go to the pool', '2019-12-24');
  const defaultList = new Todo('Default List');
  defaultList.items = shopping;
  defaultList.items = swimming;
  if (!any(_todoListName)) {
    persistToLocalStorage([defaultList]);
  }
};

loadDefaultList(todoName);
DisplayTodo.initializeDOM(todoName);
