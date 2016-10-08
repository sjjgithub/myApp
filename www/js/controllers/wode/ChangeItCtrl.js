angular.module('starter.controllers')
.controller('ChangeItCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	
	$scope.thisApi=$rootScope.path+"elandAddress/editOrAddAddress?";
	if($stateParams.addinfo){		
         	 locals.setObject("addIt",$stateParams.addinfo);
         }	
    $scope.addIt=locals.getObject("addIt");
	$scope.dizhi=$scope.dizhi?$scope.dizhi:$scope.addIt.address;
	$scope.isdef=$scope.isdef?$scope.isdef:$scope.addIt.isDefault;
	$scope.pnone=$scope.pnone?$scope.pnone:$scope.addIt.mobPhone;
	$scope.nicheng=$scope.nicheng?$scope.nicheng:$scope.addIt.trueName;
	$scope.putIt=function(){
		var param="addressId="+$scope.addIt.addressId+"&address="+$scope.dizhi+"&area_info="+$scope.addIt.areaInfo+"&is_default="+$scope.isdef+"&member_id="+$scope.addIt.memberId+"&mob_phone="+$scope.pnone+"&true_name="+$scope.nicheng;
		console.log(param)
		console.log("addressId="+$scope.addIt.addressId+"&address="+$scope.dizhi);
		$http.get($scope.thisApi+param)
		.success(function(data){
			shcemUtil.showMsg(data.msg);
			 $state.go('address')
		})
		.error(function(){
			
		})
	}
})
