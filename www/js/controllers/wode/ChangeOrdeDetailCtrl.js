angular.module('starter.controllers')
.controller('ChangeOrderDetailCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicPopup) {
	console.log($stateParams.changeId)
	console.log($stateParams.specIdFrom)
	if($stateParams.changeId){locals.set("changeId",$stateParams.changeId);locals.set("specIdFrom",$stateParams.specIdFrom);}
	var changeId=locals.get("changeId");
	var specIdFrom=locals.get("specIdFrom");
	console.log(changeId)
	console.log(specIdFrom)
	var memberId=locals.getObject("userData").memberId;
	$scope.thisApi=$rootScope.path+"elandChange/selectChangeDetail?memberId="+memberId+"&changeId="+changeId+"&specId="+specIdFrom;
	console.log($scope.thisApi)
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		if(!data.status){
			$scope.detail=data.data;
			console.log($scope.detail)	
			switch ($scope.detail.changeStatus){
				case 1:
					$scope.detail.changeStatus="待处理";
					break;
				case 2:
					$scope.detail.changeStatus="卖家同意，待买家寄回";
					break;
				case 3:
					$scope.detail.changeStatus="买家已寄回商品";
					break;
				case 4:
					$scope.detail.changeStatus="卖家确认收货待发货";
					break;
				case 5:
					$scope.detail.changeStatus="已完成";
					break;
				case 6:
					$scope.detail.changeStatus="卖家拒绝换货";
					break;
			}
		}
	})
})
