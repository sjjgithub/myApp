angular.module('starter.controllers')
.controller('ResultCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,locals) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
			$scope.stores=[];//店铺集合
			$scope.goodsList=[];//商品集合
			$scope.ordtype=0;//排序类别
			$scope.soft=0;//价格排序默认升序
										//获取店铺
			$scope.searchres='';
			if($stateParams.keywords)locals.set("keywords",$stateParams.keywords);
			$scope.searchres=locals.get("keywords");
			$scope.param="key="+$scope.searchres+"&pageSize=10&pageIndex=1"//参数
			$scope.path1=$rootScope.path+"elandGoods/selectByGoodsNameList?";
			$scope.path2=$rootScope.path+"elandGoods/selectByGoodsNameAndSaleNum?";
			$scope.path3=$rootScope.path+"elandGoods/selectByGoodsNameAndPrice?";
			$scope.path=$scope.path1;
			function getStore(){
				$http.get($rootScope.path+"elandStore/getStoreByKeyWord?key="+$scope.searchres)
				.success(function(data){
					console.log(data)
					$scope.stores=data.data;				
				})//获取店铺ed
			}
			getStore();
			$scope.clearSearch=function(){
				$scope.searchres='';
				console.log(searchIt.keywords)			
				searchIt.keywords.focus();				
			}
			$scope.ordByIt=function(even,scope){
				var ordtype=$(even.target).index();
				
				if($scope.ordtype==ordtype){
						return;
				}else{
					$scope.ordtype=ordtype;
					switch($scope.ordtype){
						case 0:
							$scope.path=$scope.path1;
							break;
						case 1:
							$scope.path=$scope.path2;
							break;
						case 2:
							$scope.path=$scope.path3+"sort="+$scope.soft+"&";
							break;
					}
					$scope.getGoods($scope.path,$scope.param);
					}
			}//ordByIt ed
			$scope.pricClick=function (event){
				event.stopPropagation();
				$scope.ordtype=2;
				if($scope.soft==0){
					$scope.soft=1;
				}else{
					$scope.soft=0;
				}
				$scope.path=$scope.path3+"sort="+$scope.soft+"&";
				$scope.getGoods($scope.path,$scope.param);
			}//pricClick ed
			$scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
				$http.get(path+param)
						.success(function(data){
							console.log(data)
							$scope.goodsList=data.data;
						})
			}
			$scope.getGoods($scope.path,$scope.param);
			$scope.search=function(){
//				$scope.keywords=$scope.searchres;
				locals.set("keywords",$stateParams.searchres)
				getStore();
				$scope.param="key="+$scope.searchres+"&pageSize=10&pageIndex=1"//参数
				$scope.getGoods($scope.path,$scope.param);
			}
			//清空输入框
//			$scope.can=function(){
//				console.log(searchIt)
//				$scope.searchres="";				
//			}
		})
