angular.module('starter.controllers')
.controller('StorefenleiCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,locals,$stateParams) {
	var storeId=locals.get("storeId");
    $scope.fenlei1Api=$rootScope.path+"elandStoreGoodsClass/getGoodsClassByStoreId?storeId="+storeId;
    $scope.actindex=0;
    $http.get($scope.fenlei1Api)
                        .success(function(data){
                        	console.log(data);
                        	!data.status?$scope.fenlei1s=data.data:null;  
                        	getDetails();
                        })
                        .error(function(){
                        
                        })//一级分类     
    function getDetails(){    	
			$scope.fenlei2s=$scope.fenlei1s[$scope.actindex].childrenList;
    }   
    $scope.onfenlei=function(index){
    	$scope.actindex=index;
    	getDetails();
    }
})
