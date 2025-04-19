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
  <section id="analyzer" class="feature-section">
    <h3>Skill Gap Analyzer</h3>
    <p>Enter your skills and rate your proficiency (0 - Beginner to 5 - Expert).</p>
    <form id="skillForm" method="POST">
      <div class="skill-group"><label>HTML</label><input type="range" name="html" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>CSS</label><input type="range" name="css" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>JavaScript</label><input type="range" name="js" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>Python</label><input type="range" name="python" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>Java</label><input type="range" name="java" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>SQL</label><input type="range" name="sql" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>C</label><input type="range" name="c" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>C++</label><input type="range" name="cpp" min="0" max="5" value="0" /></div>
      <div class="skill-group"><label>Communication</label><input type="range" name="communication" min="0" max="5" value="0" /></div>
  
      <button type="submit" name="skillForm" class="btn">Analyze Skills</button>
    </form>
  
    <div id="analysisResult" class="analysis-output">
      <?php if (isset($analysisResult)) echo $analysisResult; ?>
    </div>
  </section>
  
  <!-- Other sections remain unchanged -->

  <footer>
    <p>&copy; 2025 JobSensei. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
