angular.module('starter.controllers')
.controller('LimitTimeCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,$ionicSlideBoxDelegate) {
	
        $scope.bannerApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=7";//限时广告接口
        $scope.xianshisApi=$rootScope.path+"/eland/api/elandXianshi/specialClassification";
 $scope.goodsApi=$rootScope.path+"/eland/api/elandXianshi/specialGoodsList?xianshiId=1&pageSize=10&pageIndex=1"
        $http.get("data.php",{params:{url:$scope.bannerApi}})
        .success(function(data){       	
        	$scope.banners=data.data;
        })
         $http.get("data.php",{params:{url:$scope.xianshisApi}})
        .success(function(data){  
        	
        	$scope.xianshisIt=data.data;
        	console.log($scope.xianshisIt);
        				var star= $scope.xianshisIt[0].startTime;
                    	var end= $scope.xianshisIt[0].endTime;
                       	var dom=$scope.xianshisIt[0].xianshiId;                                                        						timer({"dom":"#xianshi"+dom,"star":star,"end":end})    
        	
        })
        $http.get("data.php",{params:{url:$scope.goodsApi}})
        .success(function(data){ 
        	console.log(data)
        	$scope.goods=data.data;
        })
        $scope.slideHasChanged=function(index,banners){
        		$scope.actindex=index-banners.length+1<=0?index:index-banners.length;
        
       		 }
})
