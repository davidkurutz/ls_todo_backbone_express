var ModalView = Backbone.View.extend({
  template: App.templates.modal_form,
  attributes: {
    "class" : "modal"
  },
  events: {
    "click" : "cancelItem",
    "click .mark_completed" : 'complete',
    "submit .new_form" : "newTodo",
    "submit .update_form" : "updateTodo"
  },
  newTodo: function(e) {
    e.preventDefault();
    var todoObj = this.$("form").serializeArray();

    $.ajax({
      context: this,
      url: "/todos",
      type: "POST",
      data: todoObj,
      success: function(json) {
        App.trigger('addItem', json);
        this.$el.toggle();
      }
    });
  },
  updateTodo: function(e) {
    e.preventDefault();

    var $target = $(e.target);
    var id = this.$("form").find(":hidden").val();
    var currentTodo = App.Todos.get(id);
    var formData = $target.serializeArray();
    var newObj = {};
    var completed = currentTodo.get('completed');

    formData.forEach(function(obj) {
      newObj[obj.name] = obj.value;
    });

    newObj.completed = completed

    $.ajax({
      context: this,
      url: "/todos/" + id,
      type: "PUT",
      data: newObj,
      success: function(json) {
        currentTodo.set(json);
        this.$el.toggle();
        currentTodo.collection.trigger('change');
      }
    });
  },
  complete: function(e) {
    e.preventDefault();

    var $f = this.$("form");
    var id;
    var $tr;

    if ($f.hasClass("new_form")) {
      alert("Item must be created and saved before marked complete");
    } else {
      id = $f.find(":hidden").val();
      $tr = $("#" + id);
      this.$(".update_form").trigger("submit");
      $tr.trigger("click");
    }
  },
  cancelItem: function(e) {
    if (this.$el[0] !== e.target) {
      return;
    }
    this.$el.fadeOut(250, (function() {
      this.$el.remove();
    }).bind(this));
  },
  render: function() {
    this.$el.html(this.template(this.model));
    $("main").append(this.$el);
    this.$el.fadeIn(500);
    this.$("#title").focus();
  },
  initialize: function() {
    this.render();
  }
});