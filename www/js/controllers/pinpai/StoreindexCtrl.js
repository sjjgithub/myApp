angular.module('starter.controllers')
.controller('StoreIndexCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$stateParams,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover,locals) {
	if($stateParams.storeId){
         	 locals.set("storeId",$stateParams.storeId);
         }	
         var memberId=locals.get("memberId");
         var storeId=locals.get("storeId");
    $scope.itshow=false;
    $scope.storeApi=$rootScope.path+"elandStore/getStoreInfoDetail?memberId="+memberId+"&storeId="+storeId; 
    $scope.goodsApi=$rootScope.path+"elandStore/selectStorePage?pageIndex=1&pageSize=20&storeId="+storeId;
    $scope.shoucangApi=$rootScope.path+"elandStore/collectStore?memberId="+memberId+"&storeId="+storeId+"&isCollect=";
    $scope.ordtype=0;//排序类别
	$http.get($scope.storeApi)
	.success(function(data){		
		if(!data.status){
			$scope.storeIt=data.data[0];
			locals.setObject("storeInfo",$scope.storeIt)
			console.log($scope.storeIt)
		}
	})
	$http.get($scope.goodsApi)
	.success(function(data){
		console.log(data)
		var arr=[];
		if(!data.status){
			var obj=data.data.advLt;
			for (k in obj) {
				switch (obj[k].advModuleType){
					case 1:
						arr.push(obj[k].advDetail[0]);
						break;
					case 2:		
						$scope.adv12=obj[k].advDetail;
						break;
					case 3:
						$scope.adv2=obj[k].advDetail;
						break;
					case 4:
						$scope.adv3l=obj[k].advDetail[0];
						if(obj[k]){
							$scope.adv3r=[];
						for (i in obj[k].advDetail) {
							if(k>0){
								$scope.adv3r.push(obj[k].advDetail[i])
							}
						}
						}
						break;
				}
			}
			if(arr){
				$scope.adv1=arr[0];
				if(arr.length<=1){
				$scope.adv4=arr[1];
				}
			}
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
