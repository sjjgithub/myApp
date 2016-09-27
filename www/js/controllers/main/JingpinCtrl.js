angular.module('starter.controllers')
.controller('JingpinCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
        $scope.thisApi=$rootScope.path+"elandActivity/searchOrderActivityGoods?activityType=1&pageSize=10&pageIndex=1&";
        $scope.thisBanApi=$rootScope.path+"elandAdv/getAdvPosition?apName=3"
        $scope.ordtype=0;//排序类别
	    $scope.soft="desc";//价格排序默认升序
	    $scope.params="orderType="+$scope.ordtype;
	    $http.get($scope.thisBanApi)
	    .success(function(data){
	    	console.log(data);
	    	$scope.banners=data.data;
	    })
        $scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
				$http.get(path+param)
						.success(function(data){
							console.log(data)
							$scope.goodsList=data.data.activityList;
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
