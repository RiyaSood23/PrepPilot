// public/js/admin.js  - Updated for Eval-2 (Backend Connected)

const API_BASE = "http://localhost:3000";
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Page Protection
if (!token || user.role !== 'admin') {
    alert("Access Denied! Please login as Admin.");
    window.location.href = 'login.html';
}

// Helper function to make API calls
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            ...options
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'API request failed');
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
        renderCompanies(data.data || data.companies || data);
    } catch (err) {
        console.error("Failed to load companies:", err);
        alert("Failed to load companies. Make sure backend server is running on port 3000.");
    }
}

// Add New Company
async function addCompany(e) {
    e.preventDefault();

    const companyData = {
        name: document.getElementById('name').value.trim(),
        role: document.getElementById('role').value.trim(),
        package: document.getElementById('package').value.trim(),
        location: document.getElementById('location').value.trim(),
        minCgpa: parseFloat(document.getElementById('min-cgpa').value)
    };

    if (!companyData.name || !companyData.role || !companyData.package) {
        alert("Please fill all required fields");
        return;
    }

    try {
        await apiRequest('/api/companies', {
            method: 'POST',
            body: JSON.stringify(companyData)
        });

        alert("✅ Company added successfully!");
        loadCompanies();
        closeModal();
    } catch (err) {
        alert("Failed to add company. Please check console.");
    }
}

// Delete Company
async function deleteCompany(id) {
    if (!confirm("Are you sure you want to delete this company?")) return;

    try {
        await apiRequest(`/api/companies/${id}`, { method: 'DELETE' });
        alert("Company deleted successfully!");
        loadCompanies();
    } catch (err) {
        alert("Failed to delete company");
    }
}

// Render Companies (Your existing card design)
function renderCompanies(companies) {
    const container = document.getElementById('companies-list');
    if (!container) return;

    container.innerHTML = '';

    document.getElementById('count').textContent = companies.length;

    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';

        card.innerHTML = `
            <div class="card-header">
                <img src="https://picsum.photos/id/${100 + Math.floor(Math.random() * 100)}/600/300" alt="${company.name}">
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
                
                <div class="cgpa-badge">Min CGPA: ${company.minCgpa || company.cgpa || 'N/A'}</div>
                
                <div class="card-actions">
                    <button class="delete-btn" onclick="deleteCompany('${company._id || company.id}')">Delete</button>
                    <button class="download-btn" onclick="downloadCompany('${company._id || company.id}')">Download</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Download single company as JSON
function downloadCompany(id) {
    // For now, we can skip full backend download or implement later
    alert("Download feature will use backend in full Eval-2");
}

// Modal Functions (Keep your existing modal code)
function openModal() {
    document.getElementById('add-modal').style.display = 'flex';
    document.getElementById('company-form').reset();
}

function closeModal() {
    document.getElementById('add-modal').style.display = 'none';
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    loadCompanies();

    // Add Company Button
    const addBtn = document.getElementById('add-company-btn');
    if (addBtn) addBtn.addEventListener('click', openModal);

    // Modal close buttons
    const closeModalBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Form Submit
    const companyForm = document.getElementById('company-form');
    if (companyForm) {
        companyForm.addEventListener('submit', addCompany);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('add-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});