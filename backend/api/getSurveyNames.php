<!--
Author:
Madison Janes

Description:
This file returns a list of the surveys that are assigned to the users.
In the future this file needs to check the Results table and see if a
user has already answered questions from this survey for the given
class_group ID. This will prevent multiple attempts.

 -->
<?php
require 'database.php';
 session_start();

$surveys = [];
/* Finds which email was set as logged in, when the session was set in login.php */
$email = $_SESSION['login_user'];
$sql = "SELECT s.survey_name, s.surveyID
        FROM survey s, assigned_to a, member_of m
        WHERE '$email' = m.student_email AND m.group_class_id = a.group_class_id AND a.surveyID = s.surveyID";

 if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   /* For each survey associated with the student */
   while($row = mysqli_fetch_assoc($result))
   {
      $surveys[$i]['name'] = $row['survey_name'];
      $surveys[$i]['surveyID'] = $row['surveyID'];
      $i++;
   }
 }

 echo json_encode($surveys);
