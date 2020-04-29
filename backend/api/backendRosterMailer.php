<?php
require 'database.php';
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');

    $params = json_decode($json);
    // $className = $params->email;
    // $name = $params->name;
    // $type = $params->type;
    // $password = uniqid();
    //
    // $sql = "SELECT * FROM `users` WHERE `email` = '$email'";
    // if(mysqli_query($db,$sql)) {
    //   $subject = 'Survey Invitation';
    //   $headers = "From: falconpmap@gmail.com";
    //   $message = 'You have been invited to take a survey(s) on the PMAP2020 survey application!
    //   Please go to ip address given to you by the admin whom invited you to join.
    //
    //   Please do not respond to this automated email.';
    //
    //   mail($email, $subject, $message, $headers);
    // }
    //
    // $subject = 'Survey Invitation';
    // $headers = "From: falconpmap@gmail.com";
    // $message = 'You have been invited to join the PMAP2020 survey application!
    // Please go to ip address given to you by the admin whom invited you to join.
    // Your username is your email, and your automatic password is ' . $password . '.
    // You can change your password in settings at any time.
    //
    // Please do not respond to this automated email.';
    //
    // mail($email, $subject, $message, $headers);
    //
    // $sql = "INSERT INTO `users`(`email`, `name`, `password`, `type`) VALUES ('$email','$name','$password','$type')";
    // $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));


}
