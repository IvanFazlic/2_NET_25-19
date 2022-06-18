using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mojePreduzece.Models;
using faktura.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace mojePreduzece.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class APIController : Controller
    {
        static List<Preduzece> preduzeca = new List<Preduzece>()
            {
             new Preduzece { ime = "Ivan", prezime = "Fazlic", email = "fakiivan@gamil.com", naziv = "random", adresa = "Niksicka", PIB = 111100000 },
             new Preduzece { ime = "Ivan", prezime = "Fazlic", email = "fakiivan@gamil.com", naziv = "random", adresa = "Niksicka", PIB = 111100001 },
             new Preduzece { ime = "Ivan", prezime = "Faki", email = "fakiivan@gamil.com", naziv = "random", adresa = "Miroslava", PIB = 111100002 },
             new Preduzece { ime = "Ivan", prezime = "Nesto", email = "fakiivan@gamil.com", naziv = "random", adresa = "Fakijeva 14", PIB = 111100003 },
             new Preduzece { ime = "Milos", prezime = "Andric", email = "nesto@gamil.com", naziv = "random", adresa = "Neka 14", PIB = 111100004 }
           };
        static List<Faktura> fakture = new List<Faktura>()
            {
             new Faktura { id = 1 ,PIBkome = 111100000, PIBodKoga = 111100001, datumGenerisanja =  new DateTime(2022, 7, 24), datumPlacanja = new DateTime(2022, 7, 24), ukupnaCena = 300, tipFakture = "izlazna",naziv= "faktura" ,cenaPoJediniciMere= 100 ,jedinicaMere= "rsd",kolicina = 3},
             new Faktura { id = 1 ,PIBkome = 111100001, PIBodKoga = 111100000, datumGenerisanja =  new DateTime(2022, 7, 24), datumPlacanja = new DateTime(2022, 7, 24), ukupnaCena = 300, tipFakture = "ulazna",naziv= "faktura" ,cenaPoJediniciMere= 100 ,jedinicaMere= "rsd",kolicina = 3}
           };
        //ready
        [HttpPost("unosFakture")]
        public IActionResult NovaFakture([FromForm] int PIBkome, [FromForm] int PIBodKoga, [FromForm] DateTime datumPlacanja, [FromForm] decimal ukupnaCena, [FromForm] string tip, [FromForm] string naziv, [FromForm] decimal cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina)
        {
            var odKoga = preduzeca.FirstOrDefault(obj => obj.PIB == PIBodKoga);
            var kome = preduzeca.FirstOrDefault(obj => obj.PIB == PIBkome);
            if (odKoga == null || kome == null || kome==odKoga)
            {
                return BadRequest("Neispravno pravljenje fakture");
            }
            string drugaFaktura = "";
            if (tip == "ulazna")
            {
                drugaFaktura = "izlazna";
            }
            else
            {
                drugaFaktura = "ulazna";
            }
            int id= fakture.OrderByDescending(k => k.id).First().id + 1;
            var trenutnoVreme = DateTime.Now;
            Faktura faktura= new Faktura();
            Faktura faktura2 = new Faktura();
            faktura.id = id;
            faktura.PIBkome = PIBkome;
            faktura.PIBodKoga = PIBodKoga;
            faktura.datumGenerisanja = trenutnoVreme;
            faktura.datumPlacanja = datumPlacanja;
            faktura.ukupnaCena = ukupnaCena;
            faktura.tipFakture = tip;
            faktura.naziv = naziv;
            faktura.cenaPoJediniciMere = cenaPoJediniciMere;
            faktura.jedinicaMere = jedinicaMere;
            faktura.kolicina = kolicina;
            faktura2.id = id;
            faktura2.PIBkome = PIBodKoga;
            faktura2.PIBodKoga = PIBkome;
            faktura2.datumGenerisanja = trenutnoVreme;
            faktura2.datumPlacanja = datumPlacanja;
            faktura2.ukupnaCena = ukupnaCena;
            faktura2.tipFakture = drugaFaktura;
            faktura2.naziv = naziv;
            faktura2.cenaPoJediniciMere = cenaPoJediniciMere;
            faktura2.jedinicaMere = jedinicaMere;
            faktura2.kolicina = kolicina;
            fakture.Add(faktura);
            fakture.Add(faktura2);
            return Ok(fakture);
        }
        //ready
        [HttpPost("izmeniFakturu/{id}")]
        public IActionResult IzmeniFakturu([FromForm] int PIBkome, [FromForm] int PIBodKoga, [FromForm] DateTime datumPlacanja, [FromForm] decimal ukupnaCena, [FromForm] string tip, [FromForm] string naziv, [FromForm] decimal cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina,int id)
        {
            var objekat = fakture.Where(x => x.id == id);
            string tipDrugeFakture = "";
            if (objekat.Any()==false)
            {
                return BadRequest("Ne postoji zeljena faktura");
            }
            if (tip == "ulazna")
            {
                tipDrugeFakture = "izlazna";
            }
            else
            {
                tipDrugeFakture = "ulazna";
            }

            var prvaFaktura = objekat.First();
            var drugaFaktura = objekat.Last();
            var PIBkomPreduzecu = preduzeca.FirstOrDefault(obj => obj.PIB == PIBkome);
            var PIBodKogPreduzeca= preduzeca.FirstOrDefault(obj => obj.PIB == PIBodKoga);
            if (PIBkomPreduzecu == null || PIBodKogPreduzeca == null || PIBkomPreduzecu == PIBodKogPreduzeca)
            {
                return BadRequest("Ne postoje preduzeca / PIB-ovi su isti");
            }
            prvaFaktura.PIBkome = PIBkome;
            prvaFaktura.PIBodKoga = PIBodKoga;
            prvaFaktura.datumGenerisanja = DateTime.Now;
            prvaFaktura.datumPlacanja = datumPlacanja;
            prvaFaktura.ukupnaCena = ukupnaCena;
            prvaFaktura.tipFakture = tip;
            prvaFaktura.naziv = naziv;
            prvaFaktura.cenaPoJediniciMere = cenaPoJediniciMere;
            prvaFaktura.jedinicaMere = jedinicaMere;
            prvaFaktura.kolicina = kolicina;

            drugaFaktura.PIBkome = PIBodKoga;
            drugaFaktura.PIBodKoga = PIBkome;
            drugaFaktura.datumGenerisanja = DateTime.Now;
            drugaFaktura.datumPlacanja = datumPlacanja;
            drugaFaktura.ukupnaCena = ukupnaCena;
            drugaFaktura.tipFakture = tipDrugeFakture;
            drugaFaktura.naziv = naziv;
            drugaFaktura.cenaPoJediniciMere = cenaPoJediniciMere;
            drugaFaktura.jedinicaMere = jedinicaMere;
            drugaFaktura.kolicina = kolicina;
            return Ok(fakture);
        }
        //ready
        [HttpPost("bilans/{PIBZaKoga}")]
        public IActionResult NekiBilans([FromForm] DateTime pocetak, [FromForm] DateTime kraj,double PIBZaKoga)
        {   
            if(fakture.Where(obj => obj.datumPlacanja >= pocetak && obj.datumPlacanja <= kraj)==null || fakture.Where(obj => obj.datumPlacanja >= pocetak && obj.datumPlacanja <= kraj).Any()==false)
            {
                return BadRequest("Nema nijedna faktura u datom periodu");
            };
            var preduzeceZaKojeJeBilans = preduzeca.FirstOrDefault(obj => obj.PIB == PIBZaKoga);
            var bilans = fakture.Where(obj => obj.datumPlacanja >= pocetak && obj.datumPlacanja <= kraj && obj.PIBkome == PIBZaKoga);
            var izlazne = bilans.Where(obj => obj.tipFakture == "izlazna");
            var ulazne = bilans.Where(obj => obj.tipFakture == "ulazna");
            var sumaIzlaznih = izlazne.Sum(obj => obj.ukupnaCena);
            var sumaUlaznih = ulazne.Sum(obj => obj.ukupnaCena);
            var suma = sumaIzlaznih - sumaUlaznih;
            return Ok(suma);
            
        }
        //ready
        [HttpGet("pregledFakturaPoPreduzecu/{PIB}")]
        public IActionResult FakturePoPreduzecu(int PIB)
        {
            var fakturePoPreduzecu = fakture.Where(obj => obj.PIBkome == PIB);
            if (fakturePoPreduzecu.Any() == false)
            {
                return BadRequest("Ne postoji faktura");
            }
            return Ok(fakturePoPreduzecu);
        }
        //ready
        [HttpGet("vratiSvaPreduzeca")]
        public IActionResult SvaPreduzeca()
        {
            var svaPreuduzeca = preduzeca.OrderBy(Preduzece => Preduzece.PIB).ThenBy(Preduzece => Preduzece.naziv);
            if (svaPreuduzeca.Any() == false)
            {
                return NotFound("Nema nijednog preduzeca");
            }
            return Ok(svaPreuduzeca);
        }
        //ready
        [HttpGet("vratiSveFakture")]
        public IActionResult SveFakture()
        {
            var sveFakture = fakture;
            if (sveFakture.Any() == false)
            {
                return BadRequest("Nema nijedna faktura");
            }
            return Ok(sveFakture);
        }
        //ready
        [HttpGet("pronadjiPreduzece/{PIB}")]
        public IActionResult JednoPreduzece(double PIB)
        {
            var nekoPreduzece = preduzeca.FirstOrDefault((p) => p.PIB == PIB);
            if (nekoPreduzece == null)
            {
                return NotFound("Nije pronadjeno preduzece");
            }
            return Ok(nekoPreduzece);
        }   
        //ready
        [HttpGet("filter/{PIB}/{Naziv}")]
        public IActionResult FilterPreduzece(double PIB,string Naziv)
        {
            var filterPIB = preduzeca.Where(enterprise => enterprise.PIB.ToString().Contains(PIB.ToString()));
            var filterNaziv = preduzeca.Where(preduzeca => preduzeca.naziv.Contains(Naziv));  
            var filterPreduzeca=preduzeca.Where(preduzeca=> preduzeca.PIB.ToString().Contains(PIB.ToString()) && preduzeca.naziv.Contains(Naziv));
            if (filterPIB == null && filterNaziv==null)
            {
                return NotFound("Greska");
            }
            if (filterPIB != null && filterNaziv == null)
            {
                return Ok(filterPIB);
            }
            if(filterPIB == null && filterNaziv != null)
            {
                return Ok(filterNaziv);
            }
            if(filterPreduzeca.Any()==false)
            {
                return NotFound("Nije pronadjeno nijedno preduzece");
            }
            return Ok(filterPreduzeca.OrderBy(Preduzece => Preduzece.PIB).ThenBy(Preduzece => Preduzece.naziv));
        }
        //ready
        [HttpPost("dodaj")]
        public IActionResult postovanje([FromForm] string ime, [FromForm] string prezime, [FromForm] string email, [FromForm] string naziv, [FromForm] string adresa, [FromForm] double PIB)
        {
            Preduzece preduzece = new Preduzece();
            preduzece.ime = ime;
            preduzece.prezime = prezime;
            preduzece.email = email;
            preduzece.naziv = naziv;
            preduzece.adresa = adresa;
            preduzece.PIB = PIB;
            if(preduzece == null)
            {
                return BadRequest();
            }
            if (preduzeca.FirstOrDefault(obj => obj.PIB == preduzece.PIB) != null)
            {
                return BadRequest("Vec postoji preduzece sa tim PIB-om");
            }
            else
            {
                preduzeca.Add(preduzece);
                return Ok(preduzece);
            }
        }
        //ready
        [HttpPost("izmeniPreduzece/{PARAMETAR}")]
        public IActionResult izmeniPreduzece([FromForm] string ime, [FromForm] string prezime, [FromForm] string email, [FromForm] string naziv, [FromForm] string adresa, [FromForm] double PIB, double PARAMETAR)
        {
            var obj = preduzeca.FirstOrDefault(x => x.PIB == PARAMETAR);
            if (obj == null)
            {
                return NotFound("Ne postoji preduzece sa tim PIB-om");
            }
            if (preduzeca.FirstOrDefault(ness => ness.PIB == PIB) != null && PARAMETAR!=PIB)
            {
                return BadRequest("Vec postoji preduzece sa tim PIB-om");
            }
            obj.ime = ime;
            obj.prezime = prezime;
            obj.email = email;
            obj.naziv = naziv;
            obj.adresa = adresa;
            obj.PIB = PIB;
            return Ok(obj);
            
        }

    }
    
}

