angular.module('starter.controllers')
.controller('ToutiaoCtrl', function($scope,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,$http) {
      $scope.thisApi=$rootScope.path+"/eland/api/elandSetting/selectElandTopNews?type=8";
      $http.get("data.php",{params:{url:$scope.thisApi}})
      .success(function(data){     	
      	$scope.toutiaos=data.data;     	
      })
     
})
