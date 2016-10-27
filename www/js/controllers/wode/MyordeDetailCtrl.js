angular.module('starter.controllers')
.controller('MyorderDetailCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$ionicModal,$stateParams,locals,$ionicPopup) {
	console.log($stateParams);
	if($stateParams.orderId){
		locals.set("orderId",$stateParams.orderId);
		locals.set("orderState",$stateParams.orderState)
	}
	var orderId=locals.get("orderId");
	var orderState=locals.get("orderState");
	var memberId=locals.getObject("userData").memberId;
	$scope.thisApi=$rootScope.path+"elandOrder/getOrderDetail?memberId="+memberId+"&orderId="+orderId;
	$scope.cancelApi=$rootScope.path+"elandOrder/cancelOrder?memberId="+memberId+"&orderId="+orderId;
	$scope.delApi=$rootScope.path+"elandOrder/deleteOrder?memberId="+memberId+"&orderId="+orderId;
	$scope.changeApi=$rootScope.path+"elandChange/applyChangePage?memberId="+memberId+"&orderId="+orderId;
	$scope.specApi=$rootScope.path+"elandGoodsSpec/getGoodsSpecDetail";
	$scope.conmitApi=$rootScope.path+"elandChange/commitChangeApply";
	function getOrders(){
		$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			if(!data.status){
				$scope.orderIt=data.data;
				$scope.orderIt.orderState=orderState;
				$scope.orderIt.num=0;
				for (k in $scope.orderIt.listGoods) {
					$scope.orderIt.num+=$scope.orderIt.listGoods[k].goodsNum;
				}
				locals.setObject("tuikuanOrder",$scope.orderIt);
			}
		})
	}
	getOrders();
$scope.removeIt=function(str){
	var path="";
	if(str=="取消")path=$scope.cancelApi;
	if(str=="删除")path=$scope.delApi;
	  var confirmPopup = $ionicPopup.confirm({
       title: '提示',
       subTitle:"确认"+str+"订单？",
       scope: $scope,
        buttons: [
       {text: '取消' },
       {text: '确定' ,
       	type: 'button-positive',
        onTap: function(e){
        	$http.get(path)
        	.success(function(data){
        		console.log(data);
        		shcemUtil.showMsg(data.msg)
        		$rootScope.goBack();
        	})
        }
       }]
    });
}
$scope.wuliu=function(){
	shcemUtil.showMsg("暂无物流信息")
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
$scope.changeGoods=function(it){
	console.log(it)
	$scope.specId=it.specId;
	$http.get($scope.changeApi+"&goodsId="+it.goodsId+"&recId="+it.recId+"&specId="+it.specId)
	.success(function(data){
		if(!data.status){
			$scope.guigeIt=data.data;
			$scope.guigeIt.specStatus=it.specStatus;
			console.log($scope.guigeIt)
			$scope.guigeIt.orderGoodsNum=parseInt($scope.guigeIt.orderGoodsNum);			
			it.specStatus?$scope.guigeDet=$scope.guigeIt.allSp:$scope.guigeDet=null;
			console.log($scope.guigeDet)
			$scope.modal.show();
			$scope.checkIt=function(det,ind){
				det.spValueIndex=ind;
				console.log($scope.guigeIt.allSp)
				var ids="";
				for(k in $scope.guigeIt.allSp){
					var obj=$scope.guigeIt.allSp[k];
					var indd=obj.spValueIndex;
					ids+=","+obj.spId+":"+obj.spValueIdLt[indd];
				}
				$http.get($scope.specApi+"?goodsId="+it.goodsId+"&ids="+ids.substring(1)+"&storeId="+it.storeId)
				.success(function(data){
					console.log(data);
					if(!data.status){$scope.specId=data.data.eGoodsSpec.specId};
					$scope.guigeIt.specPrice=data.data.eGoodsSpec.specGoodsPrice;
					$scope.guigeIt.specStorage=data.data.eGoodsSpec.specGoodsStorage;
				})
			}
			$scope.cheNum=function(type){
				if(type){
					if($scope.guigeIt.orderGoodsNum<$scope.guigeIt.specStorage){
						$scope.guigeIt.orderGoodsNum++;
					}else{
						shcemUtil.showMsg("商品库存已不足");
					}
				}else{
					if($scope.guigeIt.orderGoodsNum<$scope.guigeIt.specStorage){
						if($scope.guigeIt.orderGoodsNum>1){
						$scope.guigeIt.orderGoodsNum--;
						}
					}else{
						shcemUtil.showMsg("商品库存已不足");
					}
					
				}
			}
			$scope.shenQing=function(num){	
				console.log($scope.conmitApi+"?changeCount="+num+"&goodsId="+it.goodsId+"&orderId="+it.orderId+"&recId="+it.recId+"&specFromId="+it.specId+"&specId="+$scope.specId+"&storeId="+it.storeId)
				$http.get($scope.conmitApi+"?changeCount="+num+"&goodsId="+it.goodsId+"&orderId="+it.orderId+"&recId="+it.recId+"&specFromId="+it.specId+"&specId="+$scope.specId+"&storeId="+it.storeId)
				.success(function(data){
					shcemUtil.showMsg(data.msg)
					if(!data.status){
						$scope.modal.hide();
					}				
				})
			}
		}		
	})
}
})
