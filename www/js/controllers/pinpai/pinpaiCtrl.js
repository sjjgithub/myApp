angular.module('starter.controllers')
.controller('PinpaiCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover) {
	
    $scope.bannerApi=$rootScope.path+"elandAdv/getAdvPosition?apName=";
    $scope.pinpaisApi=$rootScope.path+"elandBrand/selectAllBrand"; 
    $scope.ordtype=15;//排序类别
    var topban=6;
    $http.get($scope.bannerApi+topban)
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
                            var pages=data.data;
                           	$scope.pinpais=[];
                            var ind=Math.ceil(pages.length%9);
                            for (var k=0;k<ind;k++) {
                            	var arr=[];
                            	if(k!=ind-1){  
                            		arr=pages.slice(9*k,9*k+9);
                            	}else{
                            		arr=pages.slice(9*k);                           		                         		
                            	}     
                            	$scope.pinpais.push(arr);
                            }
                        })
                        .error(function(){
                           
                        })//券    
    $scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
				$http.get(path+param)
						.success(function(data){
							console.log(data)
							$scope.storesList=data.data;
						})
			}
       	$scope.getGoods($scope.bannerApi,$scope.ordtype)
		$scope.ordByIt=function(ind){					
				if($scope.ordtype==ind){
						return;
				}else{
					$scope.ordtype=ind;
					$scope.getGoods($scope.bannerApi,$scope.ordtype);
					}
			}//ordByIt ed                    
    
})
