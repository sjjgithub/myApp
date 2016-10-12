angular.module('starter.controllers')
.controller('SettingCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {	
	$scope.thisApi=""+locals.getObject("userData").memberId;
	$scope.exitIt=function(){
		locals.delItem("userData");
		$state.go("denglu");
	}
})
