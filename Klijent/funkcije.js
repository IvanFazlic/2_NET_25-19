const IzmenaPreduzeca = (PIB)=>{
    let url = `http://localhost:5175/api/Preduzece`
    let brojPreduzeca=1
    let root=document.getElementById("root")
    fetch(url + "/" + PIB).then(resp=> resp.json()).then((data)=>{
        root.innerHTML=`<h2>Preduzece ${brojPreduzeca++}</h2>
        <form action="${url + "/izmeniPreduzece/" + PIB}" method="post" id="${data.pib}">
            Ime: <input type="text" name="ime" value="${data.ime}"><br>
            Prezime: <input type="text" name="prezime" value="${data.prezime}"><br>
            Email: <input type="email" name="email" value="${data.email}"><br>
            Naziv preduzeca: <input type="text" name="naziv" value="${data.naziv}"><br>
            Adresa: <input type="text" name="adresa" value="${data.adresa}"><br>
            PIB: <input type="number" name="PIB" value="${data.pib}"><br>
            <button type="submit" name="">Izmeni</button>
        </form>
        <hr>`
        $(`#${data.pib}`).submit((e)=>{
            e.preventDefault();
            $.ajax({
                url: `${url + "/izmeniPreduzece/" + PIB}`,
                type: 'post',
                data:$(`#${data.pib}`).serialize(),
                success:()=>{
                    alert("Izmenjeno preduzece")
                }
            });
        })
    }).catch(err=>console.log(err))
}
const DodajPreduzece=()=>{
    let url = "http://localhost:5175/api/Preduzece/dodaj"
    let root=document.getElementById("root")
    root.innerHTML=`<form action="${url}" method="post" id="formaDodaj">
    Ime: <input type="text" name="ime" id="ime"><br>
    Prezime: <input type="text" name="prezime" id="prezime"><br>
    Email: <input type="email" name="email" id="email"><br>
    Naziv preduzeca: <input type="text" name="naziv" id="naziv"><br>
    Adresa: <input type="text" name="adresa" id="adresa"><br>
    PIB: <input type="number" name="PIB" id="PIB"><br>
    <button name="dugmeDodajPreduzece">Dodaj</button>
</form>`
$('#formaDodaj').submit((e)=>{
    e.preventDefault();
    $.ajax({
        url: "http://localhost:5175/api/Preduzece/dodaj",
        type: 'post',
        data:$('#formaDodaj').serialize(),
        success:()=>{
            alert("Dodato preduzece")
        }
    });
})
}
const PretraziPreduzece=()=>{
    let url = "http://localhost:5175/api/Preduzece/filter"
    let root=document.getElementById("root")
    root.innerHTML=`
    Naziv preduzeca: <input type="text" name="naziv" id="naziv"><br>
    PIB: <input type="number" name="PIB" id="PIB"><br>
    <button name="pretrazi" id="pretrazi">Pretrazi</button>`
document.getElementById("pretrazi").addEventListener("click",()=>{
    brojPreduzeca=1
    let PIB=document.getElementById("PIB").value
    let naziv=document.getElementById("naziv").value
    fetch(url + `/${PIB}`).then(resp=> resp.json()).then((data)=>{
        if(data.lengt>1){
    data.forEach(element => {
        root.innerHTML+=`<h2>Preduzece ${brojPreduzeca++}</h2><ul id="${element.pib}"><li id="" name="">${element.ime}</li>
        <li id="" name="">${element.prezime}</li>
        <li id="" name="">${element.email}</li>
        <li id="" name="">${element.naziv}</li>
        <li id="" name="">${element.adresa}</li>
        <li id="" name="">${element.pib}</li></ul>
        <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="IzmenaPreduzeca(${element.pib})">Izmena preduzeca</h3>
        <hr>`
    });
    }if(data.lengt==1){
        root.innerHTML+=`<h2>Preduzece ${brojPreduzeca++}</h2><ul id="${data.pib}"><li id="" name="">${data.ime}</li>
        <li id="" name="">${data.prezime}</li>
        <li id="" name="">${data.email}</li>
        <li id="" name="">${data.naziv}</li>
        <li id="" name="">${data.adresa}</li>
        <li id="" name="">${data.pib}</li></ul>
        <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="IzmenaPreduzeca(${data.pib})">Izmena preduzeca</h3>
        <hr>`
    }
}).catch(err=>root.innerHTML="Nije pronadjeno nijedno preduzece")
})

}