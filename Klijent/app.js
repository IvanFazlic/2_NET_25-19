var URLovi = {
    "unosFakture": "http://localhost:5175/API/unosFakture",
    "izmeniFakturu": "http://localhost:5175/API/izmeniFakturu/",
    "bilans": "http://localhost:5175/API/bilans/",
    "pregledFakturaPoPreduzecu": "http://localhost:5175/API/pregledFakturaPoPreduzecu/",
    "vratiSvaPreduzeca": "http://localhost:5175/API/vratiSvaPreduzeca",
    "vratiSveFakture": "http://localhost:5175/API/vratiSveFakture",
    "pronadjiPreduzece": "http://localhost:5175/API/pronadjiPreduzece/",
    "filter": "http://localhost:5175/API/filter/",
    "dodaj": "http://localhost:5175/API/dodaj",
    "izmeniPreduzece": "http://localhost:5175/API/izmeniPreduzece/",
    "provera": "http://localhost:5175/API/pronadjiFakturu/",
    "pronadjiFakturu": "http://localhost:5175/API/pronadjiFakturu/"
};
var RadSaPreduzecima = /** @class */ (function () {
    function RadSaPreduzecima() {
    }
    RadSaPreduzecima.DetaljiPreduzeca = function (preduzeca) {
        var prikazPreduzeca = "";
        var brojPreduzeca = 1;
        preduzeca.forEach(function (preduzece) {
            prikazPreduzeca += "<h2>Preduzece ".concat(brojPreduzeca++, "</h2><ul id=\"").concat(preduzece.pib, "\">\n                <li id=\"\" name=\"\">Ime: ").concat(preduzece.ime, "</li>\n                <li id=\"\" name=\"\">Prezime: ").concat(preduzece.prezime, "</li>\n                <li id=\"\" name=\"\">Email: ").concat(preduzece.email, "</li>\n                <li id=\"\" name=\"\">Naziv preduzeca: ").concat(preduzece.naziv, "</li>\n                <li id=\"\" name=\"\">Adresa preduzeca: ").concat(preduzece.adresa, "</li>\n                <li id=\"\" name=\"\">PIB:").concat(preduzece.pib, "</li></ul>\n                <h3 style=\"color:rgb(35, 211, 235);cursor: pointer;\" onclick=\"IzmeniPreduzeceHTML(").concat(preduzece.pib, ")\">Izmena preduzeca</h3>\n                <h3 style=\"color:rgb(35, 211, 235);cursor: pointer;\" onclick=\"PregledajFaktureHTML(").concat(preduzece.pib, ")\">Pregled faktura</h3>\n                <hr>");
        });
        return prikazPreduzeca;
    };
    RadSaPreduzecima.PrikaziPreduzeca = function (div) {
        var preduzeca = [];
        fetch(URLovi.vratiSvaPreduzeca).then(function (odg) { return odg.json(); }).then(function (responce) {
            console.log(responce);
            div.innerHTML = "<div>".concat(RadSaPreduzecima.DetaljiPreduzeca(responce), "</div>");
        });
    };
    RadSaPreduzecima.PreduzeceZaIzmenu = function (data, pib) {
        var prikazPreduzeca = "";
        var brojPreduzeca = 1;
        prikazPreduzeca += "<form action=\"".concat(URLovi.izmeniPreduzece + pib, "\" method=\"post\" id=\"formaIzmeni\">\n            Ime: <input type=\"text\" name=\"ime\" value=\"").concat(data.ime, "\" required minlength=\"2\" maxlength=\"20\"><br>\n            Prezime: <input type=\"text\" name=\"prezime\" value=\"").concat(data.prezime, "\" required minlength=\"2\" maxlength=\"20\"><br>\n            Email: <input type=\"email\" name=\"email\" value=\"").concat(data.email, "\" required minlength=\"10\" maxlength=\"30\"><br>\n            Naziv preduzeca: <input type=\"text\" name=\"naziv\" value=\"").concat(data.naziv, "\" required minlength=\"9\" maxlength=\"30\"><br>\n            Adresa: <input type=\"text\" name=\"adresa\" value=\"").concat(data.adresa, "\" required minlength=\"9\" maxlength=\"30\"><br>\n            PIB: <input type=\"number\" name=\"PIB\" id=\"pib\" value=\"").concat(data.pib, "\" min=\"99999999\" max=\"999999999\" required><br>\n            <button type=\"submit\" name=\"\">Izmeni</button>\n        </form><fr>");
        return prikazPreduzeca;
    };
    RadSaPreduzecima.IzmeniPreduzece = function (div, pib) {
        var preduzeca = [];
        fetch(URLovi.pronadjiPreduzece + pib).then(function (odg) { return odg.json(); }).then(function (responce) {
            console.log(responce);
            div.innerHTML = "<div>".concat(RadSaPreduzecima.PreduzeceZaIzmenu(responce, pib), "</div>");
            $('#formaIzmeni').submit(function (e) {
                e.preventDefault();
                var vrednostPIBa = document.getElementById("pib").value;
                fetch(URLovi.provera + vrednostPIBa).then(function (resp) { return resp.json(); }).then(function (data) {
                    if (data != "") {
                        alert("Preduzece vec postoji / PIB se koristi");
                    }
                    else {
                        $.ajax({
                            url: URLovi.izmeniPreduzece + pib,
                            type: 'post',
                            data: $('#formaIzmeni').serialize(),
                            success: function () {
                                alert("Izmenjeno preduzece");
                            }
                        });
                    }
                })["catch"](function (err) { return console.log(err); });
            });
        });
    };
    RadSaPreduzecima.DodajPreduzece = function (div) {
        div.innerHTML = "<form action=\"".concat(URLovi.dodaj, "\" method=\"post\" id=\"formaDodaj\">\n        Ime: <input type=\"text\" name=\"ime\" id=\"ime\" required minlength=\"2\" maxlength=\"20\"><br>\n        Prezime: <input type=\"text\" name=\"prezime\" id=\"prezime\" required minlength=\"2\" maxlength=\"20\"><br>\n        Email: <input type=\"email\" name=\"email\" id=\"email\" required minlength=\"10\" maxlength=\"30\"><br>\n        Naziv preduzeca: <input type=\"text\" name=\"naziv\" id=\"naziv\" required minlength=\"9\" maxlength=\"30\"><br>\n        Adresa: <input type=\"text\" name=\"adresa\" id=\"adresa\" required minlength=\"9\" maxlength=\"30\"><br>\n        PIB: <input type=\"number\" name=\"PIB\" id=\"PIB\" min=\"99999999\" max=\"999999999\" required><br>\n        <button name=\"dugmeDodajPreduzece\">Dodaj</button>\n        </form>");
        $('#formaDodaj').submit(function (e) {
            e.preventDefault();
            var vrednostPIBa = document.getElementById("PIB").value;
            fetch(URLovi.provera + vrednostPIBa).then(function (resp) { return resp.json(); }).then(function (data) {
                if (data != "") {
                    alert("Preduzece vec postoji / PIB se koristi");
                }
                else {
                    $.ajax({
                        url: URLovi.dodaj,
                        type: 'post',
                        data: $('#formaDodaj').serialize(),
                        success: function () {
                            alert("Dodato preduzece");
                        }
                    });
                }
            })["catch"](function (err) { return console.log(err); });
        });
    };
    RadSaPreduzecima.PretraziPreduzeca = function (div) {
        {
            div.innerHTML = "<form action=\"".concat(URLovi.filter, "\" method=\"post\" id=\"pregragaPoNazivu\">\n            PIB: <input type=\"number\" name=\"PIB\" id=\"PIB\" required><br>\n            Naziv preduzeca: <input type=\"text\" name=\"naziv\" id=\"naziv\" required><br>\n            <button name=\"dugmeDodajPreduzece\">Pretrazi</button>\n            </form>");
            $('#pregragaPoNazivu').submit(function (e) {
                e.preventDefault();
                var brojPreduzeca = 1;
                var vrednostPIBa = document.getElementById("PIB").value;
                var naziv = document.getElementById("naziv").value;
                fetch(URLovi.filter + vrednostPIBa + "/" + naziv).then(function (resp) { return resp.json(); }).then(function (preduzece) {
                    if (preduzece == "") {
                        alert("Nije pronadjeno preduzece");
                    }
                    if (preduzece.length >= 1) {
                        div.innerHTML = "";
                        preduzece.forEach(function (element) {
                            div.innerHTML += "<h2>Preduzece ".concat(brojPreduzeca++, "</h2><ul id=\"").concat(element.pib, "\">\n                    <li id=\"\" name=\"\">Ime: ").concat(element.ime, "</li>\n                    <li id=\"\" name=\"\">Prezime: ").concat(element.prezime, "</li>\n                    <li id=\"\" name=\"\">Email: ").concat(element.email, "</li>\n                    <li id=\"\" name=\"\">Naziv preduzeca: ").concat(element.naziv, "</li>\n                    <li id=\"\" name=\"\">Adresa preduzeca: ").concat(element.adresa, "</li>\n                    <li id=\"\" name=\"\">PIB:").concat(element.pib, "</li></ul>\n                    <h3 style=\"color:rgb(35, 211, 235);cursor: pointer;\" onclick=\"IzmeniPreduzeceHTML(").concat(element.pib, ")\">Izmena preduzeca</h3>\n                    <h3 style=\"color:rgb(35, 211, 235);cursor: pointer;\" onclick=\"PregledajFaktureHTML(").concat(element.pib, ")\">Pregled faktura</h3>\n                    <hr>");
                        });
                    }
                })["catch"](function (err) { return console.log(err); });
            });
        }
    };
    return RadSaPreduzecima;
}());
var RadSaFakturama = /** @class */ (function () {
    function RadSaFakturama() {
    }
    RadSaFakturama.PregledajFakture = function (div, pib) {
        alert(pib);
    };
    RadSaFakturama.DetaljiFaktura = function (fakture) {
        var prikazFaktura = "";
        var brojFaktura = 1;
        fakture.forEach(function (faktura) {
            prikazFaktura += "<h2>Faktura ".concat(brojFaktura++, "</h2><ul id=\"").concat(faktura.id, "\">\n                <li id=\"\" name=\"\">PIBkome: ").concat(faktura.piBkome, "</li>\n                <li id=\"\" name=\"\">PIBodKoga: ").concat(faktura.piBodKoga, "</li>\n                <li id=\"\" name=\"\">DatumGenerisanja fakture : ").concat(faktura.datumGenerisanja, "</li>\n                <li id=\"\" name=\"\">DatumPlacanja fakture: ").concat(faktura.datumPlacanja, "</li>\n                <li id=\"\" name=\"\">Ukupna cena: ").concat(faktura.ukupnaCena, "</li>\n                <li id=\"\" name=\"\">Tip fakture: ").concat(faktura.tipFakture, "</li>\n                <li id=\"\" name=\"\">Naziv fakture : ").concat(faktura.naziv, "</li>\n                <li id=\"\" name=\"\">Cena po jedinici mere: ").concat(faktura.cenaPoJediniciMere, "</li>\n                <li id=\"\" name=\"\">Jedinica mere: ").concat(faktura.jedinicaMere, "</li>\n                <li id=\"\" name=\"\">Kolicina: ").concat(faktura.kolicina, "</li></ul>\n                <h3 style=\"color:rgb(35, 211, 235);cursor: pointer;\" onclick=\"IzmenifakturaHTML(").concat(faktura.id, ",").concat(faktura.piBkome, ")\">Izmeni fakturu</h3>\n                <hr>");
        });
        return prikazFaktura;
    };
    RadSaFakturama.PrikaziFakture = function (div) {
        var fakture = [];
        fetch(URLovi.vratiSveFakture).then(function (odg) { return odg.json(); }).then(function (responce) {
            console.log(responce);
            div.innerHTML = "<div>".concat(RadSaFakturama.DetaljiFaktura(responce), "</div>");
        });
    };
    RadSaFakturama.DodajFakturu = function (div) {
        div.innerHTML = "<form action=\"".concat(URLovi.unosFakture, "\" method=\"post\" id=\"unosFakture\">\n        PIB kome: <input type=\"number\" name=\"PIBkome\" id=\"PIBkome\" min=\"99999999\" max=\"999999999\" required><br>\n        PIB od koga: <input type=\"number\" name=\"PIBodKoga\" id=\"PIBodKoga\" min=\"99999999\" max=\"999999999\" required><br>\n        Datum placanja fakture: <input type=\"date\" name=\"datumPlacanje\" id=\"datumPlacanje\" required><br>\n        Ukupna cena: <input type=\"number\" name=\"ukupnaCena\" id=\"ukupnaCena\" required><br>\n        Tip fakture: <select name=\"tip\" id=\"tip\"><option>ulazna</option><option>izlazna</option></select><br>\n        Naziv fakture : <input type=\"text\" name=\"naziv\" id=\"naziv\" required minlength=\"9\" maxlength=\"30\"><br>\n        Cena po jedinici mere: <input type=\"number\" name=\"cenaPoJediniciMere\" id=\"cenaPoJediniciMere\" required><br>\n        Jedinica mere: <select name=\"jedinicaMere\" id=\"jedinicaMere\"><option>RSD</option><option>EUR</option></select><br>\n        Kolicina: <input type=\"number\" name=\"kolicina\" id=\"kolicina\" min=\"1\" required><br>\n        <button type=\"submit\">Dodaj</button>\n        </form>");
        $('#unosFakture').submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: URLovi.unosFakture,
                type: 'post',
                data: $('#unosFakture').serialize(),
                success: function () {
                    alert("Dodata faktura");
                },
                error: function (err) {
                    alert("Greska kod unosenja fakture. Proverite da li su polja od koga i za koga odgovarajuca");
                }
            });
        });
    };
    RadSaFakturama.IzmenaDetaljaFakture = function (data, id, pib) {
        var prikazFaktura = "";
        prikazFaktura += "<form action=\"".concat(URLovi.izmeniFakturu + id + "/" + pib, "\" method=\"post\" id=\"izmenaFakture\">\n            PIB kome: <input type=\"number\" name=\"PIBkome\" id=\"PIBkome\" min=\"99999999\" max=\"999999999\" value=\"").concat(data.piBkome, "\" required><br>\n            PIB od koga: <input type=\"number\" name=\"PIBodKoga\" id=\"PIBodKoga\" min=\"99999999\" max=\"999999999\" value=\"").concat(data.piBodKoga, "\" required><br>\n            Datum placanja fakture: <input type=\"date\" name=\"datumPlacanja\" id=\"datumPlacanja\" value=\"").concat(data.datumPlacanja, "\" required><br>\n            Ukupna cena: <input type=\"number\" name=\"ukupnaCena\" id=\"ukupnaCena\" value=\"").concat(data.ukupnaCena, "\" required><br>\n            Tip fakture: <select name=\"tip\" id=\"tip\" value=\"").concat(data.tipFakture, "\"><option>ulazna</option><option>izlazna</option></select><br>\n            Naziv fakture : <input type=\"text\" name=\"naziv\" id=\"naziv\" required minlength=\"9\" maxlength=\"30\" value=\"").concat(data.naziv, "\"><br>\n            Cena po jedinici mere: <input type=\"number\" name=\"cenaPoJediniciMere\" id=\"cenaPoJediniciMere\" value=\"").concat(data.cenaPoJediniciMere, "\" required><br>\n            Jedinica mere: <select name=\"jedinicaMere\" id=\"jedinicaMere\" value=\"").concat(data.jedinicaMere, "\"><option>RSD</option><option>EUR</option></select><br>\n            Kolicina: <input type=\"number\" name=\"kolicina\" id=\"kolicina\" min=\"1\" value=\"").concat(data.kolicina, "\" required><br>\n            <button type=\"submit\">Dodaj</button>\n            </form>");
        return prikazFaktura;
    };
    RadSaFakturama.Izmenifaktura = function (div, id, pib) {
        var fakture = [];
        fetch(URLovi.pronadjiFakturu + id + "/" + pib).then(function (odg) { return odg.json(); }).then(function (responce) {
            console.log(responce);
            div.innerHTML = "<div>".concat(RadSaFakturama.IzmenaDetaljaFakture(responce, id, pib), "</div>");
            $('#izmenaFakture').submit(function (e) {
                e.preventDefault();
                $.ajax({
                    url: URLovi.izmeniFakturu + id + "/" + pib,
                    type: 'post',
                    data: $('#izmenaFakture').serialize(),
                    success: function () {
                        alert("Izmenjena faktura");
                    },
                    error: function () {
                        alert("Faktura nije izmenjena. Greska.");
                    }
                });
            });
        });
    };
    return RadSaFakturama;
}());
var PrikaziPreduzcaHTML = function () {
    RadSaPreduzecima.PrikaziPreduzeca(document.querySelector("#root"));
};
var IzmeniPreduzeceHTML = function (pib) {
    RadSaPreduzecima.IzmeniPreduzece(document.querySelector("#root"), pib);
};
var DodajPreduzeceHTML = function () {
    RadSaPreduzecima.DodajPreduzece(document.querySelector("#root"));
};
var PretraziPreduzecaHTML = function () {
    RadSaPreduzecima.PretraziPreduzeca(document.querySelector("#root"));
};
var PregledajFaktureHTML = function (pib) {
    RadSaFakturama.PregledajFakture(document.querySelector("#root"), pib);
};
var PrikaziFaktureHTML = function () {
    RadSaFakturama.PrikaziFakture(document.querySelector("#root"));
};
var DodajFakturuHTML = function () {
    RadSaFakturama.DodajFakturu(document.querySelector("#root"));
};
var IzmenifakturaHTML = function (id, pib) {
    RadSaFakturama.Izmenifaktura(document.querySelector("#root"), id, pib);
};
