var express = require('express'),
    router = express.Router(),
    path = require('path'),
    Todos = require(path.resolve(path.dirname(__dirname), "local_modules/todos_module"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', { 
      todos: Todos.get(),
      current_id: Todos.current_id()
    });
  });
};
