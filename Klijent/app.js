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
    "provera": "http://localhost:5175/API/provera/"
};
var RadSaPreduzecima = /** @class */ (function () {
    function RadSaPreduzecima() {
    }
    RadSaPreduzecima.DetaljiPreduzeca = function (preduzeca) {
        var prikazPreduzeca = "";
        var brojPreduzeca = 1;
        preduzeca.forEach(function (preduzece) {
            prikazPreduzeca += "<h2>Preduzece ".concat(brojPreduzeca++, "</h2><ul id=\"").concat(preduzece.pib, "\">\n                <li id=\"\" name=\"\">Ime: ").concat(preduzece.ime, "</li>\n                <li id=\"\" name=\"\">Prezime: ").concat(preduzece.prezime, "</li>\n                <li id=\"\" name=\"\">Email: ").concat(preduzece.email, "</li>\n                <li id=\"\" name=\"\">Naziv preduzeca: ").concat(preduzece.naziv, "</li>\n                <li id=\"\" name=\"\">Adresa preduzeca: ").concat(preduzece.adresa, "</li>\n                <li id=\"\" name=\"\">PIB:").concat(preduzece.pib, "</li></ul>\n                <h3 style=\"color:rgb(35, 211, 235);cursor: pointer;\" onclick=\"IzmeniPreduzeceHTML(").concat(preduzece.pib, ")\">Izmena preduzeca</h3>\n                <hr>");
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
    return RadSaPreduzecima;
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
