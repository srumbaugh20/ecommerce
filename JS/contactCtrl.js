angular.module('app').controller('contactCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

var getData = function(){
  	storeService.getContact().then(function(response){
      console.log(response);
      var data = response.data[0]
      $scope.contact = data
  		console.log(data);
  	})

  }

getData();


});
