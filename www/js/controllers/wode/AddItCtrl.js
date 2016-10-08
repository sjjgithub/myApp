angular.module('starter.controllers')
.controller('AddItCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandAddress/getAddressList?memberId=162";
	$scope.defApi=$rootScope.path+"elandAddress/setDefaultAddress?memberId=162&addressId=";
	
})
