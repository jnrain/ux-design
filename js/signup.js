'use strict';


requirejs(
    ['jquery', 'angular', 'angular-resource', 'angular-ui-select2'],
    function($, angular) {
      var mod = angular.module('jnrain2-reg', ['ngResource', 'ui.select2']),
          UNIV_ID = 'jnu';

      mod.controller('SignupForm', function($scope, $resource) {
        var SchoolInfo = $resource('univ/:univId/schools.json');

        console.log($scope);
        $scope.debug = true;

        $scope.schoolInfo = SchoolInfo.get({ univId: UNIV_ID });;

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
