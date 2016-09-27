angular.module('starter.controllers')
.controller('DetailCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,locals) {
	
         $scope.goodApi=$rootScope.path+"elandGoods/showGoodsDetail?memberId=5&storeId=7&goodsId=";
         $scope.quansApi=$rootScope.path+"elandCoupon/receiveCouponCenter?goodsId=246&memberId=5&pageSize=10&pageIndex=1";
         $scope.pingjiaApi=$rootScope.path+"elandEvaluateGoods/getEvaluatePage?gevalstatLevel=&pageIndex=1&pageSize=3&goodsId=";
         $scope.sameApi=$rootScope.path+"elandGoods/showSimilarGoods?pageIndex=1&pageSize=3&typeId=25 ";
         
         if($stateParams.goodsId){
         	 locals.set("goodIt",$stateParams.goodsId);
         }		 
         console.log($scope.goodApi+locals.get("goodIt"))
         $http.get("data.php", {params: {url:$scope.goodApi+locals.get("goodIt")}})
                        .success(function(data){
                        	console.log(data)
                            $scope.good=data.data.length>=0?data.data[0]:null;
                          
                        })
                        .error(function(){
                           
                        })
         $http.get("data.php", {params: {url:$scope.pingjiaApi+locals.get("goodIt")}})
                        .success(function(data){
                        	console.log(data)
                            $scope.pinglun=data.data?data.data:null;
                          
                        })
                        .error(function(){
                           
                        })                
        $http.get("data.php",{params:{url:$scope.quansApi}})
			        	.success(function(data){ 
			        		console.log(data);
			        		$scope.quans=data.data;
			        	})    
		$http.get("data.php",{params:{url:$scope.sameApi}})
			        	.success(function(data){ 
			        		console.log(data);
			        		$scope.samefoods=data.data;
			        	})  	 
			        	scrollX({dom:".scrolx"})
})
