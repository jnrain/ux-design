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
          SWITCH_INTERVAL = 8000,
          mod = angular.module('jnrain2-signin', ['ngSanitize', 'ngDragDrop']),
          SigninForm = (function($scope) {
            console.log($scope);
          }),
          SigninBox = (function($scope) {
            $scope.nativeDragOptions = LOGINBOX_DRAG_CONFIG;
          }),
          EventScreen = (function($scope, $timeout) {
            $scope.events = EVENTS;
            $scope.prevEvent = $scope.currEvent = 1;
            $scope.switchToShot = (function(idx, resetTimer) {
              if (idx == $scope.currEvent) {
                return;
              }

              $scope.currEvent = idx;
              resetTimer ? $scope.cancelTimer() : 0;
              $scope.newTimer();
            });
            $scope.bkgndImage = (function(url) {
              return {
                "background-image": "url(" + url + ")"
              };
            });
            $scope.nextShot = (function() {
              var evt = $scope.currEvent;

              $scope.switchToShot(evt == EVENTS.length - 1 ? 0 : evt + 1, false);
            });
            $scope.newTimer = (function() {
              $scope.nextImageTimer = $timeout($scope.nextShot, SWITCH_INTERVAL);
            });
            $scope.cancelTimer = (function() {
              if ($scope.nextImageTimer === null) {
                return;
              }

              $timeout.cancel($scope.nextImageTimer);
              $scope.nextImageTimer = null;
            });

            $scope.$watch('currEvent', function(to, from) {
              (to != from) ? $scope.prevEvent = from : 0;
            });

            $scope.newTimer();

            console.log($scope);
          });

      SigninForm.$inject = ['$scope'];
      SigninBox.$inject = ['$scope'];
      EventScreen.$inject = ['$scope', '$timeout'];
      mod.controller('SigninForm', SigninForm)
        .controller('SigninBox', SigninBox)
        .controller('EventScreen', EventScreen);

      angular.bootstrap(angular.element('#screen'), ['jnrain2-signin']);
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
