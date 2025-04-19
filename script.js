// 🌙 Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// 🔐 Auth Modal Toggle
function toggleAuthModal() {
    const modal = document.getElementById("authModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// 💬 Chatbot Toggle
function toggleChat() {
    const chat = document.getElementById("chatbot");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

// 💬 Send Message to Chatbot
function sendMessage() {
    const input = document.getElementById("userInput");
    const messages = document.getElementById("chat-messages");

    if (input.value.trim() !== "") {
        const userMsg = document.createElement("div");
        userMsg.textContent = "You: " + input.value;
        messages.appendChild(userMsg);

        const botReply = document.createElement("div");
        botReply.textContent = "Bot: I’ll get back to you soon!";
        messages.appendChild(botReply);

        input.value = "";
        messages.scrollTop = messages.scrollHeight;
    }
}

// 📊 Skill Analyzer Logic
document.getElementById("skillForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const jobExpectations = {
        html: 3,
        css: 3,
        js: 4,
        python: 4,
        java: 4,
        sql: 4,
    };

    const userSkills = {};
    for (let skill in jobExpectations) {
        userSkills[skill] = parseInt(this[skill].value);
    }

    let output = "<h4>Skill Analysis Result:</h4><ul>";
    let gaps = 0;

    for (let skill in jobExpectations) {
        const diff = jobExpectations[skill] - userSkills[skill];
        if (diff > 0) {
            output += `<li><strong>${skill.toUpperCase()}</strong>: Improve by ${diff} level(s)</li>`;
            gaps++;
        } else {
            output += `<li><strong>${skill.toUpperCase()}</strong>: ✔ Good</li>`;
        }
    }

    output += "</ul>";
    output += gaps === 0
        ? "<p>🎉 You're ready for most job requirements!</p>"
        : "<p>📈 Keep learning to bridge the skill gaps!";

    const resultDiv = document.getElementById("analysisResult");
    resultDiv.innerHTML = output;
    resultDiv.style.display = "block";
});

// 💼 Job Recommender Logic
document.getElementById("jobForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const skill = document.getElementById("primarySkill").value;
    const experience = document.getElementById("experience").value;

    let recommendations = [];
    
    const jobRecommendations = {
        html: {
            beginner: ["Frontend Intern", "Junior Web Developer"],
            intermediate: ["Frontend Developer", "UI Engineer"],
            advanced: ["Senior Web Developer", "Frontend Architect"]
        },
        python: {
            beginner: ["Python Intern", "Automation Assistant"],
            intermediate: ["Backend Developer", "Data Analyst"],
            advanced: ["Data Scientist", "ML Engineer"]
        },
        java: {
            beginner: ["Java Intern", "Junior Java Developer"],
            intermediate: ["Java Developer", "Spring Boot Developer"],
            advanced: ["Java Architect", "Enterprise Application Developer"]
        },
        sql: {
            beginner: ["Database Intern", "SQL Assistant"],
            intermediate: ["Data Engineer", "SQL Developer"],
            advanced: ["Database Administrator", "Business Intelligence Analyst"]
        },
        c_cpp: {
            beginner: ["Embedded Intern", "Junior C/C++ Programmer"],
            intermediate: ["Software Developer", "Game Developer"],
            advanced: ["System Engineer", "Firmware Developer"]
        }
    };

    // Push recommendations based on the user's skill and experience
    if (jobRecommendations[skill]) {
        recommendations = jobRecommendations[skill][experience] || [];
    }

    const resultBox = document.getElementById("jobResults");

    if (recommendations.length > 0) {
        resultBox.innerHTML = `<h4>🔍 Recommended Jobs for You:</h4><ul>
            ${recommendations
            .map(
                (job, index) => `
                <li>
                    ${job}
                    <button class="apply-btn" onclick="applyJob('${job}', ${index})">Apply</button>
                </li>`
            )
            .join("")}
        </ul>`;
    } else {
        resultBox.innerHTML = `<p>❌ No recommendations found. Try different options.</p>`;
    }

    resultBox.style.display = "block";
});

// 📨 Apply Job Handler - Open Application Modal
function applyJob(jobTitle, index) {
    document.getElementById("jobApplyModal").style.display = "flex";
    document.getElementById("jobTitleField").value = jobTitle;
}

// ❌ Close Application Modal
function closeApplyModal() {
    document.getElementById("jobApplyModal").style.display = "none";
    document.getElementById("applyForm").reset();
    document.getElementById("applySuccess").style.display = "none";
}

// ✅ Submit Application Form
document.getElementById("applyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("applicantName").value;
    const email = document.getElementById("applicantEmail").value;
    const jobTitle = document.getElementById("jobTitleField").value;

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push({ name, email, jobTitle, time: new Date().toLocaleString() });
    localStorage.setItem("applications", JSON.stringify(applications));

    document.getElementById("applySuccess").style.display = "block";

    setTimeout(() => {
        alert(`🎉 Thank you ${name}, you have successfully applied for "${jobTitle}"!`);
        closeApplyModal();
    }, 1000);
});

// Fetch Applications for Job Matching
function fetchApplications() {
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const container = document.getElementById("offersContainer");
    container.innerHTML = "";

    const jobCriteria = {
        "Frontend Developer": ["html", "css", "javascript"],
        "Python Developer": ["python", "sql"],
        "Java Developer": ["java", "spring"],
        "Data Analyst": ["sql", "python", "excel"],
    };

    applications.forEach(app => {
        let matchedJob = null;

        for (let job in jobCriteria) {
            const required = jobCriteria[job];
            const matchCount = required.filter(skill => app.skills.includes(skill)).length;
            if (matchCount >= required.length - 1) { // allow 1 skill missing
                matchedJob = job;
                break;
            }
        }

        const offerCard = document.createElement("div");
        offerCard.style.padding = "1rem";
        offerCard.style.margin = "1rem 0";
        offerCard.style.border = "1px solid #ccc";
        offerCard.style.borderRadius = "8px";
        offerCard.innerHTML = `
            <strong>👤 ${app.name}</strong> applied for <em>${app.jobTitle}</em><br>
            📧 Email: ${app.email}<br>
            🛠️ Skills: ${app.skills.join(", ")}<br>
            🕒 Time: ${app.time}<br>
            ${matchedJob ? `<p style="color:green;">✅ Matched with <strong>${matchedJob}</strong>. Job Offered! 🎉</p>` 
            : `<p style="color:red;">❌ No Matching Job Found</p>`}
        `;
        container.appendChild(offerCard);
    });
}
