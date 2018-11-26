<?php

    $mail= $_GET['mail'];
    //only institutional mail
    echo preg_match("/@ucaribe\.edu\.mx$/i",$mail);

    //Check if is number
    $user= explode("@",$mail)[0];
    echo var_dump(ctype_digit($user));
?>