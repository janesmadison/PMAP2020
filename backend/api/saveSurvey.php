<!--
Author:
Madison Janes

Description:
This php file accepts a POST http request from SurveyService sendSurveys().
The JSON object decoded contains the classname associated, survey name and ID,
all questions and options.
The new survey is added to Survey table in DB. It also assigns the survey to
each group belonging to a specific classname.
 -->
<?php
require 'database.php';
 session_start();

 /* Finds which email was set as logged in, when the session was set in login.php */
$admin_email = $_SESSION['login_user'];

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');

    $params = json_decode($json);
    $survey_name = $params->name;
    $className = $params->classID;
    $surveyID = rand();

    /* adds the survey into the survey table */
    $sql = "INSERT INTO `survey`(`survey_name`, `surveyID`, `admin_email`) VALUES ('$survey_name','$surveyID','$admin_email')";
    $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));

    /* Gets each group belonging to admin with a selected class name */
    $sql2 = "SELECT * FROM `class_group` WHERE `admin_email` = '$admin_email' AND `className` = '$className'";
     if($result2 = mysqli_query($db,$sql2))
     {
       /* for each group  */
       while($row2 = mysqli_fetch_assoc($result2))
       {
         $group_class_id = $row2['group_class_id'];
         /* assign the survey to that group */
         $sql3 = "INSERT INTO `assigned_to`(`surveyID`, `group_class_id`) VALUES ('$surveyID','$group_class_id')";
         $result3 = mysqli_query($db,$sql3) or die("Error: ".mysqli_error($db));

       }
    }
    /* For each question save it into question table */
       foreach( $params-> questions as $question ){
         $question_text = $question->question;
         $type = $question->type;
         $questionID = rand();
         $sql = "INSERT INTO `question`(`question_text`, `surveyID`, `questionID`, `type`) VALUES ('$question_text','$surveyID', '$questionID', '$type')";
         $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
         /* For each option belonging to each question */
         foreach( $question-> options as $option ){
           $optionID = rand();
           $option_text = $option->option;
           $sql = "INSERT INTO `option`(`questionID`, `optionID`, `option_text`) VALUES ('$questionID','$optionID', '$option_text')";
           $result = mysqli_query($db,$sql) or die("Error: ".mysqli_error($db));
         }
       }

       echo json_encode("success");
}
