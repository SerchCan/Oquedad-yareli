<?php
session_start();
if(isset($_SESSION['user'])){
    echo "{ code: 200, message:'User is logged'}";
    
}
else{
    echo "{ code: 201, message:'User is not logged'}";
}
?>