angular.module('starter.controllers')
.controller('MyorderCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicScrollDelegate) {
	console.log($stateParams.ordType)
	var pageIndex=1;
	$scope.more=false;
	$scope.thisApi=$rootScope.path+"elandOrder/getOrderList?memberId="+locals.get("memberId")+"&pageSize=10&orderState=";
	if($stateParams.ordType||$stateParams.ordType==0){locals.set("ordType",$stateParams.ordType);}
	$scope.ordtype=locals.get("ordType");
			function stateBian(arr){
					for(order in arr){
				switch (arr[order].orderState){
					case 0:
						arr[order].orderState="已取消";
						break;
					case 10:
						arr[order].orderState="未付款";
						break;
					case 20:
						arr[order].orderState="待发货";
						break;
					case 30:
						arr[order].orderState="待收货";
						break;
					case 40:
						arr[order].orderState="待评价";
						break;
					case 50:
						arr[order].orderState="已完成";
						break;
					case 60:
						arr[order].orderState="退款";
						break;
					case 70:
						arr[order].orderState="退款退货";
						break;
					case 80:
						arr[order].orderState="已关闭";
						break;
					default:
						arr[order].orderState="未付款";
						break;
				}
			}
			return arr;
			}
	$scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
		$http.get(path+param)
		.success(function(data){
			console.log(data);
			$scope.ordersIt=data.data;
			stateBian($scope.ordersIt)		
		})
	}
	$scope.goIt=function(orderIt){
		$state.go("myorderDetail",{'orderId':orderIt.orderId,'orderState':orderIt.orderState})
	}
       	$scope.getGoods($scope.thisApi,$scope.ordtype+"&pageIndex="+pageIndex)
		$scope.ordByIt=function(ind){									
					$scope.ordtype=ind;
					pageIndex=1;
					$scope.more=false;
					locals.set("ordType",$scope.ordtype);
					console.log(ind)
					$ionicScrollDelegate.scrollTop(false)
					$scope.getGoods($scope.thisApi,$scope.ordtype+"&pageIndex="+pageIndex);
			}//ordByIt ed     
		$scope.loadMoreData=function(){
				pageIndex++;
				console.log($scope.thisApi+$scope.ordtype+"&pageIndex="+pageIndex)				
				$http.get($scope.thisApi+$scope.ordtype+"&pageIndex="+pageIndex)
				.success(function(data){
					console.log(data);
					if(data.data.length>1&&data.status==0){
						stateBian(data.data);	
						$scope.ordersIt=$scope.ordersIt.concat(data.data)
					}else{
						$scope.more=true;
						if(pageIndex>1){
							shcemUtil.showMsg("没有更多数据了");
						}
						
					}										
				})
				.finally(function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
			
			}
	
})
