define(function() {
  'use strict';

  function List(listId) {
    this.task = [];
    this.id = listId;
  }
  List.prototype = {};
  List.prototype.constructor = List;

  return List;

});
