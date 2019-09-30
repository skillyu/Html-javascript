$(function(){
	//监听点击规则
	$(".sm").click(function(){
		$(".ruler").stop().fadeIn(1000);
	});
	//监听关闭规则
	$(".ruler>a").click(function(){
		$(".ruler").stop().fadeOut(1000);
	});
	
	//点击开始
	$(".start").click(function(){
		$(this).stop().fadeOut(100);
		
		JinD();
		StartHui();
	});
	
	//时间进度条消失
	function JinD(){
		//获取进度条宽度
		var Jwidth=$(".xue").width();
		console.log(Jwidth);
		var timer=setInterval(function(){
			Jwidth-=1;
			$(".xue").css({
				width:Jwidth
			})
			if(Jwidth==0){
				$(".over").stop().fadeIn(100);
				clearInterval(timer);
				clearInterval(Wolftimer);
				$(".Imgs").remove();
			}
		},300)
	}
	
	//创建函数来处理灰太狼的变化
	var Wolftimer
	function StartHui(){
		//创建灰太狼和小灰灰图片数组
		var wolf_1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png','./images/h5.png',
		'./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
		var wolf_2=['./img/x0.png','./img/x1.png','./img/x2.png',
		'./img/x3.png','./img/x4.png','./img/x5.png',
		'./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
		
		//定义数组保存所有可能出现的位子
		var arrPos = [
		    {left:"100px",top:"115px"},
		    {left:"20px",top:"160px"},
		    {left:"190px",top:"142px"},
		    {left:"105px",top:"193px"},
		    {left:"19px",top:"221px"},
		    {left:"202px",top:"212px"},
		    {left:"120px",top:"275px"},
		    {left:"30px",top:"295px"},
		    {left:"209px",top:"297px"}
		];
		//创建一个图片
		var WolfImg=$("<img src='' class='Imgs'>");
		//随机位子
		var Sj=Math.round(Math.random()*8);
		//设置显示位子
		WolfImg.css({
			position: "absolute",
			left:arrPos[Sj].left,
			top:arrPos[Sj].top
			//"z-index":10
		})
		var ImgType=Math.round(Math.random())==0?wolf_1:wolf_2;
		window.index=0;
		window.indexend=5;
		Wolftimer=setInterval(function(){
			if(index>indexend){
				WolfImg.remove();
				clearInterval(Wolftimer);
				StartHui();
			}
			WolfImg.attr("src",ImgType[index]);
			index++;
		},300)
		//添加图片
		$(".body").append(WolfImg);
		
		gameWolf();
	}
	//处理打击灰太狼分数函数
	function gameWolf(){
		
		$(".Imgs").one("click",function(){
			//更改打击图片索引
			window.index=5;
			window.indexend=9;
			//console.log("11")
			//获取图片地址
			var srcI=$(".Imgs").attr("src");
			//console.log(srcI);
			var flag=srcI.indexOf("h")>=0;
			if(flag){
				//+10
				$(".fen").text(parseInt($(".fen").text())+10);
			}else{
				$(".fen").text(parseInt($(".fen").text())-10);
			}
		})
	}
	
	//监听重新开始
	$(".over>button").click(function(){
		$(".over").stop().fadeOut(100);
		$(".start").stop().fadeIn(100);
		$(".xue").css({
			width:180
		})
		$(".fen").text(0);
	});
	//音乐
})