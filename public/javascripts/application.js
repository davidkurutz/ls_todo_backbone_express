var App = {
  templates: JST,
  newTodoModal: function(e) {
    e.preventDefault();
    var title = "Item " + this.current_id;
    new ModalView( { model: { placeholder: title, title: title, type:"new_form"} });
  },
  getCriteriaObj: function(e) {
    var obj = {},
        date = $(e.target).data().date;

    if (date) {
      obj.getDate = function() { return date; };
    }

    if ($(e.target).closest("ul").attr("id") === "completed" ) {
      obj.completed = true;
    }

    return obj;
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
