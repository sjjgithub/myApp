angular.module('starter.controllers')
.controller('BuyerShowCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {
	$scope.thisApi=$rootScope.path+"elandSellerShow/topicClassList";
	$scope.showApi=$rootScope.path+"elandSellerShow/releaseSellerShow";
	$scope.show={};
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		$scope.tits=data.data;
		$scope.show.topicId=$scope.tits[0].topicId;
	})
	$scope.cheType=function(tit){
		$scope.show.topicId=tit.topicId;
	}
	$scope.addIt=function(it){
	 	$scope.show.files = it.files;	 	
	 	for(var i=0;i<$scope.show.files.length;i++){
                 var reader = new FileReader();
                 var file = $scope.show.files[i];               
                 reader.onload = (function(file) {
                     return function(e) {
                     	var oDiv = document.createElement("div");
                     	oDiv.className="img-wrap fl addImg";
                     	var oImg = document.createElement("img");
                     	oImg.className="img-a";
                        oImg.src = this.result;
                        oDiv.appendChild(oImg);
                        document.querySelector("#imgs").appendChild(oDiv);
                    };
                 })(file);
                 //读取文件内容
                 reader.readAsDataURL(file)
             }
	}
	$scope.putIt=function(){
		console.log(1)
		$http.post($scope.showApi,$scope.show)
		.success(function(data){
			console.log(data)
		})
		
//goodsId	245
//memberId	127
//orderId	857
//recId	1087
//showContext	收拾收拾
//showTitle	往往是的山山水水
//specId	509
//topicId	2
//files	img.jpg
	}
})
