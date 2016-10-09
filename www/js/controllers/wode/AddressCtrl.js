angular.module('starter.controllers')
.controller('AddressCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandAddress/getAddressList?memberId=162";
	$scope.defApi=$rootScope.path+"elandAddress/setDefaultAddress?memberId=162&addressId=";
	$scope.delApi=$rootScope.path+"elandAddress/deleteAddress?addressId=";
	function getIts(){
		$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.addressIts=data.data;
			for (var i = 0; i < $scope.addressIts.length; i++) {
				if($scope.addressIts[i].isDefault){
					$scope.morenId=$scope.addressIts[i].addressId;
					
				}
			}
		})
        .error(function(){
        	
        })
	};	
	getIts();
    $scope.setDef=function(addressId){
    	console.log(addressId)
    	$http.get($scope.defApi+addressId)
		.success(function(data){
			console.log(data);
			getIts();
		})
        .error(function(){
        	
        })
    }
    $scope.deleteIt=function(deleteId){
    	console.log(deleteId)
    	$http.get($scope.delApi+deleteId)
    	.success(function(data){
    		console.log(data);
    		getIts();
    	})
    }
})