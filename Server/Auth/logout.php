<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {    
    session_start();
    if(isset($_SESSION['user'])){
        unset($_SESSION['user']);
        $data=array('code'=>200,'message'=>'User logged out successfully.');
        echo json_encode($data);
    }else{
        $data=array('code'=>201,'message'=>'There is not a session to close.');
        echo json_encode($data);
    }
}
?>