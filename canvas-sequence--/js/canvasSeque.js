/**
/**
 * Created by Programmer on 2017/3/21.
 */
/**
 * gc.start    初始化
 * gc.control  控制单张序列帧 默认循环
 * gc.i
 * gc.clearInterval    关闭序列帧
 * @type {{initial: Function}}
 */

var canvasSeque = {

    initial:function(useOption){
        var gc={};
        var width,height;
        var canvas,cxt;

        var option={
            sequence:true,// true单张图 false 多张图
            imgSrc:'', //照片地址 （多张图到根目录）
            number:10,//序列帧数量
            id:'test', //canvas id
            type:"png",
            loop:true,
            frame:10,   //   ms/
            first:1,   //   多张起始 默认1
        };
        var fps;
        var now;
        var then = Date.now();
        var interval;
        var delta;
        var stop=false; //序列帧结束标识符
        var pause=false; //序列帧暂定标识符
        var giReturn=false; //默认false true倒回；
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, 1000 / option.frame);
            };

        //单张序列帧
        function canvasSeque(){
            var img=new Image();
            img.crossOrigin = "anonymous" ;

            img.onload=function(){

                cxt.clearRect(0,0,width,height);
                cxt.drawImage(img, 0, gc.i*height, width, height,0,0,width,height);
                gc.proceed();
                gc.control();
                if(pause){
                    gc.i=gc.i-1;
                }
            }
            img.src=option.imgSrc;

        }

        // 多张序列帧
        function img_init(){
            var first=option.first;
            var last=option.number;
            var html="";

            var imgDiv=document.createElement("div");
            imgDiv.id="canvasImgBox";
            imgDiv.className="hidden";
            $("body").append(imgDiv);

            for(var i = first;i <= last;i++){
                var image = new Image();
                image.id = option.id + i ;
                image.crossorigin = "anonymous" ;
                //
                if (i == first)
                {
                    image.onload=function(){
                        cxt.drawImage(image, 0, 0, width, height);
                    };
                }
                image.src = option.imgSrc + i + "." + option.type ;
                $("#canvasImgBox").append(image);
            }

        }

        function fullScreen() {
            cxt.clearRect(0, 0, width, height);

            cxt.drawImage($("#" + option.id + gc.i + "")[0], 0, 0, width, height);
            
            gc.proceed();
            gc.control();
            if(pause){
                if(giReturn){
                    gc.i = gc.i + 1;

                }else {
                    gc.i = gc.i - 1;

                }
            }
            // console.log( gc.i)
        }
        function tick() {
            if(stop) return;
            requestAnimationFrame(tick);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                if(option.sequence){
                    // console.log("序列帧："+gc.i);
                    canvasSeque();
                }else {
                    // console.log("全屏序列帧："+gc.i);
                    fullScreen();
                }
            }

        }

        function updateOption() {
            for(var key in useOption){
                option[key]=useOption[key];
            }
        }
        gc.proceed=function () {
            if(giReturn){
                gc.i --;
            }else {
                gc.i ++;
            }
        };
        gc.control=function(){
            if(option.loop){
                if(option.sequence){
                    if(gc.i == parseInt(option.number)){
                        gc.i = 0;
                    }
                }else {
                    if(gc.i == (parseInt(option.number) + 1)){
                        gc.i = option.first;
                    }
                }
            }else {
                if(option.sequence){
                    if(gc.i == parseInt(option.number)){
                        gc.stop();
                    }
                }else {
                    if(gc.i == (parseInt(option.number)+1)){
                        gc.stop();
                    }
                }
            }

        };

        /**
         * 以下为功能使用部分
         **/
        //初始化
        gc.picReady=function () {
            fps = option.frame;  //每帧间隔
            interval = 1000/fps;

            canvas=$("#"+option.id+"")[0];
            cxt=canvas.getContext("2d");
            width=canvas.width;
            height=canvas.height;

            if(option.sequence){
                gc.i=0;
            }else {
                img_init();
                gc.i= option.first;
            }

        };
        //开始动画  从第一张开始
        gc.start=function () {
            stop = false;
            if(option.sequence){
                gc.i = 0;
            }else {
                // img_init();
                gc.i = option.first;
            }

            tick();
        };
        // 最后终止
        gc.stop=function(){
            stop=true;
        };
        // 当前停止
        gc.pause=function(){
            pause=true;
        };
        //  开始动画  （相对于暂定）
        gc.play=function(){
            pause=false;
        };
        //动画从当前返回
        gc.return=function () {
            giReturn=true;
        };
        //动画 从当前 正常进行
        gc.go=function () {
            giReturn=false;
        };

        updateOption();
        return gc;
    }
};

