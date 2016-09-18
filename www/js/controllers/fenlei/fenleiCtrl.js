angular.module('starter.controllers')
.controller('FenleiCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope) {
    $scope.fenlei1Api=$rootScope.path+"/eland/api/elandGoodsClass/selectFirstGoodsClass";
    $scope.fenlei1Api=$rootScope.path+"/eland/api/elandGoodsClass/selectFirstGoodsClass";
    $scope.fenlei1Api=$rootScope.path+"/eland/api/elandGoodsClass/selectFirstGoodsClass";
    $scope.actindex=0;
    $http.get("data.php", {params: {url:$scope.fenlei1Api}})
                        .success(function(data){
                        	console.log(data);
                            $scope.fenlei1 = data.data;
                        })
                        .error(function(){
                            alert("一级分类数据请求失败")
                        })//一级分类     
           
    $scope.onfenlei=function(index){
    	$scope.actindex=index;
    }
})
