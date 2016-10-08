angular.module('starter.controllers')
.controller('AddressCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandAddress/getAddressList?memberId=162";
	$scope.defApi=$rootScope.path+"elandAddress/setDefaultAddress?memberId=162&addressId=";
	$scope.removeApi=$rootScope.path+"elandAddress/deleteAddress?addressId=217";
	function getIts(){
		$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.addressIts=data.data;
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
			shcemUtil.showMsg("设置默认地址成功")
			getIts();
		})
        .error(function(){
        	
        })
    }
    $scope.deleteIt=function(deleteId){
    	console.log(deleteId)
    }
})
