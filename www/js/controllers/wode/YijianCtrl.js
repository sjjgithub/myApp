angular.module('starter.controllers')
.controller('YijianCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover) {
	$scope.thisApi=$rootScope.path+"elandPersonalCenter/getPersonalCenterInfo?memberId=162";
	$scope.infosApi=$rootScope.path+"elandOrder/getAllOrderStateCount?memberId=20";
	$scope.yijianIt="";
	$scope.putIt=function(){
		if($scope.yijianIt==""){
			shcemUtil.showMsg("内容不能为空");
		}else{
			
		}
	}
})
