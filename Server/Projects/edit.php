<?php
include_once('../Config/database.php');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

//Receive a project data for edit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST["Id"], $_POST["Title"],$_POST["Description"],$_POST["Adviser"],$_POST["Major"],$_POST["Period"])) {
        if(!(empty($_POST["Id"]) && empty($_POST["Title"]) && empty($_POST["Description"]) && empty($_POST["Adviser"]) && empty($_POST["Major"]) && empty($_POST["Period"]))){ 
            
            $Id = $_POST["Id"];
            $Title = $_POST["Title"];
            $Description = $_POST["Description"];
            $Adviser = $_POST["Adviser"];
            $Major = $_POST["Major"];
            $Period = $_POST["Period"];

            $sql="UPDATE `projects`
            SET Title = :title, Description = :description, Adviser = :adviser, ID_M = :major, ID_PER = :period
            WHERE projects.ID_P = :id";
            $list=$con->prepare($sql);
            $list->execute(array('title'=> $Title,'description'=> $Description,'id'=> $Id, 'adviser'=> $Adviser, 'major'=> $Major, 'period'=> $Period));
            $data=array('code'=>0,'message'=>'Insertado correctamente');
            echo json_encode($data);
        }
        else{
            $data=array('code'=>-2,'message'=>'Todos los campos son obligatorios');
            echo json_encode($data);
        }
    }
    else{
        $data=array('code'=>-2,'message'=>'Todos los campos son obligatorios');
        echo json_encode($data);
    }
} else{
    //Find a project for receive data
    if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET["Id"])){
            if(!empty($_GET["Id"])){
                $id = $_GET["Id"];
                $sql = "SELECT * FROM `projects` WHERE ID_P =  :id";
                $list=$con->prepare($sql);
                $list->execute(array('id'=> $id));
                $fetch=$list->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($fetch);
            }
        }
    }
}

?>

?>