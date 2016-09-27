angular.module('starter.controllers')
.controller('InfoCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
	$scope.thisApi=$rootScope.path+"elandMessage/messageClass?memberId=7";
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		$scope.infos=data.data;
	})
         
})
