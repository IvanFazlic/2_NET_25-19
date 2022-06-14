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
    [Route("api/[controller]")]
    [ApiController]
    public class PreduzeceController : Controller
    {
        DateTime nesto = new DateTime(2018, 7, 24);
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
             new Faktura { id = 1 ,PIBkome = 111100000, PIBodKoga = 111100001, datumGenerisanja =  new DateTime(2022, 7, 24), datumPlacanja = new DateTime(2022, 7, 24), ukupnaCena = 300, tipFakture = "izlazna",naziv= "faktura" ,cenaPoJediniciMere= 100 ,jedinicaMere= "rsd",kolicina = 3}
           };
        [HttpPost("unosFakture")]
        public IActionResult NovaFakture([FromForm] int PIBkome, [FromForm] int PIBodKoga, [FromForm] DateTime datumPlacanja, [FromForm] decimal ukupnaCena, [FromForm] string tip, [FromForm] string naziv, [FromForm] decimal cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina)
        { string drugaFaktura = "";
            if (tip == "ulazna")
            {
                drugaFaktura = "izlazna";
            }
            else
            {
                drugaFaktura = "ulazna";
            }
            int id= fakture.OrderByDescending(k => k.id).First().id + 1;
            Faktura faktura2 = new Faktura();
            Faktura faktura= new Faktura();
            faktura.id = id;
            faktura.PIBkome = PIBkome;
            faktura.PIBodKoga = PIBodKoga;
            faktura.datumGenerisanja = DateTime.Now;
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
            faktura2.datumGenerisanja = DateTime.Now;
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
        [HttpPost("izmeniFakturu/{id}/{PIB}")]
        public IActionResult IzmeniFakturu([FromForm] int PIBkome, [FromForm] int PIBodKoga, [FromForm] DateTime datumPlacanja, [FromForm] decimal ukupnaCena, [FromForm] string tip, [FromForm] string naziv, [FromForm] decimal cenaPoJediniciMere, [FromForm] string jedinicaMere, [FromForm] int kolicina,int id,int PIB)
        {
            var objekat = fakture.FirstOrDefault(x => x.id == id && x.PIBkome == PIB);
            var objekat1 = fakture.FirstOrDefault(x => x.id == id && x.PIBodKoga == PIB);
            string drugaFaktura = "";
            if (objekat == null)
            {
                return BadRequest("Something when wrong");
            }
            if (objekat1 == null)
            {
                return BadRequest("Something when wrong");
            }
            if (tip == "ulazna")
            {
                drugaFaktura = "izlazna";
            }
            else
            {
                drugaFaktura = "ulazna";
            }
            objekat.PIBkome = PIBkome;
            objekat.PIBodKoga = PIBodKoga;
            objekat.datumGenerisanja = DateTime.Now;
            objekat.datumPlacanja = datumPlacanja;
            objekat.ukupnaCena = ukupnaCena;
            objekat.tipFakture = tip;
            objekat.naziv = naziv;
            objekat.cenaPoJediniciMere = cenaPoJediniciMere;
            objekat.jedinicaMere = jedinicaMere;
            objekat.kolicina = kolicina;

            objekat1.PIBkome = PIBodKoga;
            objekat1.PIBodKoga = PIBkome;
            objekat1.datumGenerisanja = DateTime.Now;
            objekat1.datumPlacanja = datumPlacanja;
            objekat1.ukupnaCena = ukupnaCena;
            objekat1.tipFakture = drugaFaktura;
            objekat1.naziv = naziv;
            objekat1.cenaPoJediniciMere = cenaPoJediniciMere;
            objekat1.jedinicaMere = jedinicaMere;
            objekat1.kolicina = kolicina;
            return Ok(objekat);
        }
        //bilans
        [HttpPost("bilans")]
        public IActionResult NekiBilans([FromForm] DateTime pocetak, [FromForm] DateTime kraj)
        {   
            if(fakture.Where(obj => obj.datumPlacanja >= pocetak && obj.datumPlacanja <= kraj)==null || fakture.Where(obj => obj.datumPlacanja >= pocetak && obj.datumPlacanja <= kraj).Any()==false)
            {
                return BadRequest();
            };
            return Ok(fakture.Where(obj => obj.datumPlacanja >= pocetak && obj.datumPlacanja <= kraj));
            
        }

        [HttpGet("pregledFakturaPoPreduzecu/{PIB}")]
        public IActionResult FakturePoPreduzecu(int PIB)
        {
            return Ok(fakture.Where(obj=>obj.PIBkome==PIB));
        }
        [HttpGet("vratiSvaPreduzeca")]
        public IActionResult SvaPreduzeca()
        {
            return Ok(preduzeca.OrderBy(Preduzece => Preduzece.PIB).ThenBy(Preduzece => Preduzece.naziv));
        }
        [HttpGet("vratiSveFakture")]
        public IActionResult SveFakture()
        {
            return Ok(fakture);
        }
        [HttpGet("{PIB}")]
        public IActionResult JednoPreduzece(double PIB)
        {
            var nekoPreduzece = preduzeca.FirstOrDefault((p) => p.PIB == PIB);
            if (nekoPreduzece == null)
            {
                return NotFound("Page not found");
            }
            return Ok(nekoPreduzece);
        }
        [HttpGet("provera/{PIB}")]
        public IActionResult ProveraPiv(double PIB)
        {
            var nekoPreduzece = preduzeca.Where((p) => p.PIB == PIB);
            if (nekoPreduzece == null)
            {
                return NotFound("Page not found");
            }
            return Ok(nekoPreduzece);
        }
        [HttpGet("filter/{PIB}/{Naziv}")]
        public IActionResult FilterPreduzece(double PIB,string Naziv)
        {
            var filterPreduzeca = preduzeca.Where(enterprise => enterprise.PIB.ToString().Contains(PIB.ToString()) && enterprise.naziv.Contains(Naziv));
            if (filterPreduzeca == null)
            {
                return NotFound("Page not found");
            }
            return Ok(filterPreduzeca.OrderBy(Preduzece => Preduzece.PIB).ThenBy(Preduzece => Preduzece.naziv));
        }
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
            preduzeca.Add(preduzece);
            return Ok(preduzece);
        }
        [HttpPost("izmeniPreduzece/{PARAMETAR}")]
        public IActionResult izmeniPreduzece([FromForm] string ime, [FromForm] string prezime, [FromForm] string email, [FromForm] string naziv, [FromForm] string adresa, [FromForm] double PIB, double PARAMETAR)
        {
            var obj = preduzeca.FirstOrDefault(x => x.PIB == PARAMETAR);
            if (obj == null)
            {
                return NotFound("Page not found");
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

