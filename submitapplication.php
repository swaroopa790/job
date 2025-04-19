<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "jobsensei";

$conn = new mysqli($host, $user, $pass, $db);

$name = $_POST['name'];
$email = $_POST['email'];
$job = $_POST['job'];

$sql = "INSERT INTO applications (name, email, job_title) VALUES ('$name', '$email', '$job')";
$conn->query($sql);
echo "Success";
?>
