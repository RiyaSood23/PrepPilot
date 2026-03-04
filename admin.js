let companies=[

{
name:"Google",
role:"SDE",
package:"20 LPA",
location:"Bangalore",
cgpa:8
},

{
name:"Amazon",
role:"Developer",
package:"18 LPA",
location:"Hyderabad",
cgpa:7.5
},

{
name:"Microsoft",
role:"Engineer",
package:"22 LPA",
location:"Noida",
cgpa:8
},

{
name:"Adobe",
role:"Developer",
package:"19 LPA",
location:"Bangalore",
cgpa:7.5
},

{
name:"Flipkart",
role:"SDE",
package:"17 LPA",
location:"Bangalore",
cgpa:7
}

]

let deleteIndex=null


function openForm(){

document.getElementById("form").classList.remove("hidden")

}

function closeForm(){

document.getElementById("form").classList.add("hidden")

}


function addCompany(){

let name=document.getElementById("name").value
let role=document.getElementById("role").value
let packageValue=document.getElementById("package").value
let location=document.getElementById("location").value
let cgpa=document.getElementById("cgpa").value

if(!name || !role || !packageValue || !location || !cgpa){

alert("Please fill all fields")
return

}

let company={

name:name,
role:role,
package:packageValue,
location:location,
cgpa:cgpa

}


// fake loading

setTimeout(()=>{

companies.push(company)

renderCompanies()

closeForm()

showSuccess()

document.getElementById("name").value=""
document.getElementById("role").value=""
document.getElementById("package").value=""
document.getElementById("location").value=""
document.getElementById("cgpa").value=""

},700)

}



function renderCompanies(){

let list=document.getElementById("companyList")

list.innerHTML=""

companies.forEach((c,i)=>{

list.innerHTML+=`

<div class="company">

<h3>${c.name}</h3>

<p><b>Role:</b> ${c.role}</p>
<p><b>Package:</b> ${c.package}</p>
<p><b>Location:</b> ${c.location}</p>
<p><b>CGPA:</b> ${c.cgpa}</p>

<button class="delete" onclick="deleteCompany(${i})">Delete</button>
<button class="download" onclick="downloadCompany(${i})">Download</button>

</div>

`

})

}



function deleteCompany(i){

deleteIndex=i

document.getElementById("deleteModal").classList.remove("hidden")

}



function closeDeleteModal(){

document.getElementById("deleteModal").classList.add("hidden")

}



function confirmDelete(){

companies.splice(deleteIndex,1)

renderCompanies()

closeDeleteModal()

}



function downloadCompany(i){

const data=JSON.stringify(companies[i],null,2)

const blob=new Blob([data])

const a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download=companies[i].name + ".json"

a.click()

}



function searchCompany(){

let search=document.getElementById("search").value.toLowerCase()

let list=document.getElementById("companyList")

list.innerHTML=""

companies.forEach((c,i)=>{

if(c.name.toLowerCase().includes(search)){

list.innerHTML+=`

<div class="company">

<h3>${c.name}</h3>

<p><b>Role:</b> ${c.role}</p>
<p><b>Package:</b> ${c.package}</p>
<p><b>Location:</b> ${c.location}</p>
<p><b>CGPA:</b> ${c.cgpa}</p>

<button class="delete" onclick="deleteCompany(${i})">Delete</button>
<button class="download" onclick="downloadCompany(${i})">Download</button>

</div>

`

}

})

}



function showSuccess(){

let toast=document.getElementById("successToast")

toast.classList.remove("hidden")

setTimeout(()=>{

toast.classList.add("hidden")

},2500)

}



renderCompanies()