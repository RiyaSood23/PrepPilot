// js/student.js
let companies = [];
let currentStudent = null;

const STORAGE_KEY = 'placeTrackCompanies';
const STUDENT_KEY = 'placeTrackCurrentStudent';

const defaultCompanies = [ /* same as admin.js - duplicated for independence */
    { id:1, name:"Google", role:"Software Engineer", package:"45 LPA", location:"Bangalore", minCGPA:8.0, logo:"https://picsum.photos/id/1015/600/300" },
    { id:2, name:"Microsoft", role:"Product Manager", package:"40 LPA", location:"Hyderabad", minCGPA:7.5, logo:"https://picsum.photos/id/102/600/300" },
    { id:3, name:"Amazon", role:"SDE - 1", package:"35 LPA", location:"Chennai", minCGPA:7.0, logo:"https://picsum.photos/id/1033/600/300" },
    { id:4, name:"Deloitte", role:"Consultant", package:"12 LPA", location:"Mumbai", minCGPA:6.5, logo:"https://picsum.photos/id/1040/600/300" },
    { id:5, name:"TCS", role:"Systems Engineer", package:"7 LPA", location:"Delhi", minCGPA:6.0, logo:"https://picsum.photos/id/106/600/300" }
];

function loadCompanies() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        companies = JSON.parse(saved);
    } else {
        companies = [...defaultCompanies];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    }
}

function loadStudent() {
    const savedStudent = localStorage.getItem(STUDENT_KEY);
    if (savedStudent) {
        currentStudent = JSON.parse(savedStudent);
        showCompaniesView();
    } else {
        showRegistrationForm();
    }
}

function saveStudent(student) {
    currentStudent = student;
    localStorage.setItem(STUDENT_KEY, JSON.stringify(student));
}

function renderStudentCompanies() {
    const container = document.getElementById('student-companies-list');
    container.innerHTML = '';

    companies.forEach(company => {
        const isEligible = currentStudent.cgpa >= company.minCGPA;
        
        const card = document.createElement('div');
        card.className = `company-card ${isEligible ? 'eligible' : 'not-eligible'}`;
        
        card.innerHTML = `
            <div class="card-header">
                <img src="${company.logo}" alt="${company.name}">
                <div class="status-badge ${isEligible ? 'status-eligible' : 'status-not'}">
                    ${isEligible ? 'Eligible' : 'Not Eligible'}
                </div>
            </div>
            <div class="card-body">
                <h3>${company.name}</h3>
                <div class="role">${company.role}</div>
                
                <div class="info-row">
                    <span class="info-label">Package</span>
                    <span class="info-value">${company.package}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location</span>
                    <span class="info-value">${company.location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Required CGPA</span>
                    <span class="info-value">${company.minCGPA}</span>
                </div>
                
                <div style="margin-top:20px; font-size:0.95rem; color:#888;">
                    Your CGPA: <strong>${currentStudent.cgpa}</strong>
                </div>
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
    
    document.getElementById('student-name').textContent = currentStudent.name.split(' ')[0];
    document.getElementById('student-info').innerHTML = `
        ${currentStudent.branch} • CGPA ${currentStudent.cgpa} • ${currentStudent.skills}
    `;
    
    renderStudentCompanies();
}

function resetStudent() {
    if (confirm('Start a new registration?')) {
        localStorage.removeItem(STUDENT_KEY);
        currentStudent = null;
        showRegistrationForm();
    }
}

// Form handling
document.getElementById('student-register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentData = {
        name: document.getElementById('s-name').value.trim(),
        branch: document.getElementById('s-branch').value.trim(),
        cgpa: parseFloat(document.getElementById('s-cgpa').value),
        skills: document.getElementById('s-skills').value.trim()
    };
    
    if (!studentData.name || !studentData.branch || isNaN(studentData.cgpa)) {
        alert("Please fill all fields correctly");
        return;
    }
    
    saveStudent(studentData);
    showCompaniesView();
});

document.addEventListener('DOMContentLoaded', () => {
    loadCompanies();
    loadStudent();
});