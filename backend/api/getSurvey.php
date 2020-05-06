<!--
Author:
Madison Janes

Description:
This file is meant to return a specific survey based on a given surveyID.

Warning: currently this file doesn't return the correct values. It isn't returning the
questionIDs like it is supposed to. I think I read something about PHP not being able
to handle numbers bigger than a certain side. It is possible that the BIG INT value IDs
in the DB are too big to be handled by the DB. This issue could be solved by changing the
data types in the tables. 
 -->
  <?php
    require 'database.php';
     session_start();
/* Finds which email was set as logged in, when the session was set in login.php */
    $email = $_SESSION['login_user'];
    $questions = [];
    $options = [];
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $json = file_get_contents('php://input');

        $params = json_decode($json);
        $surveyID = $params->surveyID;

    $sql = "SELECT survey_name
            FROM survey
            WHERE surveyID = $surveyID";

     if($result = mysqli_query($db,$sql))
     {
       $row = mysqli_fetch_assoc($result);
       $survey['name'] = $row['survey_name'];
       $survey['surveyID'] = $surveyID;
     }

    $sql2 = "SELECT a.group_class_id
             FROM assigned_to a, member_of m
             WHERE a.surveyID = $surveyID AND m.group_class_id = a.group_class_id AND m.student_email = $email";
     if($result2 = mysqli_query($db,$sql2))
     {
       $row2 = mysqli_fetch_assoc($result2);
       $survey['classID'] = $row['group_class_id'];
     }

     $sql3 = "SELECT q.question_text , q.type, q.questionID
             FROM question q
             WHERE q.surveyID = $surveyID";
     if($result3 = mysqli_query($db,$sql3))
     {
       $j = 0;
       while($row3 = mysqli_fetch_assoc($result3))
       {
         $questions[$j]['question'] = $row3['question_text'];
         $questions[$j]['type'] = $row3['type'];
         $questionID = $row3['questionID'];
         $question[$j]['questionID'] = $questionID;

         $sql4 = "SELECT o.option_text
                 FROM question q, option o
                 WHERE o.questionID = q.questionID AND q.questionID = $questionID";
         if($result4 = mysqli_query($db,$sql4))
         {
           $k = 0;
           while($row4 = mysqli_fetch_assoc($result4))
           {
             $options[$k]['option'] = $row4['option_text'];
             $k++;
           }
         }
           $questions[$j]['options'] = $options;
         $j++;
       $options = [];
       }
     }
  $survey['questions'] = $questions;

     echo json_encode($survey);
  }
