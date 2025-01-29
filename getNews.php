<?php
include 'config.php';

// Obtener las noticias
$sql = "SELECT id, title, summary, details, created_at FROM news ORDER BY created_at DESC";
$result = $conn->query($sql);

$news = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
}

$conn->close();

echo json_encode($news);
?>

