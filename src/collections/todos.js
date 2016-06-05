define(['backbone', 'backboneLocalStorage', 'models/todo' ], function (Backbone, Store, Todo) {
  'use strict';

  var TodosCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Todo,

    // Save all of the todo items under this example's namespace.
    localStorage: new Store('odot'),

    // Filter down the list of all todo items that are finished
    completed: function() {
      return this.filter(function(todo) {
        return todo.get('completed');
      });
    },

    // Filter down the list to only todo items that are still not finished
    remaining: function() {
      return this.without.apply(this, this.completed() )
    }

  });

  return new TodosCollection();

});
