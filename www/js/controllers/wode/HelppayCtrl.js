angular.module('starter.controllers')
.controller('HelppayCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandSetting/selectSetting?type=17";
	
	$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.helpIt=data.data;
		})
        .error(function(){
        	
        })
})
