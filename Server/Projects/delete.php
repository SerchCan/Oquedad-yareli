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
    if(isset($_POST["Id"])) {
        if(!(empty($_POST["Id"]))){
            $Id = intval($_POST["Id"]);
            $sql="DELETE FROM `pivot` WHERE ID_P = :id";
            $list=$con->prepare($sql);
            $list->execute(array('id'=>$Id));

            $sql="DELETE FROM `projects` WHERE ID_P = :id";
            $list=$con->prepare($sql);
            $list->execute(array('id'=>$Id));
            $data=array('code'=>0,'message'=>'Eliminado correctamente');
            echo json_encode($data);
        }
    }
}
else{
    if($_SERVER['REQUEST_METHOD']==='GET'){
        if(isset($_GET["Id"])){
            if(!empty($_GET["Id"])){
                $Id = intval($_GET["Id"]);
                $sql="SELECT * FROM `projects` WHERE ID_P=:id";
                $list= $con->prepare($sql);
                $list->execute(array('id'=>$Id));
                $data=$list->fetch(PDO::FETCH_ASSOC);
                echo json_encode($data);
            }
        }
    }
}
?>