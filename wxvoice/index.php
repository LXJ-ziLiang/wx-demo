<?php
require_once "php/jssdknew.php";
$jssdk = new JSSDKNEW("wx75c6b41cdbfc58b0", "f2926d0e2d4904a29f3da04e7ccfa773");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>微信录音</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="address=no" />
	</head>
	<style>
		html,body,.wrap{
			position:absolute;
			top:0;
			left:0;
			margin:0;
			padding:0;
			border:0;
			width:100%;
			height:100%;
            overflow-x: hidden;
		}
		.title{
			text-align: center;
		}
		.result{
			display:block;
			width:80%;
			margin:0 auto;
		}
		.btn{
			width:60%;
			margin:20px auto 0;
			padding:8px;
			text-align:center;
			color:#fff;
			background: #888;
			border-radius: 10px;
		}
        .btn1.on{
            opacity: 0.5;
        }
		.remark{
			margin-left:15%;
			color:red;
			font-size:12px;
		}
        .result{
            width: 30%;
            text-align: center;
            color: #fff;

            background: #888;
            margin: 5% auto 0 9%;
            border-radius: 10px;
            font-size: 15px;
            line-height: 15px;
            padding: 3%;
            -webkit-transition: opacity 0.5s linear;
            opacity: 0;
            float: left;
        }
        .result2{
            width: 30%;
            text-align: center;
            background: #888;
            color: #fff;
            margin: 5% 9% 0 auto;
            border-radius: 10px;
            font-size: 15px;
            line-height: 15px;
            padding: 3%;
            -webkit-transition: opacity 0.5s linear;
            opacity: 0;
            float: right;

        }
        .result.op,.result2.op{
            opacity: 0.5;
        }
        .clearfix{
            float: none;
        }
        .result.on,.result2.on{
            opacity: 1;
        }
        .voiceText{
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            width: 100%;
            color: black;
        }
        .label{
            display: inline-block;
            margin:2% auto 0  5%;
        }
        .severId{
            display: inline-block;
            width: 60%;
            margin: -5% auto 0 28%;
            text-align: center;
            font-size: 15px;
            line-height: 20px;
        }
        .severIdWrap,.voiceWrap{
            width: 100%;
            margin: 3% auto 0;
            opacity: 0;
        }
        .severIdWrap.on,.voiceWrap.on{
            opacity: 1;
        }

	</style>
	<body>
		<div class="wrap">
            <audio id="voice"></audio>
			<h2 class="title">录音</h2>
			<p class="remark">该功能仅支持微信内访问</p>
			<div class="btn btn1">录音按钮</div>
            <div class="severIdWrap">
                <label class="label">severId:</label><textarea class="severId" rows="5"></textarea>
            </div>
            <div class="result ">播放录音</div>
            <div class="result2 ">语音翻译</div>
            <div class="clearfix"></div>
            <div class="voiceWrap">
                <label class="label">译文：</label><span class="voiceText">fdfdf</span>
            </div>
<!--            <input type="file" id="uploadedFile">-->
            <div id="visualizer_wrapper">
                <canvas id='canvas' width="800" height="350"></canvas>
            </div>
		</div>


        <script src="js/zepto.min.js"></script>
		<script src="js/html5_audio_visualizer.js"></script>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
		<script>
			wx.config({
				appId: '<?php echo $signPackage["appId"];?>',
				timestamp: <?php echo $signPackage["timestamp"];?>,
				nonceStr: '<?php echo $signPackage["nonceStr"];?>',
				signature: '<?php echo $signPackage["signature"];?>',
				jsApiList: [
					'onMenuShareAppMessage',
					'translateVoice',
					'startRecord',
					'playVoice',
					'stopRecord',
                    'uploadVoice',
                    'onVoicePlayEnd',
                    'onVoiceRecordEnd',
                    'downloadVoice',
				]
			});

			wx.ready(function () {
                //注册微信播放录音结束事件【一定要放在wx.ready函数内】
                wx.onVoicePlayEnd({
                    success: function (res) {

                    }
                });
			});
            $(function(){
                if(!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true'){
                    wx.startRecord({
                        success: function(){
                            localStorage.rainAllowRecord = 'true';
                            wx.stopRecord();
                        },
                        cancel: function () {
                            alert('用户拒绝授权录音');
                        }
                    });
                }
                var START;
                var END;
                var localId;
                //按下开始录音
                $('.btn1').on('touchstart', function(event){
                    event.preventDefault();
//                    var html='<div class="result"></div>';
//                    $(".wrap").append(html);
                    $(".btn1").addClass("on");
                    $(".voiceText").html("");
                    $(".severId").html("");
                    wx.startRecord({
                        success: function(){
                            START = new Date().getTime();
                            wx.onVoiceRecordEnd({
                                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                                complete: function (res) {
                                    alert('最多只能录制一分钟');
                                    localId = res.localId;
                                    uploadVoice(localId,60000);
                                }
                            });
                        },
                        cancel: function () {
                            alert('用户拒绝授权录音');
                            return false;
                        }
                    });

                });
                //松手结束录音
                $('.btn1').on('touchend', function(event){
                    event.preventDefault();
                    END = new Date().getTime();
                    $(".btn1").removeClass("on");

                    //录音时间
                    var luyintime=END - START;
                    if(luyintime < 200){
                        END = 0;
                        START = 0;
                        wx.stopRecord({});
                        alert('录音时间不能少于2秒');
//                        $(".result").last().remove();
                        return false;
                    }else {
                        wx.stopRecord({
                            success: function (res) {
                                localId = res.localId;
                                uploadVoice(localId,luyintime);
                            }
                        });
                    }
                });
//                播放录音按钮
                $(".result").on("touchstart",function () {
                    $(this).addClass("op");
                    wx.playVoice({
                        localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                    });
                    alert(voiceNumb);

                });
                $(".result").on("touchend",function () {
                    $(this).removeClass("op");
                });
 //             语音翻译按钮
                $(".result2").on("touchstart",function () {
                    $(this).addClass("op");

                    wx.translateVoice({
                        localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
//                            alert(res.translateResult); // 语音识别的结果
                            $(".voiceText").html(res.translateResult)
                        }
                    });

                });
                $(".result2").on("touchend",function () {
                    $(this).removeClass("op");

                });

                //上传录音
                function uploadVoice(localId,luyintime){
//                    $(".result").last().attr("data",localId);
                    // alert($(".result").last().attr("data"));
                    $(".result").addClass("on");
                    $(".result2").addClass("on");
                    $(".voiceWrap").addClass("on");
                    $(".severIdWrap").addClass("on");
                    $("#uploadedFile").val(localId);
                    //调用微信的上传录音接口把本地录音先上传到微信的服务器
                    //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
                    wx.uploadVoice({
                        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回音频的服务器端ID
                           $(".severId").html(serverId);

                        }
                    });


                }

            });


        </script>
	</body>
</html>