angular.module('app').controller('watercolorsCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

$scope.cart = $cookies.getObject('cart') || [];


var getData = function(){
  	storeService.getWatercolors().then(function(response){
  		$scope.watercolors = response.data
  		console.log(response.data);
  	})

  }

getData();




});
