(function () {

  'use strict';


  angular.module('coffeemizeApp')
    .controller('coffeeController', coffeeController);

  coffeeController.$inject = ['$http', '$stateParams'];

  function coffeeController($http, $stateParams) {
    var vm = this;
    vm.map = {
      center: { latitude: 0, longitude: 0 },
      zoom: 16,
      marker: {
        coords: {latitude: 0, longitude: 0}
      }
    };

    vm.coffeePlaceData = {};


    function getRandomUserPlace() {

      vm.data = {
        never_show: null,
        show_later: null,
        going: null
      };
      var city = $stateParams.city;
      var randomCoffeeUrl = 'http://127.0.0.1:8000/api-v1/random_coffee_place/?city=' + city;


      var promise = $http({
        method: 'GET',
        url: randomCoffeeUrl,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
      });

      promise = promise.then(function (response) {

        vm.coffeePlaceData = response.data;
        var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
        var geocodePromise = $http({
          method: 'GET',
          url: geocodeUrl,
          params: {
            'address': city +', '+ vm.coffeePlaceData.name + ', ' + vm.coffeePlaceData.address,
            'key': SETTINGS.GOOGLE_API_KEY
          }

        });

        geocodePromise = geocodePromise.then(function (response) {
          vm.map.marker.coords = {
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
          };
          // Move map to coffeshop coords
          vm.map.center = {
            longitude: response.data.results[0].geometry.location.lng,
            latitude: response.data.results[0].geometry.location.lat
          };
        })


      });

      promise.catch(function (response) {
        console.log('Eror occurred');
      });
    }

    getRandomUserPlace();

    function sendUserChoice() {
      if (!vm.coffeePlaceData.suggestion) {
        var coffeeUrl = 'http://127.0.0.1:8000/api-v1/userplaces/';
        vm.data.coffee_place = vm.coffeePlaceData.id;

        var promise = $http({
          method: 'POST',
          url: coffeeUrl,
          data: vm.data,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      }
      else {
        var coffeeUrl = 'http://127.0.0.1:8000/api-v1/suggestion/' + vm.coffeePlaceData.suggestion;

        var promise = $http({
          method: 'PATCH',
          url: coffeeUrl,
          data: vm.data,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      }


    }

    vm.changeDataLater = function () {
      vm.data.show_later = true;
      sendUserChoice();
      getRandomUserPlace();


    };

    vm.changeDataNever = function () {
      vm.data.never_show = true;
      sendUserChoice();
      getRandomUserPlace();
    }
  }
})();
