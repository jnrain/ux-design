'use strict';


requirejs(
    ['jquery', 'angular'],
    function($, angular) {
      var mod = angular.module('jnrain2-reg', []);

      mod.controller('SignupForm', function($scope) {
        console.log($scope);
        $scope.debug = true;

        $scope.$watch('personRole', function(to, from) {
          $scope.isStudent = to == 'stud' || to == 'alumni';
          $scope.isStaff = to == 'staff';
          $scope.isInCampus = to == 'stud';
        });
        $scope.$watch('personStudRole', function(to, from) {
          $scope.isUgrad = to == 'ugrad';
          $scope.isGrad = to == 'grad';
        });
      });

      angular.bootstrap($('#app-jnrain2-reg'), ['jnrain2-reg']);
    });


// vim:set ai et ts=2 sw=2 sts=2 fenc=utf-8:
