// public/js/student.js - Updated for Eval-2 (Backend Connected)

const API_BASE = "http://localhost:3000";
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Protect Student Page
if (!token || user.role !== 'student') {
    alert("Access Denied! Please login as Student.");
    window.location.href = 'login.html';
}

let currentStudent = null;

// Helper API function
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            ...options
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || 'Request failed');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Load Companies from Backend
async function loadCompanies() {
    try {
        const data = await apiRequest('/api/companies');
        renderStudentCompanies(data.data || data.companies || data);
    } catch (err) {
        console.error(err);
        alert("Failed to load companies. Backend may not be running.");
    }
}

// Student Registration (Send to Backend)
async function registerStudent(e) {
    e.preventDefault();

    const studentData = {
        name: document.getElementById('s-name').value.trim(),
        branch: document.getElementById('s-branch').value.trim(),
        cgpa: parseFloat(document.getElementById('s-cgpa').value),
        skills: document.getElementById('s-skills').value.split(',').map(s => s.trim())
    };

    if (!studentData.name || !studentData.branch || isNaN(studentData.cgpa)) {
        alert("Please fill all fields correctly");
        return;
    }

    try {
        const data = await apiRequest('/api/students', {
            method: 'POST',
            body: JSON.stringify(studentData)
        });

        currentStudent = { ...studentData, _id: data.student?._id || Date.now() };
        alert("✅ Registration successful!");
        showCompaniesView();
    } catch (err) {
        alert("Registration failed. Please try again.");
    }
}

// Apply to Company
async function applyToCompany(companyId) {
    if (!confirm("Do you want to apply to this company?")) return;

    try {
        const data = await apiRequest('/api/applications', {
            method: 'POST',
            body: JSON.stringify({ companyId })
        });

        alert(data.message || "✅ Application submitted successfully!");
        loadCompanies(); // refresh list
    } catch (err) {
        alert(err.message || "Failed to apply. You may not be eligible or already applied.");
    }
}

// Render Companies with Eligibility + Apply Button
function renderStudentCompanies(companies) {
    const container = document.getElementById('student-companies-list');
    if (!container) return;

    container.innerHTML = '';

    companies.forEach(company => {
        const isEligible = currentStudent && currentStudent.cgpa >= (company.minCgpa || company.cgpa || 0);

        const card = document.createElement('div');
        card.className = `company-card ${isEligible ? 'eligible' : 'not-eligible'}`;

        card.innerHTML = `
            <div class="card-header">
                <img src="https://picsum.photos/id/${100 + Math.floor(Math.random()*100)}/600/300" alt="${company.name}">
                <div class="status-badge ${isEligible ? 'status-eligible' : 'status-not'}">
                    ${isEligible ? '✅ Eligible' : '❌ Not Eligible'}
                </div>
            </div>
            <div class="card-body">
                <h3>${company.name}</h3>
                <div class="role">${company.role}</div>
                
                <div class="info-row">
                    <span class="info-label">Package</span>
                    <span class="info-value">${company.package || company.salary || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location</span>
                    <span class="info-value">${company.location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Required CGPA</span>
                    <span class="info-value">${company.minCgpa || company.cgpa || 'N/A'}</span>
                </div>
                
                ${currentStudent ? `
                <div style="margin-top:15px; font-size:0.95rem; color:#888;">
                    Your CGPA: <strong>${currentStudent.cgpa}</strong>
                </div>` : ''}

                <button onclick="applyToCompany('${company._id || company.id}')" 
                        class="apply-btn ${isEligible ? '' : 'disabled'}"
                        ${isEligible ? '' : 'disabled'}>
                    ${isEligible ? 'Apply Now' : 'Not Eligible'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function showRegistrationForm() {
    document.getElementById('registration-form').style.display = 'block';
    document.getElementById('companies-view').style.display = 'none';
}

function showCompaniesView() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('companies-view').style.display = 'block';

    if (currentStudent) {
        document.getElementById('student-name').textContent = currentStudent.name.split(' ')[0];
        document.getElementById('student-info').innerHTML = `
            ${currentStudent.branch} • CGPA ${currentStudent.cgpa}
        `;
    }

    loadCompanies();
}

function resetStudent() {
    if (confirm('Start a new registration?')) {
        currentStudent = null;
        showRegistrationForm();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Attach registration form
    const registerForm = document.getElementById('student-register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', registerStudent);
    }

    // If student is already registered (optional - for future)
    showRegistrationForm();   // Start with registration form
});