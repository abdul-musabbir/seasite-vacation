<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "config.php"; // Database connection file

// SQL Query to fetch all data

$sql = "SELECT * FROM listing_taxonomies JOIN listings ON listing_taxonomies.listing_id = listings.id JOIN taxonomies ON listing_taxonomies.taxonomy_id = taxonomies.id";
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    echo json_encode(["status" => "error", "message" => "No records found"]);
}

$conn->close();
