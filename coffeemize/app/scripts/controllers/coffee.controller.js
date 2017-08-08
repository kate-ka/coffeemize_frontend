(function () {

  'use strict';


  angular.module('coffeemizeApp')
    .controller('coffeeController', coffeeController);

  coffeeController.$inject = ['$http'];

  function coffeeController($http) {
    var vm = this;
    vm.coffeePlaceData = {};
    var urlPart = vm.coffeePlaceData.name + vm.coffeePlaceData.address;
    var googleUrl = '//www.google.com/maps/embed/v1/place?q=' + urlPart +
      '10&zoom=13&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/ &key=AIzaSyBWwNkKXB7lwW3bxE3l2o2gZ87c5jX6eho';

    vm.iframe = {src: googleUrl};

    function getRandomUserPlace() {

    vm.data = {
      never_show: null,
      show_later: null,
      going: null
    };

    var randomCoffeeUrl = 'http://127.0.0.1:8000/api-v1/random_coffee_place/';

    var promise = $http({
      method: 'GET',
      url: randomCoffeeUrl,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }
    });

    promise = promise.then(function(response) {

      vm.coffeePlaceData = response.data;
    });

    promise.catch(function(response) {
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
 }})();
