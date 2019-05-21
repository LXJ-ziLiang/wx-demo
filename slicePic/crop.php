<?php

header('Content-Type: text/html; charset=utf-8');

set_time_limit(0);

$path='./origin/';

//遍历文件夹
$dir_handle = openDir($path);
$i=0;
while(false !== $file=readDir($dir_handle)) {
    if ($file=='.' || $file=='..') continue;

    list($filesname,$kzm)=explode(".",$file);

    $kzm=strtolower($kzm);
    if($kzm=="jpeg" or $kzm=="jpg" or $kzm=="png"){
        //若为图片文件则裁剪处理
        $isPng=$kzm=="png"?true:false;
        crop($path.$file,$_GET['x'],$_GET['y'],$_GET['w'],$_GET['h'],$file,$isPng);
        $i++;
    }
}
closeDir($dir_handle);

function crop($sourePic,$x,$y,$width,$height,$file,$isPng){

    if($isPng){
        $image = imagecreatefrompng($sourePic);//PNG
    }else{
        $image = imagecreatefromjpeg($sourePic);
    }

    imagesavealpha($image,true);//这里很重要 意思是不要丢了$sourePic图像的透明色;

    $thumb = imagecreatetruecolor($width,$height);
    $bg = imagecolorallocatealpha($thumb , 0 , 0 , 0 , 127);
    imagealphablending($thumb,false);//这里很重要,意思是不合并颜色,直接用$img图像颜色替换,包括透明色;
    imagefill($thumb , 0 , 0 , $bg);
    imagesavealpha($thumb,true);//这里很重要,意思是不要丢了$thumb图像的透明色;

    imagecopy($thumb,$image,0,0,$x,$y,$width,$height);

    if($isPng){
        imagepng($thumb,"./output/".$file);
    }else{
        imagejpeg($thumb,"./output/".$file);
    }
}

echo "<h2>已处理图片".$i."张</h2>";

?>

<a href="index.php">返回</a>

