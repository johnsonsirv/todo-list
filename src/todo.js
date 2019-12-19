/* eslint-disable no-underscore-dangle */
const shortid = require('shortid');

class Todo {
  constructor(name) {
    this._id = shortid.generate();
    this._name = name;
    this._items = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get items() {
    return this._items;
  }

  set newItem(item = {}) {
    this._items.unshift(item);
  }

  removeItem(index) {
    this._items.splice(index, index);
  }
}

export default Todo;
