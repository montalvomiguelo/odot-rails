/**
 * Load our modules
 *
 */
require(['backbone', 'routers/router', 'views/app'], function(Backbone, OdotRouter, AppView) {
  'use strict';

  new OdotRouter();
  Backbone.history.start();
  new AppView();

});
define();
