let student = null;
const studentCompanyList = document.getElementById("studentCompanyList");

async function registerStudent() {
  const data = {
    name: sname.value,
    branch: branch.value,
    skills: skills.value,
    cgpa: Number(scgpa.value)
  };

  const res = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  student = { ...data, id: result.studentId };

  loadCompanies();
}

async function loadCompanies() {
  const res = await fetch("/api/companies");
  const data = await res.json();

  studentCompanyList.innerHTML = "";

  data.data.forEach(company => {
    const eligible = student && student.cgpa >= company.minCgpa;

    studentCompanyList.innerHTML += `
      <div class="card ${eligible ? "green" : "red"}">
        <h3>${company.name}</h3>
        <p>Role: ${company.role}</p>
        <p>Package: ${company.package}</p>
        <p>Location: ${company.location}</p>
        <p>Required CGPA: ${company.minCgpa}</p>
      </div>
    `;
  });
}