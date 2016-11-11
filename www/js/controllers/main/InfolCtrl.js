angular.module('starter.controllers')
.controller('InfoCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,locals) {
	$scope.thisApi=$rootScope.path+"elandMessage/messageClass?memberId="+locals.get("memberId");
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		$scope.infos=data.data;
	})
         
})
