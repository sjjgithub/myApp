angular.module('starter.controllers')
.controller('ForgetpassCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals,$interval,$ionicViewSwitcher) {
$scope.codeApi=$rootScope.path+"member/sendAuthCode?type=getBackPassword&memberMobile=";
$scope.passApi=$rootScope.path+"member/confirmPassword";
	$scope.timeout="获取验证码";
		$scope.timeout="获取验证码";
				$scope.getCode=function(event){
					$scope.isSend=true;
					if(resert.phone.value){
						$http.get($scope.codeApi+resert.phone.value)
							.success(function(data){
								if(data.status){
									shcemUtil.showMsg(data.msg,2000);
								}else{
									$scope.code=data.data;
									var second=10;									
									var  timePromise=undefined;
									timePromise=$interval(function(){
										 if(second<=0){  
								            $interval.cancel(timePromise);  
								            timePromise=undefined;  								  
								            $scope.timeout=10;  
								            $scope.timeout = "重发验证码";
								            $scope.isSend=false;
								         }else{  								          	
								            $scope.timeout = second + " 秒后可重发";  
								            second--;  								             
								          }  
									},1000,100)
								}
	
							})	
					}else{
						shcemUtil.showMsg('手机号码不能为空');
						$scope.isSend=false;
					}								
				}//getCode
	$scope.putIt=function(){
		if(resert.newpass.value!=resert.newpass2.value&&resert.newpass.value!=""){
			shcemUtil.showMsg("俩次密码不一致",2000)
		}else{
			
			var pass={};
//			authCode=714301&confirmPassword=123123&memberMobile=15378791993&newPassword=123123
			pass.authCode=resert.code.value;
			pass.confirmPassword=resert.newpass2.value;
			pass.memberMobile=resert.phone.value;
			pass.newPassword=resert.newpass.value;
			console.log(pass)
			$http({method:'get',
				  url:$scope.passApi,
				  params:pass})
			.success(function(data){
				console.log(data);
				$state.go("denglu");
				$ionicViewSwitcher.nextDirection("back")
			})
		$http.get($scope.passApi)
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
