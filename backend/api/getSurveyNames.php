<?php
require 'database.php';
 session_start();

$surveys = [];

$email = $_SESSION['login_user'];
$sql = "SELECT s.survey_name, s.surveyID
        FROM survey s, assigned_to a, member_of m
        WHERE '$email' = m.student_email AND m.group_class_id = a.group_class_id AND a.surveyID = s.surveyID";

 if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   while($row = mysqli_fetch_assoc($result))
   {
      $surveys[$i]['name'] = $row['survey_name'];
      $surveys[$i]['surveyID'] = $row['surveyID'];
      $i++;
   }
 }

 echo json_encode($surveys);
