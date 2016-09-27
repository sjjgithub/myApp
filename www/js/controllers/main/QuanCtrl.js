angular.module('starter.controllers')
.controller('QuanCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,$ionicSlideBoxDelegate) {
    $scope.thisApi=$rootScope.path+"elandCoupon/receiveCouponCenter?goodsId=246&memberId=5&pageSize=10&pageIndex=1";
   	$scope.bannerApi=$rootScope.path+"elandAdv/getAdvPosition?apName=9";//限时广告接口
   	$http.get($scope.bannerApi)
        .success(function(data){  
        	console.log(data)
        	$scope.banners=data.data;
        	$ionicSlideBoxDelegate.update();
        	$ionicSlideBoxDelegate.loop(true);
        })
   	$http.get($scope.thisApi)
			        	.success(function(data){ 
			        		console.log(data);
			        		$scope.quans=data.data;
			        	})  
   
})
