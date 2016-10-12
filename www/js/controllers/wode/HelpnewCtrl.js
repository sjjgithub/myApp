angular.module('starter.controllers')
.controller('HelpnewCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandSetting/selectSetting?type=22";	
	$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.aboutIt=data.data;
		})
        .error(function(){
        	
        })
})
