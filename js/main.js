'use strict';


requirejs(
    ['angular', 'angular-scrollevents', 'waypoints', 'stellar.directives', 'angular-smoothscroll'],
    function(angular) {
      var mod = angular.module(
            'jnrain2-main',
            ['ngScrollEvent', 'stellar.directives', 'angularSmoothscroll']
          ),
          MainPage = (function($scope, $window, $timeout, stellar) {
            $scope.areas = [
              {
                name: '广场',
                bgcolor: '#f8fcf3',
                navcolor: '#8eff00'
              },
              {
                name: '文艺',
                bgcolor: '#d9ffe1',
                navcolor: '#00cb2e'
              },
              {
                name: '感性',
                bgcolor: '#eeccff',
                navcolor: '#a900ff'
              },
              {
                name: '技术',
                bgcolor: '#d9f9ff',
                navcolor: '#00d5ff'
              },
              {
                name: 'ACG',
                bgcolor: '#dddddd',
                navcolor: '#000000'
              },
              {
                name: '体育',
                bgcolor: '#ffbf80',
                navcolor: '#ff8000'
              }
            ];
            $scope.activeArea = 0;
            $scope.topNavHidden = false;

            // 夜间模式
            // TODO: 根据当前时间启用/关闭
            $scope.isNightModeEnabled = false;
            $scope.getNightModeToggleClass = (function() {
              var enabled = $scope.isNightModeEnabled;
              return {
                'toggle-on': enabled,
                'toggle-off': !enabled
              };
            });
            $scope.toggleNightMode = (function() {
              $scope.isNightModeEnabled = !$scope.isNightModeEnabled;
            });

            // 大区个别样式控制
            $scope.getNavStyle = (function(area) {
              return {
                'border-bottom-color': area.navcolor
              };
            });
            $scope.getAreaStyle = (function(area) {
              return {
                'background-color': area.bgcolor
              };
            });
            $scope.getAreaNameStyle = (function(area) {
              var hexToRgb = function(hex) {
                // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    result;

                hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                  return r + r + g + g + b + b;
                });

                result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16)
                } : null;
              };

              var navColorRgb = hexToRgb(area.navcolor);

              return {
                'background-color': (
                    'rgba('
                      + navColorRgb.r
                      + ','
                      + navColorRgb.g
                      + ','
                      + navColorRgb.b
                      + ','
                      + '0.2)'
                    )
              };
            });

            $scope.updateActiveAreaFactory = (function(idx) {
              // console.log('updateActiveAreaFactory: ' + idx);

              // 返回的是一个 handler
              return (function() {
                // console.log('updateActiveArea: ' + idx);
                $scope.activeArea = idx;
              });
            });

            $scope.updateScroll = (function() {
              var prevTop = 0;

              return (function(event, isEndEvent) {
                // var left = event.target.scrollLeft,
                //    top = event.target.scrollTop;
                var left = $window.pageXOffset,
                    top = $window.pageYOffset;

                // 两种情况的判断方式完全一样, 省掉 if 块
                // (原 if(!isEndEvent) 块)
                // 刚开始滚动, 检查是往上还是往下
                // 往下滚的话就把顶部导航缩起来
                // (原 else 块)
                // 检查滚动结束时最后的位置是比前一次高了还是低了
                // 如果高了 (向上滚动了) 就把顶部导航位置恢复
                // 在不能响应所有 scroll 事件的性能考虑下至少也做成这样
                // 基本上还是可以接受的
                $scope.topNavHidden = (top > prevTop);

                prevTop = top;
              });
            })();

            $timeout(function() {
              // Stellar!
              // Stellar.js 的初始化直接写在 scope 里是绝对不行的, 那个时候
              // ngRepeat 之类的东西还没链接完成...
              // 这里用 (不延时的) $timeout 包一层
              // https://github.com/angular/angular.js/wiki/Understanding-Directives
              stellar.window();
            }, 0);

            console.log($scope);
          });

      mod.directive('jqWaypoint', ['$parse', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            var fn = scope.$eval(attrs.jqWaypoint),
                ctx = attrs.jqWaypointCtx;

            // console.log(element);
            // console.log('attrs: ' + attrs);
            // console.log('attrs.jqWaypoint: ' + attrs.jqWaypoint);
            // console.log('fn: ' + fn);
            if (typeof ctx !== 'undefined') {
              element.waypoint(fn, { context: ctx });
            } else {
              element.waypoint(fn);
            }
          }
        };
      }]);
      mod.controller('MainPage', ['$scope', '$window', '$timeout', 'stellar', MainPage]);

      angular.bootstrap(angular.element('#screen'), ['jnrain2-main']);
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
