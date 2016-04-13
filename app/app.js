'use strict';

// Declare app level module which depends on views, and components
angular.module('b2vGmap1', [
  'ngRoute',
  'b2vGmap1.view1',
  'b2vGmap1.view2',
  'b2vGmap1.version',
  'uiGmapgoogle-maps'
]).
config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCTKkY9VJA6nC0O7wsvCYxj3GpwOStxb4g',
    v: '3.23',
    libraries: 'places'
  });

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
