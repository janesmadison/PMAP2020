<?php

switch($_SERVER['REQUEST_METHOD']){
    case("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');

        $params = json_decode($json);
        $email = $params->email;
        $name = $params->name;

        //$recipient = 'tfleming1@students.fairmontstate.edu';
        $subject = 'PMAP2020 Administration invite';
        $headers = "From: $name <$email>";
        $message = 'You have been invited to join the PMAP2020 survey websites administration group! please follow the link to join! (LINK)';

        mail($email, $subject, $message, $headers);
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>
