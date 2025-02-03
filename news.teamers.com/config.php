<?php
// Archivo config.php

// Ruta al archivo de contraseña
$passwordFilePath = './mysql_pass';

// Leer la contraseña del archivo
$password = trim(file_get_contents($passwordFilePath));

// Detalles de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$dbname = "teamers_news";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

