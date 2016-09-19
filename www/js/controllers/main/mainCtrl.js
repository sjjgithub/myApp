angular.module('starter.controllers')
.controller('MainCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover) {
$scope.homeApi=$rootScope.path+"/eland/api/elandHome/getHomePage?memberId=30&&apName=1&&count=3";
$scope.homeListApi=$rootScope.path+"/eland/api/elandHome/getHomeRecommend?memberId=30&&pageSize=6&&pageIndex=1"
$scope.bannerQuanApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=2"; 
$scope.bannerJingpinApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=3"; 
$scope.bannerRexiaoApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=4"; 
$scope.bannerLoveApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=5"; 
$ionicSlideBoxDelegate.update();
 	$http.get("data.php",{params:{url:$scope.homeApi}})
                .success(function(data){  
                	console.log(data);
              		$scope.banners=data.data.advlist;
              		$scope.xianshifoods=data.data.xianshiList;
              			var star= $scope.xianshifoods[0].startTime;
                    	var end= $scope.xianshifoods[0].endTime;
                       	var dom=$scope.xianshifoods[0].xianshiId;                                                        						timer({"dom":"#xianshi"+dom,"star":star,"end":end})    
                    $scope.quans=data.data.couponRecommendList;  
                })//广告 券 限时	
    $http.get("data.php",{params:{url:$scope.homeListApi}})
                .success(function(data){  
                	console.log(data);                         	
                    $scope.newfoods=data.data.newRecommendList;					
					$scope.weekfoods=data.data.weekRecommendList;
					$scope.hotgoods =data.data.hotRecommendList;  
					$scope.youlove=data.data.totalLikeList;  
                })//list	            
        $http.get("data.php", {params: {url:$scope.bannerQuanApi}})
                        .success(function(data){
                            $scope.bannerQuan = data.data;
                        })
                        .error(function(){
                            alert("券banner请求失败")
                        })//券   
        $http.get("data.php", {params: {url:$scope.bannerJingpinApi}})
                        .success(function(data){
                            $scope.bannerJingpin = data.data;
                        })
                        .error(function(){
                            alert("精品banner请求失败")
                        })//精品  
        $http.get("data.php", {params: {url:$scope.bannerRexiaoApi}})
                        .success(function(data){
                            $scope.bannerRexiao = data.data;
                        })
                        .error(function(){
                            alert("热销banner请求失败")
                        })//热销  
        $http.get("data.php", {params: {url:$scope.bannerLoveApi}})
                        .success(function(data){
                            $scope.bannerLove = data.data;
                        })
                        .error(function(){
                            alert("喜欢banner请求失败")
                        })//喜欢                               
                       scrollX({dom:".scrolx"})
                                      
})
