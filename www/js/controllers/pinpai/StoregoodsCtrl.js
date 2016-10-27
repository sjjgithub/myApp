angular.module('starter.controllers')
.controller('StoregoodsCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,locals,$stateParams) {
	if($stateParams.stcId){			
           locals.set("stcId",$stateParams.stcId);
       }	
    if($stateParams.stcType!=undefined){
         	 locals.set("stcType",$stateParams.stcType);
        }	
        console.log($stateParams)
         var stcId=locals.get("stcId")==" "?"":locals.get("stcId");
         var storeId=locals.get("storeId");
         var stcType=locals.get("stcType")|0;;
         console.log(stcType)
     $scope.thisApi=$rootScope.path+"elandGoods/selectStoreGoodsByOrder?pageIndex=1&pageSize=20&storeId="+storeId+"&stcId="+stcId;
     $scope.xinpinApi=$rootScope.path+"elandGoods/selectStoreGoodsByOrder?newGoods=1&pageIndex=1&pageSize=20&storeId="+storeId+"&stcId="+stcId;
     	$scope.ordtype=stcType;//排序类别
	    $scope.soft=0;//价格排序默认升序
	    $scope.params="";
	    console.log(storeId);
        $scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
				$http.get(path+param)
						.success(function(data){							
							if(!data.status){
								console.log(data)
								$scope.goodsList=data.data;
							}							
						})
			}
        $scope.pricClick=function (){
				event.stopPropagation();
				$scope.soft?$scope.soft=0:$scope.soft=1;
				$scope.param="&price="+$scope.soft;
				$scope.getGoods($scope.thisApi,$scope.param);
			}//pricClick ed
		$scope.ordByIt=function(ind){
					$scope.ordtype=ind;	
					 locals.set("stcType",$scope.ordtype);
					 console.log($scope.ordtype)
					switch ($scope.ordtype){
						case 1:
							$scope.params="&saleNum=1";
							$scope.getGoods($scope.thisApi,$scope.params);
							break;
						case 2:						
							$scope.params="";
							$scope.getGoods($scope.xinpinApi,$scope.params);
							break;
						case 3:	
							$scope.params="&price="+$scope.soft;
							$scope.getGoods($scope.thisApi,$scope.params);
							break;	
						default:
							$scope.params="";
							$scope.getGoods($scope.thisApi,$scope.params);
							break;
					}
					
			}//ordByIt ed
			$scope.ordByIt($scope.ordtype)
})
