<!--
Author:
Madison Janes

Description:
This php code accepts a POST request from EmailService sendRoster().
It reads the contents of the attached JSON object and decodes them.
The SQL checks if the requested emails already exist in the DB,
and if one doesn't, it sends the email an invitation with a generated
random password. The file saves this new user to the DB.
Otherwise it sends an email telling them they have a new survey.
This does essentially the same thing as backendMailer.php except on a larger scale.
 -->

<?php
require 'database.php';
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');

    $params = json_decode($json);
    /* Finds which email was set as logged in, when the session was set in login.php */
    $admin = $_SESSION['login_user'];
    $className = $params->className;

    foreach( $params-> students as $student ){
      $email = $student->email;
      $name = $student->name;
      $type = $student->type;
      $group = $student->group;
      $password = uniqid();

      $sql = "SELECT * FROM `users` WHERE `email` = '$email'";
      $result = mysqli_query($db,$sql);
      $row = mysqli_fetch_array($result);
      $count = mysqli_num_rows($result);
      /* if user already exists, send an invitation without adding them to DB
      or creating a new password. */
      if($count > 0) {
        $subject = 'Survey Invitation';
        $headers = "From: falconpmap@gmail.com";
        $message = 'You have been invited to take a survey(s) on the PMAP2020 survey application!
        Please go to ip address given to you by the admin whom invited you to join.

        Please do not respond to this automated email.';

        mail($email, $subject, $message, $headers);
    } else  /* if user doesn't already exist in DB */
      {
      $subject = 'Survey Invitation';
      $headers = "From: falconpmap@gmail.com";
      $message = 'You have been invited to join the PMAP2020 survey application!
      Please go to ip address given to you by the admin whom invited you to join.
      Your username is your email, and your automatic password is ' . $password . '.
      You can change your password in settings at any time.

      Please do not respond to this automated email.';

      mail($email, $subject, $message, $headers);

      $sql = "INSERT INTO `users`(`email`, `name`, `password`, `type`) VALUES ('$email','$name','$password','$type')";
      $result = mysqli_query($db,$sql);
    }

    /* look if class and group already exist in the DB */
    $sql = "SELECT * FROM `class_group` WHERE `groupName` = '$group' AND `className` = '$className' AND `admin_email` = '$admin'";
    $result = mysqli_query($db,$sql);
    $row = mysqli_fetch_array($result);
    $count = mysqli_num_rows($result);
    /* If group and class doesn't exist, add it. */
    if($count <= 0) {
      $id = rand();
      $sql = "INSERT INTO `class_group`(`className`, `groupName`, `admin_email`, `group_class_id`) VALUES ('$className','$group','$admin','$id')";
      $result = mysqli_query($db,$sql);
    } else /* If class and group already exists, return primary key group_class_id */
    {
      $sql = "SELECT * FROM `class_group` WHERE `groupName` = '$group' AND `className` = '$className' AND `admin_email` = '$admin'";
      $result = mysqli_query($db,$sql);
      $row = mysqli_fetch_assoc($result);
      $id = $row["group_class_id"];
      echo $id;
    }
    /* insert the new or previous user into member_of table to connect them to the class_group */
  $sql = "INSERT INTO `member_of`(`student_email`, `group_class_id`) VALUES ('$email','$id')";
  $result = mysqli_query($db,$sql);

}

}
