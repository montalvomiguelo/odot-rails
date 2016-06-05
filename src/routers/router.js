define(['backbone', 'collections/todos', 'common'], function(Backbone, TodosCollection ,Common) {
  'use strict';

  var OdotRouter = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function(param) {
      Common.TodoFilter = param || '';
      TodosCollection.trigger('filter');
    },

  });

  return OdotRouter;

});
