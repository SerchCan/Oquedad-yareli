<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

function uniqidReal($lenght = 13) {
    // uniqid gives 13 chars, but you could adjust it to your needs.
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($lenght / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return substr(bin2hex($bytes), 0, $lenght);
}

function upload_file(){
    $name       = uniqidReal();  
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


function upload_image(){
    $name       = uniqidReal();  
    
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

    $File=upload_file();
    $Image=upload_image();

    if($File!=null && $Image!=null){
        $FilesNameData=array('code'=>200,'file'=>$File, 'image'=>$Image, 'message'=>"Subido correctamente");
        echo json_encode($FilesNameData);

    }else{
        $FilesNameData=array('code'=>201,'file'=>$File, 'image'=>$Image,'message'=>"Error en la subida");
        echo json_encode($FilesNameData);
    }
}