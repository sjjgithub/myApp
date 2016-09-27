angular.module('starter.controllers')
.controller('PinpaiCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover) {
	
    $scope.bannerApi=$rootScope.path+"elandAdv/getAdvPosition?apName=6";
    $scope.pinpaisApi=$rootScope.path+"elandBrand/selectAllBrand";
    $http.get($scope.bannerApi)
                        .success(function(data){
                        	console.log(data)
                            $scope.banners=data.data;
                            $ionicSlideBoxDelegate.update();
                        })
                        .error(function(){
                            
                        })// 
    $http.get($scope.pinpaisApi)
                        .success(function(data){
                        	console.log(data)
                            $scope.pinpais=data.data;
                        })
                        .error(function(){
                           
                        })//券                
})
