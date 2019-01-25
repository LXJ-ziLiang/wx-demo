var URL = window.location.href;
var BASE_PATH = URL.substring(0, URL.lastIndexOf('/') + 1);
var EVENT_TYPE=mobilecheck() ? 'tap' : 'click';
//var BGM=$("#bgm")[0];
var __isAnimate=true;
var __isSoundOn=true;
var CANVAS2=$(".share-canvas")[0];
var CXT2=CANVAS2.getContext("2d");
var CANVAS3=$(".share-canvas2")[0];
var CXT3=CANVAS3.getContext("2d");

var w=$(window).width();
var h=$(window).height();
var canvas2_w=w*455/640;
var canvas2_h=canvas2_w/455*984;
var canvas3_w=w*455/640;
var canvas3_h=canvas3_w/455*984;
var CANVAS=$("#canvas")[0];
var CXT=CANVAS.getContext("2d");
/**
 * 音乐icon & 提示箭头 
 */
$(function(){
	var musicHtml = "<img src=\""+BASE_PATH+"img/music.png\" class=\"musicicon musicplay\"/>";
	$(".page").append(musicHtml);
	
	$(".musicicon").on(EVENT_TYPE, function() {
		__isSoundOn=!__isSoundOn;
		__isSoundOn?$(".musicicon").addClass("musicplay"):$(".musicicon").removeClass("musicplay");
		__isSoundOn?BGM.play():BGM.pause();
	});
});

/**
 * 图片预加载 
 */
$(function(){
	// prevent iphone touchmove
	$(document).on("touchmove",function (event) {
    	event.preventDefault();
    });
	
    var loader = new PxLoader(),
	    // 把页面的图片列在这里
        fileList = [
        	'img/loading.gif',
        	'img/arrow.png',
        	'img/music.png',
        	
        	'img/share.jpg',
        ];

	//把图片载入加载器
    for(var i = 0; i < fileList.length; i++){
        var pxImage = new PxLoaderImage(BASE_PATH + fileList[i]);

        pxImage.imageNumber = i + 1;
        loader.add(pxImage);
    }

	//当加载完成时
    loader.addCompletionListener(function(){
    	console.log("预加载图片："+fileList.length+"张");
    	//BGM.play();
    	__isAnimate=false;
    	pageShow();
    	$(".loading-container").hide();
    	$(".page-container").show();
    });

    //loading 进度监听
    loader.addProgressListener(function(e){
        var percent = Math.round( (e.completedCount / e.totalCount) * 100); //正序, 1-100
        $("#loading_inner").text(percent + "%");
    });

    //启动
    loader.start();
});

/**
 * 交互事件监听 
 */
$(function(){


});








function prevPage(){
	if(__isAnimate) return;
	var pageNo=$(".cur").attr("data-page");
	if(pageNo==1) return;

	__isAnimate=true;
	$(".cur").addClass("page-prev-out");
	$(".cur").prev(".page").addClass("page-prev-in");
	setTimeout(function(){
		$(".cur").removeClass("cur").prev(".page").addClass("cur");
	},200);
	setTimeout(function(){
		$(".page-prev-out").removeClass("page-prev-out");
		$(".page-prev-in").removeClass("page-prev-in");
		__isAnimate=false;
		pageShow();
	},400);
}

function nextPage(){
	if(__isAnimate) return;
	var pageNo=$(".cur").attr("data-page");
	if(pageNo==5) return;

	__isAnimate=true;
	$(".cur").addClass("page-next-out");
	$(".cur").next(".page").addClass("page-next-in");
	setTimeout(function(){
		$(".cur").removeClass("cur").next(".page").addClass("cur");
	},200);
	setTimeout(function(){
		$(".page-next-out").removeClass("page-next-out");
		$(".page-next-in").removeClass("page-next-in");
		__isAnimate=false;
		pageShow();
	},400);
}
function nextToPage(flag){

	if(__isAnimate) return;
	var pageNo=$(".cur").attr("data-page");

	__isAnimate=true;
	$(".cur").addClass("page-next-fadeout");
	$(".p"+flag).addClass("page-next-fadein");
	setTimeout(function(){
		$(".cur").removeClass("cur");
		$(".p"+flag).addClass("cur");
	},200);
	setTimeout(function(){
		$(".page-next-out").removeClass("page-next-fadeout");
		$(".page-next-fadein").removeClass("page-next-fadein");
		__isAnimate=false;
		pageShow();
	},400);
}

function pageShow(){
	var pageNo=$(".cur").attr("data-page");
	switch(pageNo){
		case "1":showPage1();break;
		case "2":showPage2();break;
		case "3":showPage2();break;
		default:showPage1();break;
	}
}

function showPage1() {

}
function showPage2() {

}
function showPage3() {

}

function mobilecheck() {
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

// style
$(window).resize(function(){
	resize();
});
$(document).ready(function(){
	resize();

});

function resize(){
	var w=$(window).width();
	var h=$(window).height();
	var scale=w*1100/h*640;

	$(".page-container").css({
		"-webkit-transform ":"scale(scale)"
	})
}




var canvasArr=[];
$(".mycanvas").each(function(){
	var mycanvas=$(this)[0];
	canvasArr.push(mycanvas.getContext("2d"));
});

$(function(){
	//var i=0;
	//$(".img-share")[0].onload=function(){
	//	var share_interval = setInterval(function () {
	//		for(var j=0;j<canvasArr.length;j++){
	//			canvasArr[j].clearRect(0,0,455,984);
	//			canvasArr[j].drawImage($(".img-share")[0], 0, i*984, 455, 984,0,0,455,984);
	//		}
	//		i++;
	//		if(i==23){
	//			i=8;
	//		}
	//	}, 120);
	//};


	canvasSeque(canvasArr[0],455,984)
});
function canvasSeque(target,width,height){
	var i=0;

	var share_interval = setInterval(function () {
				target.clearRect(0,0,width,height);
				target.drawImage($(".img-share")[0], 0, i*height, width, height,0,0,width,height);
			i++;
			if(i==23){
				i=8;
			}
		}, 120);

}










