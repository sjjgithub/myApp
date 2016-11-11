angular.module('starter.controllers')
.controller('MyshouCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	var memberId=locals.get("memberId")
	$scope.thisgoodsApi=$rootScope.path+"elandFavorites/getFavoritesGoodsList?memberId="+memberId;
	$scope.thisStoreApi=$rootScope.path+"elandFavorites/getFavoritesStoresList?memberId="+memberId;
	$scope.ordtype=0;
	console.log(locals.get("shouOrd"))
	if(locals.get("shouOrd"))$scope.ordtype=locals.get("shouOrd");
	$scope.getGoods=function(param){
		if(param==0){
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
				locals.set("shouOrd",ind)
				$scope.ordtype=ind;
				$scope.getGoods($scope.ordtype);
			}//ordByIt ed                    
})
