angular.module('starter.controllers')
.controller('AddItCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
	$scope.thisApi=$rootScope.path+"elandAddress/editOrAddAddress?";
	
//  $scope.memberId=locals.get("memberId");
    $scope.memberId=162;
	//三级联动str
	var vm=$scope.vm={};
	  vm.CityPickData2 = {
	    areaData: ["请选择"],
	    title: '区域选择',//前边提示
	    hardwareBackButtonClose: false,//安卓硬件返回
	    backdropClickToClose:true,//点击空白关闭
	    tag:" ",
	    cssClass:"noborder nopadding-v noit place",
	    buttonClicked:function(){
	    	$scope.quyu=vm.CityPickData2.areaData;
	    	$scope.itIs="changeIt";
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
		var param="&address="+$scope.dizhi+"&area_info="+$scope.quyu+"&is_default="+$scope.isdef+"&member_id="+$scope.memberId+"&mob_phone="+$scope.phone+"&true_name="+$scope.nicheng;
		console.log(param)
		$http.get($scope.thisApi+param)
		.success(function(data){
			console.log(data)
			shcemUtil.showMsg(data.msg);
			 $state.go('address');

		})
		.error(function(){
			
		})
	}
})
