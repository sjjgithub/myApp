angular.module('starter.controllers')
.controller('SettingCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandPersonalCenter/getPersonalCenterInfo?memberId=162";
	$scope.infosApi=$rootScope.path+"elandOrder/getAllOrderStateCount?memberId=20"
	$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.personIt=data.data;
		})
        .error(function(){
        	
        })
    $http.get($scope.infosApi)
		.success(function(data){
			console.log(data)
			$scope.infos=data.data;
		})
        .error(function(){
        	
        })    
    
})
