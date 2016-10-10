angular.module('starter.controllers')
.controller('MyshouCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	if(!locals.getObject("userData")){$state.go("denglu");}
	$scope.thisgoodsApi=$rootScope.path+"elandFavorites/getFavoritesGoodsList?memberId="+locals.getObject("userData").memberId;
	$scope.thisStoreApi=$rootScope.path+"elandFavorites/getFavoritesStoresList?memberId="+locals.getObject("userData").memberId;
	$scope.ordtype=0;
	
	$scope.getGoods=function(param){
		if(!param){
					$http.get($scope.thisgoodsApi)
					.success(function(data){
						console.log(data);
						$scope.ordersGoods=data.data;
			
					})
			        .error(function(){
			       	
			        })
				}else{$http.get($scope.thisStoreApi)
					.success(function(data){
						console.log(data);
						$scope.ordersStores=data.data;
			
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
