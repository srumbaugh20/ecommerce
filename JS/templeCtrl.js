angular.module('app').controller('templeCtrl', function($scope, $timeout, $stateParams,  templeService, $cookies){

$scope.test = "test works";

var getData = function(){
  	templeService.getTemples().then(function(response){
  		$scope.temples = response.data
  		console.log(response.data);
  	})

  }

getData();


});
