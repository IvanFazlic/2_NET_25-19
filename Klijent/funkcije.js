const IzmenaPreduzeca = (PIB)=>{
    let url = `http://localhost:5175/api/Preduzece`
    let brojPreduzeca=1
    let root=document.getElementById("root")
    fetch(url + "/" + PIB).then(resp=> resp.json()).then((data)=>{
        root.innerHTML=`<h2>Preduzece ${brojPreduzeca++}</h2>
        <form action="${url + "/izmeniPreduzece/" + PIB}" method="post" id="${PIB}">
            Ime: <input type="text" name="ime" value="${data.ime}" required minlength="2" maxlength="20"><br>
            Prezime: <input type="text" name="prezime" value="${data.prezime}" required minlength="2" maxlength="20"><br>
            Email: <input type="email" name="email" value="${data.email}" required minlength="10" maxlength="30"><br>
            Naziv preduzeca: <input type="text" name="naziv" value="${data.naziv}" required minlength="9" maxlength="30"><br>
            Adresa: <input type="text" name="adresa" value="${data.adresa}" required minlength="9" maxlength="30"><br>
            PIB: <input type="number" name="PIB" id="pib" value="${data.pib}" min="99999999" max="999999999" required><br>
            <button type="submit" name="">Izmeni</button>
        </form>
        <hr>`
        $(`#${data.pib}`).submit((e)=>{
            e.preventDefault();
            fetch('http://localhost:5175/api/Preduzece/provera/' + document.getElementById("pib").value).then(resp=> resp.json()).then((data)=>{
        if(data!=""){
            alert("Preduzece vec postoji / PIB se koristi")
        }
        else{
            $.ajax({
                url: `${url + "/izmeniPreduzece/" + PIB}`,
                type: 'post',
                data:$(`#${PIB}`).serialize(),
                success:()=>{
                    alert("Izmenjeno preduzece")
                }
            });
        }
    })
    })
}).catch(err=>console.log(err))
}
const DodajPreduzece=()=>{
    let url = "http://localhost:5175/api/Preduzece/dodaj"
    let root=document.getElementById("root")
    root.innerHTML=`<form action="${url}" method="post" id="formaDodaj">
    Ime: <input type="text" name="ime" id="ime" required minlength="2" maxlength="20"><br>
    Prezime: <input type="text" name="prezime" id="prezime" required minlength="2" maxlength="20"><br>
    Email: <input type="email" name="email" id="email" required minlength="10" maxlength="30"><br>
    Naziv preduzeca: <input type="text" name="naziv" id="naziv" required minlength="9" maxlength="30"><br>
    Adresa: <input type="text" name="adresa" id="adresa" required minlength="9" maxlength="30"><br>
    PIB: <input type="number" name="PIB" id="PIB" min="99999999" max="999999999" required><br>
    <button name="dugmeDodajPreduzece">Dodaj</button>
</form>`
$('#formaDodaj').submit((e)=>{
        e.preventDefault();
        fetch('http://localhost:5175/api/Preduzece/provera/' + document.getElementById("PIB").value).then(resp=> resp.json()).then((data)=>{
        if(data!=""){
            alert("Preduzece vec postoji / PIB se koristi")
        }else{
            $.ajax({
            url: "http://localhost:5175/api/Preduzece/dodaj",
            type: 'post',
            data:$('#formaDodaj').serialize(),
            success:()=>{
                alert("Dodato preduzece")
            }
          });
        }
    }).catch(err=>console.log(err))
})

}
const PretraziPreduzece=()=>{
    let root=document.getElementById("root")
    root.innerHTML=`
    Naziv preduzeca: <input type="text" name="naziv" id="naziv"><br>
    PIB: <input type="number" name="PIB" id="PIB"><br>
    <button name="pretrazi" id="pretrazi" onclick="Pretraga()">Pretrazi</button>`
}
const Pretraga= ()=>{
        brojPreduzeca=1
        let url = "http://localhost:5175/api/Preduzece/filter"
        let PIB=document.getElementById("PIB").value
        let naziv=document.getElementById("naziv").value
        fetch(url + `/${PIB}/${naziv}`).then(resp=> resp.json()).then((data)=>{
        if(data==""){
            root.innerHTML+="<br>Nije pronadjeno nijedno preduzece<br>"
        }
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
        
    }).catch(err=>root.innerHTML="Molimo unesite naziv i PIB")
}