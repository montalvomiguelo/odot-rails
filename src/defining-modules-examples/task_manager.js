/**
 * If our module has other dependencies we can specify
 * those dependencies using a dependency array as
 * first or second argument, depending on wether we are
 * using a module name or not.
 *
 */
define(['task', 'exports'], function(Task, exports) {
  'use strict';

  function createTask(name) {
    return new Task(name);
  }

  exports.createTask = createTask;

});
