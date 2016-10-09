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
	//三级联动str
	console.log($scope.addIt.areaInfo.split(" "))
	var vm=$scope.vm={};
	  vm.CityPickData2 = {
	    areaData: ["请选择"],
	    title: '区域选择',//前边提示
	    defaultAreaData:$scope.addIt.areaInfo.split(" "),//默认地址
	    hardwareBackButtonClose: false,//安卓硬件返回
	    backdropClickToClose:true,//点击空白关闭
	    tag:" ",
	    cssClass:"noborder nopadding-v noit",
	    buttonClicked:function(){
	    	$scope.quyu=vm.CityPickData2.areaData;
	    	var str=""
	    	for(k in vm.CityPickData2.areaData){
	    		str=str+vm.CityPickData2.areaData[k];
	    		if(k<vm.CityPickData2.areaData.length-1){str=str+" "}
	    	}
	    	$scope.quyu=str;
	    }
	  }
  	//三级联动ed
	$scope.putIt=function(){	
		$scope.isdef?$scope.isdef=1:$scope.isdef=0;
		var param="addressId="+$scope.addIt.addressId+"&address="+$scope.dizhi+"&area_info="+$scope.quyu+"&is_default="+$scope.isdef+"&member_id="+$scope.addIt.memberId+"&mob_phone="+$scope.phone+"&true_name="+$scope.nicheng;
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
