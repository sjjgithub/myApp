angular.module('starter.controllers')
.controller('ShouyinCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals,$ionicModal){    
    if($stateParams.payInfo){
     	locals.setObject("payInfo",$stateParams.payInfo);
     }
  $scope.payInfo=locals.getObject("payInfo")
  $scope.payType=0;
	$scope.chePay=function(type){
		$scope.payType=type;
	}
	$scope.payIt=function(){
		
	}
})
