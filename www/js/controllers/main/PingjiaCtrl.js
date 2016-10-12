angular.module('starter.controllers')
.controller('PingjiaCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover,locals) {	
   var goodId=locals.get("goodIt");
   $scope.ordtype=2;//排序类别
   $scope.thisApi=$rootScope.path+"elandEvaluateGoods/getEvaluatePage?goodsId="+goodId+"&pageIndex=1&pageSize=3&gevalstatLevel=";
  
	function getPingjias(type){
		if(type==2){type=""}
		$http.get($scope.thisApi+type)
		.success(function(data){
			console.log(data);
			if(!data.status){
				$scope.pingjias=data.data.detail;
			}			
		})
	}
  getPingjias($scope.ordtype);
  $scope.ordByIt=function(type){
  	$scope.ordtype=type;
  	getPingjias($scope.ordtype);
  }
})
