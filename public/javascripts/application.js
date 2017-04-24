var App = {
  templates: JST,
  el: "main",
  newTodoModal: function(e) {
    var title = "Item " + this.currentId;
    new ModalView( { model: new Todo({ placeholder: title, title: title, type:"new_form"}) });
  },
  init: function() {
    _.extend(this, Backbone.Events);

    this.TodoListView = new TodoListView( { collection: this.Todos });
    this.SideBarView = new SideBarView( { collection: this.Todos });
  
    this.on('newItem', this.newTodoModal.bind(this));
    this.on('addItem', this.Todos.add.bind(this.Todos));
    this.on('filter', this.TodoListView.renderList.bind(this.TodoListView));
  }
};


