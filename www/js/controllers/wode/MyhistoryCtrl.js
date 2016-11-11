angular.module('starter.controllers')
.controller('MyhistoryCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals,$ionicPopup) {
	var memberId=locals.get("memberId");
	var pageIndex=1;
	$scope.more=false;
	$scope.thisApi=$rootScope.path+"elandFoot/getFootHistory?pageSize=20&memberId="+memberId+"&pageIndex=";
	$scope.delApi=$rootScope.path+"elandFoot/deleteFootHistory?memberId="+memberId;
	function getfoot(){
		$http.get($scope.thisApi+pageIndex)
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
    $scope.loadMoreData=function(){
				pageIndex++;			
				$http.get($scope.thisApi+pageIndex)
				.success(function(data){
					console.log(data);
					if(data.data.length>1&&data.status==0){
						$scope.goodsHistory=$scope.goodsHistory.concat(data.data);
					}else{
						$scope.more=true;
						if(pageIndex>1){
							shcemUtil.showMsg("没有更多数据了");
						}
						
					}										
				})
				.finally(function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
			
			}
})
