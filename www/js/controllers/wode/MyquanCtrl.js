angular.module('starter.controllers')
.controller('MyquanCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {

	$scope.thisApi=$rootScope.path+"elandCoupon/getMyCoupon?memberId="+locals.get("memberId");
	
	$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.quans=data.data;
		})
        .error(function(){
        	
        })
})
