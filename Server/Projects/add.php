<?php
include_once('../Config/database.php');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');

// Add project
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST["Title"],$_POST["Description"],$_POST["Adviser"],$_POST["Major"],$_POST["Period"],$_POST['Integrants'],$_POST["file"],$_POST["image"])) {
        if(!(empty($_POST["Title"]) && empty($_POST["Description"]) && empty($_POST["Adviser"]) && empty($_POST["Major"]) && empty($_POST["Period"]) && empty($_POST['Integrants']) && empty($_POST["file"]) && empty($_POST['image']))){ 
            $Integrants=$_POST['Integrants'];
            if(count($Integrants)>0){
                $File=$_POST["file"];
                $Image=$_POST["image"];
            
                $Title = $_POST["Title"];
                $Description = $_POST["Description"];
                $Adviser = $_POST["Adviser"];
                $Major = $_POST["Major"];
                $Period = $_POST["Period"];
                // Insert project.
                $sql="INSERT INTO `projects`(Title,Description,Image,Creation, File,Adviser,ID_M,ID_PER)
                VALUES(:title,:description,:image,NOW(),:file,:adviser, :major, :period)";
                $list=$con->prepare($sql);
                $list->execute(array('title'=> $Title,'description'=> $Description,'image'=> $Image,'file'=> $File, 'adviser'=> $Adviser, 'major'=> $Major, 'period'=> $Period));
                // Get id of project
                $sql = "SELECT ID_P FROM `projects` WHERE Title=:title AND Description=:description AND Adviser=:adviser AND ID_M=:major AND ID_PER=:period";
                $Project=$con->prepare($sql);
                $Project->execute(array('title'=> $Title,'description'=> $Description, 'adviser'=> $Adviser, 'major'=> $Major, 'period'=> $Period));
                $project_id = $Project->fetch(PDO::FETCH_ASSOC);
            
                //Insert members
            
                foreach($Integrants as $row){
                    $sql = "INSERT INTO `pivot`(ID_P,ID_U) VALUES(:project,:user)";
                    $Project=$con->prepare($sql);
                    $Project->execute(array('project'=>$project_id['ID_P'],'user'=>$row['ID_U']));
                }
                $data=array('code'=>0,'message'=>'Insertado correctamente');
                echo json_encode($data);
            }
            else{
                $data=array('code'=>-3,'message'=>'Debe mostrar al menos un integrante del proyecto');
                echo json_encode($data);
            }
        }
        else{
            $data=array('code'=>-2,'message'=>'Todos los campos son obligatorios');
            echo json_encode($data);
        }
    }
    else{
        $data=array('code'=>-1,'message'=>'Revisar conexión');
        echo json_encode($data);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT ID_U, Name, LastName FROM `users` WHERE Type = 2 or Type = 3";
    $user=$con->prepare($sql);
    $user->execute();
    $Users = $user->fetchAll(PDO::FETCH_ASSOC);
    
    $sql = "SELECT * FROM `major`";
    $major=$con->prepare($sql);
    $major->execute();
    $Majors = $major->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT * FROM `periods` ORDER BY(ID_PER) DESC LIMIT 5";
    $period=$con->prepare($sql);
    $period->execute();
    $Periods = $period->fetchAll(PDO::FETCH_ASSOC);
    $data=array('users'=>$Users,'majors'=>$Majors, 'periods'=>$Periods);
    echo json_encode($data);
}




?>
