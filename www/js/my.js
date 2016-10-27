	function inphold(){
		$("input").each(function(index,elem){
			var placeholder;
		$(elem).click(function(){
			placeholder=$(this).attr("placeholder")
			$(this).attr("placeholder","")
		})
		$(elem).blur(function(){
			$(this).attr("placeholder",placeholder)
		})
	});
	}
	//倒计时
	var interId;
	function timer(opt){
		clearInterval(interId)
		var dom=opt.dom;
		var starTime=opt.star;
		var endTime=opt.end;
		var intDiff=endTime-starTime;
	   interId=window.setInterval(function(){
					var hour=0;
					var minute=0;
					var second=0;//时间默认值
			if(intDiff > 0){
				hour = Math.floor(intDiff / (60 * 60));
				minute = Math.floor(intDiff / 60)- (hour * 60);
				second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			//$('#day_show').html(day+"天");			
			$(opt.dom +' .hour_show').html('<s></s>'+hour);
			$(opt.dom +' .minute_show').html('<s></s>'+minute);
			$(opt.dom +' .second_show').html('<s></s>'+second);
			intDiff--;
		}, 1000);
	}
	//左右滑动
	
	function scrollX(opt){
		var interId=window.setInterval(function(){
		var startX = 0;  
		var startY = 0;  
		
var $gallery =$(opt.dom); 
$gallery.on("touchstart", function(e) {  	
     startX = e.originalEvent.changedTouches[0].pageX;  
     startY = e.originalEvent.changedTouches[0].pageY;     
});  
  
$gallery.on("touchmove", function(e) {  
    var X = e.originalEvent.changedTouches[0].pageX - startX;  
    var Y = e.originalEvent.changedTouches[0].pageY - startY;  
      
    if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {  
    	
        var cur_scroll = $(this).scrollLeft();  
        $(this).scrollLeft(parseInt(cur_scroll) - X);  
        e.preventDefault();  
        e.stopPropagation();  
    }  
    else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) { 
    	
        var cur_scroll = $(this).scrollLeft();  
      
        $(this).scrollLeft(parseInt(cur_scroll) - X);  
        
        e.preventDefault();  
        e.stopPropagation();  
    }   
	});  
		clearInterval(interId);
		},1000)				
	}
