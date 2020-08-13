var str = 0;
var SectionId = 0;
var UserId = 0;
var qStr;
var totalamt = 0;
var defagencyidvalue = -1;
var pubagencyidvalue = -1;

$(document).ready(function () {
    qStr = window.location.href.split('#')[0];
    if (qStr.split('?')[1].split('=')[0] == "id") {
        LoginDetail();
        ReportTabInfo();
        BindLanguageControl();
        AutoFillAgencyList(appRoot);
        BindAdtypeControl();

        $("#pubagencyid").focusout(function () {
            if (pubagencyidvalue == "-1") {
                $("#pubagencyid").val('');
            }
        });

        $("#defagencyid").focusout(function () {
            if (defagencyidvalue == "-1") {
                $("#defagencyid").val('');
            }
        });
    }
});

function LoginDetail() {
    qStr = window.location.href.split('#')[0];
    if (qStr.indexOf("?id=") == -1 || qStr.indexOf("&cid=") == -1) {
        alert("You have logout. Please login again.");
        return false;
    }
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    centerid = qStr.split('&')[1].split('=')[1];
    var url = appRoot + "Reports/GetUserDetails";
    var param = {};
    param.UserId = userid;
    param.RevenueCentreID = centerid;
    var result = getresult(url, param);
    if (result[0].UserName == "" || result[0].UserName == null || result[0].CentreName == "" || result[0].CentreName == null) {
        alert("You have logout. Please login again.");
        return false;
    }
    var str = result[0].UserName.charAt(0).toUpperCase() + result[0].UserName.substring(1).toLowerCase() + " &nbsp;  | &nbsp; " + result[0].CentreName.charAt(0).toUpperCase() + result[0].CentreName.substring(1).toLowerCase() + "  &nbsp; | &nbsp;" + " <span onclick='UserLogOut()' style='cursor:pointer;'>Close</span>";
    $(".user-detail").html(str);
    var cvalue = result[0].UserName.charAt(0).toUpperCase() + result[0].UserName.substring(1).toLowerCase();
    setCookie('LoginUser', cvalue, 365);
    setCookie('LoginUserID', userid, 365);
}

function ReportTabInfo() {
    qStr = window.location.href.split('#')[0];
    if (qStr.indexOf("?id=") == -1) {
        alert("You have logout. Please login again.");
        return false;
    }
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Reports/GetReportList";
    var param = {};
    param.UserID = userid;
    var result = getresult(url, param);
    var ul = $('<nav id="navt" style="border-bottom: 0px solid #dee2e6;display:grid" class="nav nav-tabs"></nav>')
    for (var i = 0; i < result.length; i++) {
        ul.append('<a class="nav-item nav-link"  id=' + result[i].value + ' value=' + result[i].key + ' onclick="SelectedTabValue(this)">' + result[i].key + '</a>');
    }

    $('#tab').append(ul);
    $("#navt a:eq(0)").click();
}

function BindLanguageControl() {
    $("#ddllanguage").empty();
    qStr = window.location.href.split('#')[0];
    if (qStr.indexOf("?id=") == -1) {
        alert("You have logout. Please login again.");
        return false;
    }
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Reports/GetLanguageControlData";
    var param = {};
    param.UserID = userid;
    var result = getresult(url, param);
    for (var i = 0; i < result.length; i++) {
        $("#ddllanguage").append(new Option(result[i].key, result[i].value));
    }
}

function AutoFillAgencyList(appRoot) {
    $("#pubagencyid").autocomplete({
        source: function (request, response) {
            qStr = window.location.href.split('#')[0];
            userid = qStr.split('?')[1].split('=')[1].split('&')[0];
            var parametername = $("#pubagencyid").attr("parameter");
            var paramValue = $("#pubagencyid").val();
            if (paramValue == null)
                paramValue = 0;
            var url = appRoot + "Reports/GetAgencyControlData";
            var param = {};
            param.UserID = userid;
            param.AgencyName = paramValue.replace('&', '&amp;');
            var result = getresult(url, param);
            response($.map(result, function (item, aa) {
                return {
                    value: item.key,
                    key: item.value,
                };
            }));
            $("ul.ui-menu").height('auto');
        },
        minLength: 1,
        autoFocus: true,
        select: function (event, ui) {
            $("#pubagencyid").val(ui.item.value);
            pubagencyidvalue = ui.item.key;
        },
    }).keyup(function (e) { if (e.keyCode !== 13 && e.keyCode !== 9 && !e.ctrlKey && e.keyCode !== 27) pubagencyidvalue = -1; });
    $('#pubagencyid').click(function () {
        $(this).select();
    });
    $("#pubagencyid").change(function () { if ($(this).val() === '') if (this.id === 'pubagencyid') pubagencyidvalue = -1; });


    $("#defagencyid").autocomplete({
        source: function (request, response) {
            qStr = window.location.href.split('#')[0];
            userid = qStr.split('?')[1].split('=')[1].split('&')[0];
            var parametername = $("#defagencyid").attr("parameter");
            var paramValue = $("#defagencyid").val();
            if (paramValue == null)
                paramValue = 0;
            var url = appRoot + "Reports/GetAgencyControlData";
            var param = {};
            param.UserID = userid;
            param.AgencyName = paramValue.replace('&', '&amp;');
            var result = getresult(url, param);
            response($.map(result, function (item, aa) {
                return {
                    value: item.key,
                    key: item.value,
                };
            }));
            $("ul.ui-menu").height('auto');
        },
        minLength: 1,
        autoFocus: true,
        select: function (event, ui) {
            $("#defagencyid").val(ui.item.value);
            defagencyidvalue = ui.item.key;
        },
    }).keyup(function (e) { if (e.keyCode !== 13 && e.keyCode !== 9 && !e.ctrlKey && e.keyCode !== 27) defagencyidvalue = -1; });
    $('#defagencyid').click(function () {
        $(this).select();
    });
    $("#defagencyid").change(function () { if ($(this).val() === '') if (this.id === 'defagencyid') defagencyidvalue = -1; });

}

function BindAdtypeControl() {
    $("#ddladtype").empty();
    qStr = window.location.href.split('#')[0];
    if (qStr.indexOf("?id=") == -1) {
        alert("You have logout. Please login again.");
        return false;
    }
    userid = qStr.split('?')[1].split('=')[1].split('&')[0];
    var url = appRoot + "Reports/GetAdtypeControlData";
    var param = {};
    param.UserID = userid;
    var result = getresult(url, param);
    for (var i = 0; i < result.length; i++) {
        $("#ddladtype").append(new Option(result[i].key, result[i].value));
    }
}

function SelectedFirstTabValue(SectionId) {
    $("#navt a").removeClass('active').css('font-weight', '');
    $("#navt a:eq(0)").addClass('active').css('font-weight', 'bolder');
}

function SelectedTabValue(th) {
    $("#navt a").removeClass('active').css('font-weight', '');
    $(th).addClass('active').css('font-weight', 'bolder');
    var SectionId = $(th).attr('id');
    var SectionName = $(th)[0].text;
    $("#spnheader").text(SectionName);
    setCookie('ReportName', SectionName, 365);
    $('#txtbookingid').val('');
    setCookie('ReportID', SectionId, 365);
    if (SectionId == 92) {
        $("#bookingiddiv").show();
        $("#datediv").hide();
        $("#totaldiv").hide();
        $("#agentdiv").hide();
        $("#publisherdiv").hide();
        $("#deferreddiv").hide();
    }
    else if (SectionId == 98) {
        $("#totaldiv").show();
        $("#bookingiddiv").hide();
        $("#datediv").hide();
        $("#agentdiv").hide();
        $("#publisherdiv").hide();
        $("#deferreddiv").hide();
    }
    else if (SectionId == 99) {
        $("#agentdiv").show();
        $("#bookingiddiv").hide();
        $("#datediv").hide();
        $("#totaldiv").hide();
        $("#publisherdiv").hide();
        $("#deferreddiv").hide();
    }
    else if (SectionId == 101) {
        $("#publisherdiv").show();
        $("#bookingiddiv").hide();
        $("#datediv").hide();
        $("#totaldiv").hide();
        $("#agentdiv").hide();
        $("#deferreddiv").hide();

    }
    else if (SectionId == 102) {
        $("#deferreddiv").show();
        $("#bookingiddiv").hide();
        $("#datediv").hide();
        $("#totaldiv").hide();
        $("#agentdiv").hide();
        $("#publisherdiv").hide();
    }
    else {
        $("#datediv").show();
        $("#totaldiv").hide();
        $("#bookingiddiv").hide();
        $("#agentdiv").hide();
        $("#publisherdiv").hide();
        $("#deferreddiv").hide();
    }

    DatePicker(SectionId);
}

function DatePicker(SectionId) {
    if (SectionId == 98) {
        $('#txttotalfromdate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
        }).datepicker("setDate", new Date());;
        $('#txttotaltodate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", new Date());
    }
    else if (SectionId == 99) {
        $('#txtagentfromdate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
        }).datepicker("setDate", new Date());;
        $('#txtagenttodate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", new Date());
    }
    else if (SectionId == 101) {
        $('#txtpubfromdate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
        }).datepicker("setDate", new Date());;
        $('#txtpubtodate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", new Date());
    }
    else if (SectionId == 102) {
        $('#txtdeffromdate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
        }).datepicker("setDate", new Date());;
        $('#txtdeftodate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", new Date());
    }
    else {
        $('#txtfromdate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
        }).datepicker("setDate", new Date());;
        $('#txttodate').datepicker({
            numberOfMonths: 1,
            inline: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", new Date());
    }
}

function PrintReportWindow() {
    var bookingid = $("#txtbookingid").val();
    if (bookingid == null || bookingid == '') {
        alert('Please enter BookingID!');
        $("#txtbookingid").focus();
        return false;
    }
    else if (bookingid != '' && (isNaN(parseInt(bookingid))) || (bookingid.toString().length > 6 && bookingid.toString().length < 10)) {
        alert('Invalid BookingID!');
        return false;
    }
    else if (bookingid.toString().length >= 1 && bookingid.toString().length <= 7) {
        var n = serverDate.getFullYear() - 1000;
        bookingid = parseInt(n) * 1000000 + parseInt(bookingid);
        $("#txtbookingid").val(bookingid);
    }
    var res = ValidatePrintReport(bookingid);
    if (res == 0) {
        window.open(appRoot + "Reports/PrintReport?ReceiptID=" + bookingid);
    }
    else {
        alert("Invalid BookingID");
        return false;
    }
    return false;
}

function ValidatePrintReport(bookingid) {
    var res = 0;
    var url = appRoot + "Reports/GetPrintReportData";
    var param = {};
    param.BookingID = bookingid;
    var result = getresult(url, param);
    if (result.length == 0) {
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}

function CommonReportData() {
    var fromdate = $("#txtfromdate").val();
    var todate = $("#txttodate").val();

    //var parts = fromdate.split('/');
    //var datefrom = Number(parts[2] + parts[1] + parts[0]);
    //parts1 = todate.split('/');
    //var dateto = Number(parts1[2] + parts1[1] + parts1[0]);
    //if (datefrom > dateto) {
    //    alert("From Date can't be greater than To Date!");
    //    return false;
    //}

    window.open(appRoot + "Reports/BookingReports?FromDate=" + fromdate + "&ToDate=" + todate);
    return false;
}

function AgentCollectionReportData() {
    var fromdate = $("#txttotalfromdate").val();
    var todate = $("#txttotaltodate").val();

    //var parts = fromdate.split('/');
    //var datefrom = Number(parts[2] + parts[1] + parts[0]);
    //parts1 = todate.split('/');
    //var dateto = Number(parts1[2] + parts1[1] + parts1[0]);
    //if (datefrom > dateto) {
    //    alert("From Date can't be greater than To Date!");
    //    return false;
    //}

    window.open(appRoot + "Reports/AgentCollection?FromDate=" + fromdate + "&ToDate=" + todate);
    return false;
}

function AgentCommReportData() {
    var fromdate = $("#txtagentfromdate").val();
    var todate = $("#txtagenttodate").val();

    //var parts = fromdate.split('/');
    //var datefrom = Number(parts[2] + parts[1] + parts[0]);
    //parts1 = todate.split('/');
    //var dateto = Number(parts1[2] + parts1[1] + parts1[0]);
    //if (datefrom > dateto) {
    //    alert("From Date can't be greater than To Date!");
    //    return false;
    //}

    window.open(appRoot + "Reports/BookingReports?FromDate=" + fromdate + "&ToDate=" + todate);
    return false;
}

function PublisherReportData() {
    var fromdate = $("#txtpubfromdate").val();
    var todate = $("#txtpubtodate").val();

    //var parts = fromdate.split('/');
    //var datefrom = Number(parts[2] + parts[1] + parts[0]);
    //parts1 = todate.split('/');
    //var dateto = Number(parts1[2] + parts1[1] + parts1[0]);
    //if (datefrom > dateto) {
    //    alert("From Date can't be greater than To Date!");
    //    return false;
    //}

    var agent = pubagencyidvalue;
    setCookie('PubAgent', agent, 365);

    window.open(appRoot + "Reports/PublisherReports?FromDate=" + fromdate + "&ToDate=" + todate);
    return false;
}

function DefferedReportData() {
    var fromdate = $("#txtdeffromdate").val();
    var todate = $("#txtdeftodate").val();

    //var parts = fromdate.split('/');
    //var datefrom = Number(parts[2] + parts[1] + parts[0]);
    //parts1 = todate.split('/');
    //var dateto = Number(parts1[2] + parts1[1] + parts1[0]);
    //if (datefrom > dateto) {
    //    alert("From Date can't be greater than To Date!");
    //    return false;
    //}

    var lang = $("#ddllanguage").val();
    var agent = defagencyidvalue;
    var adtype = $("#ddladtype").val();
    var adtypename = $("#ddladtype option:selected").text();
    setCookie('Language', lang, 365);
    setCookie('DefAgent', agent, 365);
    setCookie('Adtype', adtype, 365);
    setCookie('AdtypeName', adtypename, 365);

    window.open(appRoot + "Reports/DefferedReports?FromDate=" + fromdate + "&ToDate=" + todate);
    return false;
}



































































//function iReportDetails(SectionId) {
//    $('#ReportsList').empty();
//    $.ajax({
//        type: "POST",
//        url: BasePath + "WebReports/CGetReportDetails",
//        data: { TabId: SectionId },
//        dataType: "json",
//        success: succecced,
//        error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//        }
//    });

//}

//function succecced(response) {
//    if (response != null) {
//        var ListTable = $('<table  id="ReportsList" style = "Width:270px; background-color:#385723;border-width: 0px;margin-top:20px;border-collapse:separate; border-spacing:0 15px; " />');


//        //var select = $('<select id="ReportsList" size="8" style = "Width:270px; height:345px; margin:7px; background-color: #2e507a;border-width: 0px;" />')
//        for (var i = 0; i < response.vReportDetails.length; i++) {
//            //select.append('<option style="color:#e4ffd9" value="' + response.vReportDetails[i].ReportId + '">' + response.vReportDetails[i].ReportHeader + '</option>');
//            ListTable.append('<tr class="table-tr" style="cursor:pointer"><td class="hr" value=' + response.vReportDetails[i].ReportId + '>' + response.vReportDetails[i].ReportHeader + '</td></tr>');

//        }

//        $('#tdrelist').append(ListTable);
//        //$('#tdrelist').append(select);

//        ////var values = 85;
//        var values = $("#ReportsList td:first").attr('value');

//        var Reporttext = $("#ReportsList td:first").text();
//        lSelectedListValue(values, Reporttext);
//        $("#ReportsList td:first").addClass('active1');



//    }
//    else {

//        alert('Record Not Found');
//    }


//}

//function lSelectedListValue(values, Reporttext) {
//    //if (sessionStorage.getItem("SectionId") == null) {
//    //    var SectionId = sessionStorage.getItem("Default");
//    //    //alert(SectionId);
//    //}
//    //else {
//    //    var SectionId = sessionStorage.getItem("SectionId");
//    //    //alert(SectionId);
//    //}
//    $('#lblheader').html(Reporttext);
//    webReportControlbind(values, SectionId);

//}

//$(document).on("click", ".nav-item", function () {
//    $('#tdrelist').empty();
//    $('#tdc').empty();

//    $('.nav-item').removeClass('active').css('color', '#e4ffd9');


//    $(this).addClass("active").css('color', 'black');

//    SectionId = $(this).attr('value');

//    iReportDetails(SectionId);
//});

//$(document).on("click", ".hr", function () {
//    var values = $(this).attr('value');
//    var Reporttext = $(this).text()
//    $('#tdc').empty();
//    $('.hr').removeClass('active1')
//    $(this).addClass('active1');
//    $('#lblheader').html(Reporttext);
//    webReportControlbind(values, SectionId);
//});

//function webReportControlbind(values, SectionId) {
//    $('#tdc').empty();
//    $.ajax({
//        async: false,
//        type: "POST",
//        url: BasePath + "WebReports/CControlDetails",
//        data: { ReportId: values, SectionId: SectionId },
//        dataType: "json",
//        success: Controlsuccecced,
//        error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//        }
//    });

//}
//function Controlsuccecced(response) {
//    str = 0;

//    $.each(response.vControlDetails, function (index, value) {
//        str += Number(value.DivTop);
//        if (value.Controltypename == 'date') {


//            if (value.ChildControl == value.Controlname) {
//                FromDate(value.LabelName, value.Divnum, value.Controlname, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft);
//            }
//            else {

//                Todate(value.LabelName, value.Divnum, value.Controlname, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft);
//            }




//        }
//        if (value.Controltypename == 'combobox') {



//            if (value.ChildControl == value.Controlname) {

//                DefalutChieldControl(value.ChildControl, value.LabelName, value.Divnum);

//            }
//            else {

//                WebReportProperties(value.Controlname, value.ChildControl, value.LabelName, value.Divnum, value.ParantFilter, value.ChieldControltype, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft);

//            }


//        }


//        if (value.Controltypename == 'listbox') {

//            if (value.ChildControl == value.Controlname) {

//                CheckBoxChieldDefault(value.ChildControl, value.LabelName, value.Divnum);

//            }
//            else {

//                WebCheckBoxDetails(value.Controlname, value.ChildControl, value.LabelName, value.Divnum, value.ParantFilter, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft);

//            }

//        }
//        if (value.Controltypename == 'textbox') {
//            if (value.ChildControl == value.Controlname) {

//                CreateTextBoxeChield(value.LabelName, value.Divnum, value.ChildControl);


//            }
//            else {
//                if (value.DataType == 'string' && value.DataFlag == '1') {


//                    CreateTextBoxeParant(value.LabelName, value.Divnum, value.Controlname, value.ChildControl, value.ParantFilter, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft);
//                }
//                else {
//                    if (value.DataType == 'integer' && value.DataFlag == '1') {

//                        CreateTextBoxeIntgerType(value.LabelName, value.Divnum, value.Controlname, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft)
//                        //CreateTextBoxeParant(value.LabelName, value.Divnum);
//                    }
//                    else {
//                        CreateTextBoxStringType(value.LabelName, value.Divnum, value.Controlname, value.DivMarginBottom, value.DivHeight, value.DivWidth, value.DivTop, value.DivLeft)

//                    }
//                }

//            }


//        }

//    });
//    createbutton();
//    checkbutton();
//    //stopbeo();
//    //var ky = "<%=System.Configuration.ConfigurationManager.AppSettings['Top']%>";
//    //str += +15;

//    $('#tdrelist').attr('height', "" + str + "");

//}

////date--

//function Todate(lablename, Divnum, Controlname, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {

//    var td = $('#tdc');
//    var div = $('<div id="Div' + Divnum + '" style="margin-top: 15px;margin-bottom:' + DivMarginBottom + 'px' + ';width: calc(' + DivWidth + '%' + ' - 15px);position: absolute;left:' + DivLeft + '%' + ';top:' + DivTop + 'px' + ';height:' + DivHeight + 'px' + ';display: block;"/>');
//    var containerFluid = $('<div class="container-fluid"/>');
//    var row = $('<div class="row"/>');
//    var col1 = $('<div class="col" style="display: inline-flex;"/>');
//    var label = $('<label style="white-space: nowrap;margin-right: 15px;margin-top: 6px;width:200px">' + lablename + ':</label>');

//    col1.append(label);
//    col1.append(' <input name=' + Controlname + '  id="dateto" class="form-control dateclass" required />');

//    row.append(col1);
//    containerFluid.append(row);
//    div.append(containerFluid);
//    td.append(div);
//    $('#dateto').datepicker({
//        numberOfMonths: 1,
//        // maxDate: 0,
//        inline: true,
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        onSelect: function (selected) {
//            $('#datefrom').val(selected);
//            var dt = new Date(selected);
//            dt.setDate(dt.getDate() + 1);
//            $('#datefrom').datepicker("option", "minDate", selected);
//        }
//    }).datepicker("setDate", new Date());



//}
//function FromDate(lablename, Divnum, Controlname, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {


//    var td = $('#tdc');
//    var div = $('<div id="Div' + Divnum + '" style = "margin-top: 15px;margin-bottom:' + DivMarginBottom + 'px' + ';width: calc(' + DivWidth + '%' + ' - 15px);position: absolute;left:' + DivLeft + '%' + ';top:' + DivTop + 'px' + ';height:' + DivHeight + 'px' + ';display: block;"/>');
//    //var div = $('#Div' + Divnum + ' .row');---Change
//    var containerFluid = $('<div  class="container-fluid"/>');
//    var row = $('<div  class="row"/>');
//    //var col1 = $('<div  class="col"/>');
//    //var label = $('<label>' + lablename + ':</label>');
//    var col1 = $('<div class="col" style="display: inline-flex;"/>');
//    var label = $('<label style="white-space: nowrap;margin-right: 15px;margin-top:6px; width:200px">' + lablename + ':</label>');

//    col1.append(label);
//    col1.append(' <input name=' + Controlname + '  id="datefrom" class="form-control dateclass" required />');

//    row.append(col1);
//    containerFluid.append(row);
//    div.append(containerFluid);
//    td.append(div);

//    $('#datefrom').datepicker({
//        numberOfMonths: 1,
//        // maxDate: 0,
//        inline: true,
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        // maxDate:  $('#hdndatefrom').val()
//    }).datepicker("setDate", new Date());
//    //td.append(div);

//}

////$('body').on('focus', ".dateclass", function () {
////    $(this).datepicker({
////        dayOfWeekStart: 1, dateFormat: 'dd/mm/yy', lang: 'en',  changeMonth: true,
////        changeYear: true
////    });
////});

//function WebCheckBoxDetails(ControlName, ChildControl, lablename, Divnum, ParantFilter, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {
//    $.ajax({
//        async: false,
//        type: 'POST',
//        url: BasePath + 'WebReports/CGetCheckBoxDetails',
//        data: { ControlName: ControlName, ChildControl: ChildControl },
//        dataType: "json",
//        success: function (data) {
//            CreateCheckBoxList(data.vChekboxDetails, lablename, ChildControl, ControlName, Divnum, ParantFilter, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft);

//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//        }




//    });

//}
////Checkbox---
//function CreateCheckBoxList(res, lablename, ChildControl, ControlName, Divnum, ParantFilter, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {

//    var divchekbox = $('<div id="Div' + Divnum + '"  style = "margin-top: 0;margin-bottom:' + DivMarginBottom + 'px' + ';width: calc(' + DivWidth + '%' + ' - 15px);position: absolute;left:' + DivLeft + 'px' + ';top:' + DivTop + 'px' + ';height:' + DivHeight + 'px' + ';display: block;" />');
//    var containerFluid = $('<div  class="container-fluid"/>');
//    var row = $('<div  class="row"/>');
//    var col1 = $('<div  class="col"/>');
//    var label = $('<label>' + lablename + ':</label>');

//    //divchekbox.append(lable);
//    var table = $('<table class="form-control"  id=' + ControlName + '  style = "height:150px;display: inline-block;overflow-y: scroll;"  ></table>');
//    var counter = 0;
//    $(res).each(function () {
//        table.append($('<tr id=' + ControlName + '></tr>').append($('<td id=' + ControlName + '></td>').append($('<input  class=' + ControlName + '   control-name=' + ChildControl + ' Parant-filter="' + ParantFilter + '" ></input>').attr({
//            type: 'checkbox', div: this.Value, value: this.Key, id: 'chklistitem', name: '' + ControlName + ''
//        })).append(
//            $('<label>').attr({
//                for: 'chklistitem' + counter++
//            }).text(this.Value))));
//    });
//    col1.append(label).append(table);
//    row.append(col1);
//    containerFluid.append(row);
//    divchekbox.append(containerFluid);

//    //$('#tdc').append(divchekbox);
//    $('#tdc').append(divchekbox);

//    /// For Default All Check
//    //var alv = $('#chklistitem').attr('div');

//    //if (alv=='All')
//    //{
//    //    $('.' + ControlName + '').each(function () {
//    //        this.checked = false;
//    //        $("input." + ControlName + "").attr("disabled", true);
//    //    });
//    //    $('#' + ControlName + ' input:first').prop('checked', true);
//    //    $('#' + ControlName + ' input:first').prop('disabled', false);

//    //}



//}

//function CheckBoxChieldDefault(ChildControl, lablename, Divnum) {
//    var divchekbox = $('#Div' + Divnum + ' .row');
//    var label = $('<label>' + lablename + ':</label>');
//    var col1 = $('<div  class="col"/>');
//    col1.append(label);
//    //divchekbox.append(lable);
//    var table = $('<table class="form-control"  id=' + ChildControl + '  style = "height:150px;display: inline-block;overflow-y: scroll;"  ></table>');


//    //table.append($('<tr></tr>').append($('<td id=' + ChildControl + '></td>')));
//    col1.append(table);
//    //divchekbox.append(table);
//    divchekbox.append(col1);

//    //$('#tdc').append(divchekbox);


//}
//$(document).on("change", "#chklistitem", function () {

//    var status = '';
//    var val = [];
//    var ChieldAtt = ($(this).attr('control-name'));
//    var check = $(this).attr('div');
//    var att = $(this).attr('class');
//    var Parantfiltername = $(this).attr('Parant-filter');

//    //var chieldcontrol = $(this).attr('control-name');
//    // alert(chieldcontrol);
//    if (check == 'All') {
//        status = this.checked;




//        if (status == true) {
//            $('.' + att + '').each(function () {
//                this.checked = false;
//                $("input." + att + "").attr("disabled", true);
//            });
//            $('#' + att + ' input:first').prop('checked', true);
//            $('#' + att + ' input:first').prop('disabled', false);
//            val = -1;


//        }
//        else {
//            $('.' + att + '').each(function () {
//                this.checked = false;
//                $("input." + att + "").attr("disabled", false);
//            });
//            $('#' + att + ' input:first').prop('checked', false);

//            val = -2;

//        }

//    }
//    else {
//        $('.' + att + ':checked').each(function () {
//            //var firstcheck = $('#' + att + ' input:first').val();
//            //if (firstcheck=='-1')
//            //{
//            //    $('#' + att + ' input:first').prop('checked', false);
//            //}

//            var checkvalue = $(this).val();
//            if (checkvalue != -1) {
//                val.push(checkvalue);

//            }

//        });
//    }

//    $.ajax({

//        url: BasePath + "WebReports/CGetChieldBoxList",
//        type: "POST",
//        dataType: "json",
//        data: { ChieldID: val.toString(), Chieldattr: $(this).attr('control-name'), ParantFilterName: Parantfiltername },
//        success: function (data) {
//            var ChieldListBox = data.vChieldCheckBox;
//            PostBackChieldListBoxControl(ChieldListBox, ChieldAtt);
//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//        }
//    });


//});

//function PostBackChieldListBoxControl(ChieldListBox, ChieldAtt) {
//    if (ChieldListBox != null) {
//        var TdId = $('#' + ChieldAtt + '');
//        TdId.empty();
//        //var divchekbox = $('<div/>');
//        ////var lable = $('<lable>' + lablename + ':</lable>');
//        ////divchekbox.append(lable);
//        //var table = $('<table class="form-control"  style = "margin-top: 120px;width: 150px !important;height:150px; display: inline-block; overflow-y: scroll;text-align:left"  ></table>');
//        var counter = 0;
//        $(ChieldListBox).each(function () {

//            TdId.append($('<tr></tr>').append($('<td></td>').append($('<input id="Checkchield" class=' + ChieldAtt + ' name=' + ChieldAtt + '>').attr({
//                type: 'checkbox', div: this.Value, value: this.Key
//            })).append($('<label>').attr({ for: 'chklistitem' + counter++ }).text(this.Value))));
//        });
//        //divchekbox.append(table);

//        //$('#tdc').append(divchekbox);

//    }
//    else {
//        var TdId = $('#' + ChieldAtt + '');
//        TdId.empty();


//    }


//}
//$(document).on("change", "#Checkchield", function () {

//    var status = '';

//    var check = $(this).attr('div');
//    var ClassName = $(this).attr('class');
//    //var chieldcontrol = $(this).attr('control-name');
//    // alert(chieldcontrol);
//    if (check == 'All') {
//        status = this.checked;

//        if (status == true) {
//            $('.' + ClassName + '').each(function () {
//                this.checked = false;
//                $("." + ClassName + "").prop("disabled", true);
//            });
//            $('#' + ClassName + ' input:first').prop('checked', true);
//            $('#' + ClassName + ' input:first').prop('disabled', false);



//        }
//        else {
//            $('.' + ClassName + '').each(function () {
//                //this.checked = false;
//                $("." + ClassName + "").prop("disabled", false);
//            });
//            $('#' + ClassName + ' input:first').prop('checked', false);


//        }

//        //$('.' + att + '').each(function () {
//        //    this.checked = status;
//        //});
//    }
//    else {
//        $('.' + ClassName + ':checked')
//        //$('#' + ClassName + ' input:first').prop('checked', false);



//    }
//});
////ddl
//function WebReportProperties(Controlname, ChildControl, labelname, Divnum, ParantFilter, chieldControlType, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {
//    $.ajax({
//        async: false,
//        type: "POST",
//        url: BasePath + "WebReports/CComboDetails",
//        data: { ControlName: Controlname, ChildControl: ChildControl },
//        dataType: "json",
//        success: function (data) {

//            var PComboList = data.vComboDetails;
//            var dvContainer = $("#tdc")
//            var containerFluid = $('<div  class="container-fluid"/>');
//            var row = $('<div  class="row"/>');
//            var col1 = $('<div class="col" style="display: inline-flex;"/>');
//            var label = $('<label style="white-space: nowrap;margin-right: 15px;margin-top: 6px;width:200px">' + labelname + ':</label>');
//            //var col1 = $('<div  class="col"/>');
//            //var label = $('<label>' + labelname + ' : </label>');
//            var ddlComboP = $("<select  id='ddlComboP' name=" + Controlname + " Parant-filter='" + ParantFilter + "' class='form-control'   control-name='" + ChildControl + "' required   Chield-Controltype='" + chieldControlType + "'/>");



//            if (PComboList != null) {
//                $(PComboList).each(function () {


//                    var option = $("<option />");


//                    option.html(this.Value);


//                    option.val(this.Key);


//                    ddlComboP.append(option);
//                });

//            }




//            var div = $("<div id='Div" + Divnum + "' style = 'margin-top:0;margin-bottom:" + DivMarginBottom + "px" + ";width: calc(" + DivWidth + "%" + " - 15px);position: absolute;left:" + DivLeft + '%' + ";top:" + DivTop + "px" + ";height:" + DivHeight + "px" + ";display: flex;flex-direction: column;align-items: flex-start;'/>");
//            //div.append(label);
//            //div.append(ddlComboP);
//            col1.append(label).append(ddlComboP);
//            row.append(col1);
//            containerFluid.append(row);
//            div.append(containerFluid);




//            dvContainer.append(div);


//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//        }
//    });


//}
//$(document).on("change", "#ddlComboP", function () {

//    var att = ($(this).attr('control-name'));

//    var ParantfilterName = $(this).attr('Parant-filter');
//    var chieldcontroltype = $(this).attr('Chield-Controltype');


//    if (chieldcontroltype == 'combobox') {

//        $.ajax({

//            url: BasePath + "WebReports/CGetChieldCombo",
//            type: "POST",
//            dataType: "json",
//            data: { ChieldID: $(this).val(), Chieldattr: $(this).attr('control-name'), ParantFilterName: ParantfilterName },
//            success: function (data) {
//                var ChieldCombolist = data.vChieldcombo;
//                PostBackChieldControl(ChieldCombolist, att);
//            },
//            error: function (xhr, ajaxOptions, thrownError) {
//                alert(xhr.status);
//                alert(thrownError);
//            }
//        });
//    }
//    if (chieldcontroltype == 'textbox') {
//        auto($(this).val(), att, ParantfilterName);

//    }

//});

//function DefalutChieldControl(ChildControl, labelname, Divnum) {
//    var All_Parantvalue = $("#ddlComboP  option:first").val();

//    $.ajax({
//        async: false,
//        url: BasePath + "WebReports/CGetChieldCombo",
//        type: "POST",
//        dataType: "json",
//        data: { ChieldID: All_Parantvalue, Chieldattr: ChildControl },
//        success: function (data) {
//            var ChieldComboList = data.vChieldcombo;

//            var dvContainer = $("#tdc");
//            var col1 = $('<div  class="col"/>');
//            ////var div = $("<div id='" + labelname + "'style = 'margin-top: 88px;margin-right:180px'/>");
//            var div = $("#Div" + Divnum + " .row");

//            var ddlChieldCombo = $("<select id=" + ChildControl + " name=" + ChildControl + " class='form-control' required/>");

//            var lable = $('<label>' + labelname + ' : </label>');

//            $(ChieldComboList).each(function () {
//                ddlChieldCombo.append('<option value=' + this.Key + '>' + this.Value + '</option>')
//            });
//            col1.append(lable).append(ddlChieldCombo);
//            div.append(col1);
//            //div.append(lable);
//            //div.append(ddlChieldCombo);
//            //dvContainer.append(div);
//        }

//    });

//}

//function PostBackChieldControl(ChieldCombolist, att) {
//    if (att != '') {

//        var ddlChieldCombo = $('#' + att + '');
//        ddlChieldCombo.empty();



//        $(ChieldCombolist).each(function () {
//            ddlChieldCombo.append('<option value=' + this.Key + '>' + this.Value + '</option>')
//        });

//    }
//}

//function CreateTextBoxeParant(labelname, Divnum, Controlname, ChildControl, ParantFilter, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {

//    $('#tdc').append('<div id="Div' + Divnum + '"  style = "margin-top: 15px;margin-bottom:' + DivMarginBottom + 'px' + ';width: calc(' + DivWidth + '%' + ' - 15px);position: absolute;left:' + DivLeft + '%' + ';top:' + DivTop + 'px' + ';height:' + DivHeight + 'px' + ';display: block;"><div  class="container-fluid"><div  class="row"><div  class="col"><lable>' + labelname + ':</lable><input id="ParantTextboxe" type="text" name=' + Controlname + '  parant-filter=' + ParantFilter + ' style="vertical-align: middle;background-color: #ffffff;border: 1px solid #cccccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;height: 28px;padding-left: 4px;font-size: .9em;"  class=' + Controlname + ' Control-name=' + ChildControl + ' ></div></div></div></div>');

//}
//function CreateTextBoxeIntgerType(labelname, Divnum, Controlname, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {

//    $('#tdc').append('<div id="Div' + Divnum + '" style = "margin-top: 15px;margin-bottom:' + DivMarginBottom + 'px' + ';width: calc(' + DivWidth + '%' + ' - 15px);position: absolute;left:' + DivLeft + '%' + ';top:' + DivTop + 'px' + ';height:' + DivHeight + 'px' + ';display: block;"><div  class="container-fluid"><div  class="row"><div  class="col"><lable>' + labelname + ':</lable><input id="ParantintgertypeTextboxe" type="text" name=' + Controlname + ' style="width: 190px; display: inline-block"  class="form-control"></div></div></div></div>');

//}

//function CreateTextBoxStringType(labelname, Divnum, Controlname, DivMarginBottom, DivHeight, DivWidth, DivTop, DivLeft) {
//    $('#tdc').append('<div id="Div' + Divnum + '" style = "margin-top: 15px;margin-bottom:' + DivMarginBottom + 'px' + ';width: calc(' + DivWidth + '%' + ' - 15px);position: absolute;left:' + DivLeft + '%' + ';top:' + DivTop + 'px' + ';height:' + DivHeight + 'px' + ';display: block;"><div  class="container-fluid"><div  class="row"><div  class="col"><lable>' + labelname + ':</lable><input id="ParantstringtypeTextboxe" type="text" name=' + Controlname + ' style=" display: inline-block"  class="form-control"></div></div></div></div>');

//}

////function CreateTextBoxeChield(labelname, Divnum, ChieldControl) {
////    var td = $('#tdc');
////    var div = $("#Div" + Divnum + "");
////    var lable = $('<lable>' + labelname + ':</lable>');
////    var textboxe = $('<input type="text"  id=' + ChieldControl + ' onclick=chieldtextboxclick(this) />')
////    div.append(lable);
////    div.append(textboxe);
////    td.append(div);
////}



function CreateTextBoxeChield(labelname, Divnum, ChieldControl) {
    var td = $('#tdc');
    var col1 = $('<div  class="col"/>');
    var div = $("#Div" + Divnum + " .row");
    var label = $('<label>' + labelname + ':</label>');
    var textboxe = $('<input type="text" class="' + ChieldControl + '" id="ChieldTextbox" name=' + ChieldControl + '  style="vertical-align: middle;background-color: #ffffff;border: 1px solid #cccccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;height: 28px;padding-left: 4px;font-size: .9em;"/>')
    col1.append(label).append(textboxe);
    div.append(col1);
    //div.append(label);
    //div.append(textboxe);
    //td.append(div);

}



function createbutton() {
    var td = $('#tdc');
    var button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('value', 'Preview');
    button.setAttribute('id', 'btninsert');
    button.setAttribute('class', 'Preview-btn');
    button.setAttribute('style', 'position: absolute;left:470px;top: 228px');
    //button.setAttribute('onclick', 'GetTableValues();');
    var div = $('#button');
    td.append(button);
}
//function checkbutton() {
//    var td = $('#tdc');
//    var button = document.createElement('input');
//    button.setAttribute('type', 'submit');
//    button.setAttribute('value', 'Print');
//    button.setAttribute('id', 'btnprint');
//    button.setAttribute('class', 'btn btn-info');
//    button.setAttribute('style', 'position: absolute;left: 160px;top:420px;display:none');
//    button.setAttribute('onclick', 'return Print();');

//    var div = $('#button');
//    td.append(button);
//}
//function stopbeo()
//{
//    var td = $('#tdc');
//    var button = document.createElement('input');
//    button.setAttribute('type', 'submit');
//    button.setAttribute('value', 'stop');
//    button.setAttribute('id', 'btnstop');
//    button.setAttribute('class', 'btn btn-info');
//    button.setAttribute('style', 'position: absolute;left: 250px;top: 420px');
//    button.setAttribute('onclick', 'checkbro()');

//    var div = $('#button');
//    td.append(button);


//}
//function checkbro()
//{

//    $('#btnstop').keypress(function (event) {

//        if (event.keyCode == 17 && event.keyCode == 110) {
//            alert("New");
//        }
//        else {
//            event.preventDefault();
//        }


//    });
//}
//$('#btninsert').click(function () {
$(document).on("click", "#btninsert", function () {
    var allVals = [];
    var Data = $("form").serializeArray();
    $.each(Data, function (i, field) {
        allVals.push(field.name + "=" + field.value + " ");
    });
    $('#divProcessingBox').dialog('open');
    setTimeout(function () {

        $.ajax({
            async: false,
            url: BasePath + "WebReports/CGetRptReportDetails",
            type: "POST",
            dataType: "json",
            data: { ReportFilter: allVals.toString() },
            success: function (data) {
                if (data != '') {
                    if (data != "0") {

                        $('#divProcessingBox').dialog('close');
                        window.open('' + BasePath + 'Report/CrReport.aspx');


                    }
                    else {
                        $('#divProcessingBox').dialog('close');
                        alert('Record Not Found');

                    }

                }
            }

        });


    }, 3000);

    return false;
});
function GetTableValues() {

    //var cnt = $("#chklistitem:checked").length;
    //var cls = $('#chklistitem:checked').attr('class');
    //var lengths = $('.' + cls + ':checked').length;
    //$('#chklistitem').attr('required', false);

    ////alert(cls);
    ////alert(lengths);
    //if (cls == undefined) {
    //    $('#chklistitem').attr('required', true);
    //    return false;
    //}
    //else {
    //    if (lengths == 0) {
    //        alert('hi');
    //        $('.' + cls + '').attr('required', true);
    //        cls = '';
    //        return false;
    //    }
    //}
    //cls = '';

    var divname = $("#chklistitem:checked").attr('div');
    if (divname == undefined) {
        $('#chklistitem').attr('required', true);

        return false;
    }




    //if (cnt<2)
    //{
    //    $('#chklistitem').attr('required',true); 
    //    return false;
    //}
    //$('#chklistitem').attr('required', false);
    //var ReportID = sessionStorage.getItem("ReportId");
    var allVals = [];
    var loginFormObject = {};
    var Data = $("form").serializeArray();
    $.each(Data, function (i, field) {

        allVals.push(field.name + "=" + field.value + " ");


    });

    $.ajax({
        async: false,
        url: "/WebReports/CGetRptReportDetails",
        type: "POST",
        dataType: "json",
        data: { ReportFilter: allVals.toString() },
        success: function (data) {
            if (data != '') {
                //window.open('Report/CrReport.aspx','_blank');
                window.open('Report/CrReport.aspx');
            }


        }

    });

}
//$('#btn').click(function () {
//    var allVals = [];
//    var loginFormObject = {};
//    var Data = $("form").serializeArray();
//    $.each(Data, function (i, field) {

//        allVals.push(field.name + "=" + field.value + " ");
//        //alert(field.name + "=" + field.value + " ");

//    });
//    alert(allVals);
//    $.ajax({
//        async: false,
//        url: "/WebReports/CgetCheck",
//        type: "POST",
//        dataType: "json",
//        data: { check: allVals.toString() },
//        success: function (data) {
//            //$('#listcheck').append(data);
//        }

//    });
//        //var data = $('form').serializeArray();

//        //var loginFormObject = {};
//        //var allVals = [];
//        //var add = [];
//        //$.each(data,function (i, v) {
//        //        loginFormObject[v.name = v.value];
//        //        alert(v.name + ":" + v.value + " ");
//        //        allVals.push(loginFormObject[v.name] = v.value);
//        //        add.append(loginFormObject[v.name] = v.value)


//        //    });
//    //alert(allVals);


//});

//$(document).on("click", "#ParantTextboxe", function () {
//    var ChieldControl = $(this).attr('Control-name');
//    var Parantfilter = $(this).attr('parant-filter');

//    var att = $(this).prop('class');
//    Paranttextauto(att, ChieldControl, Parantfilter);

//});
//$(document).on("change", "#ParantTextboxe", function () {
//    var k = $(this).val();
//    alert(k);
//});
//For TextBoxe
//$(document).on("click", "#ChieldTextbox", function () {

//    var All_Parantvalue = $("#ddlComboP  option:first").val();
//    var att = $(this).prop('class');

//    auto(All_Parantvalue, att);

//});


//$(document).on("click", "#ParantintgertypeTextboxe", function () {

//    $("#ParantintgertypeTextboxe").keypress(function (e) {

//        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

//            alert('Please Enter Numeric');
//            return false;
//        }
//    });
//});
////function chieldtextboxclick(th) {


////    var All_Parantvalue = $("#ddlComboP  option:first").val();
////    var att = th.id
////    alert(th.id);
////    auto(All_Parantvalue,att);


////}

//function auto(val, att, ParantfilterName) {

//    $("." + att + "").autocomplete({

//        source: function (request, response) {

//            $.ajax({
//                url: BasePath + "WebReports/CGetChieldtextboxList",
//                type: "POST",
//                dataType: "json",
//                data: { Prefix: request.term, ChieldID: val, Chieldattr: att, ParantFilterName: ParantfilterName },
//                success: function (data) {
//                    console.log(data);
//                    response($.map(data.vChieldTextbox, function (item) {
//                        return { label: item.Value, value: item.Value };
//                    }))

//                }
//            })
//        },
//        messages: {
//            noResults: "", results: ""
//        }
//    });


//}
////$(".selector").autocomplete({
////    change: function (event, ui) { alert('hi'); }

////});
//function check(id, ChieldControl, Parantfilter) {
//    if (ChieldControl != '') {
//        auto(id, ChieldControl, Parantfilter);

//    }



//}
//function Paranttextauto(att, ChieldControl, Parantfilter) {

//    $("." + att + "").autocomplete({
//        select: function (event, ui) {
//            var id = ui.item.id
//            check(id, ChieldControl, Parantfilter);

//        },
//        source: function (request, response) {

//            $.ajax({
//                url: BasePath + "WebReports/CGetParantTextboxList",
//                type: "POST",
//                dataType: "json",
//                data: { Prefix: request.term, ControlName: att },
//                success: function (data) {
//                    //console.log(data);
//                    response($.map(data.vParantTextbox, function (item) {
//                        return { label: item.Value, value: item.Value, id: item.Key };
//                    }))

//                }
//            })
//        },
//        messages: {
//            noResults: "", results: ""
//        }
//    });


//}


//$(document).on("click", "#btnprint", function () {
//    var allVals = [];

//    var Data = $("form").serializeArray();
//    $.each(Data, function (i, field) {
//        allVals.push(field.name + "=" + field.value + " ");
//    });
//    $.ajax({
//        async: false,
//        url: BasePath + "WebReports/CPrintReport",
//        type: "POST",
//        dataType: "json",
//        data: { PrintReport: allVals.toString(), path: BasePath },
//        success: function (data) {
//            if (data != '') {

//                window.open('' + BasePath + 'Report/print.aspx');
//            }
//        }, error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//        }

//    });
//    return false;

//});

function UserLogOut() {
    var url = appRoot + "Reports/Logout";
    var param = {};
    var result = getresult(url, param);
    window.open('', '_self').close();
    location.assign(appRoot + "account/login");
}

function getresult(url, param) {
    var result;
    $.ajax({
        url: url,
        async: false,
        type: 'POST',
        data: {
            format: 'json'
        },
        data: param,
        success: function (data) {
            result = data;
        },
        error: function (e) {
            alert('Some technical error');
        }
    });
    return result;
}


var specialKeys = new Array();
specialKeys.push(8); //Backspace
specialKeys.push(9); //Tab
specialKeys.push(46); //Delete
specialKeys.push(36); //Home
specialKeys.push(35); //End
specialKeys.push(37); //Left
specialKeys.push(39); //Right
specialKeys.push(40); //Down
specialKeys.push(38); //Up
function validateCharacters(ths, e, charType, invalidChar) {
    IsValid = false;
    switch (charType) {
        case 'numeric':
            if ((e.shiftKey == false && 47 < e.keyCode && e.keyCode < 58) || (95 < e.keyCode && e.keyCode < 106) ||
                (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode) || e.keyCode == 13)
                IsValid = true;
            // new code for copy+paste add by sarvesh at 30/12/2019.
            if (e.ctrlKey && e.keyCode == 86)
                IsValid = true;
            break;
        case 'alphanumeric':
            //if (!((e.keyCode == 32) || (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode >= 65 && e.keyCode <= 90) ||
            //    ((!e.shiftKey) && e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) ||
            //    (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode)))
            // new code add for special keys by sarvesh.
            if (specialKeys.indexOf(e.keyCode) != -1)
                IsValid = true;
            var regex = new RegExp("[ A-Za-z]");
            var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            // new code add for tab key.
            if (e.keyCode == 9)
                IsValid = true;
            if (regex.test(key))
                IsValid = true;
            break;
        case 'selectedInvalidChar':
            var regexs = new RegExp("[" + invalidChar + "]");
            var keys = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (!regexs.test(keys))
                IsValid = true;
            break;
        case 'amount':
            if ((e.shiftKey == false && 47 < e.keyCode && e.keyCode < 58) || (95 < e.keyCode && e.keyCode < 106) ||
                (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode)
                || (e.shiftKey == false && e.keyCode == 190 || e.keyCode == 110))
                IsValid = true;
            break;
        default:
            IsValid = true;
    }
    return IsValid;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
