<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include PHPMailer's autoloader
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require Composer's autoloader
require 'vendor/autoload.php';

// Manual configuration (you should move these to a config file for better security)
define('SMTP_USERNAME', 'midbox.io@gmail.com');
define('SMTP_PASSWORD', 'kzgssjgntljmemgo');
define('ADMIN_EMAIL', 'midbox.io@gmail.com');
define('WEBSITE_NAME', 'Seaside Beatch Vacation');
define('EMAIL_SUBJECT', 'Here is the subject');
define('THANK_YOU_MESSAGE', 'Thank you for your interest in our vacation package. We will contact you soon.');

$mail = new PHPMailer(true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Read and decode the incoming JSON data
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate input
    if (isset($input['data']['name'], $input['data']['email'], $input['data']['phone'], $input['data']['message'])) {
        $name = trim($input['data']['name']);
        $email = trim($input['data']['email']);
        $phone = trim($input['data']['phone']);
        $message = trim($input['data']['message']);

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['error' => 'Invalid email format']);
            exit;
        }

        try {
            // Configure PHPMailer (for both admin and user emails)
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = SMTP_USERNAME;
            $mail->Password = SMTP_PASSWORD;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Email to admin
            $mail->setFrom(SMTP_USERNAME, WEBSITE_NAME);
            $mail->addAddress(ADMIN_EMAIL, WEBSITE_NAME);
            $mail->isHTML(true);
            $mail->Subject = EMAIL_SUBJECT;
            $mail->Body = str_replace(
                ['{{name}}', '{{email}}', '{{phone}}', '{{message}}'],
                [$name, $email, $phone, $message],
                file_get_contents('email_template.html')
            );
            $mail->AltBody = 'This is the plain text version of the email content.';
            $mail->send();

            // Email to user
            $mail->clearAddresses();  // Clear previous addresses
            $mail->addAddress($email, $name);
            $mail->Subject = EMAIL_SUBJECT;
            $mail->Body = THANK_YOU_MESSAGE;
            $mail->send();

            echo json_encode(['success' => 'Emails sent successfully.']);

        } catch (Exception $e) {
            echo json_encode(['error' => 'Message could not be sent. Please try again later.']);
        }
    } else {
        echo json_encode(['error' => 'Missing required fields.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
