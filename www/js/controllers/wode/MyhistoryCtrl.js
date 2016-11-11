angular.module('starter.controllers')
.controller('MyhistoryCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals,$ionicPopup) {
	var memberId=locals.get("memberId")
	$scope.thisApi=$rootScope.path+"elandFoot/getFootHistory?pageIndex=1&pageSize=20&memberId="+memberId;
	$scope.delApi=$rootScope.path+"elandFoot/deleteFootHistory?memberId="+memberId;
	function getfoot(){
		$http.get($scope.thisApi)
		.success(function(data){
			console.log(data)
			$scope.goodsHistory=data.data;
		})
        .error(function(){
        	
        })
	}
	getfoot()
    $scope.clearIt=function(){
    	 		
               $scope.confirm=$ionicPopup.confirm({
                   title: '提示', 
                   subTitle: "是否删除足迹?",
             	   okText: '确定', // String (default: 'OK'). The text of the OK button.
                   cancelText:'取消',
                   cancelType:'button-light'
               })
                       .then(function(res){
                           if(res){
                               $http.get($scope.delApi)
                               .success(function(data){
                               	shcemUtil.showMsg(data.msg,2000)
                               	getfoot();
                               })
                           }
                       })
            
    }
})
