angular.module('starter.controllers')
.controller('QuanCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,$ionicSlideBoxDelegate,locals) {
	$scope.thisApi=$rootScope.path+"elandCoupon/receiveCouponCenter?pageSize=10&pageIndex=1&memberId="+locals.get("memberId");
   
   	$scope.bannerApi=$rootScope.path+"elandAdv/getAdvPosition?apName=9";//限时广告接口
   	$http.get($scope.bannerApi)
        .success(function(data){  
        	console.log(data)
        	$scope.banners=data.data;
        	$ionicSlideBoxDelegate.loop(true);
        	$ionicSlideBoxDelegate.update();        	
        })
   	$http.get($scope.thisApi)
		.success(function(data){ 
			console.log(data);
			$scope.quans=data.data;
		})  
   
})
