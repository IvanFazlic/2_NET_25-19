const URLovi = {
	"unosFakture":"http://localhost:5175/API/unosFakture",
    "izmeniFakturu":"http://localhost:5175/API/izmeniFakturu/",
    "bilans":"http://localhost:5175/API/bilans/",
    "pregledFakturaPoPreduzecu":"http://localhost:5175/API/pregledFakturaPoPreduzecu/",
    "vratiSvaPreduzeca":"http://localhost:5175/API/vratiSvaPreduzeca",
    "vratiSveFakture":"http://localhost:5175/API/vratiSveFakture",
    "pronadjiPreduzece":"http://localhost:5175/API/pronadjiPreduzece/",
    "filter":"http://localhost:5175/API/filter/",
    "dodaj":"http://localhost:5175/API/dodaj",
    "izmeniPreduzece":"http://localhost:5175/API/izmeniPreduzece/"
}
interface Faktura{
    id:number
    PIBkome:number 
    PIBodKoga:number 
    datumGenerisanja:Date 
    datumPlacanja:Date
    ukupnaCena:number
    tipFakture:string
    naziv:string
    cenaPoJediniciMere:number
    jedinicaMere:string
    kolicina:number
}
interface Preduzece{
    ime:string
    prezime:string
    email:string
    naziv:string
    adresa:string
    pib:number
}
class RadSaPreduzecima{
    static DetaljiPreduzeca(preduzeca:Array<Preduzece>){
        let prikazPreduzeca:string=""
        let brojPreduzeca:number=1;
        preduzeca.forEach(preduzece=>{
            prikazPreduzeca+=`<h2>Preduzece ${brojPreduzeca++}</h2><ul id="${preduzece.pib}">
                <li id="" name="">Ime: ${preduzece.ime}</li>
                <li id="" name="">Prezime: ${preduzece.prezime}</li>
                <li id="" name="">Email: ${preduzece.email}</li>
                <li id="" name="">Naziv preduzeca: ${preduzece.naziv}</li>
                <li id="" name="">Adresa preduzeca: ${preduzece.adresa}</li>
                <li id="" name="">PIB:${preduzece.pib}</li></ul>
                <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="IzmeniPreduzeceHTML(${preduzece.pib})">Izmena preduzeca</h3>
                <hr>`
        })
        return prikazPreduzeca
    }
    static PrikaziPreduzeca(div:HTMLElement){
        let preduzeca=[];
        fetch(URLovi.vratiSvaPreduzeca).then(odg=>odg.json()).then(responce=>{
            console.log(responce)
            div.innerHTML=`<div>${RadSaPreduzecima.DetaljiPreduzeca(responce)}</div>`
        })
    }
    static PreduzeceZaIzmenu(data:Preduzece,pib){
        let prikazPreduzeca:string=""
        let brojPreduzeca:number=1;
            prikazPreduzeca+=`<form action="${URLovi.izmeniPreduzece + pib}" method="post" id="${data.pib}">
            Ime: <input type="text" name="ime" value="${data.ime}" required minlength="2" maxlength="20"><br>
            Prezime: <input type="text" name="prezime" value="${data.prezime}" required minlength="2" maxlength="20"><br>
            Email: <input type="email" name="email" value="${data.email}" required minlength="10" maxlength="30"><br>
            Naziv preduzeca: <input type="text" name="naziv" value="${data.naziv}" required minlength="9" maxlength="30"><br>
            Adresa: <input type="text" name="adresa" value="${data.adresa}" required minlength="9" maxlength="30"><br>
            PIB: <input type="number" name="PIB" id="pib" value="${data.pib}" min="99999999" max="999999999" required><br>
            <button type="submit" name="">Izmeni</button>
        </form><fr>`
        
        return prikazPreduzeca
    }
    static IzmeniPreduzece(div:HTMLElement,pib){
        let preduzeca=[];
        fetch(URLovi.pronadjiPreduzece + pib).then(odg=>odg.json()).then(responce=>{
            console.log(responce)
            div.innerHTML=`<div>${RadSaPreduzecima.PreduzeceZaIzmenu(responce,pib)}</div>`
        })
    }
    static DodajPreduzece(div:HTMLElement){
        
        div.innerHTML=`<form action="${URLovi.dodaj}" method="post" id="formaDodaj">
        Ime: <input type="text" name="ime" id="ime" required minlength="2" maxlength="20"><br>
        Prezime: <input type="text" name="prezime" id="prezime" required minlength="2" maxlength="20"><br>
        Email: <input type="email" name="email" id="email" required minlength="10" maxlength="30"><br>
        Naziv preduzeca: <input type="text" name="naziv" id="naziv" required minlength="9" maxlength="30"><br>
        Adresa: <input type="text" name="adresa" id="adresa" required minlength="9" maxlength="30"><br>
        PIB: <input type="number" name="PIB" id="PIB" min="99999999" max="999999999" required><br>
        <button name="dugmeDodajPreduzece">Dodaj</button>
    </form>`
    }
   
}
const PrikaziPreduzcaHTML=()=>{
    RadSaPreduzecima.PrikaziPreduzeca(document.querySelector("#root") as HTMLElement);
}
const IzmeniPreduzeceHTML=(pib)=>{
    RadSaPreduzecima.IzmeniPreduzece(document.querySelector("#root") as HTMLElement,pib);
}
const DodajPreduzeceHTML=()=>{
    RadSaPreduzecima.DodajPreduzece(document.querySelector("#root") as HTMLElement)
}