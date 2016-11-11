angular.module('starter.controllers')
.controller('MyshouCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	var =locals.get("memberId")
	$scope.thisgoodsApi=$rootScope.path+"elandFavorites/getFavoritesGoodsList?memberId="+memberId;
	$scope.thisStoreApi=$rootScope.path+"elandFavorites/getFavoritesStoresList?memberId="+memberId;
	$scope.ordtype=0;
	
	$scope.getGoods=function(param){
		if(!param){
					$http.get($scope.thisgoodsApi)
					.success(function(data){
						console.log(data);
						$scope.ordersGoods=data.data;
						$scope.ordersStores=null;
					})
			        .error(function(){
			       	
			        })
				}else{$http.get($scope.thisStoreApi)
					.success(function(data){
						console.log(data);
						$scope.ordersStores=data.data;
						$scope.ordersGoods=null;
					})
			        .error(function(){
			       	
			        })}
			//获取商品
		
			}
       	$scope.getGoods($scope.ordtype)
		$scope.ordByIt=function(ind){					
				if($scope.ordtype==ind){
						return;
				}else{
					$scope.ordtype=ind;
					$scope.getGoods($scope.ordtype);
					}
			}//ordByIt ed                    
})
