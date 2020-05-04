<?php
require 'database.php';
 session_start();

$admin_email = $_SESSION['login_user'];

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $jsonDecoded = json_decode($json);
    $studentEmail = $jsonDecoded->email;
    $studentResults = [];
    $answers = [];

$sql =	"SELECT q.`question_text`
		FROM survey s, question q, results r, answer a
		WHERE s.surveyID='$surveyID' AND s.surveyID=q.surveyID AND q.questionID=a.questionID AND a.answerID=r.answerID AND r.`student_email`='$studentemail'";

if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   while($row = mysqli_fetch_assoc($result))
   {
   		$question = $row['question_text'];
     	$results[$i]['question_text'] = $row['question_text'];

   		$sql1 =	"SELECT a.`answer_text`
   				FROM survey s, question q, results r, answer a
				WHERE s.surveyID='$surveyID' AND s.surveyID=q.surveyID AND q.questionID=a.questionID AND a.answerID=r.answerID AND r.`student_email`='$studentemail'";
		if($result = mysqli_query($db,$sql))
		 {
		   $j = 0;
		   while($row = mysqli_fetch_assoc($result))
   			{
				$answers[$j]['answer_text'] = $row1['answer_text'];
   	    		$j++;
   			}
   		  }
  		  $results[$i]['answers'] = $students;
       	  $i++;
       	  $answers = [];
     }
    echo json_encode($results);
 } else {
  	http_response_code(404);
 }
