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
  getUpdateObj: function(data, completed) {
    var newObj = { completed: completed };
    
    data.forEach(function(obj) {
      newObj[obj.name] = obj.value;
    });

    return newObj;
  },
  updateTodo: function(e) {
    e.preventDefault();

    var currentTodo = this.model;
    var id = currentTodo.get("id");
    var completed = currentTodo.get('completed');
    var formData = this.$("form").serializeArray();
    var newObj = this.getUpdateObj(formData, completed);

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
      id = this.model.get("id");
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
    this.$el.html(this.template(this.model.toJSON()));
    $("main").append(this.$el);
    this.$el.fadeIn(500);
    this.$("#title").focus();
  },
  initialize: function() {
    this.render();
  }
});