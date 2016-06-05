/**
 * We can pass a callback to define method and do
 * any setup work inside the callback before
 * returning a value.
 *
 * If first argument is a string, it will be the name of
 * our module, but require will handle it for us.
 *
 */

define(function() {
  'use strict';

  function Task(name) {
    this.completed = false;
    this.name = name;
  }
  Task.prototype = {};
  Task.prototype.constructor = Task;

  return Task;

});
