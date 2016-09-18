
var app=angular.module('starter');

app.factory('shcemUtil', function($http, $state, $ionicLoading, config, $q) {
  var shcemUtil = this;


  function getAuthKey() {
    var authKey='usercode';

    var dataStr = window.localStorage.getItem('USER_CODE_KEY');
    if(dataStr) {
      var data = JSON.parse(dataStr);
      if(data) {
        var authData =data.token;
        authKey=authData;
        shcemUtil.console(authKey);
      }
    }

    return authKey;
  }

  function getVersion() {
    return 'Vlatest';
  }

  var fig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
  };
  shcemUtil.post = function(data, url) {
    if (url == undefined || url.length == 0) {
      // url = 'http://192.168.213.71:5412/shcem';
      //url = 'http://192.168.213.64:8080/shcem-seed/server/shcem.finance.service.IBankMgrService_getBankList_Res.json';
      url = generateUrl(data);
    }
    if (config.mode === 'local') {
      return $http.get(url);
    }

    // data.json.Userid = getAuthKey();
    data.json.Version = getVersion();
    return $http.post(url, data, fig);
  };

  /**
   * Promise方式执行post方法
   * */
  shcemUtil.promisePost = function(pdata, url) {
    if (url == undefined || url.length == 0) {
      // url = 'http://192.168.213.71:5412/shcem';
      //url = 'http://192.168.213.64:8080/shcem-seed/server/shcem.finance.service.IBankMgrService_getBankList_Res.json';
      url = generateUrl(pdata);
    }
    if (config.mode === 'local') {
      return shcemUtil.promiseGet(url);
    }

    data.json.Userid = getAuthKey();
    data.json.Version = getVersion();
    //$cookies.get("uaactoken")
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.post(url, pdata, fig)
      .success(function(data, status, headers, config) {
        deferred.resolve(data); //执行成功
      }).error(function(data, status, headers, config) {
      deferred.reject(); //执行失败
    });
    return promise;
  };

  shcemUtil.showLoading = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  };

  shcemUtil.showMsg = function(msg, duration) {
    $ionicLoading.show({
      template: msg,
      noBackdrop: true,
      animation: 'fade-in',
      duration: duration ? duration : 2000
    });
  };
  shcemUtil.console=function(msg){
    console.log(msg);
  };

  shcemUtil.hideLoading = function() {
    $ionicLoading.hide();
  };

  function generateUrl(data) {
    url = config.apiUrl;
    if (config.mode === 'local') {
      // var serviceNameArr = data.json.ServiceName.split('.');
      var serviceName = data.json.ServiceName + '_' + data.json.MethodName + '_Res.json';
      url = url + serviceName;
    }
    return url;
  }

  shcemUtil.readFile = function (filePath) {
    if (filePath == undefined || filePath == null){
      return;
    }
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get(filePath).success(function (data) {
      deferred.resolve(data); //执行成功
    }).error(function (error) {
      deferred.reject(); //执行失败
    });
    return promise;
  };

  return shcemUtil;
});

/**
 * http 请求拦截器
 * create by sunf@shcem.com 2015-05-05
 * @return {[type]} [description]
 */

app.factory('httpRequestInterceptor', function($q, config) {
  return {
    'responseError': function(rejection) {
      // do something on error
      console.log(rejection);

      return $q.reject(rejection);
    },
    request: function(request) {
      return request;
    },
    response: function(response) {
      if (config && config.mode !== 'local' &&
        typeof response.data === 'object' &&
        response.data.DATA &&
        response.data.DATA !== 'none' &&
        typeof response.data.DATA === 'string') {
        //console.log(response.data);
        response.data.DATA = JSON.parse(response.data.DATA);
      }
      return response;
    }
  };
});
app.config(function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
