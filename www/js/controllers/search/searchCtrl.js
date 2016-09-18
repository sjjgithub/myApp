angular.module('starter.controllers')
.controller('SearchCtrl', function($scope,$state,$http,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
   
  		document.querySelector("input").focus();
  		$scope.searchIt=function(){ 						
  			$state.go("search.result",{"keywords":$scope.search.text},{reload:true})
  		}
  		$scope.clearIt=function(){
  			$scope.search.text="";
  		}
		})

