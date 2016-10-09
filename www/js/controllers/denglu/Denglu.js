angular.module('starter.controllers')
.controller('DengluCtrl', function($scope,$state,$http,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicPlatform) {
    $scope.thisApi=$rootScope.path+"member/login?";
    var str="client=ios&devNum=F16CE6D7-ECED-40DD-9C5B-3E4F6C3F2342&password=sjh523261&type=&username=15378791993";
   console.log(ionic.Platform.device())
		var v=ionic.Platform.version()
		var type=ionic.Platform.platform()
		$scope.login=function(){
			
		}
});
