angular.module('app').controller('ordersCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies, $state){

$scope.test = "test works";


$scope.updatedmessage = function() {
       $scope.msg="Order deleted";
       $scope.showMessage = true;
       $timeout(function(){
          $scope.showMessage = false;
       }, 2000);
    };


var getData = function(){
      	storeService.getOrders().then(function(response){
          console.log(response);
      		var orders = response.data
          for (var i = 0; i < orders.length; i++) {
            orders[i].cart = JSON.parse(orders[i].cart)
          }
          console.log(orders);
          $scope.orders = orders;
        })
    }

getData();




$scope.remove = function($index){
  swal({
  title: "Are you sure?",
  text: "You will not be able to recover this order again!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, delete it!",
  closeOnConfirm: false
},
function(){
  if ($index > -1) {
      var id = $scope.orders[$index].id;
    }
  storeService.deleteorder(id);
  swal("Deleted!", "That order has been deleted.", "success");
});
}

$scope.UniqueTracking = function(index, id){
    return index + id
  $scope.$apply();
}




});
