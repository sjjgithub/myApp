angular.module('starter.controllers')
.controller('DetailCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals,$ionicScrollDelegate,$ionicModal) {
		
	 	if($stateParams.goodsId){
         	 locals.set("goodIt",$stateParams.goodsId);
         }	
         var memberId=locals.getObject("userData").memberId;
         var goodId=locals.get("goodIt");
         $scope.istuwen=true;
         $scope.tuwenApi=$rootScope.path+"elandGoods/showGoodsBody?goodsId="+goodId;
		 $scope.footApi=$rootScope.path+"elandFoot/addFootHistory?memberId="+memberId+"&goodsId="+goodId;
         $scope.goodApi=$rootScope.path+"elandGoods/showGoodsDetail?storeId=7&goodsId="+goodId+"&memberId="+memberId;
         $scope.quansApi=$rootScope.path+"elandCoupon/receiveCouponCenter?goodsId="+goodId+"&memberId="+memberId+"&pageSize=10&pageIndex=1";
         $scope.pingjiaApi=$rootScope.path+"elandEvaluateGoods/getEvaluatePage?gevalstatLevel=&pageIndex=1&pageSize=3&goodsId="+goodId;
         $scope.sameApi=$rootScope.path+"elandGoods/showSimilarGoods?pageIndex=1&pageSize=3&typeId=";  
         $scope.shoucangApi=$rootScope.path+"elandFavorites/favoritesGoods?goodsId="+goodId+"&memberId="+memberId+"&isCollect=";
         $scope.guigeApi=$rootScope.path+"elandGoodsSpec/getGoodsSpecDetail?goodsId="+goodId+"&storeId=";
         $scope.addCartApi=$rootScope.path+"elandCart/addCart?goodsId="+goodId+"&memberId="+memberId;
       	 $scope.params={};
       	 $scope.parValue={};
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
                        		shcemUtil.showMsg2(data.msg);								
                        		$timeout(function(){
									$rootScope.goBack();
								},1000)                       		
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
$ionicModal.fromTemplateUrl('guige.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function(modal) {
    $scope.modal = modal;
});
 $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
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

$scope.buyIt=function(buytype){
	$scope.num=1;		
	if(buytype){
		$scope.buytype="确定";
	}else{
		$scope.buytype="加入购物车";
	}
	//调取规格
		$http.get($scope.guigeApi+$scope.good.storeId)
		.success(function(data){
			console.log(data);
			if(!status){
				$scope.guigeIt=data.data;
				$scope.good.specStatus?$scope.guigeDet=$scope.guigeIt.allSp:$scope.guigeDet=null;
				$scope.good.goodsImage=$scope.guigeIt.goodsImage;
			}
		})
		//判断是否有规格
		if($scope.good.specStatus){
		//点击规格选择
		$scope.buyOr=function(){
			shcemUtil.showMsg("请完善规格选择");
		}
		$scope.checkIt=function(e,arr,ind){		
		$scope.params[parseInt(arr.spId)]=parseInt(arr.spValueIdLt[ind]);
		$scope.parValue[parseInt(arr.spId)]=arr.spValueNameLt[ind];
		angular.element(e.target).parent().children().removeClass("active");
		angular.element(e.target).toggleClass("active");
		var traDom=document.querySelectorAll(".button.active");
		if(traDom.length>=$scope.guigeDet.length){
			var str="";
			for (var key in $scope.params){
	        str+=","+key+":"+$scope.params[key];
	    	}//拼接规格信息ed  
	    	console.log(str.substring(1))
			var param=$scope.good.storeId+"&ids="+str.substring(1);
			console.log($scope.guigeApi+param)
			$http.get($scope.guigeApi+param)
			.success(function(data){
				console.log(data.data.eGoodsSpec)
				$scope.specData=data.data.eGoodsSpec;	
				$scope.guigeIt.specGoodsPrice=data.data.eGoodsSpec.specGoodsPrice;
				$scope.guigeIt.specGoodsStorage=data.data.eGoodsSpec.specGoodsStorage;
				
			})//提交规格获得specId ed
			$scope.buyOr=function(num){	
				if(num<$scope.guigeIt.specGoodsStorage){
					if(buytype){
							var str="";
							if($scope.parValue){
								for (var key in $scope.parValue){
						        str+=","+$scope.parValue[key];
						    	}  
							}				
							str=str.substring(1);
							var cgood=$scope.good;
							cgood.specInfo=str;
							cgood.goodsNum=num;
							cgood.specId=$scope.specData.specId;
							cgood.price=$scope.specData.specGoodsPrice;
						
							$state.go("orderSure",{"orders":cgood,"buType":1});					
					}else{	
					var param="&specId="+$scope.specData.specId+"&storeId="+$scope.good.storeId+"&goodsSpecInfo=&goodsNum="+num;
						$http.get($scope.addCartApi+param)
						.success(function(data){
							shcemUtil.showMsg(data.msg);					
						})
					}
					$scope.modal.hide();
					}else{
						shcemUtil.showMsg("商品库存不足");
					}	
			  }			
		 }else{
			$scope.buyOr=function(){
			shcemUtil.showMsg("请完善规格选择");
			}
		}//是否全部选完 ed
		}//checkIt ed
		//点击提交
	}else{
		$scope.buyOr=function(num){
		if(buytype){		
			var cgood=$scope.good;
			cgood.specInfo="";
			cgood.goodsNum=num;
			$state.go("orderSure",{"orders":cgood,"buType":1});
			}else{	
			var param="&specId="+$scope.good.specId+"&storeId="+$scope.good.storeId+"&goodsSpecInfo=&goodsNum="+num;
			$http.get($scope.addCartApi+param)
			.success(function(data){
				shcemUtil.showMsg(data.msg);					
				})
			}
			$scope.modal.hide();	
		}
	}
	$scope.modal.show();
}
})
