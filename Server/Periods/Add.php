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
    if(isset($_POST['period'],$_POST['year'])){
        if(!( empty($_POST['period']) && empty($_POST['year']) )){
            //do something
            $period= $_POST['period'];
            $year = intval($_POST['year']);
            $sql = "INSERT INTO `periods`(Period, Year) VALUES(:period,:year)";
            $newperiod = $con->prepare($sql);
            $newperiod->execute(array('period'=>$period, 'year'=>$year));
            $data=array('code'=>0,'message'=>'Insertado correctamente');
            echo json_encode($data);
        }else{
            $data=array('code'=>-1,'message'=>'Todos los campos son obligatorios');
            echo json_encode($data);
        }
    }else{
        $data=array('code'=>-2,'message'=>'Hubo un error al procesar la información');
        echo json_encode($data);
    }
}
?>