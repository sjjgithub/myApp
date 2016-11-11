angular.module('starter.controllers')
.controller('ShopcartCtrl', function($scope,$parse,$state,$rootScope,$timeout,shcemUtil,$ionicPopover,$stateParams,$http,locals,$ionicScrollDelegate,$ionicActionSheet) {
       var memberId=locals.get("memberId");
       $scope.carsApi=$rootScope.path+"elandCart/enterCart?memberId="+memberId;
       $scope.delApi=$rootScope.path+"elandCart/dustBin";
       $scope.numApi=$rootScope.path+"elandCart/plusAndMinus"
       function getCars(){
       	 $http.get($scope.carsApi)
	       .success(function(data){
	       	if(!data.status){
	       		console.log(data)
	       		$scope.youxiao=data.data.cartStoreLt;
	       		$scope.wuxiao=data.data.invalidCartGoodsLt;
	       		for (k in $scope.youxiao){
	       			$scope.youxiao[k].cheStore=false;
	       			$scope.youxiao[k].cheind=0;
	       			$scope.youxiao[k].chePrice=0;
	       			for(i in $scope.youxiao[k].elandCartGoods){
	       				$scope.youxiao[k].elandCartGoods[i].cheGoods=false;
	       				$scope.youxiao[k].elandCartGoods[i].storeId=$scope.youxiao[k].storeId;
	       				$scope.youxiao[k].elandCartGoods[i].storeName=$scope.youxiao[k].storeName;
	       				$scope.youxiao[k].elandCartGoods[i].goodsprice=$scope.youxiao[k].elandCartGoods[i].specGoodsPrice;
	       				$scope.youxiao[k].elandCartGoods[i].price=$scope.youxiao[k].elandCartGoods[i].specGoodsPrice*$scope.youxiao[k].elandCartGoods[i].goodsNum;
	       			}
	       		}	       		
	       			console.log($scope.youxiao);
	       	}      	
	       })
       }
      	getCars();
       $scope.cheStore=function(car){  
       	car.cheStore?car.cheind=car.elandCartGoods.length:car.cheind=0;
       		for (k in car.elandCartGoods) {
       			car.elandCartGoods[k].cheGoods=car.cheStore;
       		} 
       	car.cheStore?car.chePrice=car.totalPrice:car.chePrice=0;
       }
       $scope.cheGoods=function(ind,goods){ 
       	if(goods.cheGoods){
       		$scope.youxiao[ind].cheind++;
       		$scope.youxiao[ind].chePrice+=goods.specGoodsPrice*goods.goodsNum;
       	}else{
       		$scope.youxiao[ind].cheind--;
       		$scope.youxiao[ind].chePrice-=goods.specGoodsPrice*goods.goodsNum
       	}
       	$scope.youxiao[ind].cheind<$scope.youxiao[ind].elandCartGoods.length?$scope.youxiao[ind].cheStore=false:$scope.youxiao[ind].cheStore=true;
      	
       }
       $scope.removeCrat=function(ind){
	       	var str="";
	       	for (k in $scope.youxiao[ind].elandCartGoods) {
	       		if($scope.youxiao[ind].elandCartGoods[k].cheGoods){
	       			str+=","+$scope.youxiao[ind].elandCartGoods[k].cartId;
	       		}
	       	}
	       	if(str==""){
	       		shcemUtil.showMsg("请先选择要删除的商品")
	       	}else{
	       		 var hideSheet = $ionicActionSheet.show({
                      destructiveText: '确定',
                      titleText: '确认删除该商品?',
                      cancelText: '取消',
                      destructiveButtonClicked:function(){
                      	$http.get($scope.delApi+"?cartIds="+str.substring(1)+"&storeId="+$scope.youxiao[ind].storeId)
				       	.success(function(data){
				       		console.log(data);
				       		getCars();
				       	})
                      	 hideSheet();
                      }
                  });
	       	}
       }
       $scope.cheNum=function(car,goods,type){   			
       			if(goods.goodsNum<=1&&!type){
       				var hideSheet = $ionicActionSheet.show({
                      destructiveText: '确定',
                      titleText: '确认删除该商品?',
                      cancelText: '取消',
                      destructiveButtonClicked:function(){
                      	$http.get($scope.delApi+"?cartIds="+goods.cartId+"&storeId="+goods.storeId)
				       	.success(function(data){
				       		console.log(data);
				       		getCars();
				       	})
                      	 hideSheet();
                      }
                  });
       			}else{
       				if(type){
			       		goods.goodsNum++;
			       		if(goods.cheGoods)car.chePrice=parseFloat(goods.specGoodsPrice)+parseFloat(car.chePrice);			       		
			       	}else{
			       		goods.goodsNum--;
			       		if(goods.cheGoods)car.chePrice-=goods.specGoodsPrice;
			       	}     
       				$http.get($scope.numApi+"?cartId="+goods.cartId+"&flag="+type+"&goodsId="+goods.goodsId+"&number="+goods.goodsNum+"&specId="+goods.specId)
	       			.success(function(data){
	       				console.log(data);
	       				if(!data.status){
	       					goods.goodsNum=goods.goodsNum;
	       				}       				
	       			})    
       			}      			  		
       }
       $scope.payIt=function(car){
       	car.oreders=[];
	       for(k in car.elandCartGoods){
	       		if(car.elandCartGoods[k].cheGoods)car.oreders.push(car.elandCartGoods[k]);
	       }
	       if(car.oreders.length>=1){
	       	 $state.go("orderSure",{"orders":car,"buType":0});	
	       }else{
	       	shcemUtil.showMsg("请先选择要结算的商品")
	       }	      	
       }
})
