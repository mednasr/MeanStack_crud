'use strict';

angular.module('MeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Test_Technique', {
        title: 'Add, Remove, Edit Contacts',
        url: '/Test_Technique',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });
