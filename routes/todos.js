var express = require('express'),
    router = express.Router(),
    path = require('path'),
    _ = require('underscore'),
    Todos = require(path.resolve(path.dirname(__dirname), "local_modules/todos_module"));

module.exports = function(router) {
  router.get("/todos", function(req, res, next) {
    res.json(Todos.get());
  });

  router.delete('/todos/:id', function(req, res, next) {
    var id = +req.params.id
    Todos.remove(id);
    res.status(200).end();
  });

  router.post("/todos", function(req, res, next) {
    var todo = req.body,
        todo_obj;
  
    todo.completed = todo.completed === "true";
    todo_obj = Todos.add(todo);
    res.json(todo_obj);
  })

  router.put("/todos/:id", function(req, res, next) {
    var data = req.body,
        id = +req.params.id,
        todos = Todos.get(),
        todo = _.findWhere(todos, { id: id })

    data.completed = data.completed === "true";
    _.extend(todo, data);

    Todos.setDate(todo);
    Todos.set(todos);
    res.json(todo).end();
  })

}

