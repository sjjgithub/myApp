angular.module('starter.controllers')
.controller('ShouyinCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals,$ionicModal,$filter){    
    if($stateParams.payInfo){
     	locals.setObject("payInfo",$stateParams.payInfo);
     }

$scope.getSign=$rootScope.path+"elandOrder/alipaySign";
$scope.zhifubaoApi="https://openapi.alipay.com/gateway.do";

 $scope.payInfo=locals.getObject("payInfo")
 console.log($scope.payInfo)
  $scope.payType;
	$scope.chePay=function(type){
		$scope.payType=type;
	}
	$scope.payIt=function(){
	
		if($scope.payType==0){ //支付宝
			var mayi={};
			var formData=new FormData();
			mayi.app_id="2016083101828596";
			mayi.method="alipay.trade.wap.pay";
			mayi.sign_type="RSA";
			mayi.version="1.0";
			mayi.charset="utf-8";			
			mayi.timestamp=$filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
			mayi.biz_content={"subject":"依恋购物","out_trade_no": $scope.payInfo.orderSn,"timeout_express":"90m","total_amount":0.01,"product_code":"QUICK_WAP_PAY"};
			
			formData.append("app_id","2016083101828596");
			formData.append("method","alipay.trade.wap.pay");
			formData.append("sign_type","RSA");
			formData.append("version","1.0");
			formData.append("charset","utf-8");
			formData.append("timestamp",$filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss'));
			formData.append("biz_content",{"subject":"依恋购物","out_trade_no": $scope.payInfo.orderSn,"timeout_express":"90m","total_amount":0.01,"product_code":"QUICK_WAP_PAY"});
			
		var	signString='?app_id=2014072300007148&biz_content='+JSON.stringify(mayi.biz_content)+'&charset=GBK&method=alipay.mobile.public.menu.add&sign_type=RSA&timestamp='+mayi.timestamp+'&version=1.0';	
		console.log($scope.getSign+signString)
		$http.get($scope.getSign+signString)
		.success(function(data){
			console.log(data);
			if(data.status==0){
				formData.append("sign",data.data)
				console.log($scope.zhifubaoApi+signString+"&sign="+data.data);
				$.ajax({
					type:"get",
					url:$scope.zhifubaoApi,
					data:formData,
					async:false,
//					processData : false,  
//              	contentType : false, 
					jsonp: "callbackparam",
//  				crossDomain: true,
					success:function(data){
						alert(JSON.stringify(data))
					},
					error:function(data){
						alert(JSON.stringify(data));
					}
				});
			}
		})
		
//https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.trade.wap.pay&app_id=1990&sign_type=RSA&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&biz_content=
//{
//  "body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。",
//  "subject":"大乐透",
//  "out_trade_no":"70501111111S001111119",
//  "timeout_express":"90m",
//  "total_amount":9.00,
//  "product_code":"QUICK_WAP_PAY"
//} 			
		}
		if($scope.payType==1){  //微信
			function onBridgeReady(){
			   WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":"wx1e0152682094883a",     //公众号名称，由商户传入     
			           "timeStamp":" 1395712654",         //时间戳，自1970年以来的秒数     
			           "nonceStr" : "e61463f8efa94090b1f366cccfbbb444", //随机串     
			           "package" : "prepay_id=u802345jgfjsdfgsdg888",     
			           "signType" : "MD5",         //微信签名方式:     
			           "paySign" : "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			       }
			   ); 
			}
			if (typeof WeixinJSBridge == "undefined"){
			   if( document.addEventListener ){
			       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			   }else if (document.attachEvent){
			       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			   }
			}else{
			   onBridgeReady();
			}
		}//weixined  
	}
})
