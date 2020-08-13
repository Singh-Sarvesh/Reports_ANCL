using DBInterface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AdPro_Reports.DAL
{
    public class ReportDAL
    {
        public DataSet GeteBookingLoginData(string xmlData)
        {
            using (var db = new DBManager())
            {
                db.Open();
                DataSet ds = db.ExecuteDataSet(CommandType.Text, xmlData);
                return ds;
            }
        }

        public DataSet GetReportData(string xmlParameter)
        {
            using (DBManager db = new DBManager())
            {
                db.Open();
                db.CreateParameters(2);
                db.AddParameters(0, "@XMLBody", xmlParameter);
                db.AddParameters(1, "@ErrorMessage", "");
                return db.ExecuteDataSet(CommandType.StoredProcedure, "[EBK_SP_WebReportInfo]");
            }
        }

        public DataSet GetLanguageControlData(string xmlData)
        {
            DataSet ds = new DataSet();
            try
            {
                using (var db = new DBManager())
                {
                    db.Open();
                    db.CreateParameters(1);
                    db.AddParameters(0, "@XMLBody", xmlData);
                    ds = db.ExecuteDataSet(CommandType.StoredProcedure, "EBK_SP_OrderScreenFilters");
                    return ds;
                }
            }
            catch (Exception ex)
            {
            }
            return ds;
        }

        public DataSet GeteBookingControlData(string xmlData)
        {
            DataSet ds = new DataSet();
            try
            {
                using (var db = new DBManager())
                {
                    db.Open();
                    db.CreateParameters(1);
                    db.AddParameters(0, "@XMLBody", xmlData);
                    ds = db.ExecuteDataSet(CommandType.StoredProcedure, "EBK_SP_eBookingFilters");
                }
            }
            catch (Exception ex)
            {

            }
            return ds;
        }

        public DataSet GetPrintReceiptData(string xmlData)
        {
            DataSet ds = new DataSet();
            try
            {
                using (var db = new DBManager())
                {
                    db.Open();
                    db.CreateParameters(1);
                    db.AddParameters(0, "@XMLBody", xmlData);
                    ds = db.ExecuteDataSet(CommandType.StoredProcedure, "EBK_SP_eBookingActions");
                }
            }
            catch (Exception ex)
            {
            }
            return ds;
        }

    }
}