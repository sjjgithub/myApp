angular.module('starter.controllers')
.controller('OrdersureCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals,$ionicModal){
      if($stateParams.orders){
      	locals.setObject("Orders",$stateParams.orders);
      	locals.setObject("buType",$stateParams.buType);
      }
      $scope.buType=locals.getObject("buType");
      $scope.orders=[];
      $scope.price=0;
      $scope.order={};
      $scope.quans=[];
      var data=locals.getObject("Orders");
      if($scope.buType){    	      	
      	$scope.storeName=data.goodsId;
      	$scope.storeId=data.storeId;
      	$scope.order.specId=data.specId;
      	$scope.order.goodsImage=data.goodsImage;
      	$scope.order.goodsName=data.goodsName
      	$scope.order.goodsprice=data.price;
      	$scope.order.goodsSpecInfo=data.specInfo;
      	$scope.order.goodsNum=data.goodsNum;
      	$scope.order.goodsId=data.goodsId;
      	$scope.order.storeId=data.storeId;
				$scope.order.storeName=data.storeName;
      	$scope.price=data.price*data.goodsNum;
      	$scope.orders.push($scope.order);     	
      }else{
      	console.log(data)     
      	$scope.car=data;
      	$scope.orders=data.oreders;
      	$scope.price=parseFloat(data.chePrice);
      	$scope.storeId=data.storeId;
      	$scope.order.storeId=data.storeId;
      	$scope.order.storeName=data.storeName;    	
      	var str="";
      	for (k in $scope.orders) {
      		str+=","+$scope.orders[k].cartId;
      	}
      	$scope.order.cartId=str.substring(1);
      }         
      if($scope.price<299){
      	$scope.mian=false;
      	$scope.putong=8;
      }else{
      	$scope.mian=true;
      	$scope.putong=0;
      }
      $scope.yunfei=$scope.putong;
      $scope.youhui=0;
      $scope.yunType=0;
      $scope.fapiaoType=1;
      var memberId=locals.get("memberId");
      $scope.addressApi=$rootScope.path+"elandAddress/getAddressList?memberId="+memberId;
      $scope.lingquApi=$rootScope.path+"elandCoupon/receiveCoupon?memberId="+memberId+"&couponId=";$scope.quansApi=$rootScope.path+"elandCoupon/getAvailableCoupon?memberId="+memberId+"&pageIndex=1&pageSize=10";
      $scope.sureApi=$rootScope.path+"elandOrder/confirmOrder";
      $http.get($scope.addressApi)
      .success(function(data){  
      	console.log(data)
      	if(data.data.length>0){
      		for(k in data.data){
      			if(data.data[k].isDefault){
      				$scope.address=data.data[k];
      				return;
      			}
      		}
      	}else{$scope.address=null;}
      })
      function getone(){
				 $http.get($scope.quansApi+"&price="+$scope.price+"&storeId="+$scope.storeId)
	      .success(function(data){
	      	console.log(data);
	      	if(data.status==0){
	      		$scope.quans=data.data;
	      		console.log($scope.quans)
	      		$scope.quaninfo=$scope.quans?"使用优惠券":null;
	      	}     	
	      })
			};
      getone();
      $scope.userQuan=function(quan){
      	$scope.quanUse=quan;
      		 $scope.quaninfo="优惠券 "+quan.couponPrice+"元";
      		 $scope.youhui=parseFloat(quan.couponPrice);
      		 $scope.modal.hide();
      }
$scope.cheSend=function(type){
    $scope.yunType=type;
    if($scope.mian){
    	 type?$scope.yufei=12:$scope.yufei=0;
    }else{
    	 type?$scope.yufei=20:$scope.yufei=8;
    }   
}
$ionicModal.fromTemplateUrl('quan.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function(modal) {
    $scope.modal = modal;
});  
$scope.popover=$ionicPopover.fromTemplateUrl('fapiao.html', {
    scope: $scope
}).then(function(popover) {
    $scope.popover = popover;
});
 $scope.$on('$destroy', function() {
            $scope.popover.remove();
          });
$scope.fapiaoche=function(type){
	$scope.fapiaoType=type;
}
$scope.quxiao=function(taitou){
$scope.taitou='';
$scope.fapiaoType=1;
$scope.popover.hide();
}
$scope.baocun=function(taitou,type){
	if($scope.fapiaoType==2){
		if(taitou){
			$scope.taitou=taitou;		
			$scope.popover.hide();
		}else{
			shcemUtil.showMsg("请填入公司抬头")
		}
	}else{
		$scope.popover.hide();
	}
}

$scope.liuyanIt=function(str){
	console.log($scope.liuyan)
if($scope.liuyan.length>=45){
	$scope.liuyan=$scope.liuyan.substring(0,46);
}
}

     $scope.lingqu=function(quanId,isGet){
        	if(isGet){
        		$http.get($scope.lingquApi+quanId)
	        	.success(function(data){
	        		console.log(data);
	        		shcemUtil.showMsg(data.msg,2000)
	        		if(data.status==0){
	        			getone();
	        		}
	        	})
        	}else{
        		shcemUtil.showMsg("该优惠券您已领过啦！",2000)
        	}
        	
        }
$scope.payIt=function(){	
	$scope.order.buyerId=memberId;
	$scope.order.address=$scope.address.address;
	$scope.order.mobPhone=$scope.address.mobPhone;
	$scope.order.areaInfo=$scope.address.areaInfo;
	$scope.order.trueName=$scope.address.trueName;
	$scope.order.goodsAmount=$scope.price;		
	$scope.quanUse?$scope.order.coupon=$scope.quanUse.couponId:$scope.order.coupon="";
	$scope.order.goodsAmount=$scope.price;
	$scope.order.orderAmount=$scope.price+$scope.yunfei-$scope.youhui;
	$scope.order.invoiceType=$scope.fapiaoType;
	$scope.fapiaoType?$scope.order.companyName=$scope.taitou:$scope.order.companyName="";
	$scope.order.orderMessage=$scope.liuyan;
	$scope.order.shippingFee=$scope.yunfei;
	$scope.order.send=$scope.yunType;
//	console.log($scope.order)
//	console.log(JSON.stringify($scope.order))

	
	if($scope.buType){
//		$http.post($scope.sureApi,$scope.order)
//		.success(function(data){
//			console.log(data);
//			if(!status){
//				
//			}else{
//				shcemUtil.showMsg(data.msg)
//			}			
//		})	
var param="?address="+$scope.order.address+"&buyerId="+$scope.order.buyerId+"&areaInfo="+$scope.order.areaInfo+"&coupon="+$scope.order.coupon+"&goodsAmount="+$scope.order.goodsAmount+"&goodsId="+$scope.order.goodsId+"&goodsNum="+$scope.order.goodsNum+"&goodsSpecInfo="+$scope.order.goodsSpecInfo+"&invoiceType="+$scope.order.invoiceType+"&companyName"+$scope.order.companyName+"&mobPhone="+$scope.order.mobPhone+"&orderAmount="+$scope.order.orderAmount+"&send="+$scope.order.send+"&shippingFee="+$scope.order.shippingFee+"&specId="+$scope.order.specId+"&storeId="+$scope.order.storeId+"&storeName="+$scope.order.storeName+"&trueName="+$scope.order.trueName;
	console.log(param)
			$http.get($scope.sureApi+param)
				.success(function(data){
					console.log(data)
					if(!data.status){
						shcemUtil.showMsg(data.msg);
						if(data.data){
							$state.go("shouyin",{"payInfo":data.data})
						}
					}					
				})
		}else{
		var param="?address="+$scope.order.address+"&buyerId="+$scope.order.buyerId+"&cartId="+$scope.order.cartId+"&coupon="+$scope.order.coupon+"&goodsAmount="+$scope.order.goodsAmount+"&invoiceType="+$scope.order.invoiceType+"&mobPhone="+$scope.order.mobPhone+"&orderAmount="+$scope.order.orderAmount+"&shippingFee="+$scope.order.shippingFee+"&storeId="+$scope.order.storeId+"&storeName="+$scope.order.storeName+"&trueName="+$scope.order.trueName+"&send="+$scope.order.send+"&areaInfo="+$scope.order.areaInfo;
		console.log(param);
		console.log($scope.order.send)
		$http.get($scope.sureApi+param)
			.success(function(data){
					console.log(data)
					if(!data.status){
						shcemUtil.showMsg(data.msg);
						if(data.data){
							$state.go("shouyin",{"payInfo":data.data})
						}
					}					
				})
		}
	}

})
