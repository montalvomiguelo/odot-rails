require.config({
  baseUrl: 'src',
  // Specify dependencies to load as soon as require() is defined
  deps: ['main'],
  // Enforces the rule that every module should use the define method
  enforceDefine: true,
  // Set a short aliases for module paths
  paths: {
    jquery: '../external/jquery-2.2.3',
    underscore: '../external/underscore',
    backbone: '../external/backbone',
    backboneLocalStorage: '../external/backbone.localStorage',
    notie: '../external/notie',
    text: '../external/text'
  },
  // Load non AMD scripts as if they are modules
  shim: {
    notie: {
      // Tells requireJS the name of global that the framework sets and pass it into our modules to use it
      exports: 'notie'
    }
  }

});
define();
