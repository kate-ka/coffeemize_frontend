'use strict';

describe('Controller: FinalControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('coffeemizeApp'));

  var FinalControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinalControllerCtrl = $controller('FinalControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FinalControllerCtrl.awesomeThings.length).toBe(3);
  });
});
