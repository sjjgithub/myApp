angular.module('starter.controllers')
.controller('SettingCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals,$ionicActionSheet) {
	
	$scope.exitIt=function(){
	var hideSheet = $ionicActionSheet.show({
                      destructiveText: '确定',
                      titleText: '确认退出?',
                      cancelText: '取消',
                      destructiveButtonClicked:function(){
                      	locals.delItem("memberId");
//                    	QC.Login.signOut();
						$state.go("denglu");
                      	hideSheet();
                      }
                  });
		
	}
})
