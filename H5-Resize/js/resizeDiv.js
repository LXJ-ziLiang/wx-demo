/**
 * Created by Programmer on 2017/5/22.
 */
/**
 * 	如果出现 元素显示不出 加代码：-webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0);
 * portrait  屏幕强制横屏（false）/竖屏（true）
 * windowWidth  屏幕默认宽320
 * target  目标class
 * nowH    开始适配高度
 * tarW    目标宽 （px）
 * tarH    目标高（px）
 *  gc.resizeText  字体大小适配
 *  gc.resizeWpb   改变目标宽高进行缩放
 *  gc.resizeScale  scale缩放  -webkit-transform-origin: 50% 0%;
 *  gc.resizeMarinTop  通过marginTop 慢慢往上推进
 *  gc.resizeMarginCenter  通过margin 居中
 *  gc.resizePosCover  通过position 截断两边居中
 *  gc.resizePosContain  通过position 上下或左右顶死 两边留空
 *  gc.resizeMarginContain  magion 上下或左右顶死 两边留空
 *  gc.resizeHorizontalPos  通过position 水平居中
 * @type {{initial: resizeTool.initial}}
 */

var resizeTool = {
    initial:function (useOption) {
        var gc = {};
        var w = $(window).width();
        var h = $(window).height();
        var tempH;
        var tempW;

        var option = {
            portrait :true,  //portrait true 竖屏 landscape false横屏 null 没有任何效果
            windowWidth:320,  //默认屏幕320

        };
        /**
         * 调整字体大小
         * @param target  目标class
         * @param fontSize
         * @param lineHeight
         */
        function resizeText(target,fontSize,lineHeight) {
            $("." + target).css({
                fontSize: fontSize / option.windowWidth * tempW + "px",
                lineHeight: lineHeight / option.windowWidth * tempW + "px"
            });
        }
        /**
         *  * 通过调整width paddingBottom大小
         *  target 目标class
         *  nowH 开始适配时的屏幕高度（px）
         *  tarW 开始适配时的目标元素的宽（px）
         *  tarH 开始适配时的目标元素高度（px）
         *
         * @param target
         */
        function resizeWpb(target,nowH,tarW,tarH) {

            if(tempH/tempW<(nowH/option.windowWidth)){
                $("."+target).css({
                    width:((tempH-(nowH-tarH)/option.windowWidth*tempW)*tarW/tarH)+"px",
                    paddingBottom:(tempH-(nowH-tarH)/option.windowWidth*tempW)+"px",
                });
            }else {
                $('.'+target).css({
                    width:tarW/option.windowWidth*100+"%",
                    paddingBottom:tarH/option.windowWidth*100+"%"
                })
            }
        }
        /**
         *  元素缩放定位 -webkit-transform-origin: 50% 0%;
         * 通过缩放调整大小
         *  target 目标class
         *  nowH  开始适配高度
         *  tarW 开始适配时的目标元素的宽（px）
         *  tarH 开始适配时的目标元素高度（px）
         */
        function resizeScale(target,nowH,tarW,tarH) {
            if((tempH/tempW)<(nowH/option.windowWidth)){
                $("."+target).css({
                    "-webkit-transform":"scale("+((tempH-(nowH-tarH)/option.windowWidth*tempW)*tarW/tarH)/(tarW/option.windowWidth*tempW)+")",
                });
            }else {
                $('.'+target).css({
                    "-webkit-transform":"scale(1)",
                });
            }

        }
        /**
         * 通过marginTop 慢慢往上推进
         *  target 目标class
         *  nowH  开始适配高度
         *  tarH 开始适配时的目标 元素高度+元素上下方高度（px）
         *  orMarg 原始marginTop（px）
         */
        function resizeMarinTop(target,nowH,orMarg) {
            if(tempH/tempW<(nowH/option.windowWidth)){
                $("."+target).css({
                    marginTop:(orMarg / 100 * w + (tempH - nowH / option.windowWidth * tempW) )+"px",

                });
            }else {
                $('.'+target).css({
                    marginTop:orMarg+"%",

                })
            }
        }
        /**
         * 通过margin 居中
         *  target 目标class
         *  nowH  开始适配高度
         *  tarW 开始适配时的目标 元素的宽（px）
         *  tarH 开始适配时的目标 元素高度（px）
         *  status=1 目标宽度《 / 》屏幕
         *  status=2 目标宽度==屏幕
         */
        function resizeMarginCenter(status,target,tarW,tarH) {
            if(status==1){   //目标宽度《/》屏幕
                $("." + target).css({
                    "margin-top": -(tarH / option.windowWidth * tempW - tempH) / 2 + "px",
                    "margin-left": -(tarW / option.windowWidth * tempW - tempW) / 2 + "px",
                });
            }
            if(status==2){   //目标宽度=屏幕
                $("."+target).css({
                    "margin-top":-(tarH/option.windowWidth*tempW-tempH)/2+"px",
                });
            }

        }
        /**
         * 通过position 截断两边居中
         *  target 目标class
         *  nowH  开始适配高度
         *  tarW 开始适配时的目标 元素的宽（px）
         *  tarH 开始适配时的目标 元素高度（px）
         */
        function resizePosCover(target,tarW,tarH) {
            // 首页适配
            if((tempW/tempH)<(tarW/tarH)){
                $("."+target).css({               //横屏
                    height:"100%",
                    width:tempH*tarW/tarH+"px",
                    top:0,
                    left:-(tempH*tarW/tarH-tempW)/2+"px"
                })
            }else {
                //竖屏
                $("."+target).css({
                    width:"100%",
                    height:tempW*tarH/tarW+"px",
                    left:0,
                    top:-(tempW*tarH/tarW-tempH)/2+"px"
                })
            }
        }
        /**
         * 通过position 上下或左右顶死 两边留空
         *  target 目标class
         *  tarW 开始适配时的目标 元素的宽（px）
         *  tarH 开始适配时的目标 元素高度（px）
         */
        function resizePosContain(target,tarW,tarH) {
            // 首页适配
            if((tempW/tempH)<(tarW/tarH)){
                //竖屏
                $("."+target).css({
                    width:"100%",
                    height:tempW*tarH/tarW+"px",
                    left:0,
                    top:-(tempW*tarH/tarW-tempH)/2+"px"
                })
            }else {
                $("."+target).css({               //横屏
                    height:"100%",
                    width:tempH*tarW/tarH+"px",
                    top:0,
                    left:-(tempH*tarW/tarH-tempW)/2+"px"
                })

            }
        }
        /**
         * margin 上下或左右顶死 两边留空
         *  target 目标class
         *  tarW 开始适配时的目标 元素的宽（px）
         *  tarH 开始适配时的目标 元素高度（px）
         */
        function resizeMarginContain(target,tarW,tarH) {
            // 首页适配
            if((tempW/tempH)<(tarW/tarH)){
                //竖屏
                $("."+target).css({
                    width:"100%",
                    height:tempW*tarH/tarW+"px",
                    margin:-(tempW*tarH/tarW-tempH)/2+"px auto 0"
                })
            }else {
                $("."+target).css({               //横屏
                    height:"100%",
                    width:tempH*tarW/tarH+"px",
                    margin:"0 "+(-(tempH*tarW/tarH-tempW)/2)+"px 0"
                })
            }
        }

        /**
         *  pos 水平居中
         * @param target
         * @param tarW
         */
        function resizeHorizontalPos(target,tarW) {
            $("."+target).css({
                left:(tempW-tarW)/2+"px"
            })
        }

        function updataType() {
            if(option.portrait==true){
                // //强制竖屏
                tempH=w<h?h:w;
                tempW=w<h?w:h;
                if (h < w) {//横屏
                    $("#wrapbox").css({ "width": tempW,"height":tempH, "webkitTransform": "rotate(-90deg) translate("+(-h)+"px,0px)", "transform": "rotate(-90deg) translate("+(-h)+"px,0px)" });
                }
                else {//竖屏
                    $("#wrapbox").css({ "width": "100%","height":"100%", "webkitTransform": "rotate(0deg)", "transform": "rotate(0deg)" });
                }

            }
            if(option.portrait==false){
                //强制横屏
                tempH=w<h?w:h;
                tempW=w<h?h:w;
                if (h < w) {//横屏
                    $("#wrapbox").css({ "width": "100%","height":"100%", "webkitTransform": "rotate(0deg)", "transform": "rotate(0deg)" });
                }
                else {//竖屏
                    $("#wrapbox").css({ "width": tempW,"height":tempH, "webkitTransform": "rotate(90deg) translate(0," + (-w) + "px)", "transform": "rotate(90deg) translate(0," +(-w)  + "px)" });
                }
            }
            if(option.portrait=="null"){
                tempH=h;
                tempW=w;
            }

        }
        function updata() {
            for (var key in useOption) {
                option[key] = useOption[key];
            }
        }
        gc.start = function () {
            updata();
            updataType();
        };
        gc.resizeText=function (target,fontSize,lineHeight) {
            resizeText(target,fontSize,lineHeight);
        };
        gc.resizeWpb=function (target,nowH,tarW,tarH) {
            resizeWpb(target,nowH,tarW,tarH);
        };
        gc.resizeScale=function (target,nowH,tarW,tarH) {
            resizeScale(target,nowH,tarW,tarH);
        };
        gc.resizeMarinTop=function (target,nowH,tarH,orMarg) {
            resizeMarinTop(target,nowH,tarH,orMarg);
        };
        gc.resizeMarginCenter=function (status,target,tarW,tarH) {
            resizeMarginCenter(status,target,tarW,tarH);
        };
        gc.resizePosCover=function (target,tarW,tarH) {
            resizePosCover(target,tarW,tarH);
        };
        gc.resizePosContain=function (target,tarW,tarH) {
            resizePosContain(target,tarW,tarH);
        };
        gc.resizeHorizontalPos=function (target,tarW) {
            resizeHorizontalPos(target,tarW);
        };
        gc.resizeMarginContain=function (target,tarW,tarH) {
            resizeMarginContain(target,tarW,tarH);
        };


        return gc;
    }
};
