angular.module('starter.controllers')
.controller('MainCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover) {
$scope.baneerApi=$rootScope.path+"/eland/api/elandAdv/getAdvPosition?apName=1";
$scope.xisnhiApi=$rootScope.path+"/eland/api/elandXianshi/getXianshiBuy";
$scope.xinpinApi=$rootScope.path+ "/eland/api/elandActivity/newRecommend?memberId=1&&pageSize=4&&pageIndex=1";              
$scope.quanApi=$rootScope.path+"/eland/api/elandCoupon/getRecommendCoupon?memberId=0"; 
$scope.weekApi=$rootScope.path+ "/eland/api/elandActivity/weekRecommend?memberId=1&&pageSize=4&&pageIndex=1";
$scope.hotApi=$rootScope.path+ "/eland/api/elandActivity/hotRecommend?memberId=1&&pageSize=4&&pageIndex=1";  
$scope.loveApi=$rootScope.path+ "/eland/api/elandLabel/guessYourLike?memberId=1&&pageSize=4&&pageIndex=1";
$ionicSlideBoxDelegate.update();
        $http.get("data.php",{params:{url:$scope.baneerApi}})
                .success(function(data){  
                	console.log(data);
                	$scope.banners=data.data;
                })//top广告		
                $http.get("data.php", {params: {url:$scope.xisnhiApi}})
                        .success(function (data){
                            console.log(data);
                            $scope.xianshifoods = data.data;                          
                                var star= $scope.xianshifoods[0].startTime;
                                var end= $scope.xianshifoods[0].endTime;
                                var dom=$scope.xianshifoods[0].xianshiId;                                                        						timer({"dom":"#xianshi"+dom,"star":star,"end":end})
                          
                        })
                        .error(function () {                           	
                        	console.log(shcemUtil)
                        })//限时抢购
                $http.get("data.php", {params: {url:$scope.quanApi}})
                        .success(function(data){
                        	console.log(data);
                            $scope.quans = data.data;
                        })
                        .error(function(){
                            alert("券数据请求失败")
                        })//券        
                $http.get("data.php", {params: {url:$scope.xinpinApi}})
                        .success(function(data){
                            $scope.newfoods = data.data;
                        })
                        .error(function(){
                            alert("新品推荐数据请求失败")
                        })//新品推荐
                $http.get("data.php", {params: {url:$scope.weekApi}})
                        .success(function(data){
                            $scope.weekfoods = data.data;                    
                        })
                        .error(function(){
                            alert("每周更新数据请求失败")
                        })//每周更新
                $http.get("data.php", {params: {url:$scope.hotApi}})
                        .success(function(data){
                            $scope.hotgoods = data.data;                      
                        })
                        .error(function(){
                            alert("热销推荐数据请求失败")
                        })//热销
                $http.get("data.php", {params: {url:$scope.loveApi}})
                        .success(function(data){
                            $scope.youlove = data.data;
                        })
                        .error(function(){
                            alert("猜你喜欢数据请求失败")
                        })//猜你喜欢
                
})
