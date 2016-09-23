// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter.services',[]);
angular.module('starter.controllers',[]);
angular.module('starter.directives',[]);
angular.module('templates', []);
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','templates',"starter.directives"])

.run(function($ionicPlatform,$rootScope,$ionicHistory,$ionicViewSwitcher,$ionicSlideBoxDelegate,$ionicLoading,$ionicScrollDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  
    $rootScope.path = "http://10.9.174.35:8080";
    $rootScope.store_img="http://10.9.174.35/eland/upload/store/"
		$rootScope.goods_img="http://10.9.174.35/eland/upload/store/goods/";
		$rootScope.banner_img="http://10.9.174.35/eland/upload/adv/";
		$rootScope.pinpai_img="http://10.9.174.35/eland/upload/brand/";
		$rootScope.xianshi_img="http://10.9.174.35/eland/upload/xianshi/";
		$rootScope.touxiang_img="http://10.9.174.35/img/";
		$rootScope.bendi_img="http://10.9.174.35/img/sellerShowPics/";
		$rootScope.tuihuo_img="http://10.9.174.35/img/sellerShowPics/";
		$rootScope.top_show=true;
		$rootScope.foot_show=true;
		$rootScope.win_W = window.innerWidth;  
    $rootScope.win_H=window.innerHeight; 

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);    
    };
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  })
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
  //页面刷新
  $rootScope.doRefresh=function(){
  	
  }
  //后退
    $rootScope.goBack = function () {
    	
    	alert("back");
      $ionicHistory.goBack();
      $ionicViewSwitcher.nextDirection("back");
    }
  });
  //返回顶部
   $rootScope.scrollTop  = function () {
    	$ionicScrollDelegate.scrollTop(true);
   }
  //收藏
	 $rootScope.collectionIt=function(e,type,id){
	 	angular.element(e.target).toggleClass("ion-android-favorite-outline");
	 	angular.element(e.target).toggleClass("ion-android-favorite");
	 	var str=""
	 	if(angular.element(e.target).attr("shoucang")){
	 		angular.element(e.target).attr("shoucang",false);
	 		str="收藏成功";
	 	}else{
	 		angular.element(e.target).attr("shoucang",true);
	 		str="取消收藏";
	 	}
	 } 
  $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParamss){
                if(toState.name=="tab.myinfo"||toState.name=="tab.pinpai"||toState.name=="tab.shopCart"){               
									$rootScope.hideTabs = true;
                }else{               
                	$rootScope.hideTabs = false;
                }
        })
 
})

