'use strict';

angular.module('MeanApp')
  .controller('NavbarCtrl', ['$scope', '$rootScope', '$location', '$modal', 'Contact', 'SortOptions', '$q', '$state', function ($scope, $rootScope, $location, $modal, Contact, SortOptions, $q, $state) {
    $scope.hideSubMenu = function () {
    }

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $rootScope.Contacts = Contact.query({active: true});
    $rootScope.sortOptions = SortOptions.server;
    $scope.isCollapsed = true;
    $scope.isCollapsed1 = true;

  }]);
