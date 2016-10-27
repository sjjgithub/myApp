angular.module('starter.controllers')
.controller('MyorderCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	console.log($stateParams.ordType)
	$scope.thisApi=$rootScope.path+"elandOrder/getOrderList?memberId="+locals.getObject("userData").memberId+"&pageIndex=1&pageSize=10&orderState=";
	if($stateParams.ordType||$stateParams.ordType==0){locals.set("ordType",$stateParams.ordType);}
	$scope.ordtype=locals.get("ordType");
	$scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
		$http.get(path+param)
		.success(function(data){
			console.log(data);
			$scope.ordersIt=data.data;
			for(order in $scope.ordersIt){
				switch ($scope.ordersIt[order].orderState){
					case 0:
						$scope.ordersIt[order].orderState="已取消";
						break;
					case 10:
						$scope.ordersIt[order].orderState="未付款";
						break;
					case 20:
						$scope.ordersIt[order].orderState="待发货";
						break;
					case 30:
						$scope.ordersIt[order].orderState="待收货";
						break;
					case 40:
						$scope.ordersIt[order].orderState="待评价";
						break;
					case 50:
						$scope.ordersIt[order].orderState="已完成";
						break;
					case 60:
						$scope.ordersIt[order].orderState="退款";
						break;
					case 70:
						$scope.ordersIt[order].orderState="退款退货";
						break;
					case 80:
						$scope.ordersIt[order].orderState="已关闭";
						break;
					default:
						$scope.ordersIt[order].orderState="未付款";
						break;
				}
			}
		})
        .error(function(){
       	
        })
			}
	console.log($scope.ordtype)
       	$scope.getGoods($scope.thisApi,$scope.ordtype)
		$scope.ordByIt=function(ind){									
					$scope.ordtype=ind;
					locals.set("ordType",$scope.ordtype);
					console.log(ind)
					$scope.getGoods($scope.thisApi,$scope.ordtype);
			}//ordByIt ed                    
})
