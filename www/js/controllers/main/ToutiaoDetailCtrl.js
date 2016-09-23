angular.module('starter.controllers')
.controller('ToutiaoDetailCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
     $scope.art=$stateParams.con;
  		$scope.tit=$stateParams.tit;
})
