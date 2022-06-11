document.getElementById("prikaz").addEventListener("click",()=>{
let root=document.getElementById("root")
let url = "http://localhost:5175/api/Preduzece/vratiSvaPreduzeca"
let brojPreduzeca=1
root.innerHTML=""
fetch(url).then(resp=> resp.json()).then((data)=>{
    data.forEach(element => {
        root.innerHTML+=`<h2>Preduzece ${brojPreduzeca++}</h2><ul id="${element.pib}"><li id="" name="">${element.ime}</li>
        <li id="" name="">${element.prezime}</li>
        <li id="" name="">${element.email}</li>
        <li id="" name="">${element.naziv}</li>
        <li id="" name="">${element.adresa}</li>
        <li id="" name="">${element.pib}</li></ul>
        <h2 onclick="izmenaPreduzeca(${element.pib})">Izmena preduzeca</h2>
        <hr>`
    });
}).catch(err=>console.log(err))
})
document.getElementById("dodaj").addEventListener("click",()=>{
    dodajPreduzece();
})
