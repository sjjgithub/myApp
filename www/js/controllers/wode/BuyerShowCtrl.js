angular.module('starter.controllers')
.controller('BuyerShowCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$stateParams,shcemUtil,$ionicPopover,locals) {
	if($stateParams.showGoods){
		locals.setObject("showGoods",$stateParams.showGoods)
	}
	$scope.thisApi=$rootScope.path+"elandSellerShow/topicClassList";
	$scope.showApi=$rootScope.path+"elandSellerShow/releaseSellerShow";
	$scope.showGoods=locals.getObject("showOrder");
	var memberId=locals.getObject("userData").memberId;
	console.log($scope.showGoods);
	$scope.show={};	
	$scope.show.memberId=memberId;
	$scope.show.goodsId=$scope.showGoods.goodsId;
	$scope.show.recId=$scope.showGoods.recId;
	$scope.show.specId=$scope.showGoods.specId;
	$scope.show.orderId=$scope.showGoods.orderId;
	$http.get($scope.thisApi)
	.success(function(data){
		console.log(data)
		$scope.tits=data.data;
		$scope.show.topicId=$scope.tits[0].topicId;
	})
	$scope.cheType=function(tit){
		$scope.show.topicId=tit.topicId;
	}
	$scope.addIt=function(){
		  var files=buyyerShow.imgs.files;
	 	for(var i=0;i<files.length;i++){
	 		formData.append("files",files[i]);
                 var reader = new FileReader();   
                 var file = files[i];  
               
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
	var formData = new FormData();
	formData.append("memberId",memberId);
	formData.append("goodsId",$scope.show.goodsId);
	formData.append("recId",$scope.show.recId);
	formData.append("specId",$scope.show.specId);
	formData.append("orderId",$scope.show.orderId);
	formData.append("topicId",$scope.show.topicId);
	formData.append("showTitle",buyyerShow.showTitle.value);
	formData.append("showContext",buyyerShow.showContext.value);
	 var files=buyyerShow.imgs.files;
	for(var i=0;i<files.length;i++){
	 		formData.append("files",files[i]);
	 	}
		 $.ajax({  
                url : $scope.showApi,  
                type : 'POST',  
                data : formData,  
                processData : false,  
                contentType : false,  
                success : function(data) {  
                    console.log(data)
                    if(!data.status){
                    	$state.go("myorderDetail",{},{location:'replace'})
                    }
                }, 
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
