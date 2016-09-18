angular.module('starter.controllers')
.controller('ResultCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
// $scope.$on('$ionicView.enter', function(e) {
//  	
//  });
			$scope.path="/eland/api/elandGoods/selectByGoodsNameList?";
			$scope.stores=[];//店铺集合
			$scope.goodsList=[];//商品集合
			$scope.ordtype=0;//排序类别
			$scope.soft=0;//价格排序默认升序
			$scope.param="key="+$stateParams.keywords+"&pageSize=10&pageIndex=1"//参数
//获取店铺
//			$http.jsonp($rootScope.path+"/eland/api/elandStore/getStoreByKeyWord?key="+$stateParams.result+"&"+$rootScope.suffix)
			$http.get("data.php",{params:{url:$rootScope.path+"/eland/api/elandStore/getStoreByKeyWord",parm:"key",val:$stateParams.keywords}})
			.success(function(data){
				$scope.stores=data.data;
				
			})//获取店铺ed
			$scope.ordByIt=function(even){
				var ordtype=$(even.target).index()
				if($scope.ordtype==ordtype){
						return;
				}else{
					$scope.ordtype=ordtype;
					switch($scope.ordtype){
						case 0:
							$scope.path="/eland/api/elandGoods/selectByGoodsNameList?";
							break;
						case 1:
							$scope.path="/eland/api/elandGoods/selectByGoodsNameAndSaleNum?";
							break;
						case 2:
							$scope.path="/eland/api/elandGoods/selectByGoodsNameAndPrice?sort="+$scope.soft+"&";
							break;
					}
					$scope.getGoods($scope.path,$scope.param)
					}
			}//ordByIt ed
			$scope.pricClick=function (event){
				event.stopPropagation();
				$scope.ordtype=2;
				if($scope.soft==0){
					$scope.soft=1
				}else{
					$scope.soft=0
				}
				$scope.path="/eland/api/elandGoods/selectByGoodsNameAndPrice?sort="+$scope.soft+"&";
				$scope.getGoods($scope.path,$scope.param)
			}//pricClick ed
			$scope.getGoods=function(path,param){
				console.log($rootScope.path+path+param)
//获取商品
//			$http.jsonp($rootScope.path+"/eland/api/elandStore/getStoreByKeyWord?key="+$stateParams.result+"&"+$rootScope.suffix)

				$http.get("data.php",{params:{url:$rootScope.path+path+param}})
						.success(function(data){
							$scope.goodsList=data.data;
						})
			}
			$scope.getGoods($scope.path,$scope.param);
		})
