<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $testimonial = $_POST["testimonial-2"];
    $name = $_POST["name-2"];
    $affiliation = $_POST["affiliation-2"];

    $to = "rishibhunji@gmail.com";
    $subject = "New Testimonial Submission";
    $message = "Testimonial: $testimonial\n\nName: $name\nAffiliation: $affiliation";

    if (mail($to, $subject, $message)) {
        header("Location: thank_you.html");
        exit();
    } else {
        echo "Error sending email. Please try again later.";
    }
}
?>
