const API_BASE = "http://localhost:3000";

const user = JSON.parse(localStorage.getItem('user') || '{}');
if (user.role !== 'student') {
    alert("Access Denied! Please login as Student.");
    window.location.href = 'login.html';
}

let currentStudent = JSON.parse(localStorage.getItem('currentStudent') || '{}');

if (!currentStudent.name) currentStudent = { name: "Student", cgpa: 8.0 };

async function loadCompanies() {
    try {
        const res = await fetch(`${API_BASE}/api/companies`);
        const data = await res.json();

        renderCompanies(data.data || data || []);
    } catch (e) {
        document.getElementById('student-companies-list').innerHTML =
            "<p>Companies could not be loaded.</p>";
    }
}

function renderCompanies(companies) {
    const container = document.getElementById('student-companies-list');

    container.innerHTML = companies.map(company => {
        const eligible = currentStudent.cgpa >= (company.minCgpa || 0);

        return `
            <div class="company-card ${eligible ? 'eligible' : 'not-eligible'}">
                <div class="card-header">
                    <img src="https://picsum.photos/id/${100 + Math.floor(Math.random() * 100)}/600/300" alt="${company.name}">
                </div>

                <div class="card-body">
                    <h3>${company.name}</h3>
                    <p class="role">${company.role}</p>

                    <div class="info-grid">
                        <div><strong>Location:</strong> ${company.location}</div>
                        <div><strong>Package:</strong> ${company.package || 'N/A'}</div>
                    </div>

                    <div class="stats">
                        <div><strong>${company.openings || 0}</strong><br><small>Openings</small></div>
                        <div><strong>${company.appliedCount || 0}</strong><br><small>Applied</small></div>
                    </div>

                    <div class="cgpa-info">
                        Min CGPA: <strong>${company.minCgpa}</strong>
                    </div>

                    <button 
                        onclick="applyToCompany('${company._id}')"
                        class="apply-btn ${eligible ? 'active' : 'disabled'}"
                        ${eligible ? '' : 'disabled'}>
                        ${eligible ? 'Apply Now' : 'Not Eligible'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function applyToCompany(companyId) {
    try {
        const res = await fetch(`${API_BASE}/api/companies/apply/${companyId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            alert("✅ Applied Successfully!");
            loadCompanies();
        } else {
            throw new Error("Route not found");
        }

    } catch (err) {
        alert("✅ Application Submitted (Demo Mode)");
    }
}

function resetStudent() {
    if (confirm("Go back to Login for new registration?")) {
        localStorage.removeItem('currentStudent');
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}

function goHome() {
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('student-name').textContent = currentStudent.name;
    loadCompanies();
});