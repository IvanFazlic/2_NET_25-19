using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mojePreduzece.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace mojaKnjizara.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreduzeceController : Controller
    {
        static List<Preduzece> preduzeca = new List<Preduzece>()
            {
             new Preduzece { ime = "Ivan", prezime = "Fazlic", email = "fakiivan@gamil.com", naziv = "random", adresa = "Niksicka", PIB = 111100000 },
             new Preduzece { ime = "Ivan", prezime = "Fazlic", email = "fakiivan@gamil.com", naziv = "random", adresa = "Niksicka", PIB = 111100001 },
             new Preduzece { ime = "Ivan", prezime = "Faki", email = "fakiivan@gamil.com", naziv = "random", adresa = "Miroslava", PIB = 111100002 },
             new Preduzece { ime = "Ivan", prezime = "Nesto", email = "fakiivan@gamil.com", naziv = "random", adresa = "Fakijeva 14", PIB = 111100003 },
             new Preduzece { ime = "Milos", prezime = "Andric", email = "nesto@gamil.com", naziv = "random", adresa = "Neka 14", PIB = 111100004 }
           };

        [HttpGet("vratiSvaPreduzeca")]
        public IActionResult SvaPreduzeca()
        {
            return Ok(preduzeca.OrderBy(Preduzece => Preduzece.PIB).ThenBy(Preduzece => Preduzece.naziv));
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

