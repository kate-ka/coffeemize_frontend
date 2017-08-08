(function() {

  'use strict';
angular.module('coffeemizeApp')
  .filter('trustedFilter', trustedFilter);
trustedFilter.$inject = ['$sce'];

function trustedFilter($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  }
})();
