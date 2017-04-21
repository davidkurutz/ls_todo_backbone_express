var Todos = Backbone.Collection.extend({
  model: Todo,
  completed: function() {
    return this.where({ "completed": true });
  },
  getDueDateStats: function(models) {
    var dds = this.dueDates(models);
    var count;

    return dds.map((function(dd) {
      count = this.totalByDate(dd, models);
      return { date: dd, count: count };
    }).bind(this));
  },
  dueDates: function(models) {
    var dds;
    
    dds = _.sortBy(models, function(a) {
      return new Date(a.get('dateObj')).valueOf();
    }).map(function(i) { 
      return i.getDate(); 
    });

    return _.uniq(dds, true);
  },
  getStats: function() {
    var models = this.models;
    var completed = this.completed();

    return {
      'allStats' : this.getDueDateStats(models),
      'allTotal' : models.length,
      'compStats' : this.getDueDateStats(completed),
      'compTotal' : completed.length
    };
  },
  totalByDate: function(date, collection) {
    var sd = this.sameDate(date);
    return collection.filter(function(todo) {
      return sd(todo);
    }).length;
  },
  sameDate: function(date) {
    return function(todo) {
      return todo.getDate() === date;
    };
  }
});