
var EVENT_TYPE=mobilecheck() ? 'tap' : 'click';


/**
 * 交互事件监听 
 */
$(function(){

    $(".btn").on(EVENT_TYPE,function () {
        var str="";
        var value=$(".textBox").val();
        str+=value;

        var cssStyle=getDate(str,819,416,false);

        console.log(cssStyle); //返回的数组对象
        for(var k=0;k<=cssStyle.length-1;k++){
            var html='<div class="showClass"> <span class="tap font12L15">className:</span><div class="getNumb className'+k+' font12L15">.text</div><br> <span class="tap font12L15">width:</span><div class="getNumb cssWidth'+k+' font12L15">15%</div><br> <span class="tap font12L15">padding-bottom:</span><div class="getNumb cssPaddingBottom'+k+' font12L15">15%</div><br> <span class="tap font12L15">background-size:</span><div class="getNumb cssBacSize'+k+' font12L15">100% auto</div><br> <span class="tap font12L15">background-position:</span><div class="getNumb cssBacPos'+k+' font12L15">100% 100%</div><br> <span class="tap font12L15">background-position2:</span><div class="getNumb cssBac2Pos'+k+' font12L15">100% 100%</div><br> </div>';
            $(".p2").append(html);
        };
        for(var i=0;i<=cssStyle.length-1;i++){
            $(".className"+i).html(cssStyle[i].className);
            $(".cssWidth"+i).html(cssStyle[i].width+"%;");
            $(".cssPaddingBottom"+i).html(cssStyle[i].paddingBottom+"%;");
            $(".cssBacSize"+i).html(cssStyle[i].backgroundSize+";");
            $(".cssBacPos"+i).html(cssStyle[i].backgroundPosition+";");
            $(".cssBac2Pos"+i).html(cssStyle[i].backgroundPosition2+";");
        }
    });
/**
 *  返回数组对象
 * @param str  spritCss样式
 * @param spritW  雪碧图宽度
 * @param spritH  雪碧图高度
 * @param isSprit  是否为序列帧
 */
function getDate(str,spritW,spritH,isSprit) {
    var tempArr=str.split("."); //分割每行
    var replace;//将px去除
    var classArr;
    var className;  //获取class
    var classH;
    var classW;
    var classPosX;
    var classPosY;
    var parmArr=[]; //返回的数组对象
    for(var i=1;i<=tempArr.length-1;i++){
         replace=tempArr[i].replace(/px/g,"");//将px去除
         classArr=replace.split(/[{}:; ]/);
         className=classArr[0];  //获取class
         classH=classArr[2];
         classW=classArr[4];
         classPosX=classArr[6];
         classPosY=classArr[7];
        var cssDom2=spritCss.initial({
            isSprit:isSprit,
            className:className,
            spritW:spritW,
            spritH:spritH,
            width:classW,
            height:classH,
            widthPx:classPosX,
            heightPx:classPosY,
        }) ;

        parmArr.push(cssDom2)
    }
    return parmArr;

}
});
/**
 * 返回为对象
 * @param spriteWidth 雪碧图宽
 * @param spriteHeight 雪碧图高
 * @param domWidth 元素宽
 * @param domHeight 元素高
 * @param widthPx 元素在雪碧图中的位置X
 * @param heightPx 元素在雪碧图中的位置Y
 * @returns {{width: string, paddingBottom: string, backgroundSsize: string, backgroundPposition: string}}
 */
var spritCss={
	initial:function(donCss) {
		var parm={};
		var domCss={
            isSprit:false,
            className:"temp",
            width:640,
			height:640,
			spritW:640,
			spritH:640,
			widthPx:640,
			heightPx:640,
		};
		function updateDom() {
			for(var key in domCss){
                domCss[key]=donCss[key];
			}
        }
        function cssSprit() {
            var cssHight;
            var backgroundPposition;
            var backgroundPposition2;

            var cssWidth=domCss.width/640*100+"%";
            var backgroundSsize=Math.round(parseFloat(domCss.spritW/domCss.width*100)*1000)/1000+"%  auto";
            var posX;
            var posY;
            var pos2X;
            var pos2Y;
            if(!domCss.isSprit){  //非序列帧
                cssHight=domCss.height/640*100+"%";
                posX=Math.round(parseFloat(domCss.widthPx/(domCss.spritW-domCss.width)*100)*1000)/1000;
                posY=Math.round(parseFloat(domCss.heightPx/(domCss.spritH-domCss.height)*100)*1000)/1000;
                pos2X=0;
                pos2Y=0
            }else {   //序列帧高度/2
                cssHight=(domCss.height/2)/640*100+"%";
                posX=Math.round(parseFloat(domCss.widthPx/(domCss.spritW-domCss.width)*100)*1000)/1000;
                posY=Math.round(parseFloat(domCss.heightPx/(domCss.spritH-(domCss.height/2))*100)*1000)/1000;
                pos2X=Math.round(parseFloat(domCss.widthPx/(domCss.spritW-domCss.width)*100)*1000)/1000;
                pos2Y=Math.round(parseFloat((domCss.heightPx+(domCss.height/2))/(domCss.spritH-(domCss.height/2))*100)*1000)/1000;
            }
            backgroundPposition=Math.abs(posX)+"%  "+Math.abs(posY)+"%";
            backgroundPposition2=Math.abs(pos2X)+"%  "+Math.abs(pos2Y)+"%";
            var div={
                className:domCss.className,
                width:Math.round(parseFloat(cssWidth)*1000)/1000,
                paddingBottom:Math.round(parseFloat(cssHight)*1000)/1000,
                backgroundSize:backgroundSsize,
                backgroundPosition:backgroundPposition,
                backgroundPosition2:backgroundPposition2,
            };
            parm=div;
        };
        updateDom();
        cssSprit();
		return parm;
	}
};


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

function resize(){

    var resizeDiv=resizeTool.initial({
        portrait :"null",  //portrait 竖屏 landscape false 横屏
        windowWidth:320,  //默认屏幕320
    });
    resizeDiv.start();

    resizeDiv.resizeText("font12L15","12","15");
    resizeDiv.resizeText("font15L15","15","15");

    var w=$(window).width();
	var h=$(window).height();


}












