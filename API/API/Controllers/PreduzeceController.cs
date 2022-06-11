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
             new Preduzece { ime = "Ivan", prezime = "Fazlic", email = "fakiivan@gamil.com", naziv = "random", adresa = "Niksicka", PIB = 323223421143 },
             new Preduzece { ime = "Ivan", prezime = "Faki", email = "fakiivan@gamil.com", naziv = "random", adresa = "Miroslava", PIB = 3232345345 },
             new Preduzece { ime = "Ivan", prezime = "Nesto", email = "fakiivan@gamil.com", naziv = "random", adresa = "Fakijeva 14", PIB = 323224235254 },
             new Preduzece { ime = "Milos", prezime = "Andric", email = "nesto@gamil.com", naziv = "random", adresa = "Neka 14", PIB = 115482185445 }
           };

    [HttpGet("vratiSvaPreduzeca")]
    public IActionResult SvaPreduzeca()
    {
        return Ok(preduzeca.OrderBy(Preduzece=>Preduzece.PIB).ThenBy(Preduzece=>Preduzece.naziv));
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

    }
    
}

