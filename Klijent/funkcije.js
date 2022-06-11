const izmenaPreduzeca = (PIB)=>{
    let url = "http://localhost:5175/api/Preduzece"
    let brojPreduzeca=1
    let root=document.getElementById("root")
    fetch(url + "/"+ PIB).then(resp=> resp.json()).then((data)=>{
        root.innerHTML=`<h2>Preduzece ${brojPreduzeca++}</h2><ul id="${data.pib}"><li id="" name="">${data.ime}</li>
        <li id="" name="">${data.prezime}</li>
        <li id="" name="">${data.email}</li>
        <li id="" name="">${data.naziv}</li>
        <li id="" name="">${data.adresa}</li>
        <li id="" name="">${data.pib}</li></ul>
        <form action="${url + "/dodaj/" + PIB}" method="post">
            Ime: <input type="text" name="ime"><br>
            Prezime: <input type="text" name="prezime"><br>
            Email: <input type="email" name="email"><br>
            Naziv preduzeca: <input type="text" name="naziv"><br>
            Adresa: <input type="text" name="adresa"><br>
            PIB: <input type="number" name="PIB"><br>
            <button type="submit" name="">Dodaj</button>
        </form>
        <hr>`
    }).catch(err=>console.log(err))
}
const dodajPreduzece=()=>{
    let url = "http://localhost:5175/api/Preduzece/dodaj"
    let root=document.getElementById("root")
    root.innerHTML=`<form action="${url}" method="post">
    Ime: <input type="text" name="ime"><br>
    Prezime: <input type="text" name="prezime"><br>
    Email: <input type="email" name="email"><br>
    Naziv preduzeca: <input type="text" name="naziv"><br>
    Adresa: <input type="text" name="adresa"><br>
    PIB: <input type="number" name="PIB"><br>
    <button type="submit" name="">Dodaj</button>
</form>`
}