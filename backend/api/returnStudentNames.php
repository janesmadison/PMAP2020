//this will get the students names for the class the user is the administrator of
<?php
require 'database.php';
 session_start();

$students = [];
$admin = $_SESSION['login_user'];
$sql = "SELECT DISTINCT className FROM `class_group` WHERE `admin_email` = '$admin'";

if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   while($row = mysqli_fetch_assoc($result))
   {

		$sql1 = "SELECT u.email , u.name
                FROM users u, member_of m, class_group c
                WHERE u.email = m.student_email AND m.group_class_id = c.group_class_id AND c.className = '$class' AND c.admin_email = '$admin'";