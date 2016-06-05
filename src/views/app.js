define([
  'jquery',
  'underscore',
  'backbone',
  'models/todo',
  'collections/todos',
  'views/todo',
  'text!templates/stats.html',
  'common'
], function ($, _, Backbone, Todo, TodosCollection, TodoView, statsTemplate, Common) {
  'use strict';

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    el: '#todoapp',

    events: {
      'keypress #new-todo':	'createOnEnter',
      'click #toggle-all': 'toggleAllComplete',
      'click #clear-completed': 'clearCompleted'
    },

    statsTemplate: _.template(statsTemplate),

    initialize: function() {
      this.$allCheckbox = this.$('#toggle-all');
      this.$input = this.$('#new-todo');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(TodosCollection, 'add', this.onAdd);
      this.listenTo(TodosCollection, 'all', this.render);
      this.listenTo(TodosCollection, 'reset', this.onReset);
      this.listenTo(TodosCollection, 'change:completed', this.filterOne);
      this.listenTo(TodosCollection, 'filter', this.filterAll);

      TodosCollection.fetch();
    },

    render: function() {
      var todoItemsCompleted = TodosCollection.completed().length;
      var todoItemsRemaining = TodosCollection.remaining().length;

      if (TodosCollection.length) {
        this.$main.show();
        this.$footer.show();

        this.$footer.html(this.statsTemplate({
          completed: todoItemsCompleted,
          remaining: todoItemsRemaining
        }));

        this.$('#filters li a')
          .removeClass('selected')
          .filter('[href="#/' + Common.TodoFilter + '"]')
          .addClass('selected');

      } else {
        this.$main.hide();
        this.$footer.hide();
      }

      this.$allCheckbox.prop('checked', !todoItemsRemaining);

    },

    newTodo: function() {
      return new Todo({
        title: this.$input.val(),
        completed: false
      });
    },

    createOnEnter: function (e) {
      if (e.keyCode === Common.ENTER_KEY && this.$input.val() != '') {
        TodosCollection.create(this.newTodo());
        this.$input.val('');
      }
    },

    onAdd: function(model) {
      var view = new TodoView({
        model: model
      })
      view.render();
      view.$el.appendTo('#todo-list');
    },

    toggleAllComplete: function() {
      var completed = this.$allCheckbox.prop('checked');

      TodosCollection.each(function(todo) {
        todo.save({
          completed: completed
        });
      });
    },

    clearCompleted: function() {
      // Call the method 'destroy' on each todo Item
      _.invoke(TodosCollection.completed(), 'destroy');
    },

    onReset: function() {
      console.warn('onReset');
    },

    filterOne: function(todo) {
      todo.trigger('visible');
    },

    filterAll: function() {
      TodosCollection.each(this.filterOne);
    }

  });

  return AppView;

});
