angular.module('starter.controllers')
.controller('ShouyinCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals,$ionicModal){    
    if($stateParams.payInfo){
     	locals.setObject("payInfo",$stateParams.payInfo);
     }
    $scope.zhifubaoApi="https://openapi.alipay.com/gateway.do?app_id=2016083101828596&method=alipay.trade.wap.pay&sign_type=RSA&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0"
  $scope.payInfo=locals.getObject("payInfo")
  $scope.payType;
	$scope.chePay=function(type){
		$scope.payType=type;
		console.log($scope.payType)
	}
	$scope.payIt=function(){
		if($scope.payType==0){ //支付宝
			
		}
		if($scope.payType==1){  //微信
			
		}
	}
})
