angular.module('app', ['templatescache', 'ui.router', 'ngCookies', 'angular-stripe', 'ngRoute'])
    .config(function($stateProvider, $urlRouterProvider, stripeProvider) {

      stripeProvider.setPublishableKey('pk_test_wPfomjBcWiAe2RbDJi3iuQ7V');


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './app/home.html',
                controller: 'homeCtrl'
                // authenticate: false

            })

            .state('about', {
                url: '/about',
                templateUrl: './app/about.html'
                // authenticate: false
            })

            .state('watercolors', {
                url: '/watercolors',
                templateUrl: './app/watercolors.html',
                controller: 'watercolorsCtrl'
                // authenticate: false

            })

            .state('contact', {
                url: '/contact',
                templateUrl: './app/contact.html',
                controller: 'contactCtrl'
                // authenticate: false
            })

            .state('confirmed', {
                url: '/confirmed',
                templateUrl: './app/confirmed.html'
                // authenticate: false
            })

            .state('cart', {
                url: '/cart',
                templateUrl: './app/cart.html',
                controller: 'cartCtrl'
                // authenticate: false
            })

            .state('checkout', {
                url: '/checkout',
                templateUrl: './app/checkout.html',
                controller: 'checkoutCtrl'
                // authenticate: false
            })



            .state('temples', {
                url: '/temples',
                templateUrl: './app/temples.html',
                controller: 'templeCtrl'
                // authenticate: false
            })

            .state('orders', {
                url: '/orders',
                templateUrl: './app/orders.html',
                controller: 'ordersCtrl'
                // authenticate: true

            })

            .state('products', {
                url: '/products',
                templateUrl: './app/products.html',
                controller: 'productCtrl'
                // authenticate: true

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

            .state('login', {
                url: '/login',
                templateUrl: './app/login.html',
                controller: 'loginCtrl'

            })



        $urlRouterProvider.otherwise('/');


});
