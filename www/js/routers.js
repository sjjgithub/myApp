
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
  
  $httpProvider.defaults.useXDomain=true;
  delete $httpProvider.defaults.headers
  .common['X-Requsted-With'];
     })();
	$ionicConfigProvider.scrolling.jsScrolling(true);
	$stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsearchCtrl'
  })
  // Each tab has its own nav history stack:
			
  .state('tab.main', {
    url: '/main',
    views: {
      'tab-main': {
        templateUrl: 'templates/main/main.html',
       	controller: 'MainCtrl'
      }
    }
  })
  			.state('search', {
		    url: '/search',
		    abstract: true,
		    templateUrl: 'templates/search/search-index.html',
		    controller: 'SearchCtrl'		    
			})
			.state("search.index",{
		    	url:"/index",
		        templateUrl: 'templates/search/search.html',
		       	controller: 'SearchindexCtrl'
		    })
			.state("search.result",{
		    	url:"/result",
		    		params:{"keywords":null},
		        templateUrl: 'templates/search/result.html',
		       	controller: 'ResultCtrl'
		    })
			.state("detail",{
		    	url:"/detail",
		    		params:{"goodsId":null},
		    		
		        templateUrl: 'templates/main/detail.html',
		       	controller: 'DetailCtrl'
		    })
			.state("info",{
		    	url:"/info",
		    		params:{"goodsId":null},		    		
		        templateUrl: 'templates/main/info.html',
		       	controller: 'InfoCtrl'
		   })
			.state("limitTime",{
		    	url:"/limitTime",
		    		params:{"goodsId":null},		    		
		        templateUrl: 'templates/main/limitTime.html',
		       	controller: 'LimitTimeCtrl'
		   })
			.state("jingpin",{
		    	url:"/jingpin",
		    		params:{"goodsId":null},		    		
		        templateUrl: 'templates/main/jingpin.html',
		       	controller: 'JingpinCtrl'
		   })
			.state("rexiao",{
		    	url:"/rexiao",
		    		params:{"goodsId":null},		    		
		        templateUrl: 'templates/main/rexiao.html',
		       	controller: 'RexiaoCtrl'
		   })
	.state('tab.fenlei', {
    url: '/fenlei',
    views: {
      'tab-fenlei': {
        templateUrl: 'templates/fenlei/fenlei-index.html',
        controller: 'FenleiCtrl'
      }
    }
  })
//			 .state('search',{
//			 	url:'/search',
//			 	views:{
//			 		'search':{
//			 			templateUrl:'templates/search/search-index.html',
//      		controller: 'SearchCtrl'
//			 		}
//			 	}
//			 })
		.state('tab.pinpai', {
    url: '/pinpai',
    views: {
      'tab-pinpai': {
        templateUrl: 'templates/pinpai/pinpai.html',
        controller: 'ShopcartCtrl'
      }
    }
  })
		.state('tab.shopCart', {
    url: '/shopCart',
    views: {
      'tab-shopCart': {
        templateUrl: 'templates/shopCart/shopCart.html',
        controller: 'ShopcartCtrl'
      }
    }
  })
  .state('tab.myinfo', {
    url: '/myinfo',
    views: {
      'tab-myinfo': {
        templateUrl: 'templates/wode/myinfo.html',
        controller: 'MyinfoCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');
	
});

