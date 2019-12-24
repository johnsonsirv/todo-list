/* eslint-disable no-underscore-dangle */
const shortid = require('shortid');

class Todo {
  constructor(value) {
    this._id = shortid.generate();
    this._name = value;
    this._items = [];
  }

  get id() {
    return this._id;
  }

  set id(data) {
    this._id = data;
  }

  get name() {
    return this._name;
  }

  set name(data) {
    this._name = data;
  }

  get items() {
    return this._items;
  }

  set items(item = {}) {
    this._items.unshift(item);
  }

  removeItem(index) {
    this._items.splice(index, 1);
  }

  static instanceOf(obj) {
    return Object.assign(Object.create(Todo.prototype), obj);
  }
}

export default Todo;
