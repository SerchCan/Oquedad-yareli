<?php
include_once('../Config/database.php');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {  
    session_start();
    $id=intval($_SESSION['user']["id"]);
    $type= intval($_SESSION['user']["type"]);

    $sql="";
    if($type == 1){
        // Student
        $sql="SELECT * FROM `projects` JOIN `pivot` 
        WHERE projects.ID_P = pivot.ID_P AND pivot.ID_U = :id";
    }
    if($type == 2 || $type==3){
        // Adviser
        $sql = "SELECT * FROM `projects` 
        WHERE Adviser = :id";
    }
    $project = $con->prepare($sql);
    $project->execute(array('id' => $id));

    $projects= $project->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($projects);

}
?>
