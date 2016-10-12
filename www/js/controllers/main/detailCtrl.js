angular.module('starter.controllers')
.controller('DetailCtrl', function($scope,$parse,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals) {
	 	if($stateParams.goodsId){
         	 locals.set("goodIt",$stateParams.goodsId);
         }	
         var memberId=locals.getObject("userData").memberId;
         var goodId=locals.get("goodIt");
		 $scope.footApi=$rootScope.path+"elandFoot/addFootHistory?memberId="+memberId+"&goodsId="+goodId;
         $scope.goodApi=$rootScope.path+"elandGoods/showGoodsDetail?storeId=7&goodsId="+goodId+"&memberId="+memberId;
         $scope.quansApi=$rootScope.path+"elandCoupon/receiveCouponCenter?goodsId="+goodId+"&memberId="+memberId+"&pageSize=10&pageIndex=1";
         $scope.pingjiaApi=$rootScope.path+"elandEvaluateGoods/getEvaluatePage?gevalstatLevel=&pageIndex=1&pageSize=3&goodsId="+goodId;
         $scope.sameApi=$rootScope.path+"elandGoods/showSimilarGoods?pageIndex=1&pageSize=3&typeId=";  
         $scope.shoucangApi=$rootScope.path+"elandFavorites/favoritesGoods?goodsId="+goodId+"&memberId="+memberId+"&isCollect=";
         $http.get($scope.footApi) 
         .success(function(data){
         	console.log(data);
         })
         function getIt(){
         	  $http.get($scope.goodApi)
                        .success(function(data){
                        	console.log(data)
                        	
                        	if(data.data){
                        		$scope.good=data.data.length>=0?data.data[0]:null;
		                        $http.get($scope.sameApi+$scope.good.typeId)
					        	.success(function(data){ 
					        		console.log(data);
					        		$scope.samefoods=data.data;
					        	})  	 
                        	}else{
                        		console.log(data.msg)
                        		shcemUtil.showMsg2(data.msg);
                        	
                        			$rootScope.goBack();
                        		
                        		
                        	}
                        })
                        .error(function(){
                           
                        })
         }
       	getIt();
         $http.get($scope.pingjiaApi)
                        .success(function(data){
                        	console.log(data)
                            $scope.pinglun=data.data?data.data:null;
                          
                        })
                        .error(function(){
                           
                        })                
        $http.get($scope.quansApi)
			        	.success(function(data){ 
			        		console.log(data);
			        		$scope.quans=data.data;
			        	})    
		
			        	scrollX({dom:".scrolx"})
			        	//收藏
	 $scope.collectionIt=function(type){
	 	type==0?type=1:type=0;
	 	console.log(type)
	 	$http.get($scope.shoucangApi+type)
	 	.success(function(data){
	 		console.log(data);	 		
	 		shcemUtil.showMsg(data.msg,2000);
	 		if(!data.status){
	 			$scope.good.isCollect=type;
	 		}
	 	})
	 } 
})
