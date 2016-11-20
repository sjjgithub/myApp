angular.module('starter.controllers')
.controller('ResertpassCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {
	if(!locals.get("memberId")){$state.go("denglu");}	
	$scope.thisApi=$rootScope.path+"elandMember/modifyPswd?memberId="+locals.get("memberId");
	$scope.timeout="获取验证码";
	$scope.putIt=function(){
		if(resert.newpass.value!=resert.newpass2.value&&resert.newpass.value!=""){
			shcemUtil.showMsg("俩次密码不一致",2000)
		}else{
		$http.get($scope.thisApi+"&newPassword="+resert.newpass.value+"&oldPassword="+resert.oldpass.value)
		.success(function(data){
			if(data.status){
				shcemUtil.showMsg(data.msg,2000);
			}else{
				$state.go("setting")
			
			}
		})
	}
	}
})
