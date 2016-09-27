angular.module('starter.controllers')
.controller('InfoDetailCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
	$scope.infoApi=$rootScope.path+"elandMessage/readMessage?memberId=20";
    $scope.infoDetails=$stateParams.infotype;
    if($scope.infoDetails=="系统消息"){
    $http.get($scope.infoApi)
	.success(function(data){
		console.log(data)
		$scope.infos=data.data;
	})
    }
})
