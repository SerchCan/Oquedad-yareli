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
    if(isset($_POST['Id'])){
        if(!empty($_POST['Id'] )){
            //do something
            $Id = intval($_POST['Id']);
            $sql = "UPDATE `users` SET Type=3 WHERE ID_U=:id";
            $admin = $con->prepare($sql);
            $admin->execute(array('id'=>$Id));
            $data=array('code'=>0,'message'=>'Usuario actualizado correctamente');
            echo json_encode($data);
        }else{
            $data=array('code'=>-1,'message'=>'Todos los campos son obligatorios');
            echo json_encode($data);
        }
    }else{
        $data=array('code'=>-2,'message'=>'Hubo un error al procesar la información');
        echo json_encode($data);
    }
}else{
    if($_SERVER['REQUEST_METHOD']==='GET'){
        if(isset($_GET['Mail'])){
            if(!empty($_GET['Mail'] )){
                //do something
                $Mail = '%'.$_GET['Mail'].'%';
                $sql = "SELECT ID_U, Name, LastName, Mail FROM `users` WHERE Mail LIKE :Mail";
                $user = $con->prepare($sql);
                $user->execute(array('Mail'=>$Mail));
                $fetch = $user->fetch(PDO::FETCH_ASSOC);
                echo json_encode($fetch);
            }else{
                $data=array('code'=>-1,'message'=>'Todos los campos son obligatorios');
                echo json_encode($data);
            }
        }else{
            $data=array('code'=>-2,'message'=>'Hubo un error al procesar la información');
            echo json_encode($data);
        }
    }
}
?>