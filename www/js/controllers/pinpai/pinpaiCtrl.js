angular.module('starter.controllers')
.controller('PinpaiCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover) {
	
    $scope.bannerApi=$rootScope.path+"elandAdv/getAdvPosition?apName=6";
    $scope.pinpaisApi=$rootScope.path+"elandBrand/selectAllBrand";
    $http.get("data.php", {params: {url:$scope.bannerApi}})
                        .success(function(data){
                        	console.log(data)
                            $scope.banners=data.data;
                            $ionicSlideBoxDelegate.update();
                        })
                        .error(function(){
                            
                        })// 
    $http.get("data.php", {params: {url:$scope.pinpaisApi}})
                        .success(function(data){
                        	console.log(data)
                            $scope.pinpais=data.data;
                        })
                        .error(function(){
                            alert("券banner请求失败")
                        })//券     
      $http.get($scope.pinpaisApi)
                        .success(function(data){
                        	console.log(data)
                            $scope.pinpais=data.data;
                        })                    
           
})
