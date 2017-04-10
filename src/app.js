'use strict';

(() => {
  angular.module('app', ['ngRoute', 'ngMaterialDatePicker'])
  .config(['$routeProvider', '$locationProvider',($routeProvider, $locationProvider) => {
    $routeProvider
    .when('/dashboard', {
      template: '<dashboard></dashboard>'
    })
    .otherwise({
      template: '<dashboard></dashboard>'
      //redirectTo: '/dashboard'
    });

    $locationProvider.html5Mode(true);
  }]);
})();
