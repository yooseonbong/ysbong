/*
 * @(#)Bawoori_common.js
 */
var gnb = {
	defaultLoading : function() {
		jQuery('.subMenu').each(function(){
			var id = jQuery(this).attr("id");
			if(currentMenuGroup.toUpperCase()=="MEMBER" || currentMenuGroup.toUpperCase()=="ETC"){
				jQuery(this).hide();
				jQuery("#subnaviBar").hide();
			} else {
				if(id == "menu_"+currentMenuGroup){
					jQuery("#subnaviBar").show();
					jQuery(this).show();
				}else{
					jQuery(this).hide();
				}
			}
		});
	},
	showSubmenu : function(t) {
		jQuery("#subnaviBar").show();
		var classList = jQuery(t).attr('class').split(/\s+/);
		jQuery('.subMenu').each(function(){
			jQuery(this).hide();
			if( jQuery(this).attr("id") == classList[1] ){
				jQuery(this).show();
			}
		});
	}
}

//화면 폰트 크기
var sz = 12;
var Zoom = {
	/**
	 * Zoom 환경설정
	 */
	Zoom: {
		ZoomRate: 8,
		MaxZoom: 140,
		MinZoom: 92,
		NowZoom: 100
	},
	/**
	 * 화면을 확대한다.
	 * @param _elementName	(줌인 객체명)
	 */
	zoomIn: function(num) {
		if(navigator.appName.toLowerCase().indexOf("microsoft") > -1){
			if (this.Zoom.NowZoom < this.Zoom.MaxZoom) {
				this.Zoom.NowZoom += this.Zoom.ZoomRate;
				document.getElementById("indexmiddle").style.zoom = this.Zoom.NowZoom + "%";
			}
		} else {
			if (sz < 18) {
				document.getElementById("indexmiddle").style.fontSize = (++sz + "px");
			}
		}
	},
	/**
	 * 화면을 축소한다.
	 * @param _elementName	(줌아웃 객체명)
	 */
	zoomOut: function(num) {
		if(navigator.appName.toLowerCase().indexOf("microsoft") > -1){
			if (this.Zoom.NowZoom > this.Zoom.MinZoom) {
				this.Zoom.NowZoom -= this.Zoom.ZoomRate;
				document.getElementById("indexmiddle").style.zoom = this.Zoom.NowZoom + "%";
			}
		} else {
			if (sz > 12) {
				document.getElementById("indexmiddle").style.fontSize = (--sz + "px");
			}
		}
	},
	zoomReset: function (num) {
		sz = 12;
		this.Zoom.NowZoom = 100;
		if(navigator.appName.toLowerCase().indexOf("microsoft") > -1){
			document.getElementById("indexmiddle").style.zoom = "100%";
		} else {
			document.getElementById("indexmiddle").style.fontSize = '12px';
		}
	}
}

/* SURVEY */
function survey_submit(){
	if(!isFormRadio(document.surveyFrm.surveyChk, "", "만족도를 선택해주세요")){
		return false;
	}
	try {
	new Ajax.Request(
		"/common/surveyPS.asp",{
			method : "post",
			parameters : {
				"fName" : "frmAjax",
				"surveyMenu1" : $F("surveyMenu1").strip(),
				"surveyMenu2" : $F("surveyMenu2").strip(),
				"surveyMenu3" : $F("surveyMenu3").strip(),
				"surveyStaffID" : $F("surveyStaffID").strip(),
				"surveyStaffName" : $F("surveyStaffName").strip(),
				"surveyStaffDepart" : $F("surveyStaffDepart").strip(),
				"surveyStaffTel" : $F("surveyStaffTel").strip(),
				"surveyFinalModDate" : $F("surveyFinalModDate").strip(),
				"surveyChk" : $RF("surveyFrm", "surveyChk").strip()
			},
			evalScript : true,
			requestHeaders: {Accept: 'application/json'},
			onComplete : function(r){
				var res = r.responseText;
				if(res) {
					j = res.evalJSON(true);
					alert(j.message);
					return;
					/*
					if(j.result == "failed") {
						alert(j.message);
						return;
					} else {
						document.location.href=j.url;
						return;
					}*/
				}
				alert("오류가 발생했습니다\n잠시 후 다시 시도해주세요");
			}
		}
	);
	} catch (e) {
		alert(e);
	}
	return false;
}

/* QUICK MENU */
var QuicklastScrollY = 0;
function OnScrollingQuick(){
	var obj = $("QuickMenu");
	if(obj != null){
		window.setInterval("scrollingQuick()",1);
	}
}

function scrollingQuick(){
	this.ie=document.all && !window.opera;
	this.standard_body=(document.compatMode=="CSS1Compat")? document.documentElement : document.body;
	this.doc_height=(this.ie)? this.standard_body.clientHeight: window.innerHeight;
	this.page_height=this.standard_body.scrollHeight;

	var obj = $("QuickMenu");
	if(navigator.appName.toLowerCase().indexOf("microsoft") > -1){
		QuickdiffY = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
	} else {
		QuickdiffY = self.pageYOffset;
	}

	if(QuickdiffY != QuicklastScrollY) {
		Quickpercent = .4 * (QuickdiffY - QuicklastScrollY);
		if(Quickpercent > 0) Quickpercent = Math.ceil(Quickpercent);
		else Quickpercent = Math.floor(Quickpercent);

		if(navigator.appName.toLowerCase().indexOf("microsoft") > -1){
			//obj.style.pixelTop += Quickpercent;
			if(obj.style.pixelTop < 0){
				obj.style.pixelTop = 0;
			} else if(obj.style.pixelTop < (page_height-840)){
				obj.style.pixelTop += Quickpercent;
			} else {
				obj.style.pixelTop = page_height-841;
			}
		} else {
			var chkVal = obj.style.top.replace("px", "");
			if(chkVal == ""){
				chkVal = Quickpercent;
			} else{
				chkVal = Quickpercent + parseInt(chkVal);
			}
			if(obj.style.top.replace("px", "")<0){
				obj.style.top = "0px";
			} else if(obj.style.top.replace("px", "") < (page_height-820)){
				obj.style.top = chkVal + "px";
			} else {
				obj.style.top = (page_height-821)+"px";
			}
		}
		QuicklastScrollY = QuicklastScrollY + Quickpercent;
	}
}

/*
function scrollingQuick(){
	var dhtml = DhtmlUtil;
	dhtml.getInfo();

	if(dhtml.scroll_top != QuicklastScrollY ) {
		var obj = $("QuickMenu");
		Quickpercent = .1 * (dhtml.scroll_top - QuicklastScrollY);
		if(Quickpercent > 0) Quickpercent = Math.ceil(Quickpercent);
		else Quickpercent = Math.floor(Quickpercent);

		if(dhtml.scroll_top==0){
			obj.setStyle({
	        'top': dhtml.scroll_top+"0px"
	    });
		} else if(QuicklastScrollY < (dhtml.page_height - dhtml.doc_height - 180) ){
			if(parseInt(obj.getStyle("top").replace("px", "")) < (dhtml.doc_height+280) ){
		    obj.setStyle({
		        'top': parseInt(obj.getStyle("top").replace("px", ""))+Quickpercent+"px"
		    });
		  }
	  }
		QuicklastScrollY = QuicklastScrollY + Quickpercent;


	}
}
*/

//
// 우편번호 찾기 모달창
//
// @param sZip 우편번호 앞자리 ID
// @param vZip 우편번호 뒷자리 ID
// @param sAddr 주소 앞자리 ID
//
function fn_egov_ZipSearch(sZip, vZip, sAddr) {
	var retVal;
	var url = "/Popup/zipcode.asp";
	var openParam = "";

	if (window.showModelessDialog) {
		openParam = "dialogWidth:440px;dialogHeight:400px;scroll:no;status:no;center:yes;resizable:yes;";
		retVal = window.showModalDialog(url, "zip", openParam);

		if(retVal) {
			$(sZip).value = retVal.sZip;
			$(vZip).value = retVal.vZip;
			$(sAddr).value = retVal.sAddr;
		}
	} else {
		url = url + "?filedArr="+sZip+"|"+vZip+"|"+sAddr;
		var property="";
		var property ='height=400,width=440,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes';
		retVal  = window.open(url, "zip", property);
	}
}

//
// 우편번호 모달창 리턴
//
function fn_egov_return_Zip(zip,addr, filedArr){
	var sZip = zip.substring(0,3);
	var vZip = zip.substring(4,7);
	var sAddr = addr.replace("/^\s+|\s+$/g","");

	if (window.showModelessDialog) {
		var retVal = new Object();
		retVal.sZip = sZip;
		retVal.vZip = vZip;
		retVal.sAddr = sAddr;
		parent.window.returnValue = retVal;
		parent.window.close();
	} else {
		var filedArrSplit = filedArr.split("|");
		opener.document.getElementById(filedArrSplit[0]).value = sZip;
		opener.document.getElementById(filedArrSplit[1]).value = vZip;
		opener.document.getElementById(filedArrSplit[2]).value = sAddr;
		parent.window.close();
	}
}

//
// 소속기관 찾기 모달창
//
// @param orgCD 우편번호 앞자리 ID
// @param orgNM 우편번호 뒷자리 ID
//
function fn_egov_OrgSearch(highCD, orgCD, orgNM) {
	var retVal;
	var url = "/Popup/InsttRegistPopup.asp";
	if(highCD!=""){
		url = url + "?highCD="+highCD;
	}
	if (window.showModelessDialog) {
		var openParam = "dialogWidth:440px;dialogHeight:430px;scroll:no;status:no;center:yes;resizable:yes;";
		retVal = window.showModalDialog(url, "org", openParam);
		if(retVal) {
			$(orgCD).value = retVal.orgCD;
			$(orgNM).value = retVal.orgNM;
		}
	} else {
		if(highCD!=""){
			url = url + "&filedArr="+orgCD+"|"+orgNM;
		} else {
			url = url + "?filedArr="+orgCD+"|"+orgNM;
		}

		var property="";
		var property ='height=440,width=440,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes';
		retVal  = window.open(url, "org", property);
	}
}

//
// 소속기관 모달창 리턴
//
function fn_egov_return_Org(orgCD,orgNM, filedArr){
	if (window.showModelessDialog) {
		var retVal = new Object();
		retVal.orgCD = orgCD;
		retVal.orgNM = orgNM;
		parent.window.returnValue = retVal;
		parent.window.close();
	} else {
		var filedArrSplit = filedArr.split("|");
		opener.document.getElementById(filedArrSplit[0]).value = orgCD;
		opener.document.getElementById(filedArrSplit[1]).value = orgNM;
		parent.window.close();
	}
}

//
// 코드 찾기 모달창
//
// @param searchCodeID 검색 코드
// @param codeCD 린턴받을 코드 ID
// @param codeNM 린턴받을 코드명 ID
//
function fn_egov_CodeSearch(searchCodeID, codeCD, codeNM) {
	var retVal;
	var url = "/Popup/searchDetailCodePopup.asp?searchCodeID="+searchCodeID;

	if (window.showModelessDialog) {
		var openParam = "dialogWidth:440px;dialogHeight:400px;scroll:no;status:no;center:yes;resizable:yes;";
		retVal = window.showModalDialog(url, "code", openParam);
		if(retVal) {
			$(codeCD).value = retVal.codeCD;
			$(codeNM).value = retVal.codeNM;
		}
	} else {
		url = url + "&filedArr="+codeCD+"|"+codeNM;
		var property="";
		var property ='height=440,width=440,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes';
		retVal  = window.open(url, "code", property);
	}
}

//
// 코드 모달창 리턴
//
function fn_egov_return_Code(codeCD, codeNM, filedArr){
	if (window.showModelessDialog) {
		var retVal = new Object();
		retVal.codeCD = codeCD;
		retVal.codeNM = codeNM;
		parent.window.returnValue = retVal;
		parent.window.close();
	} else {
		var filedArrSplit = filedArr.split("|");
		opener.document.getElementById(filedArrSplit[0]).value = codeCD;
		opener.document.getElementById(filedArrSplit[1]).value = codeNM;
		parent.window.close();
	}
}

//
// 아이디중복검색 모달창
//
// @param searchCodeID 검색 코드
// @param codeCD 린턴받을 코드 ID
// @param codeNM 린턴받을 코드명 ID
//
function fn_egov_IDDuplicated(userID) {
	var retVal;
	var url = "/Popup/IDDuplicatedChk.asp";
	if (window.showModelessDialog) {
		var openParam = "dialogWidth:440px;dialogHeight:330px;scroll:no;status:no;center:yes;resizable:yes;";
		retVal = window.showModalDialog(url, "IDDuplicated", openParam);
		if(retVal) {
			$(userID).value = retVal.userID;
		}
	} else {
		url = url + "?filed="+userID;
		var property="";
		var property ='height=440,width=440,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes';
		retVal  = window.open(url, "IDDuplicated", property);
	}
}

//
// 아이디중복검색 모달창 리턴
//
function fn_egov_return_IDDuplicated(userID, filed){
	if (window.showModelessDialog) {
		var retVal = new Object();
		retVal.userID = userID;
		parent.window.returnValue = retVal;
		parent.window.close();
	} else {
		opener.document.getElementById(filed).value = userID;
		parent.window.close();
	}
}

function __UTIL_IsNumA(str){
	var NumPattern = /([^0-9])/;
	NumPattern = str.match(NumPattern);
	if(NumPattern != null)
		return false;

	return true;
}

function __UTIL_IsNumB(str){
	var NumPattern = /([^0-9\.])/;
	NumPattern = str.match(NumPattern);
	if(NumPattern != null)
		return false;

	return true;
}

function onDigit(fValue,nType){
	if(nType==1){
		if(!__UTIL_IsNumA(fValue.value)){
			alert('숫자만 입력이 가능합니다.');
			fValue.value="";
			fValue.focus();
			return false;
		}
	}else{
		if(!__UTIL_IsNumB(fValue.value)){
			alert('숫자와 \'.\'만 입력이 가능합니다.');
			fValue.value="";
			fValue.focus();
			return false;
		}
	}
	return false;
}


	
//////////////////////////////////////////////////////
//** 폼검증 함수
//////////////////////////////////////////////////////
//** 폼검증 함수
function FormCheck(f){
    DisableButton(f, true);    
    var b = CheckValue(f);	
    DisableButton(f, false);
    return b;
}
//** 중복SUBMIT 방지
function DisableButton(objFm, b){
    for(i=0;i<objFm.length;i++){
        if (objFm[i].type=="button" || objFm[i].type=="submit" || objFm[i].type=="image"){
            objFm[i].disabled=b;  //disabled
        }
    }
}


function Addzero(no)
{
	if (parseInt(no,10) < 10)
		return '0'+no;
	else
		return no;
}
function Redir(p)
{
	location.href = p ;
}
function Trim(str)
{
	str = str.replace(/^\s+/ig, "").replace(/\s+$/ig, "");
	return str;
}
function isEmpty(value)
{
	for ( var i = 0 ; i < value.length ; i++ )
	{
		if ( value.substring( i, i+1 ) != " " )
			return false;
	}
	return true;
}
function isInteger(value)
{
	var inte="1234567890"
	
	if(!isEmpty(value))
	{
		for ( var i = 0 ; i < value.length ; i++ )
		{
			if ( inte.indexOf(value.charAt(i)) < 0)
			{
				return true;
			}
		}
	}
	else
	{
		return true;
	}
}
function isNumeric(str)  // 숫자 타입 검사
  {
    var compare_str = "0123456789";
    
    for(var i=0; i<str.length; i++)
    { 
        if (compare_str.indexOf(str.charAt(i))==-1)
        {
            return false;
        }
    }
	return true;
}

function Command(url, msg)
{
	if (window.confirm(msg))
	{
		location.href = url;
	}
}
function frmCommand(url, msg)
{
	if (isEmpty(msg))
	{
		frameCommand.location.href = url;
		//return true;
	}
	else
	{
		if (window.confirm(msg)){
			if (url.length > 0)
			{
				frameCommand.location.href = url;
			}
		}
		else return;
	}
}
function CheckValue(f){
	for (var i=0; i<f.elements.length; i++){
		var e = f.elements[i];
		if (e.getAttribute("chk")==null) continue;
		var value = Trim(e.value);		
		if (value.length == 0){
			if (e.getAttribute("msg")==null){alert(e.getAttribute("nm")+"을(를) 입력하세요!");}
			else{alert(e.getAttribute("msg"));}
			e.focus();
			return false;
		}

		if (e.chk == "str"){
			if (value.length == 0){
				if (typeof(e.getAttribute("msg")) == null){alert(e.getAttribute("nm")+"을(를) 입력하세요!");}
				else{alert(e.getAttribute("msg"));}

				e.focus();
				return false;
			}
			if (typeof(e.getAttribute("min")) != null){
				if (value.length < parseInt(e.getAttribute("min"))){
					if (e.getAttribute("msg") == null){alert(e.getAttribute("nm")+" 값은 "+(e.getAttribute("mini"))+" 보다 같거나 커야 됩니다.");}
					else{alert(e.getAttribute("msg"));}
					e.focus();
					return false;
				}
			}
		}

		if (e.getAttribute("chk") == "int"){
			if (isNaN(value)){
				alert("숫자만 입력 가능합니다.");
				e.focus();
				return false;
			}

			value = parseInt(value);
			if (e.getAttribute("min") != null)
			{
				if (value < parseInt(e.getAttribute("min")))
				{
					if (e.getAttribute("msg") == null){alert(e.getAttribute("nm")+" 값은 "+(e.min)+" 보다 같거나 커야 됩니다.");}
					else{alert(e.getAttribute("msg"));}

					e.focus();
					return false;
				}
			}

			if (e.getAttribute("max") != null)
			{
				if (value > parseInt(e.getAttribute("max")))
				{
					if (e.getAttribute("msg") == null){alert(e.getAttribute("nm")+"은(는) "+(e.getAttribute("max"))+" 보다 같거나 작아야 됩니다.");}
					else{alert(e.getAttribute("msg"));}

					e.focus();
					return false;
				}
			}
		}

		if (e.getAttribute("chk") == "function"){
			try{result = eval(e.getAttribute("func"));}
			catch(ex){alert("입력값 검사 함수 " + e.getAttribute("func") + " 에 오류가 있습니다.");}
			if (!result){
				if (e.getAttribute("msg") == null){alert(e.getAttribute("nm")+"에 입력한 값이 틀립니다.");}
				else{alert(e.getAttribute("msg"));}
				e.focus();
				return false;
			}
		}
    }
    return true;
}

function CheckValue_IE(f){
	for (var i=0; i<f.elements.length; i++){
		var e = f.elements[i];
		if (typeof(e.chk) == "undefined") continue;
		var value = Trim(e.value);		

		if (value.length == 0){
			if (typeof(e.msg) == "undefined"){alert(e.nm+"을(를) 입력하세요!");}
			else{alert(e.msg);}
			e.focus();
			return false;
		}

		if (e.chk == "str"){
			if (value.length == 0){
				if (typeof(e.msg) == "undefined"){alert(e.nm+"을(를) 입력하세요!");}
				else{alert(e.msg);}

				e.focus();
				return false;
			}
			if (typeof(e.min) != "undefined"){
				if (value.length < parseInt(e.min)){
					if (typeof(e.msg) == "undefined"){alert(e.nm+" 값은 "+(e.min)+" 보다 같거나 커야 됩니다.");}
					else{alert(e.msg);}
					e.focus();
					return false;
				}
			}
		}

		if (e.chk == "int"){
			if (isNaN(value)){
				alert("숫자만 입력 가능합니다.");
				e.focus();
				return false;
			}

			value = parseInt(value);
			if (typeof(e.min) != "undefined")
			{
				if (value < parseInt(e.min))
				{
					if (typeof(e.msg) == "undefined"){alert(e.nm+" 값은 "+(e.min)+" 보다 같거나 커야 됩니다.");}
					else{alert(e.msg);}

					e.focus();
					return false;
				}
			}

			if (typeof(e.max) != "undefined")
			{
				if (value > parseInt(e.max))
				{
					if (typeof(e.msg) == "undefined"){alert(e.nm+"은(는) "+(e.max)+" 보다 같거나 작아야 됩니다.");}
					else{alert(e.msg);}

					e.focus();
					return false;
				}
			}
		}

		if (e.chk == "function"){
			try{result = eval(e.func);}
			catch(ex){alert("입력값 검사 함수 " + e.func + " 에 오류가 있습니다.");}
			if (!result){
				if (typeof(e.msg) == "undefined"){alert(e.nm+"에 입력한 값이 틀립니다.");}
				else{alert(e.msg);}
				e.focus();
				return false;
			}
		}
    }
    return true;
}	
function getBytesKr(str){
	var i,tmp = escape(str);
	var bytes = 0;
	for(i = 0 ; i < tmp.length; i++){
		if(tmp.charAt(i) == "%"){
			if (tmp.charAt(i+1) == "u"){
				bytes += 2;
				i += 5;
			}else{
				bytes += 1;
				i += 2;
			}
		}else{
			bytes += 1;
		}
	}
	return bytes;
}
var excelSearchYN = false;
function setExcelSearchYN(str){
	excelSearchYN = str;
}
function fnDownLoadPop(){
	/*showModalDialog 방식으로 변경*/
	if(!excelSearchYN){
		alert("검색후 엑셀다운로드를 실행해 주시기 바랍니다.");
		return;
	} 
	var exdownpop;
	var obj = new Object;
	var url = "/manage/excelDownPop.do?excelname="+escape(encodeURIComponent(excelname));
	if (window.showModelessDialog) {
		var openParam = "dialogWidth:400px;dialogHeight:300px;scroll:no;status:no;center:yes;resizable:yes;";
		exdownpop = window.showModalDialog(url, obj, openParam);
		//if(exdownpop) {
			fnDownLoad(exdownpop);
		//}
	} else {		
		var property="";
		var property ='height=400,width=300,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=yes,resizable=yes,modal=yes,dependent=yes';
		exdownpop  = window.open(url, "org", property);
	}
	
	/* window.open 방식
	var f = document.exdownform;
	var exdownpop = window.open("about:blank","exdownpop","toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=200");
	f.target = "exdownpop";
	f.action = "/Manage/ExcelDown.asp";
	f.submit();
	exdownpop.focus();	
	*/
}