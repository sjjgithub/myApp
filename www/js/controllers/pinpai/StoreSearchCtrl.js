angular.module('starter.controllers')
.controller('StoreSearchCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,locals) {
			var storeId=locals.get("storeId");
      $scope.thisApi=$rootScope.path+"elandGoods/selectStoreGoodsByOrder?pageIndex=1&pageSize=20&storeId="+storeId;
      $scope.ordtype=0;//排序类别
	    $scope.soft="desc";//价格排序默认升序
	    $scope.params="orderType="+$scope.ordtype;
        $scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
				$http.get(path+param)
						.success(function(data){
							console.log(data)
							$scope.goodsList=data.data;
							console.log($scope.goodsList)
						})
			}
       	$scope.getGoods($scope.thisApi,$scope.params)
        $scope.pricClick=function (event){
				event.stopPropagation();
				$scope.ordtype=2;
				if($scope.soft=="desc"){
					$scope.soft="asc";
				}else{
					$scope.soft="desc";
				}
				$scope.param=$scope.params="orderType="+$scope.ordtype+"&sort="+$scope.soft;
				$scope.getGoods($scope.thisApi,$scope.param);
			}//pricClick ed
		$scope.ordByIt=function(even,scope){
				var ordtype=$(even.target).index();
				
				if($scope.ordtype==ordtype){
						return;
				}else{
					$scope.ordtype=ordtype;
					$scope.params="orderType="+$scope.ordtype;
					if($scope.ordtype==2){
						$scope.params="orderType="+$scope.ordtype+"&sort="+$scope.soft;
					}
					$scope.getGoods($scope.thisApi,$scope.params);
					}
			}//ordByIt ed
})
