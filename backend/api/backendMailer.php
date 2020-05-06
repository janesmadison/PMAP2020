<!--
Author:
Madison Janes

Description:
This php code accepts a POST request from EmailService sendEmail().
It reads the contents of the attached JSON object and decodes them.
The SQL checks if the requested email already exists in the DB,
and if it doesn't, it sends the email an invitation with a generated
random password. The file saves this new user to the DB.
 -->
<?php

    require 'database.php';
    session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $json = file_get_contents('php://input');

        $params = json_decode($json);
        $email = $params->email;
        $name = $params->name;
        $type = $params->type;
        $password = uniqid();

        /* checks if a user exists in DB */
        $sql = "SELECT * FROM `users` WHERE `email` = '$email'";
        $result = mysqli_query($db,$sql);
        $row = mysqli_fetch_array($result);
        $count = mysqli_num_rows($result);

        /* if the query returned no results */
        if($count == 0) {
          $subject = 'Survey Invitation';
          $headers = "From: falconpmap@gmail.com";
          $message = 'You have been invited to join the PMAP2020 survey application!
          Please go to ip address given to you by the admin whom invited you to join.
          Your username is your email, and your automatic password is ' . $password . '.
          You can change your password in settings at any time.

          Please do not respond to this automated email.';

          mail($email, $subject, $message, $headers);

          $sql = "INSERT INTO `users`(`email`, `name`, `password`, `type`) VALUES ('$email','$name','$password','$type')";
          $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
        }



}
