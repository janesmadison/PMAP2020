<!--
Author:
Madison Janes

Description:
This php file accepts an email and password from the Form in login component
and checks to see if user exists in DB. If it does it returns whether
user is an admin or standard user. Otherwise it returns an error message.
 -->
<?php
header('Content-Type: application/json');
   require 'database.php';
   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form
      $type = '';
      $json = file_get_contents('php://input');
      $jsonDecoded = json_decode($json);
      $email = $jsonDecoded->email;
      $password = $jsonDecoded->password;

      $sql = "SELECT * FROM users WHERE email = '$email' and password = '$password'";
      $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
      $row = mysqli_fetch_array($result);
      $count = mysqli_num_rows($result);

      // If result matched $myusername and $mypassword, table row must be 1 row
      if($count == 1) {
        //sets the session user which can then be accessed in any file. 
         $_SESSION['login_user'] = $email;
         $type = $row['type'];

        //returns type of user
        echo json_encode($type);
      }else {
        echo json_encode('Username or Password Invalid.');
      }
   }
?>
