$(function(){

var ul=document.querySelector(".inner");
var lis=$(".inner .floor")
var box=document.querySelector(".box")
var imgH=box.offsetHeight;
var lenY=0;
var i=0;//图片拖拽时候计数
var moveY=0;//鼠标每次按下时候要加的基数
var n=0;//按下和抬起之间的时间
var xjt=$(".xjt")

var itouch="ontouchstart" in window;
lis.eq(0).addClass("add");
if(itouch){
	var mousedown="touchstart";
	var mousemove="touchmove";
	var mouseup="touchend";
}else{
	var mousedown="mousedown";
	var mousemove="mousemove";
	var mouseup="mouseup";
}
xjt.click(function(){
	i++;
	ul.style.transition="transform .3s";
	ul.style.transform="translateY("+-imgH*i+"px)"
	lis.eq(i).addClass("add");
		lis.eq(i-1).removeClass("add")
})
ul.addEventListener(mousedown,function(e){
	
	var ev=e;
	var downT=e.timeStamp;//事件对象PC端和手机端是一样的
	e=itouch?e.changedTouches[0]:e;//获取距离一些值得话就需要从手机端一个触点中去取
	dY=e.clientY;
	ul.addEventListener(mousemove,Onmove)
	function Onmove(e){
		e=itouch?e.changedTouches[0]:e;
		var mY=e.clientY;
		lenY=mY-dY;
		ul.style.transition="none";
		ul.style.transform="translateY("+(moveY+lenY)+"px)"
	}
	ul.addEventListener(mouseup,upS)
	function upS(e){
		upT=e.timeStamp;
		n=upT-downT;
		e=itouch?e.changedTouches[0]:e;
		if(lenY>0){move(-1)}//根据按下和抬起的差值判断从哪个方向走
		else if(lenY<0){move(1)}

		ul.removeEventListener(mouseup,upS)
		ul.removeEventListener(mousemove,Onmove)
	}
	ev.preventDefault();
})
function move(b){
	if(Math.abs(lenY)>imgH/2||(n<200&&Math.abs(lenY)>30)){
			i+=b;
			if(i<0){i=0}//当到达第一个和最后一个的时候，不让他走太远
			else if(i>lis.length-1){i=lis.length-1;}
			ul.style.transition="transform .3s"
			ul.style.transform="translateY("+-imgH*i+"px)"
			moveY=-imgH*i;//鼠标每次按下时候要加的基数
			lis.eq(i).addClass("add");
		lis.eq(i-b).removeClass("add")
		}else{
			ul.style.transition="transform .3s";
			ul.style.transform="translateY("+-imgH*i+"px)"
		}
	}



//鼠标滚轮事件
	var flag=true;
	//鼠标滚动事件
	function mouseWheel(obj,upcallback,downcallback){
	  if(obj.attachEvent){ 
	  obj.attachEvent("onmousewheel",scrollFn); 
	   //IE、 opera 
	 }
	   else if(obj.addEventListener){
	    obj.addEventListener("mousewheel",scrollFn,false);  
	   //chrome,safari    -webkit
	   obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox     -moz
	 } 
	  function scrollFn(e){
	    var ev=e||window.event;
	    var val=ev.wheelDelta||ev.detail;
	    if(val==-120||val==3){
	        downcallback&&downcallback.call(obj);
	       
	    }
	    if(val==120||val==-3){
	        upcallback&&upcallback.call(obj);//防止报错。如果不传值也不会报错
	    }
	    //清除浏览器默认操作
	    if (ev.preventDefault ) {ev.preventDefault(); }//阻止默认浏览器动作(W3C) 
	    else {ev.returnValue = false;}
	  }
	}
	mouseWheel(ul,function(){
		if(!flag){
			return;
		}
		flag=false;
		bb(-1);
	},function(){
		if(!flag){
			return;
		}
		flag=false;
		bb(1);
	})
	function bb(b){
		i+=b;
		if(i<0){i=0}//当到达第一个和最后一个的时候，不让他走太远
		else if(i>lis.length-1){i=lis.length-1;}
		setTimeout(function(){flag=true},1000);
		lis.eq(i).addClass("add");
		lis.eq(i-b).removeClass("add")
		// if(i==0){
		// 	lis[i].className="floor one-bj add"
		// }
		// if(i==1){
		// 	lis[i].className="floor two-bj add"
		// }
		// if(i==2){
		// 	lis[i].className="floor two-bj add"
		// }	
		// if(i==3){
		// 	lis[i].className="floor two-bj add"
		// }
		ul.style.transition="transform .3s"
		ul.style.transform="translateY("+-imgH*i+"px)"
	}




//表头点击事件

var $nav=$(".nav");
    var falg=true;
    $nav.css({height:"60"});
    $nav.click(function(){
        if(falg){
            $nav.animate({height:"364"})
            falg=false;
        }else{
            $nav.animate({height:"60"})
            falg=true;;
        }

    })




})
