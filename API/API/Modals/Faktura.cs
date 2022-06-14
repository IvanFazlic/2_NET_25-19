using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace faktura.Models
{
    
    public class Faktura
    {
        public int id { get; set; }
        public int PIBkome { get; set; }
        public int PIBodKoga { get; set; }
        public DateTime datumGenerisanja { get; set; }
        public DateTime datumPlacanja { get; set; }
        public decimal ukupnaCena { get; set; }
        public string tipFakture { get; set; }
        public string naziv { get; set; }
        public decimal cenaPoJediniciMere { get; set; }
        public string jedinicaMere { get; set; }
        public int kolicina { get; set; }
    }
}
