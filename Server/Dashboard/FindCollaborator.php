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
    if(isset($_GET["Mail"])){
        $mail='%'.$_GET["Mail"].'%';
        $sql = "SELECT ID_U, Name, LastName FROM `Users` WHERE mail LIKE :mail and Type='1'";
       
        $project = $con->prepare($sql);
        $project->execute(array('mail' => $mail));
    
        $projects= $project->fetch(PDO::FETCH_ASSOC);
        echo json_encode($projects);

    }

}
?>
