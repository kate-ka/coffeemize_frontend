(function() {

  'use strict';

  angular
    .module('coffeemizeApp')
    .controller('FinalCtrl', FinalCtrl);
  FinalCtrl.$inject = ['$http', '$stateParams'];

    function FinalCtrl ($http, $stateParams) {
      var vm = this;
      vm.statistics = {};

      var placeId = $stateParams.placeId;

      function getUserChoice(place) {
      var statisticsUrl = window.SETTINGS.API_URL + '/api-v1/place/' + place + '/statistics';
        var statisticsPromise = $http({
          method: 'GET',
          url: statisticsUrl,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });

        statisticsPromise = statisticsPromise.then(function (response) {
          vm.statistics = response.data;
          console.log(vm.statistics);

        });
        statisticsPromise.catch(function (response) {
          console.log("statistics error")
        })
    }
    getUserChoice(placeId);

    }

})();
