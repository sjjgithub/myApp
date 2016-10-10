angular.module('starter.controllers')
.controller('SettingCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {
	if(!locals.getObject("userData")){		
		$state.go("denglu");
	}
	$scope.thisApi=""+locals.getObject("userData").memberId;
})
