'use strict';

angular.module('MeanApp')
  .value('redirectToUrl', { url: '/Test_Technique' })
  .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q) {
    return {
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
