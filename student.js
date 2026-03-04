function register(){

const companies=[
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
}
]

let container=document.getElementById("companies")

companies.forEach(c=>{

container.innerHTML+=`

<div class="company">

<h3>${c.name}</h3>

<p>Role: ${c.role}</p>
<p>Package: ${c.package}</p>
<p>Location: ${c.location}</p>
<p>Required CGPA: ${c.cgpa}</p>

</div>

`

})

}