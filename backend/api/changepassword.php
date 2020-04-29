<?php
header('Content-Type: application/json');
   require 'database.php';
   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form
      $type = '';
      $jsonDecoded = json_decode($json);
      $email = $jsonDecoded->email;
      $oldPass = $jsonDecoded->oldPass;
      $newPass = $jsonDecoded->newPass;


     //check if user is logged in
   if($email) {
     $sql = "SELECT password FROM User u WHERE email='$email'";

     if($sql==$oldPass)
     {
      	echo("test");
      	$sql = "UPDATE User SET password='$password' WHERE email='$email'";
      	$result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
     }
     else
     {
    	 echo json_encode('Password is invalid, cannot implement new password.');
     }
   }
   else
   	die("User not logged in!");

?>
