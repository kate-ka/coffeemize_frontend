'use strict';

describe('Directive: venueDirective', function () {

  // load the directive's module
  beforeEach(module('coffeemizeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<venue-directive></venue-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the venueDirective directive');
  }));
});
