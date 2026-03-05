// Sample company data
const companies = [
  { name: "Google",    role: "SDE",       package: "20 LPA", location: "Bangalore",  minCGPA: 8   },
  { name: "Amazon",    role: "Developer", package: "18 LPA", location: "Hyderabad",  minCGPA: 7.5 },
  { name: "Microsoft", role: "Engineer",  package: "22 LPA", location: "Noida",      minCGPA: 8   },
  { name: "Adobe",     role: "Developer", package: "19 LPA", location: "Bangalore",  minCGPA: 7.5 },
  { name: "Flipkart",  role: "SDE",       package: "17 LPA", location: "Bangalore",  minCGPA: 7   }
];

let studentData = null;

const studentForm = document.getElementById('studentForm');
const registrationSection = document.getElementById('registrationSection');
const formContainer = document.getElementById('formContainer');
const sectionTitle = document.getElementById('sectionTitle');
const companiesGrid = document.getElementById('companiesGrid');
const toast = document.getElementById('toast');

// Show toast message
function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.style.background = type === 'success' ? '#10b981' : '#ef4444';
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Create company card
function createCompanyCard(company, isRegistered = false, cgpa = 0) {
  const card = document.createElement('div');
  card.classList.add('company-card');

  let actionHTML = '';

  if (!isRegistered) {
    actionHTML = `<button class="btn btn-disabled" disabled>Register to Apply</button>`;
  } else {
    if (cgpa >= company.minCGPA) {
      actionHTML = `<button class="btn btn-primary apply-btn" data-company="${company.name}">Apply</button>`;
    } else {
      actionHTML = `<span class="badge badge-not-eligible">Not Eligible (min ${company.minCGPA})</span>`;
    }
  }

  card.innerHTML = `
    <h3 class="company-name">${company.name}</h3>
    <div class="company-info">
      <p><strong>Role:</strong> ${company.role}</p>
      <p><strong>Package:</strong> ${company.package}</p>
      <p><strong>Location:</strong> ${company.location}</p>
      <p><strong>Min CGPA:</strong> ${company.minCGPA}</p>
    </div>
    <div class="action-area">
      ${actionHTML}
    </div>
  `;

  // Add apply functionality if button exists
  if (isRegistered && cgpa >= company.minCGPA) {
    const applyBtn = card.querySelector('.apply-btn');
    applyBtn.addEventListener('click', () => {
      applyBtn.textContent = 'Applied';
      applyBtn.classList.remove('btn-primary');
      applyBtn.classList.add('btn-applied');
      applyBtn.disabled = true;
      showToast(`Applied to ${company.name} successfully!`);
    });
  }

  return card;
}

// Render companies
function renderCompanies() {
  companiesGrid.innerHTML = '';

  const isRegistered = !!studentData;

  companies.forEach(company => {
    const card = createCompanyCard(company, isRegistered, studentData?.cgpa || 0);
    companiesGrid.appendChild(card);
  });
}

// Form submission
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const branch = document.getElementById('branch').value;
  const skills = document.getElementById('skills').value.trim();
  const cgpa = parseFloat(document.getElementById('cgpa').value);

  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    showToast('Please enter a valid CGPA (0-10)', 'error');
    return;
  }

  studentData = { name, branch, skills, cgpa };

  // Success flow
  showToast('Registration Successful!');
  
  // Hide form
  formContainer.style.display = 'none';
  
  // Update title
  sectionTitle.textContent = 'Recommended Companies For You';

  // Show filtered companies
  renderCompanies();
});

// Initial render (before registration)
renderCompanies();