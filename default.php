<?php
include_once('./Server/database.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

//test

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Only find projects by Criteria.
    if(isset($_POST["Project"]) && !empty($_POST["Project"])){
        $search = "%".$_POST["Project"]."%";
        $sql="
        SELECT DISTINCT projects.ID_P, projects.Title, projects.Description, projects.Image  FROM `projects` JOIN `users` JOIN `pivot` WHERE 
        (projects.Title LIKE :search) OR 
        (projects.Description LIKE :search) OR 
        ((users.Name LIKE :search OR users.LastName LIKE :search OR users.Mail LIKE :search) AND projects.Adviser = users.ID_U) OR
        ((users.Name LIKE :search OR users.LastName LIKE :search OR users.Mail LIKE :search) AND pivot.ID_U = users.ID_U AND pivot.ID_P = projects.ID_P)
        ORDER BY(projects.ID_P) ASC";
        $list=$con->prepare($sql);
        $list->execute(array('search' => $search));
        $fetch=$list->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($fetch);
    }
    //Find last 12 projects added.
    else{
        $sql="SELECT * FROM `projects` ORDER BY(ID_P) DESC LIMIT 12";
        $list=$con->prepare($sql);
        $list->execute();
        $fetch=$list->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($fetch);
    }
}
else{
    //Get Request not allowed
    echo "Get out of here";
}

?>