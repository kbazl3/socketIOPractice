angular.module("app", ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

      $stateProvider
          .state('home', {
              url: "/",
              templateUrl: './js/home.html'
              })

          .state('me', {
              url: "/me",
              templateUrl: './js/me.html'
              })

          .state('chatroom', {
              url: "/chatroom",
              templateUrl: './js/chatroom.html',
              controller: 'mainCtrl'
              });
      });
