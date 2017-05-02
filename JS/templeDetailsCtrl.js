angular.module('app').controller('templeDetailsCtrl', function($scope, $stateParams, templeService){


  var getData = function(){
  	templeService.getTemples().then(function(response){
  		for (var i = 0; i < response.length; i++) {
        if(response[i].id == $stateParams.id){
          $scope.singletemple = response[i].data;
          console.log($scope.singletemple);
        }
  		}
  	})

  }

getData();

$scope.test = 'test'

})
