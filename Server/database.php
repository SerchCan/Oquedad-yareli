<?php
    //Here you should put your db conection
    $servername="localhost";
    $username="root";
    $password="";
    $dbname="yareli3_project";
    try{
      $con=new PDO("mysql:host=$servername;dbname=$dbname",$username,$password);
      $con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $con->exec("set names utf8");
    }
    catch(PDOException $e)
    {
      echo "Connection Failed". $e;
    }
?>