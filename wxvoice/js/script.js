/**
 * Created by Programmer on 2017/9/14.
 */
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
        var html='<div class="result"></div>';
        $(".wrap").append(html);
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

        //录音时间
        var luyintime=END - START;
        if(luyintime < 2000){
            END = 0;
            START = 0;
            wx.stopRecord({});
            alert('录音时间不能少于2秒');
            $(".result").last().remove();
            return false;
            //小于300ms，不录音
        }else {
            wx.stopRecord({
                success: function (res) {
                    localId = res.localId;
                    uploadVoice(localId,luyintime);
                }
            });
        }
    });
    $(".result").on("touchstart",function () {
        var voiceNumb=$(this).attr("data");
        alert(voiceNumb);
        wx.translateVoice({
            localId: voiceNumb, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
//                            alert(res.translateResult); // 语音识别的结果
                $(".result2").html(res.translateResult)
            }
        });
        wx.playVoice({
            localId: voiceNumb // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    });
//     $(".wrap").on("touchstart",function (e) {
//         if($(e.target).hasClass("result")){
//             var voiceNumb=$(e.target).attr("data");
//             alert(voiceNumb);
//             wx.translateVoice({
//                 localId: voiceNumb, // 需要识别的音频的本地Id，由录音相关接口获得
//                 isShowProgressTips: 1, // 默认为1，显示进度提示
//                 success: function (res) {
// //                            alert(res.translateResult); // 语音识别的结果
//                     $(".result2").html(res.translateResult)
//                 }
//             });
//             wx.playVoice({
//                 localId: voiceNumb // 需要播放的音频的本地ID，由stopRecord接口获得
//             });
//         }
//     })

    //上传录音
    function uploadVoice(localId,luyintime){
        $(".result").last().attr("data",localId);
        // alert($(".result").last().attr("data"));

        //调用微信的上传录音接口把本地录音先上传到微信的服务器
        //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
//                    wx.uploadVoice({
//                        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
//                        isShowProgressTips: 1, // 默认为1，显示进度提示
//                        success: function (res) {
//                            var serverId = res.serverId; // 返回音频的服务器端ID
//                            console.log("上传成功");
//                        }
//                    });
    }

});

