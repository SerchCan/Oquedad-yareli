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
    if(isset($_POST["Id"], $_POST["Title"],$_POST["Description"],$_POST["Integrants"])) {
        if(!(empty($_POST["Id"]) && empty($_POST["Title"]) && empty($_POST["Description"] && empty($_POST["Integrants"])))){ 
            $Integrants=$_POST['Integrants'];
            $Id = intval($_POST["Id"]);
            $Title = $_POST["Title"];
            $Description = $_POST["Description"];

            //update data
            $sql="UPDATE `projects` SET Title = :title, Description = :description WHERE projects.ID_P = :id";
            $list=$con->prepare($sql);
            $list->execute(array('title'=> $Title,'description'=> $Description,'id'=> $Id));
            //delete members
            $sql="DELETE FROM `pivot` WHERE ID_P=:id";
            $del=$con->prepare($sql);
            $del->execute(array('id'=>$Id));

            //add members again
            foreach($Integrants as $row){
                $sql = "INSERT INTO `pivot`(ID_P,ID_U) VALUES(:project,:user)";
                $Project=$con->prepare($sql);
                $Project->execute(array('project'=>$Id,'user'=>$row['ID_U']));
            }

            $data=array('code'=>0,'message'=>'Actualizado correctamente');
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
                $sql = "SELECT  users.ID_U, users.Name, users.LastName FROM `pivot` JOIN `users` WHERE pivot.ID_P =  :id AND pivot.ID_U = users.ID_U";
                $member=$con->prepare($sql);
                $member->execute(array('id'=> $id));
                $memberFetch=$member->fetchAll(PDO::FETCH_ASSOC);
                $fetch=$list->fetch(PDO::FETCH_ASSOC);
                $data= array('project'=>$fetch, 'members'=>$memberFetch);
                echo json_encode($data);
            }
        }
    }
}

?>