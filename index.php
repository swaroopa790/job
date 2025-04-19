<?php
// Handle form submission for Skill Analyzer
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['skillForm'])) {
    $skills = $_POST;
    unset($skills['skillForm']); // Remove the form identifier
    $analysisResult = "Your skill ratings:<br>";
    foreach ($skills as $skill => $rating) {
        $analysisResult .= ucfirst($skill) . ": " . htmlspecialchars($rating) . "/5<br>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>JobSensei - Smart Career Navigator</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <!-- Navigation -->
  <header>
    <nav class="navbar">
      <h1 class="logo">JobSensei</h1>
      <ul class="nav-links">
        <li><a href="#analyzer">Skill Analyzer</a></li>
        <li><a href="#recommender">Job Recommender</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#resume">Resume Builder</a></li>
        <li><button class="btn" onclick="toggleDarkMode()">🌓</button></li>
        <li><button class="btn" onclick="toggleAuthModal()">Login</button></li>
      </ul>
    </nav>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-content">
      <h2>Empowering Your Career Journey</h2>
      <p>Smart insights, job matches, and learning paths for students from Tier-2/3 cities.</p>
      <div class="hero-buttons">
        <a href="#analyzer" class="btn">Analyze Skills</a>
        <a href="#recommender" class="btn">Get Jobs</a>
        <a href="#courses" class="btn">Find Courses</a>
      </div>
    </div>
  </section>

  <!-- Skill Analyzer -->
 

<script>
  document.getElementById('skillForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const skills = [
      { label: 'HTML', value: form.html.value },
      { label: 'CSS', value: form.css.value },
      { label: 'JavaScript', value: form.js.value },
      { label: 'Python', value: form.python.value },
      { label: 'Java', value: form.java.value },
      { label: 'SQL', value: form.sql.value },
      { label: 'C', value: form.c.value },
      { label: 'C++', value: form.cpp.value },
      { label: 'Communication', value: form.communication.value }
    ];

    const labels = skills.map(skill => skill.label);
    const dataValues = skills.map(skill => skill.value);

    const ctx = document.getElementById('skillChart').getContext('2d');
    if (window.skillRadar) window.skillRadar.destroy();

    window.skillRadar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skill Proficiency',
          data: dataValues,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  });
</script>
  <!-- Other sections remain unchanged -->

  <footer>
    <p>&copy; 2025 JobSensei. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
