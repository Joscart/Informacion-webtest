<?php
include 'config.php';

$title = $_POST['title'];
$summary = $_POST['summary'];
$details = $_POST['details'];

$sql = "INSERT INTO news (title, summary, details) VALUES ('$title', '$summary', '$details')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

