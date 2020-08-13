using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdPro_Reports.Models
{
    public class PrintReceipt
    {
        public string OrderReceiptNo { get; set; }
        public string ClientName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Zip { get; set; }
        public string BookedBy { get; set; }
        public string REVISION_NUMBER { get; set; }
        public string IsClassified { get; set; }
        public string VATNumber { get; set; }
        public string Premia { get; set; }
        public string Size { get; set; }
        public string Publication { get; set; }
        public string AdTypeName { get; set; }
        public string Pubdate { get; set; }
        public string Cost { get; set; }
        public string VatAmount { get; set; }
        public string Total { get; set; }
        public string Date { get; set; }
        public string AgencyName { get; set; }
        public string AgencyCode { get; set; }
        public string Category1 { get; set; }
        public string Category2 { get; set; }
        public string Material { get; set; }
    }
}