var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var Todos = require(path.resolve(path.dirname(__dirname), "local_modules/todos_module"));

module.exports = function(router) {
  router.delete('/todos/:id', function(req, res, next) {
    var id = +req.params.id;
    Todos.remove(id);
    res.status(200).end();
  });

  router.post("/todos", function(req, res, next) {
    var todo = req.body;
    var todo_obj;
  
    todo.completed = todo.completed === "true";
    todo_obj = Todos.add(todo);
    res.json(todo_obj);
  });

  router.put("/todos/:id", function(req, res, next) {
    var data = req.body;
    var id = +req.params.id;
    var todos = Todos.get();
    var todo = _.findWhere(todos, { id: id });
    console.log(typeof id)

    data.completed = data.completed === "true";
    _.extend(todo, data);

    Todos.setDate(todo);
    Todos.set(todos);
    res.json(todo).end();
  });
};

