angular.module('starter.controllers')
.controller('MainCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover,locals) {
var memberId=locals.getObject("userData").memberId;
$scope.homeApi=$rootScope.path+"elandHome/getHomePage?memberId="+memberId+"&apName=1&count=3";
$scope.homeListApi=$rootScope.path+"elandHome/getHomeRecommend?memberId="+memberId+"&pageSize=6&pageIndex=1"
$scope.bannerQuanApi=$rootScope.path+"elandAdv/getAdvPosition?apName=2"; 
$scope.bannerJingpinApi=$rootScope.path+"elandAdv/getAdvPosition?apName=3"; 
$scope.bannerRexiaoApi=$rootScope.path+"elandAdv/getAdvPosition?apName=4"; 
$scope.bannerLoveApi=$rootScope.path+"elandAdv/getAdvPosition?apName=5"; 
$scope.rexiaoApi=$rootScope.path+"elandBrand/selectRandomBrand";
$scope.lingquApi=$rootScope.path+"elandCoupon/receiveCoupon?memberId="+memberId+"&couponId=";
function getone(){
	 	$http.get($scope.homeApi)
                .success(function(data){  
                	console.log(data);
              		$scope.banners=data.data?data.data.advlist:null;
              		$ionicSlideBoxDelegate.update();
              		$ionicSlideBoxDelegate.loop(true);
              		$scope.xianshifoods=data.data&&data.data.xianshiList>0?data.data.xianshiList:null;               		
              		if($scope.xianshifoods&&data.data.xianshiList.length>0){
              			var star= $scope.xianshifoods[0].startTime;
                    	var end= $scope.xianshifoods[0].endTime;
                       	var dom=$scope.xianshifoods[0].xianshiId;                                                        						timer({"dom":"#xianshi"+dom,"star":$scope.xianshifoods[0].sysTime,"end":$scope.xianshifoods[0].endTime})    
              		}             			
                    $scope.quans=data.data?data.data.couponRecommendList:null;  
                })//广告 券 限时	
                .error(function(){
                	shcemUtil.showMsg("加载失败");
                })
}
	getone();
    	$http.get($scope.homeListApi)
                .success(function(data){  
                	console.log(data)
                	     if(!data.status){
                	     	 $scope.newfoods=data.data.newRecommendList;					
							$scope.weekfoods=data.data.weekRecommendList;
							$scope.hotgoods =data.data.hotRecommendList;  
							$scope.youlove=data.data.totalLikeList;  
                	     }
                   
                })//list	
        $http.get($scope.rexiaoApi)
                        .success(function(data){
                        	console.log(data)
                            $scope.rexiaos=data.data;
                        })
                        .error(function(){
                            alert("券banner请求失败")
                        })// 
        $http.get($scope.bannerQuanApi)
                        .success(function(data){
                            $scope.bannerQuan=data.data;
                        })
                        .error(function(){
                           
                        })//
        $http.get($scope.bannerJingpinApi)
                        .success(function(data){
                        	
                            $scope.bannerJingpin= data.data;
                        })
                        .error(function(){
                           
                        })//精品  
        $http.get($scope.bannerRexiaoApi)
                        .success(function(data){
                            $scope.bannerRexiao= data.data;
                        })
                        .error(function(){
                            
                        })//热销  
        $http.get($scope.bannerLoveApi)
                        .success(function(data){
                            $scope.bannerLove = data.data;
                        })
                        .error(function(){
                          
                        })//喜欢     
        $scope.lingqu=function(quanId,isGet){
        	if(isGet){
        		$http.get(lingquApi+quanId)
	        	.success(function(data){
	        		console.log(data);
	        		shcemUtil.showMsg(data.msg,2000)
	        		if(!data.status){
	        			getone();
	        		}
	        	})
        	}else{
        		shcemUtil.showMsg("该优惠券您已领过啦！",2000)
        	}
        	
        }
                       scrollX({dom:".scrolx"})                                     
})
