angular.module('starter.controllers')
.controller('ReturnOrderDetailCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicPopup) {
	if($stateParams.tuiOrderId){locals.set("tuiOrderId",$stateParams.tuiOrderId)}
	var orderId=locals.get("tuiOrderId");
	console.log(orderId)
	var memberId=locals.get("memberId");
	$scope.thisApi=$rootScope.path+"elandRefundLog/selectRefundDetail?memberId="+memberId+"&orderId="+orderId;
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		if(!data.status){
			$scope.detail=data.data;
			console.log($scope.detail)
			switch ($scope.detail.refundState){
					case 1:
						$scope.detail.refundState="'待处理";
						break;
					case 2:
						$scope.detail.refundState="卖家同意";
						break;
					case 3:
						$scope.detail.refundState="卖家拒绝";
						break;
					case 4:
						$scope.detail.refundState="平台同意";
						break;
					case 5:
						$scope.detail.refundState="平台拒绝";
						break;
					default:
						$scope.detail.refundState="已收到货物";
						break;
			}
		}
	})
})
