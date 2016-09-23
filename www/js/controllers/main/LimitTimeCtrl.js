angular.module('starter.controllers')
.controller('LimitTimeCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,$ionicSlideBoxDelegate) {
		$scope.index=0;
		$scope.xianshiStar;
        $scope.bannerApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=7";//限时广告接口
        $scope.xianshisApi=$rootScope.path+"/eland/api/elandXianshi/specialClassification";
 		$scope.goodsUrl=$rootScope.path+"/eland/api/elandXianshi/specialGoodsList?&pageSize=10&pageIndex=1&";
       if($stateParams.limitId){
       	 $rootScope.zhunchangid=$stateParams.limitId;
       }
      
       $http.get("data.php",{params:{url:$scope.bannerApi}})
        .success(function(data){  
        	console.log(data)
        	$scope.banners=data.data;
        })
       
      $scope.zhuanchang=function(id){      		
       		$http.get("data.php",{params:{url:$scope.xianshisApi}})
        		.success(function(data){  
        		console.log(data);
        			$scope.xianshisIt=data.data.length>0?data.data:null;
        			
					for(var i=0;i<$scope.xianshisIt.length;i++){
						if(id==$scope.xianshisIt[i].xianshiId){	
							$scope.index=i;								
						}
					}
				
        			$scope.xianshinow=$scope.xianshisIt[$scope.index];
       				console.log($scope.xianshinow);
       				$scope.xianshiStar=$scope.xianshinow.xianshiState==1?true:false;       				      				
               	 	if($scope.xianshiStar){   
               	 		new timer({"dom":"#xianshiT"+$scope.xianshinow.xianshiId,"star":$scope.xianshinow.sysTime,"end":$scope.xianshinow.endTime})               		             		
                	}else{
        new timer({"dom":"#xianshiT"+$scope.xianshinow.xianshiId,"star":$scope.xianshinow.sysTime,"end":$scope.xianshinow.startTime})        
                	}      
			        $scope.goodsApi=$scope.goodsUrl+"xianshiId="+$scope.xianshinow.xianshiId;;
			        $http.get("data.php",{params:{url:$scope.goodsApi}})
			        	.success(function(data){ 
			        		console.log(data);
			        		$scope.goods=data.data;
			        	})      	
        		})   	      		       		       			
       }
    
 		$scope.zhuanchang($rootScope.zhunchangid); 
       //轮播
        $scope.slideHasChanged=function(index,banners){
        		$scope.actindex=index-banners.length+1<=0?index:index-banners.length;
        
       		 }
})
