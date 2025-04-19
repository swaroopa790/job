<?php
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "login_php"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
  <style>
    body {
      font-family: Arial;
      background: #eef2f3;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .register-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px #aaa;
      text-align: center;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
    }
    .btn {
      padding: 10px 20px;
      background: #28a745;
      color: white;
      border: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="register-box">
    <h2>Register</h2>
    <form action="register.php" method="post">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="email" name="email" placeholder="Email" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button class="btn" type="submit">Register</button>
    </form>
  </div>
</body>
</html>
