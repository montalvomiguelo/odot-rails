define(['jquery', 'underscore', 'backbone', 'text!templates/todo.html', 'common'], function($, _, Backbone, todoTemplate, Common) {
  'use strict';

  var TodoView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click .toggle': 'toggleCompleted',
      'dblclick label': 'edit',
      'blur .edit': 'close',
      'click .destroy' : 'clear',
      'keypress .edit': 'updateOnEnter',
      'keydown .edit': 'revertOnEscape'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    template: _.template(todoTemplate),

    render: function() {
      var todo = this.model.toJSON();
      this.$el.html(this.template(todo));

      this.$el.toggleClass('completed', this.model.get('completed'));

      this.toggleVisible();

      // Caching the input element within the instantiated template
      this.$input = this.$('.edit');

      return this;
    },

    clear: function() {
      this.model.destroy();
    },

    toggleCompleted: function() {
      this.model.toggle();
    },

    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // Close the "editing" mode, saving changes to the todo
    close: function() {
      var value = this.$input.val().trim();

      if (value) {
        this.model.save({
          title: value
        });
      } else {
        this.clear();
      }

      this.$el.removeClass('editing');

    },

    updateOnEnter: function(e) {
      if (e.keyCode === Common.ENTER_KEY) {
        this.close();
      }
    },

    revertOnEscape: function(e) {
      if (e.keyCode === Common.ESCAPE_KEY) {
        this.$el.removeClass('editing');
        this.$input.val(this.model.get('title'));
      }
    },

    toggleVisible: function() {
      this.$el.toggleClass('hidden',  this.isHidden());
    },

    isHidden: function() {
      var isCompleted = this.model.get('completed');
      return (// hidden cases only
        (!isCompleted && Common.TodoFilter === 'completed') ||
        (isCompleted && Common.TodoFilter === 'active')
      );
    }

  });

  return TodoView;

});
