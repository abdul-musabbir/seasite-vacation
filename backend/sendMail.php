<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include PHPMailer's autoloader
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require Composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);
$mailUser = new PHPMailer(true);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $input = json_decode(file_get_contents("php://input"), true);

    $name = $input['data']['name'];
    $email = $input['data']['email'];
    $phone = $input['data']['phone'];
    $message = $input['data']['message'];

    if (isset($name) && isset($email) && isset($phone)) {
        try {

            // email send in the admin email
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'midbox.io@gmail.com';
            $mail->Password = 'xpnffjjsdpwdvrfu';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->setFrom('midbox.io@gmail.com', 'Seaside Beatch Vacation');
            $mail->addAddress("midbox.io@gmail.com", "Seaside Beatch Vacation");
            $mail->isHTML(true);
            $mail->Subject = 'Here is the subject';
            $mail->Body = str_replace(
                ['{{name}}', '{{email}}', '{{phone}}', '{{message}}'],
                [$name, $email, $phone, $message],
                file_get_contents('email_template.html')
            );
            $mail->AltBody = 'This is the plain text version of the email content.';
            $mail->send();



            // email send in the user email
            $mailUser->isSMTP();
            $mailUser->Host = 'smtp.gmail.com';
            $mailUser->SMTPAuth = true;
            $mailUser->Username = 'midbox.io@gmail.com';
            $mailUser->Password = 'xpnffjjsdpwdvrfu'; // SMTP password
            $mailUser->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mailUser->Port = 587;
            $mailUser->setFrom('midbox.io@gmail.com', 'Seaside Beatch Vacation');
            $mailUser->addAddress($email, $name);
            $mailUser->isHTML(true);
            $mailUser->Subject = 'Here is the subject';
            $mailUser->Body = "Thank you for your interest in our vacation package. We will contact you soon.";
            $mailUser->AltBody = 'This is the plain text version of the email content.';
            $mailUser->send();

        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo 'Invalid request method.';
    }
}
