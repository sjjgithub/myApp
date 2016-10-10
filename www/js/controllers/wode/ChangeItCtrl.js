angular.module('starter.controllers')
.controller('ChangeItCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	
	$scope.thisApi=$rootScope.path+"elandAddress/editOrAddAddress?";
	console.log($stateParams.addinfo)
	if($stateParams.addinfo){				
         	 locals.setObject("address",$stateParams.addinfo);
        }	
    $scope.addIt=locals.getObject("address");

	//三级联动str
	console.log($scope.addIt)
	console.log($scope.addIt.areaInfo.split(" "))
	$scope.quyu=$scope.addIt.areaInfo;
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
		console.log(chargeAdd.isdef.checked)
		var isdef;
		chargeAdd.isdef.checked?isdef=1:isdef=0;
var param="addressId="+$scope.addIt.addressId+"&address="+chargeAdd.dizhi.value+"&area_info="+$scope.quyu+"&is_default="+isdef+"&member_id="+$scope.addIt.memberId+"&mob_phone="+chargeAdd.phone.value+"&true_name="+chargeAdd.nicheng.value;
		console.log(param)
		$http.get($scope.thisApi+param)
		.success(function(data){
			console.log(data)
			$state.go('address',{reload: true});
		})
		.error(function(){
			
		})
	}
  

})
