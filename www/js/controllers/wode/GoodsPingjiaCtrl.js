angular.module('starter.controllers')
.controller('GoodsPingjiaCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	
	if($stateParams.pingjiaId){
		locals.set("pingjiaId",$stateParams.pingjiaId);
		locals.set("pingjiaStoreId",$stateParams.pingjiaStoreId);
	}	
	var orderId=locals.get("pingjiaId");
	var storeId=locals.get("pingjiaStoreId");
	console.log(storeId)
	var memberId=locals.get("memberId")
	console.log(orderId)
    $scope.thisApi=$rootScope.path+"elandGetIntoEvaluate/getIntoEvaluate?orderId="+orderId;	
    $scope.starApi=$rootScope.path+"elandEvaluateStore/addEvaluateStore?memberId="+memberId+"&orderId="+orderId+"&storeId="+storeId;
    $scope.goodsApi=$rootScope.path+"elandEvaluateGoods/addEvaluateGoods?memberId="+memberId+"&orderId="+orderId;
    $http.get($scope.thisApi)
    .success(function(data){
    	console.log(data);
    	if(!data.status){$scope.orders=data.data}
    })
$scope.popover=$ionicPopover.fromTemplateUrl('pingjia.html', {
    scope: $scope
}).then(function(popover) {
    $scope.popover=popover;
});
 $scope.$on('$destroy', function() {
            $scope.popover.remove();
         });
$scope.show=function(e,order){
	$scope.popover.show(e);
 $scope.sure=function(){
	if(!jibie.ping.value){
		shcemUtil.showMsg("请选择评价等级")
	}else{
		console.log($scope.goodsApi+"&content="+jibie.pinglun.value+"&gevalScores="+jibie.ping.value+"&specId="+order.specId+"&goodsId="+order.goodsId);
		$http.get($scope.goodsApi+"&content="+jibie.pinglun.value+"&gevalScores="+jibie.ping.value+"&specId="+order.specId+"&goodsId="+order.goodsId)
		.success(function(data){
			console.log(data)
			if(data.status==0){
				shcemUtil.showMsg(data.msg);
				order.isEvaluate=1;
			}		
		})
		$scope.popover.hide();
	}
 }
 $scope.cancle=function(){
	console.log(jibie)
	jibie.reset();
	$scope.popover.hide();
 }
}
$scope.type1ind=0;
$scope.type2ind=0;
$scope.type3ind=0;
$scope.strIt=function(tyep,ind){
	switch (tyep){
		case 1:
			$scope.type1ind=ind;
			break;
		case 2:
			$scope.type2ind=ind;
			break;
		case 3:
			$scope.type3ind=ind;
			break;		
	}	
}
$scope.pingStar=function(){
	var param="";
	$scope.type1ind?param+="&fitGoodsPoint="+$scope.type1ind:param;
	$scope.type2ind?param+="&servicePoint="+$scope.type2ind:param;
	$scope.type3ind?param+="&speedPoint="+$scope.type3ind:param;
	if(!$scope.type1ind||!$scope.type1ind||!$scope.type3ind){
		shcemUtil.showMsg("评价选项不能有空");
	}else{
		$http.get($scope.starApi+param)
		.success(function(data){
		console.log(data);
		if(data.status==0){
			shcemUtil.showMsg(data.msg);
		}
	})
	}	
}
})
