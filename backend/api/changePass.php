<?php
//header('Content-Type: application/json');
   require 'database.php';
   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST") {

     $postdata = file_get_contents("php://input");
      $json = json_decode($postdata);
      $email = $json->e;
      $oldPassword = $json->oldPassword;
      $newPassword = $json->newPassword;

      $sql = "UPDATE `users` SET `password`= '$newPassword' WHERE password = '$oldPassword' && email = '$email'";
      $result = mysqli_query($db,$sql);
      $changes =  mysqli_affected_rows($db);
      if($changes) {
        echo json_encode("success");
      }

      $sql = "SELECT * FROM users WHERE email = '$email' and password = '$oldPassword'";
      $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
      $row = mysqli_fetch_array($result);
      $count = mysqli_num_rows($result);

      // If result matched $myusername and $mypassword, table row must be 1 row

      if($count == 1) {
          echo json_encode("fail");
      }

 }
?>
