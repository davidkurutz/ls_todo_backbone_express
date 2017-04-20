var Todos = Backbone.Collection.extend({
  model: Todo,
  completed: function() {
    return this.where({ "completed": true });
  },
  getDueDateStats: function(models) {
    var self = this,
        dds = this.dueDates(models),
        count;

    return dds.map(function(dd) {
      count = self.totalByDate(dd, models);
      return { date: dd, count: count };
    });
  },
  dueDates: function(models) {
    var dds;
    var unique_array;
    
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
      'all_stats' : this.getDueDateStats(models),
      'all_total' : models.length,
      'comp_stats' : this.getDueDateStats(completed),
      'comp_total' : completed.length
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