var TodoListView = Backbone.View.extend({
  el: 'main',
  template: App.templates.main_list,
  events: {
    'click tr': 'toggleComplete',
    'click td.trash': 'trash',
    'click .edit' : 'editTodo',
    'click #add-new' :'newTodo'
  },
  getId: function(e) {
    return +$(e.target).closest('tr').attr("id");
  },
  newTodo: function(e) {
    e.preventDefault();
    App.trigger('newItem');
  },
  editTodo: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var id = this.getId(e);
    var currentTodo = this.collection.get(id);

    currentTodo.set('type',"update_form");
    new ModalView( { model: currentTodo });
  },
  trash: function(e) {
    e.stopPropagation();

    var id = this.getId(e);

    $.ajax({
      context: this,
      url: "/todos/" + id,
      type: "DELETE",
      success: function() {
        this.collection.remove(id);
      }
    });
  },
  toggleComplete: function(e) {
    e.preventDefault();
    var id = this.getId(e);
    var currentTodo = this.collection.get(id);
    var c = !currentTodo.get('completed');

    $.ajax({
      url: "/todos/" + id,
      type: 'PUT',
      data: {
        "completed" : c
      },
      success: function(json) {
        currentTodo.set(json);
      }
    });
  },
  renderList: function(list, header) {
    var sorted = _.sortBy(_.sortBy(list, function(o) {
      return o.get('dateObj');
    }), function(z) {
      return z.attributes.completed;
    });

    this.$el.html(this.template({ todo_items: sorted, header: header}));
  },
  render: function() {
    this.renderList(this.collection.models, 'All Todos');
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add remove change', this.render);
  }
});

