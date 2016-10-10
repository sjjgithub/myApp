		angular.module('starter.controllers')
		.controller('DengluCtrl', function($scope,$state,$http,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicPlatform) {
		    $scope.thisApi=$rootScope.path+"member/login?";
		    var str="client=ios&devNum=F16CE6D7-ECED-40DD-9C5B-3E4F6C3F2342&password=sjh523261&type=&username=15378791993";	  
				var type=ionic.Platform.platform();
				$scope.login=function(){
					$http.get($scope.thisApi+"client="+type+"&devNum=F16CE6D7-ECED-40DD-9C5B-3E4F6C3F2342"+"&password="+login.pass.value+"&username="+login.user.value)
					.success(function(data){
						if(!data.status){
							locals.setObject("userData",data.data);
							$state.go("tab.main")
						}else{
							shcemUtil.showMsg(data.msg,2000)
						}
					})
				}		
		});
