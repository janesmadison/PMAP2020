<!--
Author:
Madison Janes

Description:
This php code accepts a POST request from LoginService changePass().
It reads the contents of the attached JSON object and decodes them.
The SQL attempts to update the DB with the new password. It then checks
to see if it succeeded. The file return either "success" or "fail".
 -->
<?php
   require 'database.php';
   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST") {

     $postdata = file_get_contents("php://input");
      $json = json_decode($postdata);
      $email = $json->e;
      $oldPassword = $json->oldPassword;
      $newPassword = $json->newPassword;

      /* Attempts to update the email's password to the new password */
      $sql = "UPDATE `users` SET `password`= '$newPassword' WHERE password = '$oldPassword' && email = '$email'";
      $result = mysqli_query($db,$sql);
      $changes =  mysqli_affected_rows($db);
      /* if there were rows affected */
      if($changes) {
        echo json_encode("success");
      }

      /* checks to see if the old email and password are still in DB */
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
