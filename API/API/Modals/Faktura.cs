using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace faktura.Models
{
    
    public class Faktura
    {
        public int PIB { get; set; }
        public int PIB2 { get; set; }
        public string? datumGenerisanja { get; set; }
        public string? datumPlacanja { get; set; }
        public decimal ukupnaCena { get; set; }
        public decimal tipFakture { get; set; }
    }
}
