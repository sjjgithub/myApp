angular.module('starter.controllers')
.controller('ToutiaoCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
      $scope.thisApi=$rootScope.path+"elandSetting/selectElandTopNews?type=8";
      $http.get($scope.thisApi)
      .success(function(data){     	
      	$scope.toutiaos=data.data;     	
      })
     
})
