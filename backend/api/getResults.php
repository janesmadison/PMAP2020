<!-- Faith Hough -->
<!-- This code will recieve the student email, gather all survey results for that student, and send it back in the results array -->
<?php
require 'database.php';
 session_start();

// This gets the email of the admin that is currently logged in
$admin_email = $_SESSION['login_user'];

// The post method transfers data through http headers. it is what recieves the student email.
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $jsonDecoded = json_decode($json);
    $studentEmail = $jsonDecoded->email;
    $studentResults = [];
    $answers = [];

// This query returns all of the questions that exist for the student whos email address is used
$sql =	"SELECT q.`question_text`
		FROM survey s, question q, results r, answer a
		WHERE s.surveyID='$surveyID' AND s.surveyID=q.surveyID AND q.questionID=a.questionID AND a.answerID=r.answerID AND r.`student_email`='$studentemail'";
// If there are still questions loop through and grab all of the responses for that question and put them in the results array
if($result = mysqli_query($db,$sql))
 {
   $i = 0;
   while($row = mysqli_fetch_assoc($result))
   {
   		$question = $row['question_text'];
     	$results[$i]['question_text'] = $row['question_text'];

// This query will return all selected answers to the question that is currently being looked at in the results array
   		$sql1 =	"SELECT a.`answer_text`
   				FROM survey s, question q, results r, answer a
				WHERE s.surveyID='$surveyID' AND s.surveyID=q.surveyID AND q.questionID=a.questionID AND a.answerID=r.answerID AND r.`student_email`='$studentemail'";

      // if there are still answers for the selected question loop through and grab them to put in the results array
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
     // If this is completed sucessfully send the results array back to the resultsService
    echo json_encode($results);
 } else {
   // If there is an error during this process display an error code
  	http_response_code(404);
 }
