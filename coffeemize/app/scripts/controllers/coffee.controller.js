(function () {

  'use strict';


  angular.module('coffeemizeApp')
    .controller('coffeeController', coffeeController);

  coffeeController.$inject = ['$http', '$stateParams', '$state'];

  function coffeeController($http, $stateParams, $state) {
    var vm = this;


    vm.coffeePlaceData = {};



    function getRandomUserPlace() {

      vm.data = {
        never_show: null,
        show_later: null,
        going: null
      };
      var city = $stateParams.city;
      var randomCoffeeUrl = window.SETTINGS.API_URL + '/api-v1/random_coffee_place/?city=' + city;


      var promise = $http({
        method: 'GET',
        url: randomCoffeeUrl,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
      });

      promise = promise.then(function (response) {

        vm.coffeePlaceData = response.data;




      });

      promise.catch(function (response) {
        console.log('Eror occurred');
      });
    }

    getRandomUserPlace();

    function sendUserChoice() {
      if (!vm.coffeePlaceData.suggestion) {
        var coffeeUrl = window.SETTINGS.API_URL + '/api-v1/userplaces/';
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
        var coffeeUrl = window.SETTINGS.API_URL + '/api-v1/suggestion/' + vm.coffeePlaceData.suggestion + '/';

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
    };
    vm.changeDataGoing = function () {
      vm.data.going = true;
      sendUserChoice();
      $state.go('final', {'placeId': vm.coffeePlaceData.id});
    }
  }
})();
