angular.module('starter.controllers')
.controller('TuikuanCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,shcemUtil,$ionicPopover,locals) {
	$scope.orderIt=locals.getObject("tuikuanOrder");
	console.log($scope.orderIt)
	$scope.thisApi=$rootScope.path+"elandReturn/sendReturnGoods";
	$scope.this2Api=$rootScope.path+"elandRefundLog/applyRefundLog";
	$scope.type=0;
	$scope.ret={};
	$scope.ret.orderId=$scope.orderIt.orderId;
	$scope.ret.imgs=[];	
	$scope.ret.returnGoodsnum=$scope.orderIt.num;
	$scope.cheType=function(type){
		$scope.type=type;
		console.log($scope.type)
	}
	$scope.addIt=function(it){
	 	var files = it.files;	 	
	 	for(var i=0;i<files.length;i++){
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
		console.log($scope.ret);
			if($scope.ret.orderRefund&&$scope.ret.refundBuyerName&&$scope.ret.refundBuyerAccount){
				if($scope.type==0){
					console.log($scope.ret)
					var formData = new FormData();
					formData.append("buyerMessage",$scope.ret.buyerMessage);
					formData.append("orderId",$scope.ret.orderId);
					formData.append("orderRefund",$scope.ret.orderRefund);
					formData.append("refundBuyerAccount",$scope.ret.refundBuyerAccount);
					formData.append("refundBuyerName",$scope.ret.refundBuyerName);
					formData.append("returnGoodsnum",$scope.ret.returnGoodsnum);
					formData.append("files",sendIt.img.files[0]);
//					$http({method:'POST',url:$scope.thisApi,params:$scope.ret})
////					$http.post($scope.thisApi,$scope.ret)
	 			$.ajax({  
	                url : $scope.thisApi,  
	                type : 'POST',  
	                data : formData,  
	                processData : false,  
	                contentType : false,  
					success:function(data){
						console.log(data);
							shcemUtil.showMsg(data.msg)
							if(data.status==0){
								$state.go("returnOrderDetail",{"tuiOrderId":$scope.ret.orderId});
							}								
					}
					});
					
				}else{		
					console.log(1)
					$http({method:'POST',url:$scope.this2Api,params:$scope.ret})
//					$http.post($scope.this2Api,$scope.ret)
					.success(function(data){
						console.log(data);
						if(!data.status){
							shcemUtil.showMsg(data.msg)
							$state.go("returnOrderDetail",{"tuiOrderId":$scope.ret.orderId});
						}						
					});
				}				
			}else{
				shcemUtil.showMsg("请完善申请表")
			}
	}
})
