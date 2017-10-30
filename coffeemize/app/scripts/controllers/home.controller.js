(function() {

  'use strict';

  angular
    .module('coffeemizeApp')
    .controller('homeController', homeController);

    homeController.$inject = ['$rootScope', '$scope', 'authService', 'authManager', '$state'];

    function homeController($rootScope, $scope, authService, authManager, $state) {
      $scope.regex = /^\p{L}*$/;

      // Set the user profile when the page is refreshed
      $scope.search_form = {city: 'Lviv'};
      // Listen for the user profile being set when the user
      // logs in and update it in the view
      $scope.search_coffee_places = function (isValid) {
         if (isValid)
         { $state.go('coffee', {'city': $scope.search_form.city})
      }
    }
    }


})();
