(function () {
 return angular.module("starter")
.constant("config", {
   // "apiUrl": "http://192.168.68.101:5400/shcem",
  // "apiUrl": "http://appnew.shcem.com:5400/shcem",       //不需要更换-架构会更换相应网关 appnew
 "apiUrl":"http://10.9.174.35:8080/eland/api/",
  //"uploaderUrl": "http://192.168.60.107/StaticFiles/File/UploadFile",
  "mode": "test"
});

})();




