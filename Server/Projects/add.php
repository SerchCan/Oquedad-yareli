<?php
include_once('../Config/database.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

function upload_file($name){
    if(isset($_POST['submit'])){
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

}
function upload_image($name){
    if(isset($_POST['submit'])){
        $name       = $_FILES[$name]['name'];  
        $temp_name  = $_FILES["image"]['tmp_name'];  
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
}


// Add project
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST["Title"],$_POST["Description"],$_POST["Adviser"],$_POST["Major"],$_POST["Period"])) {
        if(!(empty($_POST["Title"]) && empty($_POST["Description"]) && empty($_POST["Adviser"]) && empty($_POST["Major"]) && empty($_POST["Period"]))){ 
            $File=upload_file("file");
            $Image=upload_image("image");
            if($File!=-1 && $Image !=-1){
                $Title = $_POST["Title"];
                $Description = $_POST["Description"];
                $Adviser = $_POST["Adviser"];
                $Major = $_POST["Major"];
                $Period = $_POST["Period"];
    
                $sql="INSERT INTO `projects`(Title,Description,Image,Creation, File,Adviser,ID_M,ID_PER)
                VALUES(:title,:description,:image,NOW(),:file,:adviser, :major, :period)";
                $list=$con->prepare($sql);
                $list->execute(array('title'=> $Title,'description'=> $Description,'image'=> $Image,'file'=> $File, 'adviser'=> $Adviser, 'major'=> $Major, 'period'=> $Period));

                echo "{code:0, message: 'Insertado correctamente' }";
            }
            else{
                echo "{code:-3, message: 'El archivo o la imagen no fueron subidos correctamente' }";
            }
        }
        else{
            echo "{code:-2, message: 'Todos los campos son obligatorios' }";
        }
    }
    else{
        echo "{code:-2, message: 'Todos los campos son obligatorios' }";
    }
}


?>
