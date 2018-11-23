<?php
include_once('../Config/database.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {    
    if(isset($_POST["Mail"], $_POST["Password"], $_POST["Name"], $_POST["LastName"])){
        if( !(empty($_POST["Mail"]) && empty($_POST["Password"]) && empty($_POST["Name"]) && empty($_POST["LastName"]))){
            $mail = $_POST["Mail"];
            $salt = rand(1,10);
            $password = hash('sha256', $_POST["Password"] . $salt);;
            $name = $_POST["Name"];
            $lastname = $_POST["LastName"];
            $type=1;
            $sql = "INSERT INTO `users` (MAIL,Password, Name, LastName,Salt,Date,Type )
            VALUES (:mail, :pass, :name, :lastname, :salt, NOW(), :type)";
            $user = $con->prepare($sql);
            $user->execute(array('mail' => $mail, 'pass'=>$password, 'name'=>$name,'lastname'=>$lastname, 'salt'=>$salt, 'type'=>$type));       
            echo "{code:0, message:'El usuario fue agregado correctamente.'}";
        }
        else{
            echo "{code:-2, message:'Todos los campos son obligatorios'}";
        }
    }
    else{
        echo "{code:-1, message:'Ocurrio un error con el servidor'}";
    }
}

?>