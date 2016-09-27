angular.module('starter.controllers')
.controller('FenleiCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope) {
    $scope.fenlei1Api=$rootScope.path+"elandGoodsClass/selectFirstGoodsClass";
    $scope.detailsApi=$rootScope.path+"elandClassPage/getClassPage?pageNum=1&pageSize=10&gcParentId=";
    $scope.id;
    $scope.actindex=0;
    $http.get($scope.fenlei1Api)
                        .success(function(data){
                        	console.log(data);
                            $scope.fenlei1 = data.data;
                            if($scope.fenlei1&&$scope.fenlei1.length>=0){
                            	 getDetails($scope.fenlei1[0].gcId)
                            }                           
                        })
                        .error(function(){
                            alert("一级分类数据请求失败")
                        })//一级分类     
    function getDetails(id){
    	  $http.get($scope.detailsApi+id)
                        .success(function(data){
                        	console.log(data);
                            $scope.details= data.data;
                        })
                        .error(function(){
                            alert("一级分类数据请求失败")
                        })//一级分类         
    }    
    $scope.onfenlei=function(index,id){
    	$scope.actindex=index;
    	getDetails(id);
    }
})
