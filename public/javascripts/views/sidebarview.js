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
  showFiltered: function(e) {
    var criteria_obj = App.getCriteriaObj(e);
    var self = this;
    var filtered_list;

    filtered_list = this.collection.models.filter(function(item) {
      return Object.keys(criteria_obj).every(function(key) {
        if (typeof criteria_obj[key] === "function") {
          return item[key]() === criteria_obj[key]();
        } else {
          return item.get(key) === criteria_obj[key];
        }
      });
    });

    App.TodoListView.renderList(filtered_list);
  },
  render: function() {
    var stats = this.collection.getStats();
    this.$el.html(this.template({
      all_list: stats.all_stats,
      all_total: stats.all_total, 
      comp_stats: stats.comp_stats, 
      comp_total: stats.comp_total 
    }));
    $("#all-todos").trigger('click');
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add remove change', this.render);
  }
});
