'use strict';

angular.module('MeanApp', [
  'ngCookies',
  'ngResource',
  'ngAnimate',
  'toastr',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'tableSort',
  'checklist-model',
  'rzModule',
  'infinite-scroll',
  'darthwade.dwLoading',
  'angularMoment',
  'ui.select'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/Test_Technique');
    $locationProvider.html5Mode(true);
  })
