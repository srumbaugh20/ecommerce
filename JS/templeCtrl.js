angular.module('app').controller('templeCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

var getData = function(){
  	storeService.getTemples().then(function(response){
  		$scope.temples = response.data
  		console.log(response.data);
  	})

  }

getData();


});
