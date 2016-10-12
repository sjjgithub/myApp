angular.module('starter.controllers')
.controller('YijianCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {
	
	$scope.thisApi=$rootScope.path+"elandPersonalCenter/getPersonalCenterInfo?memberId="+locals.getObject("userData").memberId;
	$scope.infosApi=$rootScope.path+"elandOrder/getAllOrderStateCount?memberId="+locals.getObject("userData").memberId;
	$scope.yijianIt="";
	$scope.putIt=function(){
		if($scope.yijianIt==""){
			shcemUtil.showMsg("内容不能为空");
		}else{
			
		}
	}
})
