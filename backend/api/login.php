<?php
//header('Content-Type: application/json');
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
    //  print_r($row);
      $count = mysqli_num_rows($result);

      // If result matched $myusername and $mypassword, table row must be 1 row

      if($count == 1) {
         $_SESSION['login_user'] = $email;
         $type = $row['type'];

        echo json_encode($type);
      }else {
        http_response_code(404);
      }
   }
?>
