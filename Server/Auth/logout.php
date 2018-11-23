<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {    
    if(isset($_SESSION['user'])){
        unset($_SESSION['user']);
        echo "{ code: 200, message:'User logged out successfully.'}";
    }else{
        echo "{ code: 201, message:'There is not a session to close.'}";
    }
}
?>