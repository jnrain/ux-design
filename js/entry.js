'use strict';


requirejs(
    ['angular', 'angular-dragdrop'],
    function(angular) {
      var IMGPATHS = [
          // '//staging.jnrain.com/test-img/rain-light.jpg'
          '//staging.jnrain.com/test-img/sky-dark.jpg'
          // '//bbs.jnrain.com/face2/1.jpg',
          // '//bbs.jnrain.com/face2/2.jpg',
          // '//bbs.jnrain.com/face2/3.jpg',
          // '//bbs.jnrain.com/face2/4.jpg'
          ],
          BS_CONFIG = {
            duration: 5000,
            fade: 500
          },
          LOGINBOX_DRAG_CONFIG = {
            handle: '#loginbox-titlebar',
            containment: '#screen',
            scroll: false
          },
          mod = angular.module('jnrain2-signin', ['ngDragDrop']);

      mod.controller('SigninForm', function($scope) {
        console.log($scope);
      }).controller('SigninBox', function($scope) {
        $scope.nativeDragOptions = LOGINBOX_DRAG_CONFIG;
      });

      angular.bootstrap(angular.element('#screen'), ['jnrain2-signin']);
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
