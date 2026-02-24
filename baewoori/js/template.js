$(function(){
	//GNB
	jQuery(".menuWrap").css("height", "47px");
	jQuery(".gnb>li").find("p").fadeOut(0);

	jQuery(".gnb").mouseover(function(){
		jQuery(".menuWrap").stop().animate({height:497}, 300)
	});
	jQuery(".gnb").mouseout(function(){
		jQuery(".menuWrap").stop().animate({height:47}, 300)
	});
	jQuery(".gnb").focusin(function(){
		jQuery(".menuWrap").stop().animate({height:497}, 300)
	});
	jQuery(".gnb").focusout(function(){
		jQuery(".menuWrap").stop().animate({height:47}, 300)
	});
	
	var curGnb = -1;
	jQuery(".gnb>li").each(function(q){
		jQuery(this).hover(function(){
			jQuery(this).addClass("on");
			jQuery(this).find("p").stop(true, true).fadeIn(200);
		},function(){
			jQuery(this).removeClass("on");
			jQuery(this).find("p").stop(true, true).fadeOut(200);
		});

		jQuery(this).focus(function(){
			jQuery(".gnb>li").eq(curGnb).addClass("on");
			jQuery(".gnb>li").eq(curGnb).find("p").stop(true, true).fadeIn(200);
			curGnb = q;
			jQuery(".gnb>li").eq(curGnb).removeClass("on");
			jQuery(".gnb>li").eq(curGnb).stop(true, true).fadeOut(200);
		});
	});
	
	// 매뉴얼보기(onclick 이벤트)
	jQuery("#helpopen").parent().next().on("click",function(){
		var param = getHelpParam();
		if( param != null && param != "" ){
			window.open("/common/commManual_R.do?pgmId="+param,"readManual",'width=650,height=700,top=0,left=0,scrollbars=yes');	
		}
	});
	
});

function help_show(str){
	
	if(jQuery("#"+str).is(":hidden")){
		jQuery("#"+str).slideDown();
		jQuery("#helpopen").text("도움말 닫기");
		
		var param = getHelpParam();	// pgmId 찾기
		searchPreamble(param);		// 도움말 조회
		
	}else{
		jQuery("#"+str).slideUp();
		jQuery("#helpopen").text("도움말 열기");
	}
}

/* 도움말 조회 */
function searchPreamble(param){
	
	jQuery.ajax({
		type : "post",
		url : "/common/commPremble.do",
		data : {pgmId : param},
		success : function(result){

			var objStr = jQuery(".helptxt .btnwrap").prop("outerHTML");	// 순서 변경을 위해서 저장(버튼부분)
			
			jQuery(".helptxt").html("");													// 전부 지우기
			jQuery(".helptxt").append("<div id='preamble'></div>");			// 머리말을 출력할 DIV
			jQuery(".helptxt").append(objStr);										// 버튼부분 다시 추가
			if( result != null && result.rsMap != null && result.rsMap.PGM_TITLE != null ){
				jQuery("#preamble").append(result.rsMap.PGM_TITLE);		// 조회한 머리말
			}else{
				jQuery("#preamble").append("머리말이 없습니다!");					
			}
			
			// 새로 생성한 element에 onclick 이벤트 바인딩
			jQuery(".helptxt .btnwrap a:first-child").on("click",function(){
				var param = getHelpParam();
				window.open("/common/commPremble_W.do?pgmId="+param,"writePreamble",'width=650,height=700,top=0,left=0,scrollbars=yes');	
			});
			
			// auth_check1 : EE 권한
			if( (result != null && result.sessionMap.auth_check1 == 'N') || (param == null || param == "") ){
				jQuery(".helptxt .btnwrap a:first-child").css("display","none");
			}
			
			
		}
	});	
}

function getHelpParam(){
	
	// document 에서 pgmId 를 찾음
	var param = "";
	jQuery("input[name=pgmId]").each(function(){
		if( param == null || param == "" ){
			param = jQuery(this).val();
		}
	});

//	if( param == null || param == "" ){ alert("pgmId 존재하지 않음"); }
	
	return param;
}





//** 2020 메인 리뉴얼 **//

// header 
$(document).ready(function() {
    $("ul.nav").bind({
        mouseenter: function(d) {
            $("ul.nav").addClass("on")
            a = false
        },
        mouseleave: function(d) {
            $("ul.nav").removeClass("on")
            a = true
        }
    });
    var a = true;
    var c = true;
    var b;
    $("ul.nav").bind({
        focusin: function(d) {
            try {
                clearTimeout(b)
            } catch (d) {}
            c = false;
                $("ul.nav").addClass("on")
        },
        focusout: function(d) {
            if (a) {
                b = setTimeout(function() {
                    $("ul.nav").removeClass("on");
                    c = true
                }, 20)
            }
        }
    });
});


//학습중인 과정보기
$(document).ready(function() {
	$('.btn_study').click(function(){
		if ($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).siblings('.study_list').css('display','none');
		} else {
			$(this).addClass('on');
			$(this).siblings('.study_list').css('display','block');
		}
	});

	$('.study_cont').mouseleave(function(){
		$(this).children('.btn_study').removeClass('on');
		$('.study_list').css('display','none');
	});
});


