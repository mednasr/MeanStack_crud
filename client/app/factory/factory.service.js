
'use strict';

angular.module('MeanApp')
// Sample factory (dummy)
  .factory('factory', [function () {
    var somValue = 42;
    return {
      someMethod: function () {
        return somValue;
      }
    };
  }])

  .factory('Contact', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('/api/contacts/:id', null, {'update': { method:'PUT' } });
    return obj;
  }])
  .factory('Country', ['$resource', function($resource) {
    return $resource('/api/countries/:id', null, {'update': { method:'PUT' } });
  }]);

