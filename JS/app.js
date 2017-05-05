angular.module('app', ['templatescache', 'ui.router', 'ngCookies'])
    .config(function($stateProvider, $urlRouterProvider) {

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
            })

            .state('cart', {
                url: '/cart',
                templateUrl: './app/cart.html',
                controller: 'cartCtrl'
            })

            // .state('admin_login', {
            //     url: '/admin/login',
            //     templateUrl: './app/admin_login.html',
            //     controller: 'auth'
            // })


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

            .state('watercolordetails', {
                url: '/watercolordetails/:id',
                templateUrl: './app/watercolor-page.html',
                controller: 'watercolorDetailsCtrl'
            })


        $urlRouterProvider.otherwise('/');
});;
