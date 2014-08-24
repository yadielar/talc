'use strict';


// Declare app level module which depends on filters, and services
angular.module('talcApp', [
  'ngRoute',
  'talcApp.filters',
  'talcApp.services',
  'talcApp.directives',
  'talcApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editor', {templateUrl: 'partials/editor.html'});
  $routeProvider.when('/settings', {templateUrl: 'partials/settings.html'});
  $routeProvider.otherwise({redirectTo: '/editor'});
}]);
