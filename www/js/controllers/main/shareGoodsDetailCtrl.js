angular.module('starter.controllers')
.controller('ShareGoodsDetailCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$http,$stateParams,locals,$ionicScrollDelegate,$ionicModal) {
		
		console.log($stateParams)

         var memberId=$stateParams.memberId;
         var goodId=$stateParams.goodsId;
         $scope.istuwen=true;
         $scope.tuwenApi=$rootScope.path+"elandGoods/showGoodsBody?goodsId="+goodId;
//		 $scope.footApi=$rootScope.path+"elandFoot/addFootHistory?memberId="+memberId+"&goodsId="+goodId;
         $scope.goodApi=$rootScope.path+"elandGoods/showGoodsDetail?goodsId="+goodId+"&memberId="+memberId;
//       $scope.quansApi=$rootScope.path+"elandCoupon/receiveCouponCenter?goodsId="+goodId+"&memberId="+memberId+"&pageSize=10&pageIndex=1";
         $scope.pingjiaApi=$rootScope.path+"elandEvaluateGoods/getEvaluatePage?gevalstatLevel=&pageIndex=1&pageSize=3&goodsId="+goodId;
//       $scope.sameApi=$rootScope.path+"elandGoods/showSimilarGoods?pageIndex=1&pageSize=3&typeId=";  
//       $scope.shoucangApi=$rootScope.path+"elandFavorites/favoritesGoods?goodsId="+goodId+"&memberId="+memberId+"&isCollect=";
//       $scope.guigeApi=$rootScope.path+"elandGoodsSpec/getGoodsSpecDetail?goodsId="+goodId+"&storeId=";
//       $scope.addCartApi=$rootScope.path+"elandCart/addCart?goodsId="+goodId+"&memberId="+memberId;
       	 $scope.params={};
       	 $scope.parValue={};
       	 
         function getIt(){
         	  $http.get($scope.goodApi)
                        .success(function(data){
                        	console.log(data)                        	
                        	if(data.data){
                        		$scope.good=data.data.length>=0?data.data[0]:null;
//		                        $http.get($scope.sameApi+$scope.good.typeId)
//					        	.success(function(data){ 
//					        		console.log(data);
//					        		$scope.samefoods=data.data;
//					        	})  	 
                        	}else{
                        		shcemUtil.showMsg2(data.msg);								
                        		                      		
                        	}
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
$scope.scrollIt=function(){
	var top=$(".shangpin").css("top");
	if($ionicScrollDelegate.getScrollPosition().top>($(".shangpin .scroll").height()-$(".shangpin").height()+$(".shangpin").height()*0.1)){
		if(!$scope.tuwenIt){			
		$http.get($scope.tuwenApi)
		.success(function(data){
			console.log(data)
			if(!data.status){
				$scope.tuwenIt=data.data;
			}									
		})
	}
		$(".tuwen").css({"top":top})
}
}
$scope.xiala=function(){
	$(".tuwen").css({"top":"100vh",});	
	$scope.$broadcast('scroll.refreshComplete')	 
}
})
