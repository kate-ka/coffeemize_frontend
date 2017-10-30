'use strict';

describe('Directive: final.Page', function () {

  // load the directive's module
  beforeEach(module('coffeemizeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<final.-page></final.-page>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the final.Page directive');
  }));
});
