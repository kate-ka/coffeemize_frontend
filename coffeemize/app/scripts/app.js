(function() {

  'use strict';

  angular
    .module('coffeemizeApp', ['auth0.lock', 'angular-jwt', 'ui.router', 'uiGmapgoogle-maps', 'angularXRegExp', 'blockUI'])
    .config(config);

    config.$inject = ['$stateProvider', '$httpProvider', 'lockProvider', 'jwtOptionsProvider', 'jwtInterceptorProvider', '$urlRouterProvider'];

    function config($stateProvider, $httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider, $urlRouterProvider) {

      // Initialization for the Lock widget
      lockProvider.init({
        clientID: SETTINGS.AUTH0_CLIENT_ID,
        domain: SETTINGS.AUTH0_DOMAIN,
        options: {
            auth: {
                params: {scope: 'openid email picture'}
            }
        }
      });

      // Configuration for angular-jwt
      jwtOptionsProvider.config({
        tokenGetter: function() {
          return localStorage.getItem('id_token');
        },
        whiteListedDomains: ['localhost'],
        unauthenticatedRedirectPath: '/login'
      });

      // Add the jwtInterceptor to the array of HTTP interceptors
      // so that JWTs are attached as Authorization headers
      $httpProvider.interceptors.push('jwtInterceptor');

     $stateProvider
       .state({
         name: 'home',
          url: '',
          controller: 'homeController',
          templateUrl: 'views/home.html'
       }

     )
       .state( {
         name: 'login',
         url: '/login',
         controller: 'loginController',
         templateUrl: 'views/login.html'
      })
       .state({
         name: 'coffee',
         url: '/coffee?city',
         controller: 'coffeeController as vm',
         templateUrl: 'views/coffee.html'
       })
       .state({
         name: 'final',
         url: '/place/:placeId',
         controller: 'FinalCtrl as vm',
         templateUrl: 'views/going.html'
       })
    }

})();

