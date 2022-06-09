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
        // Kreiranje podataka
        // Kasnije ovi podaci se preuzimaju iz neke baze
        Preduzece[] preduzece = new Preduzece[]
            {
             new Preduzece { ime = "Ivan", prezime = "Fazlic", email = "fakiivan@gamil.com", naziv = "random", adresa = "Niksicka", PIB = "323221154" },
             new Preduzece { ime = "Ivan", prezime = "Faki", email = "fakiivan@gamil.com", naziv = "random", adresa = "Miroslava", PIB = "323221154" },
             new Preduzece { ime = "Ivan", prezime = "Nesto", email = "fakiivan@gamil.com", naziv = "random", adresa = "Fakijeva 14", PIB = "323221154" }
           };
    [HttpGet]
    public IEnumerable<Preduzece> SvaPreduzeca()
    {
        return preduzece;
    }
    [HttpGet("{PIB}")]
    public IActionResult JednaKnjiga(string PIB)
    {
        var nekoPreduzece = preduzece.FirstOrDefault((p) => p.PIB == PIB);
        if (nekoPreduzece == null)
        {
            return NotFound();
        }
        return Ok(nekoPreduzece);
    }
  }
}

