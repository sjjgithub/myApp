angular.module('starter.controllers')
.controller('BuyCenterCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http,locals,$timeout,$ionicScrollDelegate,$ionicModal) {
	  	var PageIndex=1;	
      	$scope.thisApi=$rootScope.path+"elandBrand/screenGoods?pageIndex="+PageIndex+"&pageSize=30";
      	$scope.keyApi=$rootScope.path+"elandBrand/selectGoodsLabel";
      	$scope.pinpaiApi=$rootScope.path+"elandBrand/selectAllEffectiveBrand";
      	$scope.feileiApi=$rootScope.path+"elandGoodsClass/selectFirstGoodsClass";  	$scope.feilei2Api=$rootScope.path+"elandGoodsClass/selectSecondGoodsClass?pageNum=1&pageSize=10&gcParentId=";
      	
     	$scope.domore=false;
      	$scope.ordtype=0;//排序类别
	    $scope.soft=1;//价格排序默认升序
	    $scope.params="";
	    $scope.goodsList = [];
	   	 
        $scope.getGoods=function(path,param){
				console.log(path+param)
			//获取商品
				$http.get(path+param)
						.success(function(data){
							console.log(data)
							$scope.goodsList=data.data;
						})
			}
       	$scope.getGoods($scope.thisApi,$scope.params)
        $scope.pricClick=function (event){
				event.stopPropagation();			
				$scope.soft==1?$scope.soft=0:$scope.soft=1;
				$scope.param="&price="+$scope.soft;
				PageIndex=1;
				$scope.domore=false;
				$ionicScrollDelegate.scrollTop(false);
				$scope.getGoods($scope.thisApi,$scope.param);
			}//pricClick ed
		$scope.ordByIt=function(ord,scope){
			$scope.ordtype=ord;
			switch (ord){
				case 0:
					
					$scope.params="";
					break;
				case 1:
					
					$scope.params="&saleNum=1";
					break;
				case 2:
					
					$scope.params="&price="+$scope.soft;
					break;
			}
			PageIndex=1;
			$scope.domore=false;
			$ionicScrollDelegate.scrollTop(false);
			$scope.getGoods($scope.thisApi,$scope.params);				
			}//ordByIt ed
		$scope.doRefresh = function () {  
            PageIndex++;           		var	thisApi=$rootScope.path+"elandBrand/screenGoods?pageIndex="+PageIndex+"&pageSize=30";
         	$http.get(thisApi+$scope.params)
         	.success(function(data){
         		console.log(data)
         		if(data.data&&data.data.length>1){
         			$scope.goodsList=$scope.goodsList.concat(data.data);
         		}else{
         			$scope.domore=true;
         			if(PageIndex>1)shcemUtil.showMsg("没有更多数据了");         			
         		}
         	})
         	.finally(function(){
         		 $scope.$broadcast('scroll.infiniteScrollComplete'); 
         	})
		}

	$ionicModal.fromTemplateUrl('guige.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    backdropClickToClose:true
	}).then(function(modal) {
	    $scope.modal = modal;
	});
	$scope.$on('$destroy', function() {
	            $scope.modal.remove();
	          });	
	
	$scope.showModal=function(){
		$http.get($scope.keyApi)
		.success(function(data){
			console.log(data);
			$scope.keys=data.data;
			
		})
		$scope.modal.show();
		$scope.chekeys="";
		$scope.cheIt=function(e,key){
			var dom=angular.element(e.target); 
			dom.toggleClass("active");
			if(dom.hasClass("active")){
				$scope.chekeys+=","+key.labelId;
			}else{
				alert(1);
				$scope.chekeys=$scope.chekeys.replace(","+key.labelId,"");
			}
		}
		$scope.resIt=function(){
			shuaixuan.reset();
			$scope.chekeys="";
			$scope.feileiIt=null;
			$scope.pinpaiIt=null;
			var doms=document.querySelectorAll(".biao button");
			angular.element(doms).removeClass("active");
		}
		$scope.sureIt=function(){
			$scope.modal.hide();
			PageIndex=1;
			
			if(shuaixuan.low.value||$scope.low==0){
				$scope.thisApi+="&goodsLowPrice="+shuaixuan.low.value;
			}
			if(shuaixuan.heigh.value||$scope.heigh==0){
				$scope.thisApi+="&goodsHighPrice="+shuaixuan.heigh.value;
			}
			if($scope.pinpaiIt){
				$scope.thisApi+="&brandId="+$scope.pinpaiIt.brandId;
			}
			if($scope.feileiIt){
				$scope.thisApi+="&gcId="+$scope.feileiIt.gcId;
			}
			if($scope.chekeys){
				$scope.thisApi+="&lableIds="+$scope.chekeys.substring(1);
			}
			$scope.params="";
			console.log($scope.thisApi)
			$scope.getGoods($scope.thisApi,$scope.params)			
		}
	}
	$ionicModal.fromTemplateUrl('paipai.html', {
	    scope: $scope,
	    animation: 'slide-in-right'
	}).then(function(modal) {
	    $scope.modal2=modal;
	});
	$scope.$on('$destroy', function() {
	            $scope.modal2.remove();
	     });
	$scope.showModal2=function(){
		$http.get($scope.pinpaiApi)
		.success(function(data){
	    	console.log(data);
	    	if(data.status==0)$scope.pinpais=data.data;
	    })   
	    $scope.modal2.show();
	    $scope.chePinpai=function(it){
	    	$scope.pinpaiIt=it;
	    	$scope.modal2.hide();
	    }
	}
	$ionicModal.fromTemplateUrl('feilei.html', {
	    scope: $scope,
	    animation: 'slide-in-right'
	}).then(function(modal) {
	    $scope.modal3 = modal;
	});
	$scope.$on('$destroy', function() {
	            $scope.modal.remove();
	          });	
	$scope.showModal3=function(){
		$scope.openId=0;
		$http.get($scope.feileiApi)
		.success(function(data){
	    	console.log(data);
	    	if(data.status==0){
	    	$scope.fenlei1s=data.data;
	    	$scope.getfeilei2s=function(){
	    		$http.get($scope.feilei2Api+$scope.fenlei1s[$scope.openId].gcId)
				.success(function(data){
					console.log(data)
					if(data.status==0)$scope.fenlei2s=data.data;
				})
	    	  }
	    	$scope.getfeilei2s();
	    	}
	    })
		$scope.onfenlei=function(ind){
			$scope.openId=ind;
			$scope.getfeilei2s();
		}
	    $scope.modal3.show();
	    $scope.cheFeilei=function(it){
	    	$scope.feileiIt=it;
	    	$scope.modal3.hide();
	    }
	}          
})
