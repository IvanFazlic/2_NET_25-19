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
    "izmeniPreduzece":"http://localhost:5175/API/izmeniPreduzece/",
    "provera":"http://localhost:5175/API/provera/"
}
interface Faktura{
    id:number
    piBkome:number 
    piBodKoga:number 
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
                <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="PregledajFaktureHTML(${preduzece.pib})">Pregled faktura</h3>
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
            prikazPreduzeca+=`<form action="${URLovi.izmeniPreduzece + pib}" method="post" id="formaIzmeni">
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
            $('#formaIzmeni').submit((e)=>{
                e.preventDefault();
                let vrednostPIBa=(<HTMLInputElement>document.getElementById("pib")).value
                fetch(URLovi.provera + vrednostPIBa).then(resp=> resp.json()).then((data)=>{
                if(data!=""){
                    alert("Preduzece vec postoji / PIB se koristi")
                }else{
                    $.ajax({
                    url: URLovi.izmeniPreduzece + pib,
                    type: 'post',
                    data:$('#formaIzmeni').serialize(),
                    success:()=>{
                        alert("Izmenjeno preduzece")
                    }
                  });
                }
            }).catch(err=>console.log(err))
        }) 
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
        $('#formaDodaj').submit((e)=>{
            e.preventDefault();
            let vrednostPIBa=(<HTMLInputElement>document.getElementById("PIB")).value
            fetch(URLovi.provera + vrednostPIBa).then(resp=> resp.json()).then((data)=>{
            if(data!=""){
                alert("Preduzece vec postoji / PIB se koristi")
            }else{
                $.ajax({
                url: URLovi.dodaj,
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
    static PretraziPreduzeca(div:HTMLElement){
        {
            div.innerHTML=`<form action="${URLovi.filter}" method="post" id="pregragaPoNazivu">
            PIB: <input type="number" name="PIB" id="PIB" required><br>
            Naziv preduzeca: <input type="text" name="naziv" id="naziv" required><br>
            <button name="dugmeDodajPreduzece">Pretrazi</button>
            </form>`
            $('#pregragaPoNazivu').submit((e)=>{
                e.preventDefault();
                let brojPreduzeca:number=1
                let vrednostPIBa=(<HTMLInputElement>document.getElementById("PIB")).value
                let naziv = (<HTMLInputElement>document.getElementById("naziv")).value
                fetch(URLovi.filter + vrednostPIBa + "/" + naziv).then(resp=> resp.json()).then((preduzece)=>{
                if(preduzece==""){
                    alert("Nije pronadjeno preduzece")
                }
                if(preduzece.length>=1){
                    div.innerHTML=""
                    preduzece.forEach(element => {
                    div.innerHTML+=`<h2>Preduzece ${brojPreduzeca++}</h2><ul id="${element.pib}">
                    <li id="" name="">Ime: ${element.ime}</li>
                    <li id="" name="">Prezime: ${element.prezime}</li>
                    <li id="" name="">Email: ${element.email}</li>
                    <li id="" name="">Naziv preduzeca: ${element.naziv}</li>
                    <li id="" name="">Adresa preduzeca: ${element.adresa}</li>
                    <li id="" name="">PIB:${element.pib}</li></ul>
                    <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="IzmeniPreduzeceHTML(${element.pib})">Izmena preduzeca</h3>
                    <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="PregledajFaktureHTML(${element.pib})">Pregled faktura</h3>
                    <hr>`
                    });
                }
            }).catch(err=>console.log(err))
        })
    }}
}
class RadSaFakturama{
    static PregledajFakture(div:HTMLElement,pib:number){
        alert(pib)
    }
    static DetaljiFaktura(fakture:Array<Faktura>){
        let prikazFaktura:string=""
        let brojFaktura:number=1;
        fakture.forEach(faktura=>{
            prikazFaktura+=`<h2>Faktura ${brojFaktura++}</h2><ul id="${faktura.piBkome}">
                <li id="" name="">PIBkome: ${faktura.piBkome}</li>
                <li id="" name="">PIBodKoga: ${faktura.piBodKoga}</li>
                <li id="" name="">DatumGenerisanja fakture : ${faktura.datumGenerisanja}</li>
                <li id="" name="">DatumPlacanja fakture: ${faktura.datumPlacanja}</li>
                <li id="" name="">Ukupna cena: ${faktura.ukupnaCena}</li>
                <li id="" name="">Tip fakture: ${faktura.tipFakture}</li>
                <li id="" name="">Naziv fakture : ${faktura.naziv}</li>
                <li id="" name="">Cena po jedinici mere: ${faktura.cenaPoJediniciMere}</li>
                <li id="" name="">Jedinica mere: ${faktura.jedinicaMere}</li>
                <li id="" name="">Kolicina: ${faktura.kolicina}</li></ul>
                <h3 style="color:rgb(35, 211, 235);cursor: pointer;" onclick="IzmenifakturaHTML(${faktura.piBkome})">Izmeni fakturu</h3>
                <hr>`
        })
        return prikazFaktura
    }
    static PrikaziFakture(div:HTMLElement){
        let fakture=[];
        fetch(URLovi.vratiSveFakture).then(odg=>odg.json()).then(responce=>{
            console.log(responce)
            div.innerHTML=`<div>${RadSaFakturama.DetaljiFaktura(responce)}</div>`
        })
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
const PretraziPreduzecaHTML=()=>{
    RadSaPreduzecima.PretraziPreduzeca(document.querySelector("#root") as HTMLElement)
}
const PregledajFaktureHTML=(pib)=>{
    RadSaFakturama.PregledajFakture(document.querySelector("#root") as HTMLElement,pib)
}
const PrikaziFaktureHTML=()=>{
    RadSaFakturama.PrikaziFakture(document.querySelector("#root") as HTMLElement)
}