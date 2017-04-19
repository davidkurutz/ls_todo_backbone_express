var TodoListView = Backbone.View.extend({
  el: '#todos',
  template: App.templates.main_list,
  events: {
    'click tr': 'toggleComplete',
    'click td.trash': 'trash',
    'click a' : 'editTodo' 
  },
  editTodo: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $tr = $(e.target).closest("tr"),
        id = $tr.attr("id"),
        current_todo = this.collection.get(id);

    current_todo.set('type',"update_form");
    if ($tr.hasClass("completed")) {
      current_todo.set('completed', true);
    }
    new ModalView( { model: current_todo.toJSON() });
  },
  trash: function(e) {
    e.stopPropagation();

    var $tr = $(e.target).closest('tr'),
        id = +$tr.attr("id"),
        collection = this.collection;

    $.ajax({
      url: "/todos/" + id,
      type: "DELETE",
      success: function() {
        collection.remove(id);
      }
    })

  },
  toggleComplete: function(e) {
    e.preventDefault();
    var id = +$(e.currentTarget).attr("id"),
        current_todo = this.collection.get(id),
        c = !current_todo.get('completed');

    $.ajax({
      url: "/todos/" + id,
      type: 'PUT',
      data: {
        "completed" : c
      },
      success: function(json) {
        current_todo.set(json);
      }
    })
  },
  renderList: function(list) {
    var sorted = _.sortBy(_.sortBy(list, function(o) {
      return o.get('dateObj');
    }), function(z) {
      return z.attributes.completed;
    });

    this.$el.html(this.template({ todo_item: sorted }));
  },
  render: function() {
    this.renderList(this.collection.models);
  },
  initialize: function() {
    this.listenTo(this.collection, 'add remove change', this.render);
  }
});

