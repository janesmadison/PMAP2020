<!--
Author:
Madison Janes

Description:
This php code accepts a GET request from EmailService getRosters().
It finds and returns all class_group's belonging to admin that is logged
in.It contains everything about the class in addition to the students
belonging to the classes.
 -->
<?php
require 'database.php';
 session_start();

$rosters = [];
$students = [];
/* Finds which email was set as logged in, when the session was set in login.php */
$admin = $_SESSION['login_user'];
$sql = "SELECT DISTINCT className FROM `class_group` WHERE `admin_email` = '$admin'";

 if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   /* for each class belonging to admin */
   while($row = mysqli_fetch_assoc($result))
   {
      $class = $row['className'];
      $rosters[$i]['className'] = $row['className'];

            $sql1 = "SELECT u.email , u.name, c.groupName
                    FROM users u, member_of m, class_group c
                    WHERE u.email = m.student_email AND m.group_class_id = c.group_class_id AND c.className = '$class' AND c.admin_email = '$admin'";
            if($result1 = mysqli_query($db,$sql1))
            {
              $j = 0;
              /* for each student belonging to each class belonging to admin */
              while($row1 = mysqli_fetch_assoc($result1))
              {
                $students[$j]['name'] = $row1['name'];
                $students[$j]['email'] = $row1['email'];
                $students[$j]['group'] = $row1['groupName'];
                $j++;
              }
            }
         $rosters[$i]['students'] = $students;
      $i++;
      $students = [];
   }
   /* send JSON object of classes with students back */
   echo json_encode($rosters);
} else {
  http_response_code(404);
}
