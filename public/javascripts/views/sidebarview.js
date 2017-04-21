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

    $li.closest("nav").find(".active").removeClass("active");
    $li.addClass("active");
    $("header h1").html($li.html());
  },
  getCriteriaObj: function(e) {
    var obj = {},
        date = $(e.target).data().date;

    if (date) {
      obj.getDate = function() { return date; };
    }

    if ($(e.target).closest("ul").attr("id") === "completed" ) {
      obj.completed = true;
    }

    return obj;
  },
  showFiltered: function(e) {
    var criteria_obj = this.getCriteriaObj(e);
    var self = this;
    var filteredList;

    filteredList = this.collection.models.filter(function(item) {
      return Object.keys(criteria_obj).every(function(key) {
        if (typeof criteria_obj[key] === "function") {
          return item[key]() === criteria_obj[key]();
        } else {
          return item.get(key) === criteria_obj[key];
        }
      });
    });

    App.TodoListView.renderList(filteredList);
  },
  render: function() {
    var stats = this.collection.getStats();
    this.$el.html(this.template({
      all_list: stats.allStats,
      all_total: stats.allTotal, 
      comp_stats: stats.compStats, 
      comp_total: stats.compTotal 
    }));
    $("#all-todos").trigger('click');
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add remove change', this.render);
  }
});
