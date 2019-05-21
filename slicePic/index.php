    <!DOCTYPE html>
<html>
<head>
    <title>图片裁剪</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <style>
        input{width:50px;}
    </style>
</head>
<body>

<script type="text/javascript">

    window.onload=function(){
        if(localStorage.pngslice_x) document.getElementById("x").value=localStorage.pngslice_x;
        if(localStorage.pngslice_y) document.getElementById("y").value=localStorage.pngslice_y;
        if(localStorage.pngslice_w) document.getElementById("w").value=localStorage.pngslice_w;
        if(localStorage.pngslice_h) document.getElementById("h").value=localStorage.pngslice_h;
    }

    function check(){
        var x = document.getElementById("x").value;
        var y = document.getElementById("y").value;
        var w = document.getElementById("w").value;
        var h = document.getElementById("h").value;

        localStorage.pngslice_x=x;
        localStorage.pngslice_y=y;
        localStorage.pngslice_w=w;
        localStorage.pngslice_h=h;

        document.getElementById('form1').submit();
    }
</script>

<form action="crop.php" method="get" id="form1">
    x: <input type="text" name="x" id="x">
    y: <input type="text" name="y" id="y">
    width: <input type="text" name="w" id="w">
    height: <input type="text" name="h" id="h">
    <input type="button" onclick="check()" value="提交" >
</form>

<p>将需要处理的图片放置在origin文件夹内，提交处理完成后，刷新output文件夹获取处理后的图片</p>
<p>本程序自动遍历文件夹内图片</p>


</body>
</html>