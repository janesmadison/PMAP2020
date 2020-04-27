<?php

// switch($_SERVER['REQUEST_METHOD']){
//     case("OPTIONS"): //Allow preflighting to take place.
//         header("Access-Control-Allow-Origin: *");
//         header("Access-Control-Allow-Methods: POST");
//         header("Access-Control-Allow-Headers: content-type");
//         exit;
//     case("POST"): //Send the email;
//         header("Access-Control-Allow-Origin: *");

require 'database.php';
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST") {
        $json = file_get_contents('php://input');

        $params = json_decode($json);
        $AdminEmail = $params->AdminEmail;
        //$name = $params->name;

        //$recipient = 'tfleming1@students.fairmontstate.edu';
        $subject = 'PMAP2020 Administration invite';
        $headers = "From: falconpmap@gmail.com";
        $message = 'You have been invited to join the PMAP2020 survey administration group! Please follow the link to join! (LINK)';

        mail($AdminEmail, $subject, $message, $headers);
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>
