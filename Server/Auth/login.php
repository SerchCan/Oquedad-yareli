<?php
include_once('../Config/database.php');

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {    
    if(isset($_POST["Mail"], $_POST["Password"])){
        $mail = $_POST["Mail"];
        $password = $_POST["Password"];
        $sql = "SELECT ID_U, Password, Salt FROM `users` WHERE Mail=:M";

        $user = $con->prepare($sql);
        $user->execute(array('M' => $mail));
        $u= $user->fetch(PDO::FETCH_ASSOC);
        
        $input_password_hash = hash('sha256', $password . $u["Salt"]);

        if($input_password_hash == $u["Password"]){
            //Logged
            session_start();
            $_SESSION["user"] = $u["ID_U"];

            $data=array('code'=>0,'message'=>'Inicio exitoso');
            echo json_encode($data);
        }else{
            //Error
            $data=array('code'=>-1,'message'=>'Ocurrio un error, verifique su correo y contraseña.');
            echo json_encode($data);
        }
    }
}

?>