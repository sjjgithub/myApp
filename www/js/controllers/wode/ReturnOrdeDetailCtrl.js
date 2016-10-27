angular.module('starter.controllers')
.controller('ReturnOrderDetailCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicPopup) {
	var orderId=locals.get("orderId");
	var memberId=locals.getObject("userData").memberId;
	$scope.thisApi=$rootScope.path+"elandRefundLog/selectRefundDetail?memberId="+memberId+"&orderId="+orderId;
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		if(!data.status){
			$scope.detail=data.data;
			switch ($scope.detail.refundState){
				case 1:
					$scope.detail.refundState="待处理";
					break;
				default:
					
					break;
			}
		}
	})
})
