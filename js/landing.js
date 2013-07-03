'use strict';


requirejs(
    ['angular', 'angular-sanitize', 'angular-dragdrop'],
    function(angular) {
      var EVENTS = [
          {
            href: '//staging.jnrain.com/test-img/rain-light.jpg',
            desc: '第一张图',
            thumbHref: 'http://bbs.jnrain.com/face2/02.jpg',
            bgClass: 'bg-light'
          },
          {
            href: '//staging.jnrain.com/test-img/sky-dark.jpg',
            desc: '这里是进站图配套说明文字。<a href="#">这是一个链接</a>。',
            thumbHref: 'http://bbs.jnrain.com/face2/03.jpg',
            bgClass: 'bg-dark'
          }],
          LOGINBOX_DRAG_CONFIG = {
            handle: '#loginbox-titlebar',
            containment: '#screen',
            scroll: false
          },
          mod = angular.module('jnrain2-signin', ['ngSanitize', 'ngDragDrop']);

      mod.controller('SigninForm', function($scope) {
        console.log($scope);
      }).controller('SigninBox', function($scope) {
        $scope.nativeDragOptions = LOGINBOX_DRAG_CONFIG;
      }).controller('EventScreen', function($scope) {
        $scope.events = EVENTS;
        $scope.prevEvent = $scope.currEvent = 1;
        $scope.switchToShot = (function(idx) {
          if ($scope.currEvent == idx) {
            return;
          }

          $scope.prevEvent = $scope.currEvent;
          $scope.currEvent = idx;
        });
        $scope.bkgndImage = (function(url) {
          return { 'background-image': 'url(' + url + ')' };
        });

        console.log($scope);
      });

      angular.bootstrap(angular.element('#screen'), ['jnrain2-signin']);
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
