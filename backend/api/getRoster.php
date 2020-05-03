<?php
require 'database.php';
 session_start();

$rosters = [];
$students = [];
$admin = $_SESSION['login_user'];
$sql = "SELECT DISTINCT className FROM `class_group` WHERE `admin_email` = '$admin'";

 if($result = mysqli_query($db,$sql))
 {
   $i = 0;
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
   echo json_encode($rosters);
} else {
  http_response_code(404);
}
