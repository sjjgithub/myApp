<?php
if(isset($_GET["url"])){
$url=$_GET["url"];	
}
if(isset($_GET["parm"]) and isset($_GET["val"])){
$parm=$_GET["parm"];
$val=$_GET["val"];	
$conn=file_get_contents("$url?$parm=$val");
}else{
	$conn=file_get_contents($url);
}
 echo $conn;
?>