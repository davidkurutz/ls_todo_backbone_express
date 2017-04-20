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
    var todo_obj = $("form").serializeArray();

    $.ajax({
      url: "/todos",
      type: "POST",
      data: todo_obj,
      success: function(json) {
        App.Todos.add(json);
        $(".modal").toggle();
      }
    });
  },
  updateTodo: function(e) {
    e.preventDefault();

    var $target = $(e.target);
    var id = $target.closest("form").find(":hidden").val();
    var current_todo = App.Todos.get(id);
    var form_data = $target.serializeArray();
    var new_obj = {};

    form_data.forEach(function(obj) {
      new_obj[obj.name] = obj.value;
    });

    $.ajax({
      url: "/todos/" + id,
      type: "PUT",
      data: new_obj,
      success: function(json) {
        current_todo.set(json);
        $(".modal").toggle();
        current_todo.collection.trigger('change');
      }
    });
  },
  complete: function(e) {
    e.preventDefault();

    var $f = $(e.target).closest("form");
    var id;
    var $tr;

    if ($f.hasClass("new_form")) {
      alert("Item must be created and saved before marked complete");
    } else {
      id = $f.find(":hidden").val();
      $tr = $("#" + id);
      $(".update_form").trigger("submit");
      $tr.trigger("click");
    }
  },
  cancelItem: function(e) {
    var $modal = $(".modal");

    if ($modal[0] !== e.target) {
      return;
    }
    $modal.fadeOut(250);
  },
  render: function() {
    $(".modal").remove();
    this.$el.html(this.template(this.model));
    $("main").append(this.$el);
    $(".modal").fadeIn(500);
    $("#title").focus();
  },
  initialize: function() {
    this.render();
  }
});