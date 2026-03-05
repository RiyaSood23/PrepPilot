// js/admin.js
let companies = [];

const STORAGE_KEY = 'placeTrackCompanies';

const defaultCompanies = [
    {
        id: 1,
        name: "Google",
        role: "Software Engineer",
        package: "45 LPA",
        location: "Bangalore",
        minCGPA: 8.0,
        logo: "https://picsum.photos/id/1015/600/300"
    },
    {
        id: 2,
        name: "Microsoft",
        role: "Product Manager",
        package: "40 LPA",
        location: "Hyderabad",
        minCGPA: 7.5,
        logo: "https://picsum.photos/id/102/600/300"
    },
    {
        id: 3,
        name: "Amazon",
        role: "SDE - 1",
        package: "35 LPA",
        location: "Chennai",
        minCGPA: 7.0,
        logo: "https://picsum.photos/id/1033/600/300"
    },
    {
        id: 4,
        name: "Deloitte",
        role: "Consultant",
        package: "12 LPA",
        location: "Mumbai",
        minCGPA: 6.5,
        logo: "https://picsum.photos/id/1040/600/300"
    },
    {
        id: 5,
        name: "TCS",
        role: "Systems Engineer",
        package: "7 LPA",
        location: "Delhi",
        minCGPA: 6.0,
        logo: "https://picsum.photos/id/106/600/300"
    }
];

function loadCompanies() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        companies = JSON.parse(saved);
    } else {
        companies = [...defaultCompanies];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    }
    renderCompanies();
}

function saveCompanies() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    renderCompanies();
}

function renderCompanies() {
    const container = document.getElementById('companies-list');
    container.innerHTML = '';
    
    document.getElementById('count').textContent = companies.length;

    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        
        card.innerHTML = `
            <div class="card-header">
                <img src="${company.logo}" alt="${company.name}">
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
                
                <div class="cgpa-badge">Min CGPA: ${company.minCGPA}</div>
                
                <div class="card-actions">
                    <button class="delete-btn" data-id="${company.id}">Delete</button>
                    <button class="download-btn" data-id="${company.id}">Download</button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });

    // Attach event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Delete this company?')) {
                companies = companies.filter(c => c.id !== id);
                saveCompanies();
            }
        });
    });

    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const company = companies.find(c => c.id === id);
            if (!company) return;
            
            const dataStr = JSON.stringify(company, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const link = document.createElement('a');
            link.setAttribute('href', dataUri);
            link.setAttribute('download', `${company.name.toLowerCase().replace(/\s+/g, '-')}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}

// Modal controls
function openModal() {
    document.getElementById('add-modal').style.display = 'flex';
    document.getElementById('company-form').reset();
}

function closeModal() {
    document.getElementById('add-modal').style.display = 'none';
}

// Form submit
document.getElementById('company-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newCompany = {
        id: Date.now(),
        name: document.getElementById('name').value.trim(),
        role: document.getElementById('role').value.trim(),
        package: document.getElementById('package').value.trim(),
        location: document.getElementById('location').value.trim(),
        minCGPA: parseFloat(document.getElementById('min-cgpa').value),
        logo: `https://picsum.photos/id/${100 + Math.floor(Math.random()*100)}/600/300`
    };
    
    companies.unshift(newCompany); // add to top
    saveCompanies();
    closeModal();
});

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCompanies();
    
    document.getElementById('add-company-btn').addEventListener('click', openModal);
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    
    // Close modal on outside click
    document.getElementById('add-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('add-modal')) {
            closeModal();
        }
    });
});