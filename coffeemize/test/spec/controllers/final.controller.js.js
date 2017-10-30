'use strict';

describe('Controller: FinalControllerJsCtrl', function () {

  // load the controller's module
  beforeEach(module('coffeemizeApp'));

  var FinalControllerJsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinalControllerJsCtrl = $controller('FinalControllerJsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FinalControllerJsCtrl.awesomeThings.length).toBe(3);
  });
});
