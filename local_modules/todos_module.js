var path = require('path');
var fs = require('fs');
var dataPath = path.resolve(path.dirname(__dirname), "data/todos.json");
var _ = require('underscore');

module.exports = {
  getJSON: function() {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  },
  get: function() {
    return this.getJSON().todos;
  },
  write: function(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data), "utf8");
  },
  current_id: function() {
    return this.getJSON().current_id;
  },
  add: function(todo) {
    var todos = this.get();
    var current_id = this.current_id();
    
    todo.id = current_id;
    this.setDate(todo);

    todos.push(todo);
    this.set(todos, current_id + 1);
    return todo;
  },
  remove: function(id) {
    var todos = this.get();
    var current_id = this.current_id();

    todos = _.reject(todos, function(t) {
      return t.id === id;
    });

    this.set(todos, current_id);
  },
  setDate: function(todo) {
    var year = todo.year;
    var month = todo.month;

    if (month && year) {
      todo.dateObj =  new Date(year, month - 1);
    }
    
    return todo;
  },
  set: function(todos, id) {
    if (!id) {
      id = this.current_id();
    }
    this.write({
      current_id: id,
      todos: todos
    });
  }
};
