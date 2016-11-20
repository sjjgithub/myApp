angular.module('starter.services', [])

//.factory('Chats', function() {
//// Might use a resource here that returns a JSON array
//
//// Some fake testing data
//var chats = [{
//  id: 0,
//  name: 'Ben Sparrow',
//  lastText: 'You on your way?',

//  face: 'img/ben.png'
//}, {
//  id: 1,
//  name: 'Max Lynx',
//  lastText: 'Hey, it\'s me',
//  face: 'img/max.png'
//}, {
//  id: 2,
//  name: 'Adam Bradleyson',
//  lastText: 'I should buy a boat',
//  face: 'img/adam.jpg'
//}, {
//  id: 3,
//  name: 'Perry Governor',
//  lastText: 'Look at my mukluks!',
//  face: 'img/perry.png'
//}, {
//  id: 4,
//  name: 'Mike Harrington',
//  lastText: 'This is wicked good ice cream.',
//  face: 'img/mike.png'
//}];
//
//return {
//  all: function() {
//    return chats;
//  },
//  remove: function(chat) {
//    chats.splice(chats.indexOf(chat), 1);
//  },
//  get: function(chatId) {
//    for (var i = 0; i < chats.length; i++) {
//      if (chats[i].id === parseInt(chatId)) {
//        return chats[i];
//      }
//    }
//    return null;
//  }
//};
//})
.factory('locals',['$window',function($window){
      return{
        //存储单个属性
        set :function(key,value){
          $window.sessionStorage.setItem(key, value);;
        },
        //读取单个属性
        get:function(key,defaultValue){
          return  $window.sessionStorage.getItem(key) || defaultValue;
        },
        //存储对象，以JSON格式存储
        setObject:function(key,value){
          $window.sessionStorage.setItem(key,JSON.stringify(value));
        },
        //读取对象
        getObject: function (key) {
          return JSON.parse($window.sessionStorage.getItem(key) || '{}');
        },
				delItem:function(key){
					 return $window.sessionStorage.removeItem(key);
				}
      }
  }])
//.factory('Api', function($http, ApiEndpoint) {
//console.log('ApiEndpoint', ApiEndpoint)
//
//var getApiData = function() {
//  return $http.get(ApiEndpoint.url + '/tasks')
//    .then(function(data) {
//      console.log('Got some data: ', data);
//      return data;
//    });
//};
//
//return {
//  getApiData: getApiData
//};
//})