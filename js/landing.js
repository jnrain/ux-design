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
          THUMBNAIL_HOVER_SWITCH_INTERVAL = 1500,
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
            $scope.nextImageTimer = $scope.thumbHoverTimer = null;

            $scope.switchToShot = (function(idx, refreshTimer) {
              if (idx == $scope.currEvent) {
                return;
              }

              $scope.cancelImageTimer().currEvent = idx;
              refreshTimer ? $scope.newImageTimer() : 0;
              return $scope;
            });

            $scope.bkgndImage = (function(url) {
              return {
                "background-image": "url(" + url + ")"
              };
            });

            $scope.nextShot = (function() {
              var evt = $scope.currEvent;

              $scope.switchToShot(evt == EVENTS.length - 1 ? 0 : evt + 1, true);
              return $scope;
            });

            $scope.newImageTimer = (function() {
              // console.log('newImageTimer');
              if ($scope.nextImageTimer === null) {
                $scope.nextImageTimer = $timeout($scope.nextShot, SWITCH_INTERVAL);
                // console.log('image timer created');
              }

              return $scope;
            });

            $scope.cancelImageTimer = (function() {
              // console.log('cancelImageTimer');
              if ($scope.nextImageTimer !== null) {
                $timeout.cancel($scope.nextImageTimer);
                $scope.nextImageTimer = null;
                // console.log('image timer cancelled');
              }

              return $scope;
            });

            $scope.newHoverTimer = (function(idx) {
              // console.log('newHoverTimer');
              $scope
              // 终止任何可能没结束的缩略图悬停定时器
              .cancelHoverTimer()
              // 终止可能还在跑的全局定时器
              .cancelImageTimer();

              $scope.thumbHoverTimer = $timeout(function() {
                $scope.switchToShot(idx, false);
                // 这里不要刷新这个悬停定时器，因为没必要
                // 鼠标指针离开缩略图元素时会触发全局定时器重新开始
              }, THUMBNAIL_HOVER_SWITCH_INTERVAL);

              return $scope;
            });

            $scope.cancelHoverTimer = (function(refreshTimer) {
              // console.log('cancelHoverTimer');
              if ($scope.thumbHoverTimer !== null) {
                $timeout.cancel($scope.thumbHoverTimer);
                $scope.thumbHoverTimer = null;
                // console.log('hover timer cancelled');
              }

              // 需要时重启全局定时器
              refreshTimer ? $scope.cancelImageTimer().newImageTimer() : 0;

              return $scope;
            });

            $scope.$watch('currEvent', function(to, from) {
              (to != from) ? $scope.prevEvent = from : 0;
            });

            $scope.newImageTimer();

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
