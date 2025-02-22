<?php

// Debugging enabled
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "127.1.1.0";
$username = "root";
$password = "";
$dbname = "rental";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500); // Set HTTP 500 status
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit(); // Stop script execution
}
