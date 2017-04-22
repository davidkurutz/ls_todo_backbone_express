var App = {
  templates: JST,
  el: "main",
  newTodoModal: function(e) {
    e.preventDefault();
    var title = "Item " + this.currentId;
    new ModalView( { model: { placeholder: title, title: title, type:"new_form"} });
  },
  init: function() {
    _.extend(this, Backbone.Events);
    this.TodoListView = new TodoListView( { collection: this.Todos });
    this.SideBarView = new SideBarView( { collection: this.Todos });
    $("#add-new").on("click", this.newTodoModal.bind(this));
    this.on('addItem', this.Todos.add.bind(this.Todos));
    this.on('filter', this.TodoListView.renderList.bind(this.TodoListView));
    $("#all-todos").trigger('click');
  }
};


