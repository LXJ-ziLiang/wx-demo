var URL = window.location.href;
var BASE_PATH = URL.substring(0, URL.lastIndexOf('/') + 1);
var EVENT_TYPE=mobilecheck() ? 'tap' : 'click';
var BGM=$("#bgm")[0];
var __isAnimate=true;
var __isSoundOn=true;

var soundInstance=createjs.Sound;
var audioSrc=BASE_PATH+"sound/music.mp3";


/**
 * 音乐icon & 提示箭头 
 */
$(function(){
	var musicHtml = "<img src=\""+BASE_PATH+"img/music.png\" class=\"musicicon musicplay\"/>";
	$(".page").append(musicHtml);
	
	$(".musicicon").on(EVENT_TYPE, function() {
		__isSoundOn=!__isSoundOn;
		__isSoundOn?$(".musicicon").addClass("musicplay"):$(".musicicon").removeClass("musicplay");
		// __isSoundOn?BGM.play():BGM.pause();
        if(__isSoundOn){
            soundInstance.muted=false;
        }else {
            soundInstance.muted=true;
        }
	});
});
$(function () {
    createjs.Sound.initializeDefaultPlugins();
    var assetsPath = BASE_PATH+"sound/";
    var sounds = [{
        src:"bgm.mp3", data: {
            audioSprite: [
                {id:"sound1", startTime:0, duration:2000},
            ]}
    }
    ];
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", function () {
        console.log("音频加载完毕")
    });
    createjs.Sound.registerSounds(sounds, assetsPath);
    // 之后加载完成

});

//soundjs 声音自动播放
$(function () {
    musicPlay(soundInstance,audioSrc,-1);
    setTimeout(function () {
        createjs.Sound.play("sound1",{loop:-1})
    },5000)
    //音量控制
    $(".soundPlus").on(EVENT_TYPE,function () {
        if(soundInstance.volume>1) return;
        soundInstance.volume+=0.1;
    });
    $(".soundSub").on(EVENT_TYPE,function () {
        if(soundInstance.volume<0) return;

        soundInstance.volume-=0.1;

    });

});
/**
 *
 * @param target  var temp=createjs.Sound;
 * @param audioSrc  音乐地址
 * @param loop  -1 循环 0 一次 默认为0
 */
function musicPlay(target,audioSrc,loop) {
    target.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
    target.addEventListener("fileload", function () {
        if(loop){
            target.play(audioSrc,{loop:loop});  // start playing the sound we just loaded, storing the playing instance
        }else {
            target.play(audioSrc);  // start playing the sound we just loaded, storing the playing instance
        }
    });
    target.registerSound(audioSrc);  // register sound, which preloads by default
}
function bgm_init(){
    document.addEventListener("WeixinJSBridgeReady", function () {
        SOUND_LOADING.play();
        musicPlay(soundInstance,audioSrc,-1);

        //ios 声音无触发延迟播放  二者只能用其一！！！
        createjs.Sound.play("sound1",{loop:-1});
        // createjs.Sound.muted=true;
        createjs.Sound.stop();

    }, false);

}

//目录
$(function(){
    var index='<div class="index cssCenter">目录</div>';
    var indexWrap='<div class="overlay indexWrap invisible"></div>';
    $("#wrapbox").append(index);
    $("#wrapbox").append(indexWrap);

    for(var i=1;i<=$(".page").length;i++){
        var indexC='<div class="indexL cssCenter" data="'+i+'">'+i+'</div>';
        $(".indexWrap").append(indexC);
    }
    $(".index").on(EVENT_TYPE,function () {
        $(".indexWrap").removeClass("invisible")
    });
    $(".indexL").on(EVENT_TYPE,function () {
        var go=$(this).attr("data");
        console.log(go);
        nextToPage(go);
        $(".indexWrap").addClass("invisible")
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
	
});

/**
 * 交互事件监听 
 */
$(function(){

	bgm_init();
	$(".video").on(EVENT_TYPE,function () {
		$(this)[0].play();
    });

	$(".text1").on(EVENT_TYPE,function(){
	    console.log(1);
        // musicPlay(temp11,audioSrc1,0);
        BGM.play();
    })

    //视频静音
    var isVideoSonnd=true;
    $(".soundVideo").on(EVENT_TYPE,function(){
        if(isVideoSonnd){
            isVideoSonnd=false;
            $(".video1")[0].muted=true;
        }else {
            isVideoSonnd=true;
            $(".video1")[0].muted=false;

        }
    });
});



function nextToPage(flag){
    $(".cur").removeClass("cur");
    $(".p"+flag).addClass("cur");

}

function mobilecheck() {
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

// style
$(window).resize(function(){
	setTimeout(function () {
        resize();
    },200);
});
$(document).ready(function(){
    setTimeout(function () {
        resize();
    },200);

});
function resize() {
    var temp=resizeTool.initial({
        portrait :"null",  //portrait 竖屏 landscape false 横屏
        windowWidth:320,  //默认屏幕320
    });
    temp.start();
    temp.resizeText("text1","20","30");
    temp.resizeText("text2","30","30");

    temp.resizePosContain("video1","1136","640");
    temp.resizeScale("assamPic1","492","59.48","169.56");
    //通过marginTop 慢慢往上推进
    temp.resizeMarinTop("assamPic2","500","100");
	//通过margin 水平垂直居中
    temp.resizeMarginCenter(1,"p1_iconCat","74.97","77.97");
    temp.resizeMarginCenter(2,"endingWrap1","320","550");
    temp.resizeMarginCenter(1,"endingWrap2","384","660");
  	//通过pos居中
    temp.resizePosCover("endingWrap3","320","550");
    temp.resizePosCover("startPage","1136","640");

    temp.resizePosContain("video1","1136","640");
    //通过position 水平居中
    temp.resizeHorizontalPos("index","50");

    temp.resizeMarginContain("video2","1136","640");


}











