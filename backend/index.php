<?php
require "config.php"; // Database connection file

// Set timezone to New Jersey
date_default_timezone_set('America/New_York');

// Fetch current date
$currentDateStr = date('d-m-Y');
$currentDate = DateTime::createFromFormat('d-m-Y', $currentDateStr);

// ------------------------------------------------------------------
// 1. Fetch Listings & Their Meta Data from listings and listings_meta
// ------------------------------------------------------------------
$sql = "SELECT l.id, l.title, l.description, l.feature_image, 
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
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Listings</title>
    <style>
        .listing-card {
            border: 1px solid #ccc;
            padding: 15px;
            margin: 15px;
            border-radius: 5px;
            width: 300px;
            float: left;
        }

        .listing-card img {
            width: 100%;
            height: auto;
            display: block;
        }

        .clear {
            clear: both;
        }
    </style>
</head>

<body>
    <?php
// ------------------------------------------------------------------
// 5. Display Each Listing Card with Dynamic Pricing and Location
// ------------------------------------------------------------------
foreach ($listings as $id => $listing) {
    $priceInfo = getPriceForListing($listing, $settings, $currentDate);
    $price     = $priceInfo['price'];
    $minStay   = $priceInfo['minimum_stay'];
    $priceType = $priceInfo['type'];

    // If the minimum stay is more than one night, show the total price for that many nights.
    // Determine the price label based on the pricing type and minimum stay without multiplying the rate
    if ($priceType === 'normal') {
        // For normal pricing, always show the base database amount per night,
        // except if the minimum stay is 7, then show "per week".
        if ($minStay == 7) {
            $priceLabel = "$" . number_format($price, 2) . " per week";
        } else {
            $priceLabel = "$" . number_format($price, 2) . " per night";
        }
    } else {
        // For event pricing (peak, memorial, labor)
        if ($minStay == 7) {
            $priceLabel = "$" . number_format($price, 2) . " per week";
        } elseif ($minStay > 1) {
            $priceLabel = "$" . number_format($price, 2) . " per {$minStay} nights";
        } else {
            $priceLabel = "$" . number_format($price, 2) . " per night";
        }
    }

    ?>

    
    <div class="listing-card">
        <?php if (!empty($listing['feature_image'])): ?>
        <img src="<?= htmlspecialchars($listing['feature_image']) ?>"
            alt="<?= htmlspecialchars($listing['title']) ?>">
        <?php endif; ?>
        <h2><?= htmlspecialchars($listing['title']) ?>
        </h2>
        <?php if (isset($listing['location'])): ?>
        <p><strong>Location:</strong>
            <?= htmlspecialchars($listing['location']) ?>
        </p>
        <?php endif; ?>
        <p><?= htmlspecialchars($listing['description']) ?>
        </p>
        <p><strong>Price:</strong> <?= $priceLabel ?></p>
        <?php if ($priceType === 'normal'): ?>
        <p><strong>Date:</strong>
            <?= date('d F Y') ?>
        </p>
        <?php endif; ?>
        <ul>
            <li>Bedrooms:
                <?= $listing['meta']['num_bedrooms'] ?? 'N/A' ?>
            </li>
            <li>Kitchens:
                <?= $listing['meta']['num_kitchens'] ?? 'N/A' ?>
            </li>
            <li>Bathrooms:
                <?= $listing['meta']['num_bathrooms'] ?? 'N/A' ?>
            </li>
            <li>Sleeps:
                <?= $listing['meta']['num_sleeps'] ?? 'N/A' ?>
            </li>
            <li>Cleaning Fees:
                $<?= htmlspecialchars($listing['meta']['cleaning_fees'] ?? 'N/A') ?>
            </li>
            <li>Security Deposit:
                $<?= htmlspecialchars($listing['meta']['security_deposit'] ?? 'N/A') ?>
            </li>
            <li>Utility Fees:
                $<?= htmlspecialchars($listing['meta']['utility_fees'] ?? 'N/A') ?>
            </li>
        </ul>
    </div>
    <?php } ?>
    <div class="clear"></div>
</body>

</html>



<?php
// Include the configuration file to connect to your database.
require "config.php";

// Query to fetch all taxonomies that are not deleted.
$sql = "SELECT * FROM taxonomies WHERE deleted = 0 ORDER BY taxonomy_type, name";
$result = $conn->query($sql);

$taxonomies = [];

// Group taxonomies by their type (location, facility, feature, amenity, room_type).
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Group by taxonomy_type.
        $taxonomies[$row['taxonomy_type']][] = $row;
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Taxonomies by Type</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .taxonomy-section {
            margin-bottom: 30px;
        }

        .taxonomy-section h2 {
            background-color: #f2f2f2;
            padding: 10px;
            border-left: 5px solid #0073aa;
        }

        .taxonomy-list {
            list-style-type: none;
            padding-left: 20px;
        }

        .taxonomy-list li {
            padding: 3px 0;
        }
    </style>
</head>

<body>
    <h1>Taxonomies by Type</h1>
    <?php
    // Loop through each taxonomy type and display its items.
    foreach ($taxonomies as $type => $items) {
        // Capitalize the first letter for the heading.
        echo "<div class='taxonomy-section'>";
        echo "<h2>" . ucfirst($type) . "</h2>";
        echo "<ul class='taxonomy-list'>";
        foreach ($items as $item) {
            echo "<li>" . htmlspecialchars($item['name']) . "</li>";
        }
        echo "</ul>";
        echo "</div>";
    }
?>
</body>

</html>


