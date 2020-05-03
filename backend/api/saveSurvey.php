<?php
require 'database.php';
 session_start();

$admin_email = $_SESSION['login_user'];

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');

    $params = json_decode($json);
    $survey_name = $params->name;
    $className = $params->classID;
    $surveyID = rand();

    $sql = "INSERT INTO `survey`(`survey_name`, `surveyID`, `admin_email`) VALUES ('$survey_name','$surveyID','$admin_email')";
    $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));

    $sql2 = "SELECT * FROM `class_group` WHERE `admin_email` = '$admin_email' AND `className` = '$className'";
     if($result2 = mysqli_query($db,$sql2))
     {
       while($row2 = mysqli_fetch_assoc($result2))
       {
         $group_class_id = $row2['group_class_id'];
         $sql3 = "INSERT INTO `assigned_to`(`surveyID`, `group_class_id`) VALUES ('$surveyID','$group_class_id')";
         $result3 = mysqli_query($db,$sql3) or die("Error: ".mysqli_error($db));

       }
    }
       foreach( $params-> questions as $question ){
         $question_text = $question->question;
         $type = $question->type;
         $questionID = rand();
         $sql = "INSERT INTO `question`(`question_text`, `surveyID`, `questionID`, `type`) VALUES ('$question_text','$surveyID', '$questionID', '$type')";
         $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
         foreach( $question-> options as $option ){
           $optionID = rand();
           $option_text = $option->option;
           $sql = "INSERT INTO `option`(`questionID`, `optionID`, `option_text`) VALUES ('$questionID','$optionID', '$option_text')";
           $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
         }
       }

       echo json_encode("success");
}
