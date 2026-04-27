const API_BASE = "http://localhost:3000";

if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ role: "admin" }));
}

const user = JSON.parse(localStorage.getItem('user') || '{}');

if (user.role !== 'admin') {
    alert("Access Denied! Please login as Admin.");
    window.location.href = 'login.html';
}

// API
async function apiRequest(endpoint, options = {}) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: options.method || 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: options.body || null
        });

        if (!res.ok) throw new Error('API Error');

        return await res.json();

    } catch (err) {
        console.error(err);
        return { data: [] };
    }
}

// LOAD
async function loadCompanies() {
    const data = await apiRequest('/api/companies');
    const companies = data.data || data || [];

    renderCompanies(companies);

    const count = document.getElementById('count');
    if (count) count.textContent = companies.length;
}

// RENDER
function renderCompanies(companies) {
    const container = document.getElementById('companies-list');

    if (!companies.length) {
        container.innerHTML = "<p>No companies found.</p>";
        return;
    }

    container.innerHTML = companies.map(c => `
        <div class="company-card">
            <div class="card-header">
                <img src="https://picsum.photos/id/${100 + Math.floor(Math.random() * 100)}/600/300">
            </div>

            <div class="card-body">
                <h3>${c.name}</h3>
                <p class="role">${c.role}</p>

                <div class="info-grid">
                    <div><strong>Location:</strong> ${c.location}</div>
                    <div><strong>Package:</strong> ${c.package || 'N/A'}</div>
                </div>

                <div class="stats">
                    <div><strong>${c.openings ?? 0}</strong><br><small>Openings</small></div>
                    <div><strong>${c.appliedCount ?? 0}</strong><br><small>Applied</small></div>
                </div>

                <div class="cgpa-info">
                    Min CGPA: <strong>${c.minCgpa}</strong>
                </div>

                <button class="delete-btn" onclick="deleteCompany('${c._id}')">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// DELETE
async function deleteCompany(id) {
    if (!confirm("Delete this company?")) return;

    await apiRequest(`/api/companies/${id}`, { method: 'DELETE' });
    loadCompanies();
}

// MODAL
function openModal() {
    document.getElementById('add-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('add-modal').style.display = 'none';
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    loadCompanies();

    document.getElementById('add-company-btn').onclick = openModal;

    document.getElementById('company-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const company = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            package: document.getElementById('package').value,
            location: document.getElementById('location').value,
            minCgpa: document.getElementById('min-cgpa').value
        };

        await apiRequest('/api/companies', {
            method: 'POST',
            body: JSON.stringify(company)
        });

        closeModal();
        loadCompanies();
    });

    window.onclick = function (e) {
        const modal = document.getElementById('add-modal');
        if (e.target === modal) closeModal();
    };
});