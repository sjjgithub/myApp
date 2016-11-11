angular.module('starter.controllers')
.controller('SettingCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {	
	$scope.exitIt=function(){
		locals.delItem("memberId");
		$state.go("denglu");
	}
})
