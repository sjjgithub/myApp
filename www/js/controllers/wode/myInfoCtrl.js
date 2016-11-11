angular.module('starter.controllers')
.controller('MyinfoCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {	
	var memberId=locals.get("memberId")
	$scope.thisApi=$rootScope.path+"elandPersonalCenter/getPersonalCenterInfo?memberId="+memberId;
	$scope.infosApi=$rootScope.path+"elandOrder/getAllOrderStateCount?memberId="+memberId;
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
