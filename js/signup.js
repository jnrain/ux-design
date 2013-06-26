'use strict';


requirejs.config({
  baseUrl: '//static.jnrain.com/common/js',
  shim: {
    'garlic': ['jquery'],
    'parsley': ['jquery'],
    'angular': {
      exports: 'angular'
    }
  }
});


requirejs(
    ['jquery', 'angular'],
    function($, angular) {
      var mod = angular.module('jnrain2-reg', []);

      mod.controller('SignupForm', function($scope) {
        console.log($scope);
      });
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
