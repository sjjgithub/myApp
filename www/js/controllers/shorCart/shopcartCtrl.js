angular.module('starter.controllers')
.controller('ShopcartCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope) {
            $scope.num1=1;
            $scope.add=function(){              
            $scope.num1++;
            }
            $scope.jian=function(){              
            $scope.num1--;
            if($scope.num1<0){
               	$scope.num1=0;
            	}
            }
})
