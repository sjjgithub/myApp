angular.module('starter.controllers')
.controller('SearchindexCtrl', function($scope,$state,$http,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
// $scope.$on('$ionicView.enter', function(e) {
//  	
//  });
    document.querySelector("input").focus();
  		$scope.getHotKeyApi="/eland/api/elandSetting/getHotSearch";
 			$scope.keys=[];
			$scope.search="";
		
  
	$http.get("data.php",{params:{url:$rootScope.path+$scope.getHotKeyApi}})
			.success(function(data){			
				$scope.keys.keys=data.data;	
				$scope.keys.lens=[];					
				for(var k in $scope.keys.keys){
					$scope.keys.lens.push($scope.keys.keys[k].length)				
				}			
			})
				.error(function(){
					alert("失败")
				})
		})

