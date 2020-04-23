<?php
//header('Content-Type: application/json');
   require 'database.php';
   session_start();

echo 'here';
   if($_SERVER["REQUEST_METHOD"] == "POST") {
     echo 'here';
      // username and password sent from form

      $email = mysqli_real_escape_string($db,$_POST['email']);
      $password = mysqli_real_escape_string($db,$_POST['password']);

      echo $email;
      echo $password;

      $sql = "SELECT email FROM users WHERE email = '$email' and password = '$password'";
      $result = mysqli_query($db,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $active = $row['active'];

      $count = mysqli_num_rows($result);

      // If result matched $myusername and $mypassword, table row must be 1 row

      if($count == 1) {
         session_register("email");
         $_SESSION['login_user'] = $email;

         header("location: login.php");
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>
