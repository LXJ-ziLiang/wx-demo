/**
 * Created by Programmer on 2017/5/22.
 */
/**
 * 	������� Ԫ����ʾ���� �Ӵ��룺-webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0);
 * portrait  ��Ļǿ�ƺ�����false��/������true��
 * windowWidth  ��ĻĬ�Ͽ�320
 * target  Ŀ��class
 * nowH    ��ʼ����߶�
 * tarW    Ŀ��� ��px��
 * tarH    Ŀ��ߣ�px��
 *  gc.resizeText  �����С����
 *  gc.resizeWpb   �ı�Ŀ���߽�������
 *  gc.resizeScale  scale����  webkit-transform-origin: 50% 0%;
 *  gc.resizeMarinTop  ͨ��marginTop ���������ƽ�
 *  gc.resizeMarginCenter  ͨ��margin ����
 *  gc.resizePosCover  ͨ��position �ض����߾���
 *  gc.resizePosContain  ͨ��position ���»����Ҷ��� ��������
 *  gc.resizeMarginContain  magion ���»����Ҷ��� ��������
 *  gc.resizeHorizontalPos  ͨ��position ˮƽ����
 * @type {{initial: resizeTool.initial}}
 */

var resizeTool={
    initial:function (useOption) {
        var gc = {};
        var w = $(window).width();
        var h = $(window).height();
        var tempH;
        var tempW;

        var option = {
            portrait :true,  //portrait true ���� landscape false���� null û���κ�Ч��
            windowWidth:320,  //Ĭ����Ļ320

        };
        /**
         * ���������С
         * @param target  Ŀ��class
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
         *  * ͨ������width paddingBottom��С
         *  target Ŀ��class
         *  nowH ��ʼ����ʱ����Ļ�߶ȣ�px��
         *  tarW ��ʼ����ʱ��Ŀ��Ԫ�صĿ�px��
         *  tarH ��ʼ����ʱ��Ŀ��Ԫ�ظ߶ȣ�px��
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
                    width:tarW/option.windowWidth+"%",
                    paddingBottom:tarH/option.windowWidth+"%"
                })
            }
        }
        /**
         *  Ԫ�����Ŷ�λ -webkit-transform-origin: 50% 0%;
         * ͨ�����ŵ�����С
         *  target Ŀ��class
         *  nowH  ��ʼ����߶�
         *  tarW ��ʼ����ʱ��Ŀ��Ԫ�صĿ�px��
         *  tarH ��ʼ����ʱ��Ŀ��Ԫ�ظ߶ȣ�px��
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
         * ͨ��marginTop ���������ƽ�
         *  target Ŀ��class
         *  nowH  ��ʼ����߶�
         *  tarH ��ʼ����ʱ��Ŀ�� Ԫ�ظ߶�+Ԫ�����·��߶ȣ�px��
         *  orMarg ԭʼmarginTop��px��
         */
        function resizeMarinTop(target,nowH,tarH,orMarg) {
            if(tempH/tempW<(nowH/option.windowWidth)){
                $("."+target).css({
                    marginTop:(tempH-tarH/option.windowWidth*tempW)+"px",
                });
            }else {
                $('.'+target).css({
                    marginTop:orMarg+"%",

                })
            }
        }
        /**
         * ͨ��margin ����
         *  target Ŀ��class
         *  nowH  ��ʼ����߶�
         *  tarW ��ʼ����ʱ��Ŀ�� Ԫ�صĿ�px��
         *  tarH ��ʼ����ʱ��Ŀ�� Ԫ�ظ߶ȣ�px��
         *  status=1 Ŀ���ȡ� / ����Ļ
         *  status=2 Ŀ����==��Ļ
         */
        function resizeMarginCenter(status,target,tarW,tarH) {
            if(status==1){   //Ŀ���ȡ�/����Ļ
                $("." + target).css({
                    "margin-top": -(tarH / option.windowWidth * tempW - tempH) / 2 + "px",
                    "margin-left": -(tarW / option.windowWidth * tempW - tempW) / 2 + "px",
                });
            }
            if(status==2){   //Ŀ����=��Ļ
                $("."+target).css({
                    "margin-top":-(tarH/option.windowWidth*tempW-tempH)/2+"px",
                });
            }

        }
        /**
         * ͨ��position �ض����߾���
         *  target Ŀ��class
         *  nowH  ��ʼ����߶�
         *  tarW ��ʼ����ʱ��Ŀ�� Ԫ�صĿ�px��
         *  tarH ��ʼ����ʱ��Ŀ�� Ԫ�ظ߶ȣ�px��
         */
        function resizePosCover(target,tarW,tarH) {
            // ��ҳ����
            if((tempW/tempH)<(tarW/tarH)){
                $("."+target).css({               //����
                    height:"100%",
                    width:tempH*tarW/tarH+"px",
                    top:0,
                    left:-(tempH*tarW/tarH-tempW)/2+"px"
                })
            }else {
                //����
                $("."+target).css({
                    width:"100%",
                    height:tempW*tarH/tarW+"px",
                    left:0,
                    top:-(tempW*tarH/tarW-tempH)/2+"px"
                })
            }
        }
        /**
         * ͨ��position ���»����Ҷ��� ��������
         *  target Ŀ��class
         *  tarW ��ʼ����ʱ��Ŀ�� Ԫ�صĿ�px��
         *  tarH ��ʼ����ʱ��Ŀ�� Ԫ�ظ߶ȣ�px��
         */
        function resizePosContain(target,tarW,tarH) {
            // ��ҳ����
            if((tempW/tempH)<(tarW/tarH)){
                //����
                $("."+target).css({
                    width:"100%",
                    height:tempW*tarH/tarW+"px",
                    left:0,
                    top:-(tempW*tarH/tarW-tempH)/2+"px"
                })
            }else {
                $("."+target).css({               //����
                    height:"100%",
                    width:tempH*tarW/tarH+"px",
                    top:0,
                    left:-(tempH*tarW/tarH-tempW)/2+"px"
                })

            }
        }
        /**
         * margin ���»����Ҷ��� ��������
         *  target Ŀ��class
         *  tarW ��ʼ����ʱ��Ŀ�� Ԫ�صĿ�px��
         *  tarH ��ʼ����ʱ��Ŀ�� Ԫ�ظ߶ȣ�px��
         */
        function resizeMarginContain(target,tarW,tarH) {
            // ��ҳ����
            if((tempW/tempH)<(tarW/tarH)){
                //����
                $("."+target).css({
                    width:"100%",
                    height:tempW*tarH/tarW+"px",
                    margin:-(tempW*tarH/tarW-tempH)/2+"px auto 0"
                })
            }else {
                $("."+target).css({               //����
                    height:"100%",
                    width:tempH*tarW/tarH+"px",
                    margin:"0 "+(-(tempH*tarW/tarH-tempW)/2)+"px 0"
                })
            }
        }

        /**
         *  pos ˮƽ����
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
                // //ǿ������
                tempH=w<h?h:w;
                tempW=w<h?w:h;
                if (h < w) {//����
                    $("#wrapbox").css({ "width": tempW,"height":tempH, "webkitTransform": "rotate(-90deg) translate("+(-h)+"px,0px)", "transform": "rotate(-90deg) translate("+(-h)+"px,0px)" });
                }
                else {//����
                    $("#wrapbox").css({ "width": "100%","height":"100%", "webkitTransform": "rotate(0deg)", "transform": "rotate(0deg)" });
                }

            }
            if(option.portrait==false){
                //ǿ�ƺ���
                tempH=w<h?w:h;
                tempW=w<h?h:w;
                if (h < w) {//����
                    $("#wrapbox").css({ "width": "100%","height":"100%", "webkitTransform": "rotate(0deg)", "transform": "rotate(0deg)" });
                }
                else {//����
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
