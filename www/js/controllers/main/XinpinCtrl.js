angular.module('starter.controllers')
.controller('XinpinCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,$ionicScrollDelegate,locals) {
			var PageIndex=1;	
      $scope.domore=false;    $scope.thisApi=$rootScope.path+"elandActivity/searchOrderActivityGoods?activityType=0&pageSize=10&pageIndex="+PageIndex+"&";
     $scope.carApi=$rootScope.path+"elandCart/cartNum?memberId="+locals.get("memberId");
	$http.get($scope.carApi)
	.success(function(data){
		console.log(data);
		$scope.cars=1+"..";
		if(data.status==0)$scope.cars=data.data;
		if($scope.cars>99){
			
		}
	})
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
				PageIndex=1;
				$scope.domore=false;
				$ionicScrollDelegate.scrollTop(false);
				$scope.param=$scope.params="orderType="+$scope.ordtype+"&sort="+$scope.soft;
				
				$scope.getGoods($scope.thisApi,$scope.param);
			}//pricClick ed
		$scope.ordByIt=function(ord){			
					$scope.ordtype=ord;
					$scope.params="orderType="+$scope.ordtype;
					if($scope.ordtype==2){
						$scope.params="orderType="+$scope.ordtype+"&sort="+$scope.soft;
					}
				PageIndex=1;
				$scope.domore=false;
				$ionicScrollDelegate.scrollTop(false);
					$scope.getGoods($scope.thisApi,$scope.params);
					
			}//ordByIt ed
    $scope.doRefresh = function () {  
            PageIndex++;           		var	thisApi=$rootScope.path+"elandActivity/searchOrderActivityGoods?activityType=2&pageSize=10&pageIndex="+PageIndex+"&";
         	$http.get(thisApi+$scope.params)
         	.success(function(data){
         		console.log(data)
         		if(data.data&&data.data.length>1){
         			$scope.goodsList=$scope.goodsList.concat(data.data);
         		}else{
         			$scope.domore=true;
         			if(PageIndex>1)shcemUtil.showMsg("没有更多数据了"); 
         		}
         	})
         	.finally(function(){
         		 $scope.$broadcast('scroll.infiniteScrollComplete'); 
         	})
		}    
})
