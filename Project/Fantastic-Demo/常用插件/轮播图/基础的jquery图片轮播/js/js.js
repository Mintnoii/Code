$(function(){
	var curr = 0;
	//给底部的每个a标签绑定点击事件
	$("#jsNav a.trigger").each(function(i){
		$(this).click(function(){
			curr = i;
			//淡入显示点击的图片，并淡出隐藏其所有的同胞元素
			$("#js img").eq(i).fadeIn("fast").siblings("img").fadeOut("fast");
			//为点击的a标签添加选中的样式
			$(this).addClass("imgSelected").siblings().removeClass("imgSelected");
		});
	});
	//轮播定时器
	var timer = setInterval(function(){
		//对5取余 限定范围为0~4
		var go = (curr + 1) % 5;
		//触发a标签的点击事件 同时也会改变curr的值
		$("#jsNav a.trigger").eq(go).click();
	},3000);

	$("#js,#next,#prev").hover(function(){
		//mouseover事件 取消定时器
		clearInterval(timer);
	},function(){
		//mouseout事件 重置定时器
		timer = setInterval(function(){
		var go = (curr + 1) % 5;
		$("#jsNav a.trigger").eq(go).click();
	},3000);
	});
	//左右两侧的按钮点击事件
	$("#next").click(function(){
		if(curr == 4){
			var go = 0;
		}else{
			var go = (curr + 1) % 5;
		}
		$("#jsNav a.trigger").eq(go).click();
	});
	$("#prev").click(function(){
		if(curr == 0){
			var go = 4;
		}else{
			var go = (curr - 1) % 5;
		}
		$("#jsNav a.trigger").eq(go).click();
	});
});