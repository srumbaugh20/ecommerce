angular.module('app').controller('headerCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

$scope.cart = $cookies.getObject('cart') || [];


});
