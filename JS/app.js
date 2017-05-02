angular.module('app',['templatescache', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider){

$stateProvider
  .state('home', {
    url: '/',
    templateUrl: './app/home.html'

  })

  .state('about', {
    url: '/about',
    templateUrl: './app/about.html'

  })

  .state('contact', {
    url: '/contact',
    templateUrl: './app/contact.html',
  })


  .state('temples', {
    url: '/temples',
    templateUrl: './app/temples.html',
    controller: 'templeCtrl'
  })

  .state('templedetails', {
    url: '/templedetails/:id',
    templateUrl: './app/temple-page.html',
    controller: 'templeDetailsCtrl'
  })


$urlRouterProvider.otherwise('/');



})
