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

    var $tr = $(e.target).closest("tr");
    var id = $tr.attr("id");
    var currentTodo = this.collection.get(id);

    currentTodo.set('type',"update_form");
    new ModalView( { model: currentTodo });
  },
  trash: function(e) {
    e.stopPropagation();

    var $tr = $(e.target).closest('tr');
    var id = +$tr.attr("id");

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
    var id = +$(e.currentTarget).attr("id");
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

