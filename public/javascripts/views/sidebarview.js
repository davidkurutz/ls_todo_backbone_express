var SideBarView = Backbone.View.extend({
  el: "nav",
  events: {
    'click li' : 'activate',
    'click ul' : 'showFiltered'
  },
  template: App.templates.sb,
  activate: function(e) {
    e.preventDefault();
    var $li = $(e.currentTarget);

    this.$(".active").removeClass("active");
    $li.addClass("active");
    $("header h1").html($li.html());
  },
  getCriteriaObj: function(e) {
    var obj = {};
    var $target = $(e.target);
    var date = $target.data().date;

    if (date) {
      obj.getDate = function() { return date; };
    }

    if ($target.closest("ul").attr("id") === "completed" ) {
      obj.completed = true;
    }

    return obj;
  },
  showFiltered: function(e) {
    var criteriaObj = this.getCriteriaObj(e);
    var filteredList = this.collection.filterBy(criteriaObj)
    App.trigger('filter', filteredList);
  },
  render: function() {
    var stats = this.collection.getStats();
    this.$el.html(this.template({
      all_list: stats.allStats,
      all_total: stats.allTotal, 
      comp_stats: stats.compStats, 
      comp_total: stats.compTotal 
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add remove change', this.render);
  }
});
