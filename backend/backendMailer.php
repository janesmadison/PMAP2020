<?php
$to_email = "tfleming1@students.fairmontstate.edu";
$subject = "Simple Email Test via PHP";
$body = "Hi, This is test email send by PHP Script";
$headers = "From: sender\'s email";

if (mail($scope.newAdminEmail, $subject, $body, $headers)) {
    echo "Email successfully sent to $to_email...";
} else {
    echo "Email sending failed...";
}
