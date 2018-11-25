<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');


function upload_file($name){
    $name       = $_FILES[$name]['name'];  
    $temp_name  = $_FILES["file"]['tmp_name'];  
    if(isset($name)){
        if(!empty($name)){      
            $location = '../Files/';      
            if(move_uploaded_file($temp_name, $location.$name)){
                return $name;
            }
        }       
    }  else {
        return -1;
    }
}

function upload_image($name){
    $name       = $_FILES[$name]['name'];  
    $temp_name  = $_FILES["image"]['tmp_name'];  
    if(isset($name)){
        if(!empty($name)){      
            $location = '../Images/';      
            if(move_uploaded_file($temp_name, $location.$name)){
                return $name;
            }
        }       
    }  else {
        return -1;
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $File=upload_file("file");
    $Image=upload_image("image");

    if($File!=1 && $Image!=1){
        $FilesNameData=array('code'=>200,'file'=>$File, 'image'=>$Image, 'message'=>"Subido correctamente");
        echo json_encode($FilesNameData);

    }else{
        $FilesNameData=array('code'=>201,'message'=>"Error en la subida");
        echo json_encode($FilesNameData);
    }
}