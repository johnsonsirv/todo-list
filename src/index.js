import { format } from 'date-fns';
import Todo from './todo';
import TodoItem from './todoItem';
import DisplayTodo from './display';
import './css/style.css';

const shopping = TodoItem('Chritsmas Shopping', 'Go to the mall', null);
const swimming = TodoItem('Regular Swim', 'Go to the pool', null);
const defaultList = new Todo('Default List');
defaultList.items = shopping;
defaultList.items = swimming;

DisplayTodo.initializeDOM(defaultList);
