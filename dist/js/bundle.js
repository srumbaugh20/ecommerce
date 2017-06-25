'use strict';

angular.module('app', ['templatescache', 'ui.router', 'ngCookies', 'angular-stripe', 'ngRoute']).config(function ($stateProvider, $urlRouterProvider, stripeProvider) {

            stripeProvider.setPublishableKey('pk_test_wPfomjBcWiAe2RbDJi3iuQ7V');

            $stateProvider.state('home', {
                        url: '/',
                        templateUrl: './app/home.html',
                        controller: 'homeCtrl'
                        // authenticate: false

            }).state('about', {
                        url: '/about',
                        templateUrl: './app/about.html'
                        // authenticate: false
            }).state('watercolors', {
                        url: '/watercolors',
                        templateUrl: './app/watercolors.html',
                        controller: 'watercolorsCtrl'
                        // authenticate: false

            }).state('contact', {
                        url: '/contact',
                        templateUrl: './app/contact.html',
                        controller: 'contactCtrl'
                        // authenticate: false
            }).state('confirmed', {
                        url: '/confirmed',
                        templateUrl: './app/confirmed.html'
                        // authenticate: false
            }).state('cart', {
                        url: '/cart',
                        templateUrl: './app/cart.html',
                        controller: 'cartCtrl'
                        // authenticate: false
            }).state('checkout', {
                        url: '/checkout',
                        templateUrl: './app/checkout.html',
                        controller: 'checkoutCtrl'
                        // authenticate: false
            }).state('temples', {
                        url: '/temples',
                        templateUrl: './app/temples.html',
                        controller: 'templeCtrl'
                        // authenticate: false
            }).state('orders', {
                        url: '/orders',
                        templateUrl: './app/orders.html',
                        controller: 'ordersCtrl'
                        // authenticate: true

            }).state('products', {
                        url: '/products',
                        templateUrl: './app/products.html',
                        controller: 'productCtrl'
                        // authenticate: true

            }).state('templedetails', {
                        url: '/templedetails/:id',
                        templateUrl: './app/temple-page.html',
                        controller: 'templeDetailsCtrl'

            }).state('watercolordetails', {
                        url: '/watercolordetails/:id',
                        templateUrl: './app/watercolor-page.html',
                        controller: 'watercolorDetailsCtrl'

            }).state('login', {
                        url: '/login',
                        templateUrl: './app/login.html',
                        controller: 'loginCtrl'

            });

            $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').controller('cartCountCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.testing = "test works";

  $scope.cart = $cookies.getObject('cart') || [];

  var cartCounter = function cartCounter() {
    var cartCount = {
      num: 0
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount.num += $scope.cart[i].quantity;
    }
    $scope.cartnumber = cartCount.num;
    console.log("cart count", $scope.cartnumber);
  };

  cartCounter();
});
'use strict';

angular.module('app').controller('cartCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies, $state) {

  $scope.test = "test works";

  $scope.cart = $cookies.getObject('cart') || [];
  console.log($scope.cart);

  $scope.updatedmessage = function () {
    $scope.msg = "Cart updated!";
    $scope.showMessage = true;
    $timeout(function () {
      $scope.showMessage = false;
    }, 2000);
  };

  var gettotal = function gettotal() {
    var grandtotal = {
      total: 0
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      grandtotal.total += $scope.cart[i].quantity * $scope.cart[i].size.price;
    }

    $scope.grandtotal = grandtotal.total;
  };

  gettotal();

  $timeout(function () {
    console.log($scope.grandtotal++);
  }, 500);

  var shipCost = function shipCost() {
    var ship = 0;
    if ($scope.grandtotal === 0) {
      ship = 0;
    } else if ($scope.grandtotal > 0 && $scope.grandtotal < 47) {
      ship = 6;
    } else if ($scope.grandtotal > 47) {
      ship = 0;
    }
    $scope.shipping = ship;
  };

  shipCost();

  $scope.superTotal = $scope.shipping + $scope.grandtotal;

  $scope.quantityupdate = function (index) {
    console.log($scope.cart[index].quantity);
    console.log($scope.cart);
    $cookies.putObject('cart', $scope.cart);
    gettotal();
    $scope.updatedmessage();
    $timeout(function () {
      $state.transitionTo($state.current, { id: $stateParams.id }, { reload: true });
    }, 1000);
  };

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
      swal("Deleted!", "That item has been deleted.", "success");
      $timeout(function () {
        $state.transitionTo($state.current, { id: $stateParams.id }, { reload: true });
      }, 1000);
    });
  };
});
'use strict';

angular.module('app').directive('cart-dir', function () {
  //
  return {
    templateUrl: './app/cart_button.html',

    restrict: 'E'

  };
});
'use strict';

angular.module('app').directive('cartdirective', function () {
  //
  return {
    templateUrl: './app/cartNumber.html',
    restrict: 'AE',
    controller: function controller($scope, $timeout, $stateParams, storeService, $cookies) {

      $scope.cart = $cookies.getObject('cart') || [];

      var cartCounter = function cartCounter() {
        var cartCount = {
          num: 0
        };
        for (var i = 0; i < $scope.cart.length; i++) {
          cartCount.num += $scope.cart[i].quantity;
        }
        $scope.cartnumber = cartCount.num;
        console.log("cart count", $scope.cartnumber);
      };

      cartCounter();
    }

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

  var gettotal = function gettotal() {
    var grandtotal = {
      total: 0
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      grandtotal.total += $scope.cart[i].quantity * $scope.cart[i].size.price;
    }

    $scope.grandtotal = grandtotal.total;
  };

  gettotal();

  $timeout(function () {
    console.log($scope.grandtotal++);
  }, 500);

  var shipCost = function shipCost() {
    var ship = 0;
    if ($scope.grandtotal === 0) {
      ship = 0;
    } else if ($scope.grandtotal > 0 && $scope.grandtotal < 47) {
      ship = 6;
    } else if ($scope.grandtotal > 47) {
      ship = 0;
    }
    $scope.shipping = ship;
  };

  shipCost();

  $scope.superTotal = $scope.shipping + $scope.grandtotal;

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

angular.module('app').controller('homeCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cart = $cookies.getObject('cart') || [];

  var cartCounter = function cartCounter() {
    var cartCount = {
      num: 0
    };
    for (var i = 0; i < $scope.cart.length; i++) {
      cartCount.num += $scope.cart[i].quantity;
    }
    $scope.cartnumber = cartCount.num;
    console.log("cart count", $scope.cartnumber);
  };

  cartCounter();
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

angular.module('app').controller('productCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies, $state) {

  $scope.test = "test works";

  var getTemples = function getTemples() {
    storeService.getTemples().then(function (response) {
      var temples = response.data;
      $scope.temples = temples;
      console.log(response.data);
    });
  };

  getTemples();

  var getWatercolors = function getWatercolors() {
    storeService.getWatercolors().then(function (response) {
      var watercolors = response.data;
      $scope.watercolors = watercolors;

      console.log(response.data);
    });
  };

  getWatercolors();

  $scope.updateWatercolor = function ($index) {
    var water = {};
    console.log($index);
    swal({
      title: "Are you sure?",
      text: "Update this item?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, update it!",
      closeOnConfirm: false
    }, function () {
      water = {
        id: $scope.watercolors[$index].id,
        name: $scope.watercolors[$index].name,
        imageurl: $scope.watercolors[$index].imageurl,
        descript: $scope.watercolors[$index].descript,
        price_large: $scope.watercolors[$index].price_large,
        price_medium: $scope.watercolors[$index].price_medium,
        price_small: $scope.watercolors[$index].price_small,
        card_size: $scope.watercolors[$index].card_size
      };

      console.log(water);
      storeService.updateWater(water);
      swal("Updated!", "That item has been updated.", "success");
    });
  };

  $scope.updateTemple = function ($index) {
    var temple = {};
    console.log($index);
    swal({
      title: "Are you sure?",
      text: "Update this item?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, update it!",
      closeOnConfirm: false
    }, function () {
      temple = {
        id: $scope.temples[$index].id,
        name: $scope.temples[$index].name,
        location: $scope.temples[$index].location,
        imageurl: $scope.temples[$index].imageurl,
        descript: $scope.temples[$index].descript,
        price_large: $scope.temples[$index].price_large,
        price_medium: $scope.temples[$index].price_medium,
        price_small: $scope.temples[$index].price_small,
        card_size: $scope.temples[$index].card_size
      };

      console.log(temple);
      storeService.updateTemples(temple);
      swal("Updated!", "That item has been updated.", "success");
    });
  };

  $scope.deleteTemple = function ($index) {
    var temple = {};
    console.log($index);
    swal({
      title: "Are you sure?",
      text: "Delete this item? This action can't be undone!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function () {
      temple = {
        id: $scope.temples[$index].id
      };

      console.log(temple);
      storeService.deleteTemple(temple);
      swal("Deleted!", "The item has been deleted.", "success");
    });
  };

  $scope.deleteWatercolor = function ($index) {
    var water = {};
    console.log($index);
    swal({
      title: "Are you sure?",
      text: "Delete this item? This action can't be undone!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function () {
      water = {
        id: $scope.watercolors[$index].id
      };

      console.log(water);
      storeService.deletewatercolor(water);

      swal("Deleted!", "The item has been deleted.", "success");
    });
  };

  $scope.addWatercolor = function () {
    var water = {};
    swal({
      title: "Are you sure?",
      text: "Add item to store?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, add it!",
      closeOnConfirm: false
    }, function () {
      water = {
        name: $scope.addWname,
        imageurl: $scope.addWimage,
        descript: $scope.addWdes,
        price_large: $scope.addWlarge,
        price_medium: $scope.addWmedium,
        price_small: $scope.addWsmall,
        card_size: $scope.addWcard
      };

      console.log(water);
      storeService.addWatercolor(water);
      swal("Added!", "The item has been added!", "success");
    });
  };

  $scope.addTemple = function () {
    var temple = {};
    swal({
      title: "Are you sure?",
      text: "Add item to store?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, add it!",
      closeOnConfirm: false
    }, function () {
      temple = {
        name: $scope.addTname,
        imageurl: $scope.addTimage,
        location: $scope.addTlocation,
        descript: $scope.addTdes,
        price_large: $scope.addTlarge,
        price_medium: $scope.addTmedium,
        price_small: $scope.addTsmall,
        card_size: $scope.addTcard
      };

      console.log(temple);
      storeService.addTemple(temple);
      swal("Added!", "The item has been added!", "success");
    });
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

  this.updateWater = function (water) {
    console.log('>>>>WATER ', water);
    return $http({
      method: 'PUT',
      url: '/api/updatewater',
      data: {
        id: water.id,
        imageurl: water.imageurl,
        name: water.name,
        descript: water.descript,
        price_large: water.price_large,
        price_medium: water.price_medium,
        price_small: water.price_small,
        card_size: water.card_size
      }
    });
  };

  this.updateTemple = function (temple) {
    console.log('>>>>Temple ', temple);
    return $http({
      method: 'PUT',
      url: '/api/updatetemple',
      data: {
        id: temple.id,
        imageurl: temple.imageurl,
        name: temple.name,
        location: temple.location,
        descript: temple.descript,
        price_large: temple.price_large,
        price_medium: temple.price_medium,
        price_small: temple.price_small,
        card_size: temple.card_size
      }
    });
  };

  this.deleteTemple = function (temple) {
    console.log(temple);

    return $http({
      method: 'DELETE',
      url: '/deletetemples/' + temple.id,
      data: {
        id: temple.id
      }
    });
  };

  this.deletewatercolor = function (water) {
    console.log(water);

    return $http({
      method: 'DELETE',
      url: '/deletewatercolor/' + water.id,
      data: {
        id: water.id
      }
    });
  };

  this.addWatercolor = function (water) {
    return $http({
      method: 'Post',
      url: '/createwatercolor',
      data: {
        imageurl: water.imageurl,
        name: water.name,
        descript: water.descript,
        price_large: water.price_large,
        price_medium: water.price_medium,
        price_small: water.price_small,
        card_size: water.card_size
      }
    });
  };

  this.addTemple = function (temple) {
    return $http({
      method: 'Post',
      url: '/createtemple',
      data: {
        imageurl: temple.imageurl,
        name: temple.name,
        location: temple.location,
        descript: temple.descript,
        price_large: temple.price_large,
        price_medium: temple.price_medium,
        price_small: temple.price_small,
        card_size: temple.card_size
      }
    });
  };
});
'use strict';

angular.module('app').controller('templeCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cart = $cookies.getObject('cart') || [];

  var getData = function getData() {
    storeService.getTemples().then(function (response) {
      $scope.temples = response.data;
      console.log(response.data);
    });
  };

  getData();
});
'use strict';

angular.module('app').controller('templeDetailsCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies, $state, $location) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

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

  $scope.sizes = [{ size: 'Large-11"x14"', price: 24 }, { size: 'Medium-8"x10"', price: 18 }, { size: 'Small-5"x7"', price: 12 }, { size: 'Card Size-4"x6"', price: 10 }];

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
    } else {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size) {
          $scope.cart[i].quantity += $scope.quantity;
          flag = true;
        }
      }
      if (!flag) {
        $scope.cart.push({
          id: $scope.singleitem.id,
          name: $scope.singleitem.name,
          size: $scope.size_option,
          descript: $scope.singleitem.descript,
          image: $scope.singleitem.imageurl,
          quantity: $scope.quantity
        });
      }
    }

    $cookies.putObject('cart', $scope.cart);
    console.log($scope.cart);
    $scope.addedmessage();
    $timeout(function () {
      $state.transitionTo($state.current, { id: $stateParams.id }, { reload: true });
    }, 1000);
  };
});
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

  $scope.sizes = [{ size: 'Large-11"x14"', price: 24 }, { size: 'Medium-8"x10"', price: 18 }, { size: 'Small-5"x7"', price: 12 }, { size: 'Card Size-4"x6"', price: 10 }];

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
    } else {
      var flag = false;
      for (var i = 0; i < $scope.cart.length; i++) {
        if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size) {
          $scope.cart[i].quantity += $scope.quantity;
          flag = true;
        }
      }
      if (!flag) {
        $scope.cart.push({
          id: $scope.singleitem.id,
          name: $scope.singleitem.name,
          descript: $scope.singleitem.descript,
          size: $scope.size_option,
          image: $scope.singleitem.imageurl,
          quantity: $scope.quantity
        });
      }
    }

    $cookies.putObject('cart', $scope.cart);
    console.log($scope.cart);
    $scope.addedmessage();
    $timeout(function () {
      $state.transitionTo($state.current, { id: $stateParams.id }, { reload: true });
    }, 1000);
  };
});
'use strict';

angular.module('app').controller('watercolorsCtrl', function ($scope, $timeout, $stateParams, storeService, $cookies) {

  $scope.test = "test works";

  $scope.cartnumber = { num: 0 };

  $scope.cart = $cookies.getObject('cart') || [];

  var getData = function getData() {
    storeService.getWatercolors().then(function (response) {
      $scope.watercolors = response.data;
      console.log(response.data);
    });
  };

  getData();
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
