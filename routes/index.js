var express = require('express');
var router = express.Router();
var path = require('path');
var Todos = require(path.resolve(path.dirname(__dirname), "local_modules/todos_module"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', { 
      todos: Todos.get(),
      current_id: Todos.currentId()
    });
  });
};
