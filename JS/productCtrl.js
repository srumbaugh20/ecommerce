angular.module('app').controller('productCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies, $state){

$scope.test = "test works";



var getTemples = function(){
  	storeService.getTemples().then(function(response){
      var temples = response.data
  		$scope.temples = temples
  		console.log(response.data);
  	})

  }

getTemples();

var getWatercolors = function(){
  	storeService.getWatercolors().then(function(response){
      var watercolors = response.data
  		$scope.watercolors = watercolors

  		console.log(response.data);
  	})

  }

getWatercolors();


$scope.updateWatercolor = function($index){
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
},
function(){
     water = {
     id: $scope.watercolors[$index].id,
     name: $scope.watercolors[$index].name,
     imageurl: $scope.watercolors[$index].imageurl,
     descript: $scope.watercolors[$index].descript,
     price_large: $scope.watercolors[$index].price_large,
     price_medium: $scope.watercolors[$index].price_medium,
     price_small: $scope.watercolors[$index].price_small,
     card_size: $scope.watercolors[$index].card_size
   }

  console.log(water);
  storeService.updateWater(water);
  swal("Updated!", "That item has been updated.", "success");
});
}

$scope.updateTemple = function($index){
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
},
function(){
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
   }

  console.log(temple);
  storeService.updateTemples(temple);
  swal("Updated!", "That item has been updated.", "success");
});
}

$scope.deleteTemple = function($index){
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
},
function(){
     temple = {
     id: $scope.temples[$index].id,
   }

  console.log(temple);
  storeService.deleteTemple(temple);
  swal("Deleted!", "The item has been deleted.", "success");
});
}

$scope.deleteWatercolor = function($index){
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
},
function(){
     water = {
     id: $scope.watercolors[$index].id,
   }

  console.log(water);
  storeService.deletewatercolor(water);

  swal("Deleted!", "The item has been deleted.", "success");
});
}

$scope.addWatercolor = function(){
  var water = {};
  swal({
  title: "Are you sure?",
  text: "Add item to store?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, add it!",
  closeOnConfirm: false
},
function(){
     water = {
       name: $scope.addWname,
       imageurl: $scope.addWimage,
       descript: $scope.addWdes,
       price_large: $scope.addWlarge,
       price_medium: $scope.addWmedium,
       price_small: $scope.addWsmall,
       card_size: $scope.addWcard
   }

  console.log(water);
  storeService.addWatercolor(water);
  swal("Added!", "The item has been added!", "success");
});
}

$scope.addTemple = function(){
  var temple = {};
  swal({
  title: "Are you sure?",
  text: "Add item to store?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, add it!",
  closeOnConfirm: false
},
function(){
     temple = {
       name: $scope.addTname,
       imageurl: $scope.addTimage,
       location: $scope.addTlocation,
       descript: $scope.addTdes,
       price_large: $scope.addTlarge,
       price_medium: $scope.addTmedium,
       price_small: $scope.addTsmall,
       card_size: $scope.addTcard
   }

  console.log(temple);
  storeService.addTemple(temple);
  swal("Added!", "The item has been added!", "success");
});
}



});
