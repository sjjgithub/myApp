angular.module('starter.controllers')
.controller('RegisterCtrl', function($scope,$state,$http,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals) {
    $scope.thisApi=$rootScope.path+"/eland/api/member/sendAuthCode?memberMobile=10010001000";
    			$scope.codeIt="";
				$scope.code="";
				$scope.submitted = false;
				$scope.checkCode=function(){
							console.log($scope.code);
							console.log($scope.codeIt);
					if($scope.code==$scope.codeIt&&$scope.codeIt!=""){
						$scope.time="验证成功"
					}else{
						$scope.time="重新发送"
					}
				}//checkCode
				$scope.getCode=function(event){
					$scope.time=60;
					$http.get($scope.thisApi)
							.success(function(data){
								$scope.codeIt=data.data;
								alert($scope.codeIt);
							})
					timeDown();
					function timeDown(){
						if($scope.time>=0){
							$(event.target).html("失效记时"+$scope.time);
							$scope.time--;
							$(event.target).attr("disabled","disabled");
							$timeout(timeDown,1000);
						}else{
							$(event.target).attr("disabled",false)
							if($scope.time!=-1){
								$(event.target).html($scope.time);
								$scope.time=60;
							}else{
								$(event.target).html("重新发送");
							}
						}
					}
				}//getCode
//				$scope.signupForm=function(){
//					if($scope.register_form.$valid){
//							alert("跳转主页")
//					}else{
//						console.log($scope.register_form.phone.$valid)
//						$scope.register_form.phone.$valid=false;
//						$scope.register_form.submitted = true;
//					}
//				}
//			})
		$scope.login=function(){
			console.log(11)
		}
});
