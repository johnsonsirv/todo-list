import { format } from 'date-fns';
import Todo from './todo';
import TodoItem from './todoItem';

const shopping = TodoItem('Chritsmas Shopping', 'Go to the mall', null);
const defaultList = new Todo('Default List');
defaultList.newItem = shopping;
