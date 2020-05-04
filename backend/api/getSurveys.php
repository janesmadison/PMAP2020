<?php
require 'database.php';
 session_start();

$surveys = [];
$questions = [];
$options = [];

$admin = $_SESSION['login_user'];
$sql = "SELECT * FROM `survey` WHERE `admin_email` = '$admin'";

 if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   while($row = mysqli_fetch_assoc($result))
   {
      $surveys[$i]['name'] = $row['survey_name'];
      $surveyID = $row['surveyID'];

            $sql1 = "SELECT q.question_text , q.type, q.questionID
                    FROM question q, survey s
                    WHERE q.surveyID = s.surveyID AND s.surveyID = $surveyID";
            if($result1 = mysqli_query($db,$sql1))
            {
              $j = 0;
              while($row1 = mysqli_fetch_assoc($result1))
              {
                $questions[$j]['question'] = $row1['question_text'];
                $questions[$j]['type'] = $row1['type'];
                $questionID = $row1['questionID'];

                $sql2 = "SELECT o.option_text
                        FROM question q, option o
                        WHERE o.questionID = q.questionID";
                if($result2 = mysqli_query($db,$sql2))
                {
                  $k = 0;
                  while($row2 = mysqli_fetch_assoc($result2))
                  {
                    $options[$k]['option'] = $row2['option_text'];
                    $k++;
                  }
                }
                  $questions[$j]['options'] = $options;
                $j++;
              $options = [];
              }
            }
         $surveys[$i]['questions'] = $questions;
      $i++;
      $questions = [];
   }
   echo json_encode($surveys);
} else {
  http_response_code(404);
}
