angular.module('starter.controllers')
.controller('FenleiSearchCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,locals,$stateParams) {
	if($stateParams.gcId){
         	 locals.set("gcId",$stateParams.gcId);
         }	
         var memberId=locals.getObject("userData").memberId;
         var gcId=locals.get("gcId");
         console.log(gcId)
      $scope.thisApi=$rootScope.path+"elandBrand/screenGoods?gcId="+gcId+"&pageIndex=1&pageSize=20&";
      $scope.ordtype=0;//排序类别
	    $scope.soft=0;//价格排序默认升序
	    $scope.params="";
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
       	$scope.getGoods($scope.thisApi,$scope.params)
        $scope.pricClick=function (){
				event.stopPropagation();
				$scope.soft?$scope.soft=0:$scope.soft=1;
				$scope.param="price="+$scope.soft;
				$scope.getGoods($scope.thisApi,$scope.param);
			}//pricClick ed
		$scope.ordByIt=function(ind,scope){			
					$scope.ordtype=ind;
					
					switch ($scope.ordtype){
						case 1:
							$scope.params="saleNum=1";
							break;
						case 2:						
							$scope.params="price="+$scope.soft;
							break;
						default:
							$scope.params="";
							break;
					}
					$scope.getGoods($scope.thisApi,$scope.params);
			}//ordByIt ed
})
