angular.module('starter.controllers')
.controller('TuiHistoryCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	if($stateParams.tuiType||$stateParams.tuiType==0){locals.set("tuiType",$stateParams.tuiType);}
	var memberId=locals.getObject("userData").memberId;
	$scope.tuiApi=$rootScope.path+"elandRefundLog/selectRefundLog?memberId="+memberId;
	$scope.huanApi=$rootScope.path+"elandChange/selectChangeLog?memberId="+memberId;
	$scope.ordtype=locals.get("tuiType");
	console.log(locals.get("tuiType"))
	$scope.getGoods=function(type){
			//获取商品
			console.log(type)
		var path="";
		type==0?path=$scope.tuiApi:path=$scope.huanApi;
		console.log(path)
		$http.get(path)
		.success(function(data){
			console.log(data);
			$scope.ordersIt=data.data;	
			if(type==0){
				for (k in $scope.ordersIt) {
					switch ($scope.ordersIt[k].refundState){
					case 1:
						$scope.ordersIt[k].refundState="'待处理";
						break;
					case 2:
						$scope.ordersIt[k].refundState="卖家同意";
						break;
					case 3:
						$scope.ordersIt[k].refundState="卖家拒绝";
						break;
					case 4:
						$scope.ordersIt[k].refundState="平台同意";
						break;
					case 5:
						$scope.ordersIt[k].refundState="平台拒绝";
						break;
					default:
						$scope.ordersIt[k].refundState="已收到货物";
						break;
				}
			  }				
			}else{
				for (k in $scope.ordersIt) {
				switch ($scope.ordersIt[k].changeStatus){
					case 1:
						$scope.ordersIt[k].changeStatus="待处理";
						break;
					case 2:
						$scope.ordersIt[k].changeStatus="卖家同意，待买家寄回";
						break;
					case 3:
						$scope.ordersIt[k].changeStatus="买家已寄回商品";
						break;
					case 4:
						$scope.ordersIt[k].changeStatus="卖家确认收货待发货";
						break;
					case 5:
						$scope.ordersIt[k].changeStatus="已完成";
						break;
					case 6:
						$scope.ordersIt[k].changeStatus="卖家拒绝换货";
						break;
				}
			 }
			}
	   })
	}
		$scope.getGoods($scope.ordtype)
		$scope.ordByIt=function(ind){									
					$scope.ordtype=ind;
					locals.set("tuiType",$scope.ordtype);
					console.log(ind)
					$scope.getGoods($scope.ordtype);
			}//ordByIt ed                    
})
