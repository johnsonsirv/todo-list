[![Netlify Status](https://api.netlify.com/api/v1/badges/c9424649-60c1-4860-aeb2-a1dfede32144/deploy-status)](https://app.netlify.com/sites/ntachi-osa/deploys)

# JavaSript Todo List
This is a simple [Todo List App](https://todolist-spa-js.netlify.com/) that demonstrates knowledge of ``es6 classes``, ``modules`` and ``jest`` for test javascript driven development.
It contains basic features such as -
1. Create a Todo List (a group of related todo items)
2. Create a Todolist Item for each group of todo list created above
3. Mark a todo item as ``complete``, ``priority`` or even ``delete`` a todo item
4. Delete TodoList group with all its child items.
5. Use ``LocalStorage`` to persit the data accross different sessions.

This project was completed in line with standards provided by [Microverse](https://www.microverse.org/ "The Global School for Remote Software Developers!").

-- See Demo URL- [Todo List App](https://todolist-spa-js.netlify.com/)

## Basic Tests
Tests cover basic features to validate ``TodoList`` and ``TodoItem`` is created very.

## Technologies

- Javascript (ES6)
- JEST (TDD)
- Webpack 4

## Installation / Usage

> Clone the repository to your local machine

```sh
$ git clone https://github.com/johnsonsirv/todo-list.git
```

> Go to the directory
> Open the terminal

```sh
$ cd todo-list
$ npm install
$ npm run test
$ npm run build
```

## How to contribute
1. Fork it (https://github.com/johnsonsirv/todo-list/fork)
2. Create your feature branch (git checkout -b feature/[choose-a-name])
3. Commit your changes (git commit -m 'What this commit will fix/add')
4. Push to the branch (git push origin feature/[chosen name])
5. Create a new Pull Request
> You can also create [issues](https://github.com/johnsonsirv/todo-list/issues)


## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details.