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
        $email = $params->email;
        $name = $params->name;
        $type = $params->type;
        $password = uniqid();

        $subject = 'Survey Invitation';
        $headers = "From: falconpmap@gmail.com";
        $message = 'You have been invited to join the PMAP2020 survey application!
        Please go to ip address: 3.93.15.186 to join.
        Your email is your username, and your automatic password is ' . $password . '.
        You can change your password in settings at any time.

        Please do not respond to this automated email.';

        mail($email, $subject, $message, $headers);

        $sql = "INSERT INTO `users`(`email`, `name`, `password`, `type`) VALUES ('$email','$name','$password','$type')";
        $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));


}
