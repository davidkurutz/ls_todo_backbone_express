var App = {
  templates: JST,
  newTodoModal: function(e) {
    e.preventDefault();
    var title = "Item " + this.current_id;
    new ModalView( { model: { placeholder: title, title: title, type:"new_form"} });
  },
  bind: function() {
    $("#add-new").on("click", this.newTodoModal.bind(this));
  },
  init: function() {
    this.TodoListView = new TodoListView( { collection: this.Todos });
    this.SideBarView = new SideBarView( { collection: this.Todos });
    this.bind();
  }
};
