angular.module('starter.controllers')
.controller('AboutstoreCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$stateParams,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover,locals) {	
    $scope.storeIt= locals.getObject("storeInfo");
	$scope.zhiliang={"width": $scope.storeIt.storeDesccredit*20+"%"};
	$scope.taidu={"width": $scope.storeIt.storeCredit*20+"%"}
	$scope.sudu={"width": $scope.storeIt.storeDeliverycredit*20+"%"}
})
