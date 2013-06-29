'use strict';


var require = {
  baseUrl: '//static.jnrain.com/common/js',
  shim: {
    'jquery.ui': ['jquery'],
    'jquery.backstretch': ['jquery'],
    'garlic': ['jquery'],
    'parsley': ['jquery'],
    'supersized.core': ['jquery'],
    'angular': {
      deps: ['jquery'],  // force use of real jQuery
      exports: 'angular'
    },
    'angular-sanitize': ['angular'],
    'angular-dragdrop': {
      deps: ['jquery.ui', 'angular'],
      exports: 'jqyoui'
    }
  }
};


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
