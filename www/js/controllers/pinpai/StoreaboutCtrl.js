angular.module('starter.controllers')
.controller('AboutstoreCtrl', function($scope,$http,$state,$timeout,$parse,$rootScope,$stateParams,$ionicSlideBoxDelegate,shcemUtil,$ionicPopover,locals) {	
    $scope.storeIt= locals.getObject("storeInfo");
	console.log( $scope.storeIt);
	function star(){
		var myCanvas = document.getElementById("star1");  
var context = myCanvas.getContext('2d');  
context.fillStyle = 'rgb(255,0,0)';  
//context.lineWidth=5;  
//context.strokeRect(0,0,1000,200);  
//绘图的起始点，也就是五角星的顶点坐标  
var x=40,y=40;  
for(var i=0;i<5;i++)  
{  
context.beginPath();  
//五角星边的长度为100px，x1、h2为五角星的底部点坐标偏差值，x2、h2为五角星上部点偏差值  
var x1 = 80*Math.sin(Math.PI/10);  
var h1 = 80*Math.cos(Math.PI/10);  
var x1 = 40;  
var h2 = 40*Math.tan(Math.PI/5);  
context.lineTo(x+x1,y+h1);  
context.lineTo(x-x1,y+h2);  
context.lineTo(x+x1,y+h2);  
context.lineTo(x-x1,y+h1);  
context.lineTo(x-x1,y+h1);  
context.lineTo(x,y);  
context.closePath();  
context.fill();  
x=(i+3)*40;  
y=40;  
context.moveTo(x,y);  
}  
			}
	star()
})
