<?php
include_once('../Config/database.php');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

// Find projects by a criteria.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET["Project"]) && !empty($_GET["Project"])){
        
        $search = "%".$_GET["Project"]."%";

        if(isset($_GET['Period']) && !empty($_GET['Period'])){
            
            $period=intval($_GET['Period']);
            $sql="SELECT DISTINCT projects.ID_P, projects.Title, projects.Description, projects.Image, projects.File FROM `projects` JOIN `users` JOIN `pivot` WHERE 
            ((projects.Title LIKE :search) OR (Projects.ID_P = :search) OR Projects.Description LIKE :search OR
            ((users.Name LIKE :search OR users.LastName LIKE :search OR users.Mail LIKE :search) AND projects.Adviser = users.ID_U) OR
            ((users.Name LIKE :search OR users.LastName LIKE :search OR users.Mail LIKE :search) AND pivot.ID_U = users.ID_U AND pivot.ID_P = projects.ID_P)) AND (projects.ID_PER = :period)
            ORDER BY(projects.ID_P) ASC";
             $list=$con->prepare($sql);
             $list->execute(array('search' => $search,'period'=>$period));
        }else{
            
            $sql="SELECT DISTINCT projects.ID_P, projects.Title, projects.Description, projects.Image, projects.File FROM `projects` JOIN `users` JOIN `pivot` WHERE 
            (projects.Title LIKE :search) OR (Projects.ID_P = :search) OR (Projects.Description LIKE :search) OR
            ((users.Name LIKE :search OR users.LastName LIKE :search OR users.Mail LIKE :search) AND projects.Adviser = users.ID_U) OR
            ((users.Name LIKE :search OR users.LastName LIKE :search OR users.Mail LIKE :search) AND pivot.ID_U = users.ID_U AND pivot.ID_P = projects.ID_P)
            ORDER BY(projects.ID_P) ASC";
            $list=$con->prepare($sql);
            $list->execute(array('search' => $search));
        }
       
        $fetch=$list->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($fetch);
    }else{
        if(isset($_GET['Period']) && !empty($_GET['Period'])){
            
            $period=intval($_GET['Period']);
            
            $sql="SELECT DISTINCT projects.ID_P, projects.Title, projects.Description, projects.Image, projects.File FROM `projects` WHERE
            (projects.ID_PER = :period)
            ORDER BY(projects.ID_P) ASC";
            $list=$con->prepare($sql);
            $list->execute(array('period'=>$period));

            $fetch=$list->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($fetch);
        }
    }
}
else{
    //Any other Request not allowed
    echo "Get out of here";
}

?>