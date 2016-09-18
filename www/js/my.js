
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

	function timer(opt){
		var dom=opt.dom;
		var starTime=opt.star;
		var endTime=opt.end;
		var intDiff=endTime-starTime;
		window.setInterval(function(){

					hour=0,
					minute=0,
					second=0;//时间默认值
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
