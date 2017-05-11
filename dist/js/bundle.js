'use strict';

angular.module('app', ['templatescache', 'ui.router', 'ngCookies', 'angular-stripe']).config(function ($stateProvider, $urlRouterProvider, stripeProvider) {

            stripeProvider.setPublishableKey('pk_test_wPfomjBcWiAe2RbDJi3iuQ7V');

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
                        templateUrl: './app/contact.html',
                        controller: 'contactCtrl'
            }).state('confirmed', {
                        url: '/confirmed',
                        templateUrl: './app/confirmed.html'
            }).state('cart', {
                        url: '/cart',
                        templateUrl: './app/cart.html',
                        controller: 'cartCtrl'
            }).state('checkout', {
                        url: '/checkout',
                        templateUrl: './app/checkout.html',
                        controller: 'checkoutCtrl'
            }).state('temples', {
                        url: '/temples',
                        templateUrl: './app/temples.html',
                        controller: 'templeCtrl'
            }).state('orders', {
                        url: '/orders',
                        templateUrl: './app/orders.html',
                        controller: 'ordersCtrl'

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

angular.module('app').controller('cartCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  $scope.updatedmessage = function () {
    $scope.msg = "Cart updated!";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
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

  var gettotal = function gettotal() {
    var grandtotal = {
      total: 3
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      grandtotal.total += $scope.cart[i].quantity * $scope.cart[i].size.price;
    }
    $scope.grandtotal = grandtotal.total;
  };

  gettotal();

  $scope.quantityupdate = function (index) {
    console.log($scope.cart[index].quantity);
    console.log($scope.cart);
    $cookies.putObject('cart', $scope.cart);
    gettotal();
    cartCounter();
    $scope.$apply();
    $scope.updatedmessage();
  };

  // $scope.remove = function(index){
  //   if (index > -1) {
  //       $scope.cart.splice(index, 1);
  //     }
  //     $cookies.putObject('cart', $scope.cart);
  // }


  $scope.remove = function ($index) {
    swal({
      title: "Are you sure?",
      text: "Remove the item from the cart?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, remove item!",
      closeOnConfirm: false
    }, function () {
      if ($index > -1) {
        $scope.cart.splice($index, 1);
      }
      $cookies.putObject('cart', $scope.cart);
      $scope.$apply();
      swal("Deleted!", "That order has been deleted.", "success");
    });
  };
});
'use strict';

angular.module('app').controller('checkoutCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies, stripe, $state) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  $scope.getcart = function () {
    return $scope.cart;
  };

  // $scope.updatedmessage = function() {
  //        $scope.msg="Cart updated!";
  //        $scope.showMessage = true;
  //        $timeout(function(){
  //           $scope.showMessage = false;
  //        }, 2000);
  //     };


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

  var gettotal = function gettotal() {
    var grandtotal = {
      total: 3
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      grandtotal.total += $scope.cart[i].quantity * $scope.cart[i].size.price;
    }
    $scope.grandtotal = grandtotal.total;
  };

  gettotal();

  $scope.emptycart = function () {
    $cookies.remove('cart');
    $scope.cart = [];
  };

  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card).then(function (response) {
      console.log($scope.cart);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      payment.cart = $scope.cart;
      payment.amount_paid = $scope.grandtotal;
      storeService.processPayment($scope.grandtotal * 100, payment);
    }).then(function () {
      $state.go('confirmed');
      swal({
        title: "Thank You!",
        text: "We have recieved your order. It'll be shipped within 5 business days.",
        imageUrl: "./images/watercolorleaves.png",
        type: "success",
        timer: 10000
      });
    }).then(function () {
      $scope.emptycart();
      setTimeout(function () {
        $state.go('home');
      }, 6000);
    });
  };
});
'use strict';

angular.module('app').controller('contactCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  var getData = function getData() {
    storeService.getContact().then(function (response) {
      console.log(response);
      var data = response.data[0];
      $scope.contact = data;
      console.log(data);
    });
  };

  getData();
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

angular.module('app').controller('headerCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cart = $cookies.getObject('cart') || [];

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

angular.module('app').controller('ordersCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies, $state) {

  $scope.test = "test works";

  $scope.updatedmessage = function () {
    $scope.msg = "Order deleted";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
  };

  var getData = function getData() {
    storeService.getOrders().then(function (response) {
      console.log(response);
      var orders = response.data;
      for (var i = 0; i < orders.length; i++) {
        orders[i].cart = JSON.parse(orders[i].cart);
      }
      console.log(orders);
      $scope.orders = orders;
    });
  };

  getData();

  $scope.remove = function ($index) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this order again!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function () {
      if ($index > -1) {
        var id = $scope.orders[$index].id;
      }
      storeService.deleteorder(id);
      swal("Deleted!", "That order has been deleted.", "success");
    });
  };

  $scope.UniqueTracking = function (index, id) {
    return index + id;
    $scope.$apply();
  };
});
'use strict';

angular.module('app').service('storeService', function ($http) {

  this.getTemples = function () {
    return $http.get('/get/temples').then(function (response) {
      return response;
    });
  };

  this.getWatercolors = function () {
    return $http.get('/get/watercolors').then(function (response) {
      return response;
    });
  };

  this.getOrders = function () {
    return $http.get('/get/orders').then(function (response) {
      return response;
    });
  };

  this.getContact = function () {
    return $http.get('/get/contact').then(function (response) {
      return response;
    });
  };

  this.deleteorder = function (id) {
    console.log(id);
    return $http({
      method: 'DELETE',
      url: '/api/deleteorder/' + id

      // data: {
      //   orderid: id
      // }
    });
  };

  this.processPayment = function (grandtotal, payment) {
    console.log('>>>>PAYMENT ', payment);
    return $http({
      method: 'POST',
      url: '/api/payment',
      data: {
        amount: grandtotal,
        amount_paid: payment.amount_paid,
        payment: payment,
        address: payment.address,
        city: payment.city,
        state: payment.state,
        zipcode: payment.zipcode,
        email: payment.email,
        cart: payment.cart
      }
    });
  };
});
'use strict';

angular.module('app').controller('templeCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  var getData = function getData() {
    storeService.getTemples().then(function (response) {
      $scope.temples = response.data;
      console.log(response.data);
    });
  };

  getData();
});
'use strict';

angular.module('app').controller('templeDetailsCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getSingleData = function getSingleData() {
    storeService.getTemples().then(function (response) {
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
        descript: $scope.singleitem.descript,
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
          descript: $scope.singleitem.descript,
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
});
"use strict";

var test = "test";
'use strict';

angular.module('app').controller('watercolorDetailsCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getSingleData = function getSingleData() {
    storeService.getWatercolors().then(function (response) {
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
        descript: $scope.singleitem.descript,
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
          descript: $scope.singleitem.descript,
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
});
'use strict';

angular.module('app').controller('watercolorsCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  var getData = function getData() {
    storeService.getWatercolors().then(function (response) {
      $scope.watercolors = response.data;
      console.log(response.data);
    });
  };

  getData();

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

angular.module('app').directive('waterdirective', function () {
  //
  return {
    templateUrl: './app/watercolors-tmpl.html',

    restrict: 'AE'

  };
});
//# sourceMappingURL=bundle.js.map
