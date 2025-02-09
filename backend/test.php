<?php

require "config.php"; // Database connection file
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// Set timezone to New Jersey
date_default_timezone_set('America/New_York');

// Fetch current date
$currentDateStr = date('d-m-Y');
$currentDate = DateTime::createFromFormat('d-m-Y', $currentDateStr);

// ------------------------------------------------------------------
// 1. Fetch Listings & Their Meta Data from listings and listings_meta
// ------------------------------------------------------------------
$sql = "SELECT l.id, l.title, l.description, l.feature_image, l.slug, 
               lm.meta_key, lm.meta_value
        FROM listings l
        LEFT JOIN listings_meta lm ON l.id = lm.listing_id
        WHERE l.status = 'publish' AND l.deleted = 0";
$result = $conn->query($sql);

$listings = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $listings[$id]['title']         = $row['title'];
        $listings[$id]['description']   = $row['description'];
        $listings[$id]['feature_image'] = $row['feature_image'];
        $listings[$id]['slug'] = $row['slug'];
        // Group meta data by key
        $listings[$id]['meta'][$row['meta_key']] = $row['meta_value'];
    }
}

// ------------------------------------------------------------------
// 2. Fetch Location Information for Each Listing
// ------------------------------------------------------------------
$sqlLocation = "SELECT lt.listing_id, t.name AS location 
                FROM listing_taxonomies lt 
                JOIN taxonomies t ON lt.taxonomy_id = t.id 
                WHERE t.taxonomy_type = 'location'";
$resultLocation = $conn->query($sqlLocation);
if ($resultLocation && $resultLocation->num_rows > 0) {
    while ($row = $resultLocation->fetch_assoc()) {
        $listingID = $row['listing_id'];
        // Save the location name in the corresponding listing array
        $listings[$listingID]['location'] = $row['location'];
    }
}

// ------------------------------------------------------------------
// 3. Fetch Global Settings (Event Dates) for Dynamic Pricing
// ------------------------------------------------------------------
$settings_sql = "SELECT meta_key, meta_value FROM settings";
$settings_result = $conn->query($settings_sql);

$settings = [];
if ($settings_result && $settings_result->num_rows > 0) {
    while ($row = $settings_result->fetch_assoc()) {
        // For peak season, if there are duplicate keys, treat the first as start and second as end.
        if ($row['meta_key'] == 'peak_season_start') {
            if (!isset($settings['peak_season_start'])) {
                $settings['peak_season_start'] = $row['meta_value'];
            } else {
                $settings['peak_season_end'] = $row['meta_value'];
            }
        } else {
            $settings[$row['meta_key']] = $row['meta_value'];
        }
    }
}

// Close connection as we have all needed data
$conn->close();

// ------------------------------------------------------------------
// 4. Helper Function: Determine the Price for a Listing Based on Date
// ------------------------------------------------------------------
function getPriceForListing($listing, $settings, $currentDate)
{
    // Default (normal) pricing
    $normalPrice = $listing['meta']['normal_price'] ?? 0;
    $normalMinimumStay = $listing['meta']['normal_minimum_stay'] ?? 1;

    // --- Peak Season ---
    if (isset($settings['peak_season_start']) && isset($settings['peak_season_end'])) {
        $psStart = DateTime::createFromFormat('d-m-Y', $settings['peak_season_start']);
        $psEnd = DateTime::createFromFormat('d-m-Y', $settings['peak_season_end']);
        if ($psStart && $psEnd && $currentDate >= $psStart && $currentDate <= $psEnd) {
            return [
                'price' => $listing['meta']['peak_season_price'] ?? $normalPrice,
                'minimum_stay' => $listing['meta']['peak_season_minimum_stay'] ?? $normalMinimumStay,
                'type' => 'peak_season'
            ];
        }
    }

    // --- Memorial Day ---
    if (isset($settings['memorialday_start']) && isset($settings['memorialday_end'])) {
        $memStart = DateTime::createFromFormat('d-m-Y', $settings['memorialday_start']);
        $memEnd = DateTime::createFromFormat('d-m-Y', $settings['memorialday_end']);
        if ($memStart && $memEnd && $currentDate >= $memStart && $currentDate <= $memEnd) {
            return [
                'price' => $listing['meta']['memorial_day_price'] ?? $normalPrice,
                'minimum_stay' => $listing['meta']['memorial_day_minimum_stay'] ?? $normalMinimumStay,
                'type' => 'memorial_day'
            ];
        }
    }

    // --- Labor Day ---
    if (isset($settings['laborday_start']) && isset($settings['laborday_end'])) {
        $labStart = DateTime::createFromFormat('d-m-Y', $settings['laborday_start']);
        $labEnd = DateTime::createFromFormat('d-m-Y', $settings['laborday_end']);
        if ($labStart && $labEnd && $currentDate >= $labStart && $currentDate <= $labEnd) {
            return [
                'price' => $listing['meta']['labor_day_price'] ?? $normalPrice,
                'minimum_stay' => $listing['meta']['labor_day_minimum_stay'] ?? $normalMinimumStay,
                'type' => 'labor_day'
            ];
        }
    }

    // Default to normal pricing
    return [
        'price' => $normalPrice,
        'minimum_stay' => $normalMinimumStay,
        'type' => 'normal'
    ];
}

// Fetch the pricing and add it to the listings
foreach ($listings as $id => $listing) {
    $priceInfo = getPriceForListing($listing, $settings, $currentDate);
    $listings[$id]['price'] = $priceInfo['price'];
    $listings[$id]['minimum_stay'] = $priceInfo['minimum_stay'];
    $listings[$id]['price_type'] = $priceInfo['type'];
}

// Return the listings with their prices as JSON
echo json_encode(array_values($listings), JSON_PRETTY_PRINT);
