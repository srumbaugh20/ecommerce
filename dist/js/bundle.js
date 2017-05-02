'use strict';

angular.module('app', ['templatescache', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './app/home.html'

  }).state('about', {
    url: '/about',
    templateUrl: './app/about.html'

  }).state('contact', {
    url: '/contact',
    templateUrl: './app/contact.html'
  }).state('temples', {
    url: '/temples',
    templateUrl: './app/temples.html',
    controller: 'templeCtrl'
  }).state('templedetails', {
    url: '/templedetails/:id',
    templateUrl: './app/temple-page.html',
    controller: 'templeDetailsCtrl'
  });

  $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').directive('directive', function () {
  //
  return {
    templateUrl: './app/temple-tmpl.html',
    restrict: 'AE'

  };
});
'use strict';

angular.module('app').controller('templeCtrl', function ($scope, templeService) {

  $scope.test = "test works";

  var getData = function getData() {
    templeService.getTemples().then(function (response) {
      $scope.temples = response.data;
      console.log(response.data);
    });
  };

  getData();
});
'use strict';

angular.module('app').controller('templeDetailsCtrl', function ($scope, $stateParams, templeService) {

  var getData = function getData() {
    templeService.getTemples().then(function (response) {
      for (var i = 0; i < response.length; i++) {
        if (response[i].id == $stateParams.id) {
          $scope.singletemple = response[i];
          console.log($scope.singletemple);
        }
      }
    });
  };

  getData();

  $scope.test = 'test';
});
'use strict';

angular.module('app').service('templeService', function ($http) {

  this.getTemples = function () {
    return $http.get('/get').then(function (response) {
      console.log(response);
      return response;
    });
  };

  // this.addMessage = function ( message ) {
  //   return $http.post('/messages', { message: message });
  // }
});
//# sourceMappingURL=bundle.js.map
