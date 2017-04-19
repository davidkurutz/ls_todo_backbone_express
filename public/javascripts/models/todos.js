var Todo = Backbone.Model.extend({
  getDate: function() {
    var dateObj = this.get('dateObj');

    if (dateObj) {
      var d = new Date(dateObj);
      return d.getMonth() + 1 + "/" + (d.getYear() -100);
    } else {
      return "No Due Date";
    }
  }
});