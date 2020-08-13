using AdPro_Reports.DAL;
using AdPro_Reports.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdPro_Reports.Controllers
{
    public class ReportsController : Controller
    {
        // GET: Reports
        public ActionResult ViewReports()
        {
            return View();
        }
        public ActionResult PartialView()
        {
            return View();
        }

        public ActionResult PrintReport()
        {
            return View();
        }

        public ActionResult BookingReports()
        {
            return View();
        }

        public ActionResult AgentCollection()
        {
            return View();
        }

        public ActionResult PublisherReports()
        {
            return View();
        }

        public ActionResult DefferedReports()
        {
            return View();
        }


        [HttpPost]
        public JsonResult GetUserDetails(string UserID, string RevenueCentreID)
        {
            List<ControlData> lst = new List<ControlData>();
            string xmlData = "select u.UserName,c.CentreName from TBL_USER as u , TBL_CENTRE as c where u.userid=" + UserID + " and c.CentreID=" + RevenueCentreID + "";
            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable dt = objReport.GeteBookingLoginData(xmlData).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        ControlData p = new ControlData();
                        p.UserName = Convert.ToString(dr[0]);
                        p.CentreName = Convert.ToString(dr[1]);
                        lst.Add(p);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(lst);
        }

        [HttpPost]
        public JsonResult GetReportList(string UserID)
        {
            List<ControlData> lst = new List<ControlData>();
            string xmlData = "<ereport><actionname>reportlist</actionname><reportsection>5</reportsection><userid>" + UserID + "</userid></ereport>";
            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable dt = objReport.GetReportData(xmlData).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        ControlData p = new ControlData();
                        p.value = Convert.ToString(dr[0]);
                        p.key = Convert.ToString(dr[1]);
                        lst.Add(p);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(lst);
        }

        [HttpPost]
        public JsonResult GetLanguageControlData()
        {
            List<ControlData> lst = new List<ControlData>();

            string xmlData = "<ebooking><actionname>language</actionname><isclassified>1</isclassified></ebooking>";

            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable dt = objReport.GetLanguageControlData(xmlData).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        ControlData p = new ControlData();
                        p.value = Convert.ToString(dr[0]);
                        p.key = Convert.ToString(dr[1]);
                        lst.Add(p);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(lst);
        }

        [HttpPost]
        public JsonResult GetAgencyControlData(string UserID, string AgencyName)
        {
            List<ControlData> lst = new List<ControlData>();
            string xmlData = "<ebooking><actionname>agency</actionname><agencyname>" + AgencyName + "</agencyname>"
                             + "<loguserid>" + UserID + "</loguserid>"
                             + "<isclassified>1</isclassified></ebooking>";

            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable dt = objReport.GeteBookingControlData(xmlData).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        ControlData p = new ControlData();
                        p.value = Convert.ToString(dr[0]);
                        p.key = Convert.ToString(dr[1]);
                        lst.Add(p);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(lst);
        }

        [HttpPost]
        public JsonResult GetAdtypeControlData(string UserID)
        {
            List<ControlData> lst = new List<ControlData>();
            string xmlData = "<ebooking><actionname>adtype</actionname>"
                             + "<packageidlist></packageidlist>"
                             + "<loguserid>" + UserID + "</loguserid>"
                             + "<isclassified>1</isclassified></ebooking>";

            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable dt = objReport.GeteBookingControlData(xmlData).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        ControlData p = new ControlData();
                        p.value = Convert.ToString(dr[0]);
                        p.key = Convert.ToString(dr[1]);
                        lst.Add(p);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(lst);
        }

        [HttpPost]
        public JsonResult GetPrintReportData(string BookingID)
        {
            List<PrintReceipt> objListPrintReceipt = new List<PrintReceipt>();
            PrintReceipt objPrintReceipt;

            string xmlData = "<ebooking><actionname>printreceipt</actionname><roid>" + BookingID + "</roid></ebooking>";
            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable objdt = objReport.GetPrintReceiptData(xmlData).Tables[0];
                if (objdt.Rows.Count > 0)
                {
                    foreach (DataRow dr in objdt.Rows)
                    {
                        objPrintReceipt = new PrintReceipt();
                        objPrintReceipt.OrderReceiptNo = Convert.ToString(dr["OrderReceiptNo"]);
                        objPrintReceipt.ClientName = Convert.ToString(dr["ClientName"]);
                        objPrintReceipt.Address = Convert.ToString(dr["Address"]);
                        objPrintReceipt.City = Convert.ToString(dr["City"]);
                        objPrintReceipt.Phone = Convert.ToString(dr["Phone"]);
                        objPrintReceipt.Zip = Convert.ToString(dr["Zip"]);
                        objPrintReceipt.BookedBy = Convert.ToString(dr["BookedBy"]);
                        objPrintReceipt.BookedBy = Convert.ToString(dr["BookedBy"]);
                        objPrintReceipt.REVISION_NUMBER = Convert.ToString(dr["REVISION_NUMBER"]);
                        objPrintReceipt.IsClassified = Convert.ToString(dr["isClassified"]);
                        objPrintReceipt.VATNumber = Convert.ToString(dr["VATNumber"]);
                        objPrintReceipt.Premia = Convert.ToString(dr["Premia"]);
                        objPrintReceipt.Size = Convert.ToString(dr["Size"]);
                        objPrintReceipt.Publication = Convert.ToString(dr["Publication"]);
                        objPrintReceipt.AdTypeName = Convert.ToString(dr["AdTypeName"]);
                        objPrintReceipt.Pubdate = Convert.ToString(dr["Pubdate"]);
                        objPrintReceipt.Cost = Convert.ToString(dr["Cost"]);
                        objPrintReceipt.VatAmount = Convert.ToString(dr["VatAmount"]);
                        objPrintReceipt.Total = Convert.ToString(dr["Total"]);
                        objPrintReceipt.Date = Convert.ToString(dr["Date"]);
                        objPrintReceipt.AgencyName = Convert.ToString(dr["AgencyName"]);
                        objPrintReceipt.AgencyCode = Convert.ToString(dr["AgencyCode"]);
                        objPrintReceipt.Category1 = Convert.ToString(dr["Category1"]);
                        objPrintReceipt.Category2 = Convert.ToString(dr["Category2"]);
                        objPrintReceipt.Material = Convert.ToString(dr["Material"]);
                        objListPrintReceipt.Add(objPrintReceipt);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return Json(objListPrintReceipt);
        }

        [HttpPost]
        public JsonResult GetBookedReportData(string FromDate, string ToDate, string UserID, string ReportID)
        {
            List<List<string>> listarray = new List<List<string>>();

            string xmlData = "<ereport><actionname>executereport</actionname><reportid>"+ReportID+"</reportid>"
                           + "<rdatefrom>" + FromDate + "</rdatefrom><rdateto>" + ToDate + "</rdateto>"
                           + "<userid>"+UserID+"</userid></ereport>";
            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable objdt = objReport.GetReportData(xmlData).Tables[0];
                List<String> columnlist = (from dc in objdt.Columns.Cast<DataColumn>()
                                           select dc.ColumnName).ToList();
                listarray.Add(columnlist);
                foreach (DataRow dr in objdt.Rows)
                    listarray.Add(dr.ItemArray.Select(o => o.ToString()).ToList());
            }
            catch (Exception ex)
            {
            }
            return Json(listarray);
        }

        [HttpPost]
        public JsonResult GetPublisherReportData(string FromDate, string ToDate, string UserID, string ReportID, string AgentID)
        {
            List<List<string>> listarray = new List<List<string>>();

            string xmlData = "<ereport><actionname>executereport</actionname><reportid>" + ReportID + "</reportid>"
                           + "<rdatefrom>" + FromDate + "</rdatefrom><rdateto>" + ToDate + "</rdateto>"
                           + "<agencyid>" + AgentID + "</agencyid><userid>" + UserID + "</userid></ereport>";

            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable objdt = objReport.GetReportData(xmlData).Tables[0];
                List<String> columnlist = (from dc in objdt.Columns.Cast<DataColumn>()
                                           select dc.ColumnName).ToList();
                listarray.Add(columnlist);
                foreach (DataRow dr in objdt.Rows)
                    listarray.Add(dr.ItemArray.Select(o => o.ToString()).ToList());
            }
            catch (Exception ex)
            {
            }
            return Json(listarray);
        }

        [HttpPost]
        public JsonResult GetDeferredReportData(string FromDate, string ToDate, string UserID, string ReportID, string LangID, string AgentID, string AdtypeID)
        {
            List<List<string>> listarray = new List<List<string>>();

            string xmlData = "<ereport><actionname>executereport</actionname><reportid>" + ReportID + "</reportid>"
                           + "<rdatefrom>" + FromDate + "</rdatefrom><rdateto>" + ToDate + "</rdateto>"
                           + "<languageid>" + LangID + "</languageid><adtypeid>" + AdtypeID + "</adtypeid>"
                           + "<agencyid>" + AgentID + "</agencyid><userid>" + UserID + "</userid></ereport>";

            ReportDAL objReport = new ReportDAL();

            try
            {
                DataTable objdt = objReport.GetReportData(xmlData).Tables[0];
                List<String> columnlist = (from dc in objdt.Columns.Cast<DataColumn>()
                                           select dc.ColumnName).ToList();
                listarray.Add(columnlist);
                foreach (DataRow dr in objdt.Rows)
                    listarray.Add(dr.ItemArray.Select(o => o.ToString()).ToList());
            }
            catch (Exception ex)
            {
            }
            return Json(listarray);
        }


        [ValidateInput(false)]
        public JsonResult Logout()
        {
            try
            {
                Session.Abandon();
                Session.Clear();
            }
            catch (Exception ex)
            {
            }
            return Json('1');
        }

    }
}