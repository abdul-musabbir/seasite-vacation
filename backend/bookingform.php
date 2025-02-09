<?php

// Set the Content-Type header to application/json to ensure a JSON response
header('Content-Type: application/json');

// Allow any domain to access this API
header('Access-Control-Allow-Origin: *'); // Or specify your front-end URL, e.g., http://localhost:3000
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require "config.php";

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the raw POST data from the request body
    $input = json_decode(file_get_contents("php://input"), true);

    // Ensure required fields exist
    if (isset($input["data"]["firstName"]) && isset($input["data"]["email"])) {
        // Process the data (you can add database insertions or other processing here)

        // Insert the customer into the customers table
        $sql = "INSERT INTO customers (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $input["data"]["firstName"], $input["data"]["lastName"], $input["data"]["email"], $input["data"]["phone"]);

        if ($stmt->execute()) {
            // Get the customer ID of the inserted customer
            $customer_id = $stmt->insert_id;

            // Format dates properly for MySQL
            $checkInDate = date('Y-m-d', strtotime($input['data']['checkInDate']));
            $checkOutDate = date('Y-m-d', strtotime($input['data']['checkOutDate']));
            $adults = (int)$input['data']['adults']; // Ensure it's an integer

            // Insert the booking into the bookings table
            $sql2 = "INSERT INTO bookings (customer_id, listing_id, check_in, check_out, number_of_guests, notes, reference_number) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt2 = $conn->prepare($sql2);

            // Correct bind_param types and ensure they match the data
            $stmt2->bind_param("iisssss", $customer_id, $input['data']['listing_id'], $checkInDate, $checkOutDate, $adults, $input['data']['message'], $input['data']['referenceCode']);

            if ($stmt2->execute()) {
                $response = [
                    'status' => 'success',
                    'reference_code' => $input['data']['referenceCode'],
                    'message' => 'Customer and booking data successfully inserted',
                ];
                echo json_encode($response);
            } else {
                // Error with the booking insertion
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to insert booking data',
                ];
                echo json_encode($response);
            }

        } else {
            // Error with the customer insertion
            $response = [
                'status' => 'error',
                'message' => 'Failed to insert customer data',
            ];
            echo json_encode($response);
        }

    } else {
        // If the data is missing some required fields
        $response = [
            'status' => 'error',
            'message' => 'Missing required fields (firstName, email)',
        ];
        echo json_encode($response);
    }

    $conn->close();

} else {
    // If the request method is not POST
    $response = [
        'status' => 'error',
        'message' => 'Only POST requests are allowed',
    ];
    echo json_encode($response);
}
