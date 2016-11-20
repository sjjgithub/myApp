
angular.module('starter')

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  //Loading 和 http 请求绑定
     $httpProvider.interceptors.push(function($rootScope) {
       return {
         request: function(config) {
           $rootScope.$broadcast('loading:show')
           return config
         },
         response: function(response) {
           $rootScope.$broadcast('loading:hide')
           return response
         }
       }
     });
    $httpProvider.defaults.useXDomain=true;
 			 delete $httpProvider.defaults.headers
  		.common['X-Requsted-With'];
     //让nav一直在下边
     (function(){
      	$ionicConfigProvider.platform.ios.tabs.style('standard'); 
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');       $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

        $ionicConfigProvider.platform.ios.views.transition('ios'); 
        $ionicConfigProvider.platform.android.views.transition('android');
   
    $ionicConfigProvider.views.maxCache(30);
    $httpProvider.defaults.timeout = 10000;
  
 
     })();
	$ionicConfigProvider.scrolling.jsScrolling(true);
	$stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })
   
  // Each tab has its own nav history stack:
		.state('denglu', {
				  			url: '/denglu', 
				  			cache:'false',
				        templateUrl: 'templates/denglu/dneglu.html',
				         controller:"DengluCtrl"
				  			})
	.state('resertPass', {
				   		 	url: '/resertPass',  
				   		 	params:{"useId":null},
				   		 	cache:'false', 
				        templateUrl: 'templates/denglu/resertPass.html',
				        controller: 'ResertpassCtrl' 
				  			})
	.state('forgetPass', {
				   		 	url: '/forgetPass',  
				   		 	cache:'false', 
				        templateUrl: 'templates/denglu/forgetPass.html',
				        controller: 'ForgetpassCtrl' 
				  			})
	.state('register', {
				   		 	url: '/register',  
				        templateUrl: 'templates/denglu/register.html',
				        controller: 'RegisterCtrl' 
				  			})		
  .state('tab.main', {
    url: '/main',
    cache:'false', 
    views: {
      'tab-main': {
        templateUrl: 'templates/main/main.html',
       	controller: 'MainCtrl'
      }
    }
  })
//			.state('search', {
//			cache:'false',
//		    templateUrl: 'templates/search/search.html',	    
//			})
			.state("searchIndex",{
		    	url:"/search-index",
		    	cache:'false',
		        templateUrl: 'templates/search/search-index.html',
		       	controller: 'SearchCtrl'
		    })
			.state("searchResult",{
		    	url:"/search-result",
		    		params:{"keywords":null},
		        templateUrl: 'templates/search/result.html',
		       	controller: 'ResultCtrl'
		    })
			.state("detail",{
		    	url:"/detail/:goodsId",
//		    		params:{"goodsId":null},
	    			cache:'false', 
		        templateUrl: 'templates/main/detail.html',
		       	controller: 'DetailCtrl'
		    })
					.state("pingjia",{
				    	url:"/pingjia/:goodsId",
//				    		params:{"goodsId":null},				    		
				        templateUrl: 'templates/main/pingjia.html',
				       	controller: 'PingjiaCtrl'
				    })
			.state("store",{
		        templateUrl: 'templates/pinpai/store.html',		      
		    })
						.state("store.index",{
		    	  url:"/store-index/:storeId",
//		    		params:{"storeId":null},		
		    		cache:'false', 
		        templateUrl: 'templates/pinpai/store-index.html',
		       	controller: 'StoreIndexCtrl'
		    		})
						.state("store.goods",{
		    	  url:"/store-goods",
		    		params:{"stcId":null,"stcType":null},		
		        templateUrl: 'templates/pinpai/store-goods.html',
		       	controller: 'StoregoodsCtrl'
		    		})
						.state("aboutStore",{
		    	  url:"/store-about",		
		        templateUrl: 'templates/pinpai/store-about.html',
		       	controller: 'AboutstoreCtrl'
		    		})
			.state("info",{
		    	url:"/info",
		    		params:{"goodsId":null},		    		
		        templateUrl: 'templates/main/info\n.html',
		       	controller: 'InfoCtrl'
		   })
			.state("infoDetail",{
		    	url:"/infoDetail/:infotype",
//		    		params:{"infotype":null},		    		
		        templateUrl: 'templates/main/infoDetail.html',
		       	controller: 'InfoDetailCtrl'
		   })
			.state("toutiao",{
		    	url:"/toutiao/:toutiao",
		    		params:{"toutiao":null},		    		
		        templateUrl: 'templates/main/toutiao.html',
		       	controller: 'ToutiaoCtrl'
		   })
			.state("toutiaoDetail",{
		    	url:"/toutiaoDetail",
		    		params:{"con":null,"tit":null},		    		
		        templateUrl: 'templates/main/toutiaoDetail.html',
		        controller: 'ToutiaoDetailCtrl'
		   })
			.state("limitTime",{
		    	url:"/limitTime/:limitId",
		    		params:{"limitId":null},		    		
		        templateUrl: 'templates/main/limitTime.html',
		       	controller: 'LimitTimeCtrl'
		   })
			.state("jingpin",{
		    	url:"/jingpin",
		    	    cache:'false', 		
		        templateUrl: 'templates/main/jingpin.html',
		       	controller: 'JingpinCtrl'
		   })
			.state("xinpin",{
		    	url:"/xinpin",
		       	cache:'false', 	
		        templateUrl: 'templates/main/xinpin.html',
		       	controller: 'XinpinCtrl'
		   })
			.state("quan",{
		    	url:"/quan/:goodsId",
		    	cache:'false',
		    		params:{"goodsId":null},		    		
		        templateUrl: 'templates/main/quan.html',
		       	controller: 'QuanCtrl'
		   })
			.state("rexiao",{
		    	url:"/rexiao",
		    			 cache:'false',    		
		        templateUrl: 'templates/main/rexiao.html',
		       	controller: 'RexiaoCtrl'
		  })			
	.state('tab.fenlei', {
    url: '/fenlei',
    views: {
      'tab-fenlei': {
        templateUrl: 'templates/fenlei/fenlei.html',
        controller: 'FenleiCtrl'
      }
    }
 })
	.state('searchfeileig', {
    		url: '/fenleiSearch/:gcId', 
    		params:{"gcId":null},	
        templateUrl: 'templates/fenlei/feilei-search.html',
        controller: 'FenleiSearchCtrl'
 })
		.state('tab.pinpai', {
    url: '/pinpai',
    views: {
      'tab-pinpai': {
        templateUrl: 'templates/pinpai/pinpai.html',
        controller: 'PinpaiCtrl'
      }
    }
  })
		.state('pinpai-feileig', {
    		url: '/pinpai-feileig/:gcId', 
    		cache:'false', 
    		params:{"gcId":null},	
        templateUrl: 'templates/pinpai/store-pinpai.html',
        controller: 'StorefenleiCtrl'
 })
		
		.state('tab.shopCart', {
    url: '/shopCart',
    cache:'false', 
    views: {
      'tab-shopCart': {
        templateUrl: 'templates/shopCart/shopCart.html',
        controller: 'ShopcartCtrl'
      }
    }
  })
	.state('buyCenter', {
    		url: '/buyCenter', 
    		cache:'false', 
        templateUrl: 'templates/main/buyCenter.html'
 })
		.state('orderSure', {
    		url: '/orederSure', 
    		cache:'false', 
    		params:{"orders":null,"buType":null},	
        templateUrl: 'templates/shopCart/orderSure.html'
//      controller: 'OrdersureCtrl'
 })
		.state('shouyin', {
    		url: '/shouyin', 
    		cache:'false', 
    		params:{"payInfo":null},	
        templateUrl: 'templates/shopCart/shouyin.html',
        controller: 'ShouyinCtrl'
 })
  .state('tab.myinfo', {
    url: '/myinfo',  	
    views: {
      'tab-myinfo': {     	
        templateUrl: 'templates/wode/myinfo.html',
        controller: 'MyinfoCtrl'
      }
    }
  })
		.state('myorder', {
   		 	url: '/myorder',  
    		params:{"ordType":null},	
        templateUrl: 'templates/wode/myorder.html',
        controller: 'MyorderCtrl'   
  	})
		.state('myorderDetail', {
   		 	url: '/myorderDetail',  
   		 	cache:'false',
    		params:{"orderId":null,"orderState":null},	
        templateUrl: 'templates/wode/myorderDetail.html',
        controller: 'MyorderDetailCtrl'   
  	})
		.state('tuikuan', {
   		 	url: '/tuikuan',  
   		 	cache:'false',
    		params:{"ordType":null},	
        templateUrl: 'templates/wode/tuikuan.html',
        controller:"TuikuanCtrl"
  	})
		.state('tuiHistory', {
   		 	url: '/tuiHistory', 
   		 	cache:'\nfalae',
   		 	params:{"tuiType":null},
        templateUrl: 'templates/wode/tuiHistory.html',
        controller:"TuiHistoryCtrl"
  	})
		.state('buyerShow', {
   		 	url: '/buyerShow',  
   		 	cache:'false',
   		 	params:{"showGoods":null},	
        templateUrl: 'templates/wode/buyerShow.html',
        controller:"BuyerShowCtrl"
  	})
		.state('returnOrderDetail', {
   		 	url: '/resultOrderDetail',  
    		params:{"tuiOrderId":null},	
        templateUrl: 'templates/wode/returnOrderDetail.html',
        controller:"ReturnOrderDetailCtrl"
  	})
		.state('changeOrderDetail', {
   		 	url: '/changeOrderDetail',  
    		params:{"changeId":null,"specIdFrom":null},	
        templateUrl: 'templates/wode/changeOrderDetail.html',
        controller:"ChangeOrderDetailCtrl"
  	})
		.state('goodsPingjia', {
   		 	url: '/goodsPingjia',  
    		params:{"pingjiaId":null,"pingjiaStoreId":null},
        templateUrl: 'templates/wode/goodsPingjia.html',
        controller:"GoodsPingjiaCtrl"
  	})
		.state('setting', {
   		 	url: '/setting',  
        templateUrl: 'templates/wode/setting.html',
        controller: 'SettingCtrl'   
  	})
				.state('yijian', {
		   		 	url: '/yijian',  
		        templateUrl: 'templates/wode/yijian.html',
		        controller: 'YijianCtrl'   
		  	})
				.state('about', {
		   		 	url: '/about',  
		        templateUrl: 'templates/wode/about.html',
		        controller: 'AboutCtrl'   
		  	})
						.state('helps', {
				   		 	url: '/helps',  
				        templateUrl: 'templates/wode/helps.html' 
				  	})
								.state('helpnew', {
				   		 	url: '/helpnew',  
				        templateUrl: 'templates/wode/helpnew.html',
				        controller: 'HelpnewCtrl' 
				  			})	
				  			.state('helppay', {
				   		 	url: '/helppay',  
				        templateUrl: 'templates/wode/helppay.html',
				        controller: 'HelppayCtrl' 
				  			})	
				  			.state('helpsend', {
				   		 	url: '/helpsend',  
				        templateUrl: 'templates/wode/helpsend.html',
				        controller: 'HelpsendCtrl' 
				  			})				  			
				  			.state('address', {
				  			url: '/address', 
				  			 cache:'false', 
				        templateUrl: 'templates/wode/address.html',
				        controller:"AddressCtrl"
				  			})
				  			.state('addIt', {
				  			url: '/addIt',  
				  			params:{"memId":null},
				        templateUrl: 'templates/wode/addIt.html'
				  			})
				  			.state('changeIt', {
				  			url: '/changeIt', 
				  			params:{"addinfo":null},
				        templateUrl: 'templates/wode/changeIt.html',
				        controller:"ChangeItCtrl"
				        
				  			})
				  			.state('myshou', {
				  			url: '/myshou', 
				        templateUrl: 'templates/wode/myshou.html'	,
				         controller:"MyshouCtrl"
				  			})
				  			.state('myquan', {
				  			url: '/myquan', 
				        templateUrl: 'templates/wode/myquan.html'	,
				         controller:"MyquanCtrl"
				  			})
				  			.state('myhistory', {
				  			url: '/myhistory', 
				  			cache:'false', 
				        templateUrl: 'templates/wode/myhistory.html',
				        controller:"MyhistoryCtrl"
				  			})
 								.state('shareGoodsDetail', {
				  			url: '/shareGoodsDetail/:goodsId/:memberId', 
				  			cache:'false',
				        templateUrl: 'templates/main/ShareGoodsDetail.html',
				        controller:"ShareGoodsDetailCtrl"
				  			})
 								.state('shareStore', {
				  			url: '/shareStore/:storeId/:memberId', 
				  			cache:'false',
				        templateUrl: 'templates/pinpai/ShareStore.html',
				        controller:"ShareStoreCtrl"
				  			})
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/denglu');
	
});

