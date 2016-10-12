angular.module('starter.controllers')
.controller('StoreCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$stateParams,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover,locals) {
	if($stateParams.storeId){
         	 locals.set("storeId",$stateParams.storeId);
         }	
         var memberId=locals.getObject("userData").memberId;
         var storeId=locals.get("storeId");
    $scope.storeApi=$rootScope.path+"elandStore/getStoreInfoDetail?memberId="+memberId+"&storeId="+storeId; 
    $scope.goodsApi=$rootScope.path+"elandStore/selectStorePage?pageIndex=1&pageSize=20&storeId="+storeId;
    $scope.shoucangApi=$rootScope.path+"elandStore/collectStore?memberId="+memberId+"&storeId="+storeId+"&isCollect=";
    $scope.ordtype=0;//排序类别
	$http.get($scope.storeApi)
	.success(function(data){		
		if(!data.status){
			$scope.storeIt=data.data[0];
			console.log($scope.storeIt)
		}
	})
	$http.get($scope.goodsApi)
	.success(function(data){
		console.log(data)
		if(!data.status){
			$scope.adv1=data.data.advLt[0].advDetail[0];
			$scope.adv2=data.data.advLt[1].advDetail;
			
			$scope.adv3l=data.data.advLt[2].advDetail[0];
			$scope.adv3r=[];
			for (k in data.data.advLt[2].advDetail) {
				if(k>0){
					$scope.adv3r.push(data.data.advLt[2].advDetail[k])
				}
			}
			$scope.adv4=data.data.advLt[3].advDetail[0];
			$scope.storesIt=data.data.recommendClassLt;
		}		
	})  
	$scope.collectionIt=function(type){
	 	type==0?type=1:type=0;
	 	console.log(type)
	 	$http.get($scope.shoucangApi+type)
	 	.success(function(data){
	 		console.log(data);	 		
	 		shcemUtil.showMsg(data.msg,2000);
	 		if(!data.status){
	 			$scope.storeIt.isCollect=type;
	 		}
	 	})
	 } 
})
