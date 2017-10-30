'use strict';

/**
 * @ngdoc directive
 * @name coffeemizeApp.directive:final.page.directive
 * @description
 * # final.page.directive
 */
angular.module('coffeemizeApp')
  .directive('venueDirective', finalPageDirective);
finalPageDirective.$inject = ['$stateParams', '$http'];

function finalPageDirective($stateParams, $http) {
  return {
    templateUrl: 'views/venue-directive.html',
    restrict: 'E',
    scope: {
      coffeePlaceData: '='
    },
    controller: function ($scope) {
      $scope.$watch('coffeePlaceData', function (newValue, oldValue) {
        if (!angular.equals({}, newValue)) {

          // var vm = this;
          var coffeePlaceData = $scope.coffeePlaceData;
          $scope.map = {
            center: {latitude: 0, longitude: 0},
            zoom: 16,
            marker: {
              coords: {latitude: 0, longitude: 0}
            }
          };
          var city = $stateParams.city;
          var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
          var geocodePromise = $http({
            method: 'GET',
            url: geocodeUrl,
            params: {
              'address': city + ', ' + coffeePlaceData.name + ', ' + coffeePlaceData.address,
              'key': SETTINGS.GOOGLE_API_KEY
            }

          });

          geocodePromise = geocodePromise.then(function (response) {

            $scope.map.marker.coords = {

              latitude: response.data.results[0].geometry.location.lat,

              longitude: response.data.results[0].geometry.location.lng

            };
            // Move map to coffeshop coords
            $scope.map.center = {
              longitude: response.data.results[0].geometry.location.lng,
              latitude: response.data.results[0].geometry.location.lat
            };


          });


        }

      });

    }
  };
}
