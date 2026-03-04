const companyList = document.getElementById("companyList");
const form = document.getElementById("companyForm");

function showForm() {
  form.classList.remove("hidden");
}

function hideForm() {
  form.classList.add("hidden");
}

async function loadCompanies() {
  const res = await fetch("/api/companies");
  const data = await res.json();

  companyList.innerHTML = "";

  data.data.forEach(company => {
    companyList.innerHTML += `
      <div class="card">
        <h3>${company.name}</h3>
        <p>Role: ${company.role}</p>
        <p>Package: ${company.package}</p>
        <p>Location: ${company.location}</p>
        <p>CGPA: ${company.minCgpa}</p>
        <button onclick="deleteCompany(${company.id})">Delete</button>
      </div>
    `;
  });
}

async function addCompany() {
  const company = {
    name: name.value,
    role: role.value,
    package: package.value,
    location: location.value,
    minCgpa: Number(cgpa.value)
  };

  await fetch("/api/companies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(company)
  });

  hideForm();
  loadCompanies();
}

async function deleteCompany(id) {
  await fetch(`/api/companies/${id}`, { method: "DELETE" });
  loadCompanies();
}

function downloadData() {
  window.location.href = "/api/companies/download";
}

loadCompanies();