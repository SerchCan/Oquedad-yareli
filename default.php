<?php
include_once('./Server/Config/database.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

//Retrieve last 12 projects

if ($_SERVER['REQUEST_METHOD'] === 'GET') {    
    $sql="SELECT * FROM `projects` ORDER BY(ID_P) DESC LIMIT 12";
    $list=$con->prepare($sql);
    $list->execute();
    $fetch=$list->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($fetch);
}
else{
    //Any other Request not allowed
    echo "Get out of here";
}

?>