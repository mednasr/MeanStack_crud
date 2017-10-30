'use strict';

describe('Controller: ContactCtrl', function () {

  beforeEach(module('MeanApp'));

  var ContactCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactCtrl = $controller('ContactCtrl', {
      $scope: scope
    });
  }));

});
