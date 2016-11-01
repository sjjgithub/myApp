angular.module('starter.controllers')
.controller('RegisterCtrl', function($scope,$state,$http,$timeout,$interval,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
    $scope.codeApi=$rootScope.path+"member/sendAuthCode?type=register&memberMobile=";
	$scope.putItApi=$rootScope.path+"member/register?devNum=F16CE6D7-ECED-40DD-9C5B-3E4F6C3F2342&";
	$scope.timeout="获取验证码";
				$scope.getCode=function(event){
					$scope.isSend=true;
					$http.get($scope.codeApi+register.phone.value)
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
				}//getCode

		$scope.putIt=function(){
		console.log("memberMobile="+register.phone.value+"&authCode="+register.code.value+"&password="+register.pass.value)
			if(register.agree.value){
				$http.get($scope.putItApi+"memberMobile="+register.phone.value+"&authCode="+register.code.value+"&password="+register.pass.value)
				.success(function(data){
					console.log(data)
					if(data.status){
						shcemUtil.showMsg(data.msg,2000)
					}else{
						$state.go("denglu")
					}
				})
			}else{
				shcemUtil.showMsg("请同意依恋协议",2000)
			}
		}
});
