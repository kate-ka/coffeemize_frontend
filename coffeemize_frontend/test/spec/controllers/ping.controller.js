'use strict';

describe('Controller: PingControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('coffeemizeApp'));

  var PingControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PingControllerCtrl = $controller('PingControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PingControllerCtrl.awesomeThings.length).toBe(3);
  });
});
