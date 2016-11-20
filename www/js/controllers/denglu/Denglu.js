		angular.module('starter.controllers')
		.controller('DengluCtrl', function($scope,$state,$http,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,$stateParams,locals,$ionicPlatform,$window) {
			
//			$rootScope.path="http://10.9.174.35:8090/eland/api/";
		    $scope.thisApi=$rootScope.path+"member/login?"; 
				var type=ionic.Platform.platform();
				$scope.login=function(){
					$http.get($scope.thisApi+"client="+type+"&devNum=F16CE6D7-ECED-40DD-9C5B-3E4F6C3F2342"+"&password="+login.pass.value+"&username="+login.user.value)
					.success(function(data){
						console.log(data)
						if(data.status==0){
							locals.set("memberId",data.data.memberId);
							$rootScope.memberId=data.data.memberId;
							$state.go("tab.main")
						}else{
							shcemUtil.showMsg(data.msg,2000)
						}
					})
				}	
				
//	QC.Login({
//     //btnId：插入按钮的节点id，必选
//     btnId:"qqLoginBtn",	
//     //用户需要确认的scope授权项，可选，默认all
//     scope:"all",
//     //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
//     size: "B_S"
// }, function(reqData, opts){//登录成功
//     //根据返回数据，更换按钮显示状态方法
//     alert(1)
//     var dom = document.getElementById(opts['btnId']),
//     _logoutTemplate=[
//          //头像
//          '<span><img src="{figureurl}" class="{size_key}"/></span>',
//          //昵称
//          '<span>{nickname}</span>',
//          //退出
//          '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'	
//                   ].join("");
//     dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
//         nickname : QC.String.escHTML(reqData.nickname),
//         figureurl : reqData.figureurl
//            }));
// }, function(opts){//注销成功
//alert('QQ登录 注销成功');
//                   }
//);
				
//				$scope.qqLogin=function(){
//					QC.Login.signOut();
//					QC.Login.showPopup({appId:"1105678796",
//    				redirectURI:"http://172.16.0.19:8086/myApp/www/qc_callback.html"});  				
//    			}
						
		});
//if(QC.Login.check()){					
//					QC.Login.getMe(function(openId, accessToken){
//						console.log(openId);
//						console.log(accessToken);
////						var paras={};
////						console.log(paras)
////					QC.api("get_user_info", paras)
////						.success(function(s){
////							console.log(s)
////						})
//					})
//					
//				}		