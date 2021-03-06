'use strict';

describe('Directive: final.page.directive', function () {

  // load the directive's module
  beforeEach(module('coffeemizeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<final.page.directive></final.page.directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the final.page.directive directive');
  }));
});
