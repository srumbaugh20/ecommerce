angular.module('app', ['templatescache', 'ui.router', 'ngCookies', 'angular-stripe'])
    .config(function($stateProvider, $urlRouterProvider, stripeProvider) {

      stripeProvider.setPublishableKey('pk_test_wPfomjBcWiAe2RbDJi3iuQ7V');


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './app/home.html'


            })

            .state('about', {
                url: '/about',
                templateUrl: './app/about.html'

            })

            .state('watercolors', {
                url: '/watercolors',
                templateUrl: './app/watercolors.html',
                controller: 'watercolorsCtrl'

            })

            .state('contact', {
                url: '/contact',
                templateUrl: './app/contact.html',
                controller: 'contactCtrl'
            })

            .state('confirmed', {
                url: '/confirmed',
                templateUrl: './app/confirmed.html'
            })

            .state('cart', {
                url: '/cart',
                templateUrl: './app/cart.html',
                controller: 'cartCtrl'
            })

            .state('checkout', {
                url: '/checkout',
                templateUrl: './app/checkout.html',
                controller: 'checkoutCtrl'
            })



            .state('temples', {
                url: '/temples',
                templateUrl: './app/temples.html',
                controller: 'templeCtrl'
            })

            .state('orders', {
                url: '/orders',
                templateUrl: './app/orders.html',
                controller: 'ordersCtrl'

            })

            .state('templedetails', {
                url: '/templedetails/:id',
                templateUrl: './app/temple-page.html',
                controller: 'templeDetailsCtrl'
            })

            .state('watercolordetails', {
                url: '/watercolordetails/:id',
                templateUrl: './app/watercolor-page.html',
                controller: 'watercolorDetailsCtrl'
            })



        $urlRouterProvider.otherwise('/');
});;
