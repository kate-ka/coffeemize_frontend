'use strict';

describe('Controller: CoffeeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('coffeemizeApp'));

  var CoffeeControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoffeeControllerCtrl = $controller('CoffeeControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CoffeeControllerCtrl.awesomeThings.length).toBe(3);
  });
});
