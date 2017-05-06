'use strict';

angular.module('app', ['templatescache', 'ui.router', 'ngCookies']).config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider.state('home', {
                        url: '/',
                        templateUrl: './app/home.html'

            }).state('about', {
                        url: '/about',
                        templateUrl: './app/about.html'

            }).state('watercolors', {
                        url: '/watercolors',
                        templateUrl: './app/watercolors.html',
                        controller: 'watercolorsCtrl'

            }).state('contact', {
                        url: '/contact',
                        templateUrl: './app/contact.html'
            }).state('cart', {
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
            }).state('templedetails', {
                        url: '/templedetails/:id',
                        templateUrl: './app/temple-page.html',
                        controller: 'templeDetailsCtrl'
            }).state('watercolordetails', {
                        url: '/watercolordetails/:id',
                        templateUrl: './app/watercolor-page.html',
                        controller: 'watercolorDetailsCtrl'
            });

            $urlRouterProvider.otherwise('/');
});;
'use strict';

angular.module('app').controller('cartCtrl', function ($scope, $timeout, $stateParams, templeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart');
  console.log($scope.cart);

  // $scope.addedmessage = function() {
  //        $scope.msg="Added to cart!";
  //        $scope.showMessage = true;
  //        $timeout(function(){
  //           $scope.showMessage = false;
  //        }, 2000);
  //     };


  function cartCounter() {
    var cartCount = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount += $scope.cart[i].quantity;
      console.log("for loop", cartCount);
    }
    $scope.cartnumber.num = cartCount;
    console.log("cart count", $scope.cartnumber);
  }

  cartCounter();
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

angular.module('app').controller('headerCtrl', function ($scope, $timeout, $stateParams, templeService, $cookies) {

  $scope.test = "test works";

  $scope.cart = $cookies.getObject('cart');

  function cartCounter() {
    var cartCount = {
      num: 0
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount.num += $scope.cart[i].quantity;
      console.log("for loop", cartCount);
    }
    $scope.cartnumber = cartCount.num;
    console.log("cart count", $scope.cartnumber);
  }

  cartCounter();

  // $scope.$watch($scope.cart, function() {
  //         cartCounter();
  //     });
});
'use strict';

angular.module('app').directive('headerdirective', function () {
  //
  return {
    templateUrl: './app/header.html',
    restrict: 'AE'

  };
});
'use strict';

angular.module('app').controller('templeCtrl', function ($scope, $timeout, $stateParams, templeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getData = function getData() {
    templeService.getTemples().then(function (response) {
      $scope.temples = response.data;
      console.log(response.data);
    });
  };

  getData();

  var getSingleData = function getSingleData() {
    templeService.getTemples().then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id == $stateParams.id) {
          $scope.singleitem = response.data[i];
        }
      }
    });
  };

  getSingleData();

  $scope.sizes = [{ size: 'Large-11"x14"', price: 24 }, { size: 'Medium-8"x10"', price: 18 }, { size: 'Small-4"x6"', price: 12 }];

  $scope.select_size = function () {
    $scope.price = '$' + $scope.size_option.price;
    console.log($scope.size_option);
  };

  $scope.addedmessage = function () {
    $scope.msg = "Added to cart!";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
  };

  $scope.addtocart = function () {
    if ($scope.cart.length === 0) {
      $scope.cart.push({
        id: $scope.singleitem.id,
        name: $scope.singleitem.name,
        size: $scope.size_option,
        image: $scope.singleitem.imageurl,
        quantity: $scope.quantity
      });
      cartCounter();
    } else {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size) {
          $scope.cart[i].quantity += $scope.quantity;
          flag = true;
        }
      }
      cartCounter();
      if (!flag) {
        $scope.cart.push({
          id: $scope.singleitem.id,
          name: $scope.singleitem.name,
          size: $scope.size_option,
          image: $scope.singleitem.imageurl,
          quantity: $scope.quantity
        });
        cartCounter();
      }
    }

    $cookies.putObject('cart', $scope.cart);
    console.log($scope.cart);
    $scope.addedmessage();
  };

  function cartCounter() {
    var cartCount = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount += $scope.cart[i].quantity;
      console.log("for loop", cartCount);
    }
    $scope.cartnumber.num = cartCount;
    console.log("cart count", $scope.cartnumber);
  }

  cartCounter();

  // $scope.$watch('click', function() {
  //         cartCounter();
  //     });
});
'use strict';

angular.module('app').controller('templeDetailsCtrl', function ($scope, $timeout, $stateParams, templeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getSingleData = function getSingleData() {
    templeService.getTemples().then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id == $stateParams.id) {
          $scope.singleitem = response.data[i];
        }
      }
    });
  };

  getSingleData();

  $scope.sizes = [{ size: 'Large-11"x14"', price: 24 }, { size: 'Medium-8"x10"', price: 18 }, { size: 'Small-4"x6"', price: 12 }];

  $scope.select_size = function () {
    $scope.price = '$' + $scope.size_option.price;
    console.log($scope.size_option);
  };

  $scope.addedmessage = function () {
    $scope.msg = "Added to cart!";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
  };

  $scope.addtocart = function () {
    if ($scope.cart.length === 0) {
      $scope.cart.push({
        id: $scope.singleitem.id,
        name: $scope.singleitem.name,
        size: $scope.size_option,
        image: $scope.singleitem.imageurl,
        quantity: $scope.quantity
      });
      cartCounter();
    } else {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size) {
          $scope.cart[i].quantity += $scope.quantity;
          flag = true;
        }
      }
      cartCounter();
      if (!flag) {
        $scope.cart.push({
          id: $scope.singleitem.id,
          name: $scope.singleitem.name,
          size: $scope.size_option,
          image: $scope.singleitem.imageurl,
          quantity: $scope.quantity
        });
        cartCounter();
      }
    }

    $cookies.putObject('cart', $scope.cart);
    console.log($scope.cart);
    $scope.addedmessage();
  };

  function cartCounter() {
    var cartCount = {
      num: 0
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount.num += $scope.cart[i].quantity;
      console.log("for loop", cartCount);
    }
    $scope.cartnumber = cartCount.num;
    console.log("cart count", $scope.cartnumber);
  }

  cartCounter();

  // $scope.$watch('click', function() {
  //         cartCounter();
  //     });
});
'use strict';

angular.module('app').service('templeService', function ($http) {

  this.getTemples = function () {
    return $http.get('/get').then(function (response) {
      return response;
    });
  };

  // this.store = function(name, data) {
  // localStorage.setItem(name, JSON.stringify(data));
  // return 'Added to cart';
  // };
  //
  // this.getCart = function(name) {
  //   var item = localStorage.getItem(name);
  //   return JSON.parse(item);
  // };

});
'use strict';

angular.module('app').controller('watercolorDetailsCtrl', function ($scope, $timeout, $stateParams, templeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getSingleData = function getSingleData() {
    templeService.getTemples().then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id == $stateParams.id) {
          $scope.singleitem = response.data[i];
        }
      }
    });
  };

  getSingleData();

  $scope.sizes = [{ size: 'Large-11"x14"', price: 24 }, { size: 'Medium-8"x10"', price: 18 }, { size: 'Small-4"x6"', price: 12 }];

  $scope.select_size = function () {
    $scope.price = '$' + $scope.size_option.price;
    console.log($scope.size_option);
  };

  $scope.addedmessage = function () {
    $scope.msg = "Added to cart!";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
  };

  $scope.addtocart = function () {
    if ($scope.cart.length === 0) {
      $scope.cart.push({
        id: $scope.singleitem.id,
        name: $scope.singleitem.name,
        size: $scope.size_option,
        image: $scope.singleitem.imageurl,
        quantity: $scope.quantity
      });
      cartCounter();
    } else {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size) {
          $scope.cart[i].quantity += $scope.quantity;
          flag = true;
        }
      }
      cartCounter();
      if (!flag) {
        $scope.cart.push({
          id: $scope.singleitem.id,
          name: $scope.singleitem.name,
          size: $scope.size_option,
          image: $scope.singleitem.imageurl,
          quantity: $scope.quantity
        });
        cartCounter();
      }
    }

    $cookies.putObject('cart', $scope.cart);
    console.log($scope.cart);
    $scope.addedmessage();
  };

  function cartCounter() {
    var cartCount = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount += $scope.cart[i].quantity;
      console.log("for loop", cartCount);
    }
    $scope.cartnumber.num = cartCount;
    console.log("cart count", $scope.cartnumber);
  }

  cartCounter();

  // $scope.$watch('click', function() {
  //         cartCounter();
  //     });
});
'use strict';

angular.module('app').controller('watercolorsCtrl', function ($scope, $timeout, $stateParams, templeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getData = function getData() {
    templeService.getTemples().then(function (response) {
      $scope.temples = response.data;
      console.log(response.data);
    });
  };

  getData();

  var getSingleData = function getSingleData() {
    templeService.getTemples().then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id == $stateParams.id) {
          $scope.singleitem = response.data[i];
        }
      }
    });
  };

  getSingleData();

  $scope.sizes = [{ size: 'Large-11"x14"', price: 24 }, { size: 'Medium-8"x10"', price: 18 }, { size: 'Small-4"x6"', price: 12 }];

  $scope.select_size = function () {
    $scope.price = '$' + $scope.size_option.price;
    console.log($scope.size_option);
  };

  $scope.addedmessage = function () {
    $scope.msg = "Added to cart!";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
  };

  $scope.addtocart = function () {
    if ($scope.cart.length === 0) {
      $scope.cart.push({
        id: $scope.singleitem.id,
        name: $scope.singleitem.name,
        size: $scope.size_option,
        image: $scope.singleitem.imageurl,
        quantity: $scope.quantity
      });
      cartCounter();
    } else {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size) {
          $scope.cart[i].quantity += $scope.quantity;
          flag = true;
        }
      }
      cartCounter();
      if (!flag) {
        $scope.cart.push({
          id: $scope.singleitem.id,
          name: $scope.singleitem.name,
          size: $scope.size_option,
          image: $scope.singleitem.imageurl,
          quantity: $scope.quantity
        });
        cartCounter();
      }
    }

    $cookies.putObject('cart', $scope.cart);
    console.log($scope.cart);
    $scope.addedmessage();
  };

  function cartCounter() {
    var cartCount = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount += $scope.cart[i].quantity;
      console.log("for loop", cartCount);
    }
    $scope.cartnumber.num = cartCount;
    console.log("cart count", $scope.cartnumber);
  }

  cartCounter();

  // $scope.$watch('click', function() {
  //         cartCounter();
  //     });
});
//# sourceMappingURL=bundle.js.map
