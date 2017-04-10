'use strict';

(() => {
  angular.module('app', ['ngRoute', 'ngMaterialDatePicker'])
  .config(['$routeProvider', '$locationProvider',($routeProvider, $locationProvider) => {
    $routeProvider
    .when('/dashboard', {
      template: '<dashboard style="height:100%;"></dashboard>'
    })
    .otherwise({
      template: '<dashboard style="height:100%;"></dashboard>'
      //redirectTo: '/dashboard'
    });

    $locationProvider.html5Mode(true);
  }]);
})();
