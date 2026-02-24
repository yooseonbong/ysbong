$(function() {

	$(".gnb > li").not(".mn5").bind("mouseover click", function(e){ 
	  if($(window).width() >= "1024" && e.type == "mouseover"){ 
		$(this).addClass("on");
		$(".sub-menu, .back-gnb").show();
	 
	  }else if($(window).width() < "1024" && e.type == "click"){ 
		 if($(this).is(".on")){
			$(this).removeClass("on");
			$(this).find(".sub-menu").css("display","none"); 
		 }else{
				$(".sub-menu").css("display","none");
				$(this).find(".sub-menu").css("display","block");
				$(".gnb > li").removeClass("on");
				$(this).addClass("on");
			}
		 }
	});
	
	//접근성 수정 2017-12-20
	$(".gnb > li > h2 > a").on("focus click", function(e){ 
		  if($(window).width() >= "1024" && e.type == "focus"){ 
			
			  $(".gnb > li").each(function(){
					$(this).removeClass("on");
				});		
				$(this).parent().parent().addClass("on");
				$(".sub-menu, .back-gnb").show();
		 
		  }else if($(window).width() < "1024" && e.type == "click"){ 
			
			 }
		});
	
	/*$(".gnb > li > h2 > a").on('focus',function(){		
		$(".gnb > li").each(function(){
			$(this).removeClass("on");
		});		
		$(this).parent().parent().addClass("on");
		$(".sub-menu, .back-gnb").show();
	});
	*/
	
	$('.mn5 > h2 > a').on('focus',function(){
		$(".sub-menu, .back-gnb").hide();
	});
	
	// 지역/ 국가 선택
	$('.AidA1').on('click',function(){
  		$('#UlIdNtnlCls').toggle();
  	});	
	$('.AidA2').on('click',function(){ 
		$('#UlIdNtnlCls').hide();
		$('#UlIdNtnl').toggle();
  		$('.map2-cont').toggle();
  	});
	$('.search-btn').on('focus',function(){
		$('#UlIdNtnl').hide();
	});
	$('.AidA1').keydown(function(e){		
  		$('#UlIdNtnlCls').show();
  	});	
	$('.AidA2').keydown(function(){ 
		$('#UlIdNtnlCls').hide();
		$('#UlIdNtnl').show();
  		$('.map2-cont').show();
  	});
	$('.map1 > ul > li:last-child > a').blur(function(){
		$('#UlIdNtnlCls').hide();
	});
/*	$('.map-close').blur(function(){
		$('.li1 > a').focus();
	});*/
	
	// 전체메뉴 접근성
	$('.all-menu-cont > ul > li:last-child > ul > li:last-child > a').blur(function(e){
		if(e.keyCode == 9){ // tab 키 눌렀을 때
    		if(e.shiftKey){
    		    
    		 }else {
    			    $('.all-menu-close').focus();
    			    e.stopPropagation();
    		}
    	}
	});
	// 20220412 전체메뉴 접근성
	$('.all-menu-cont > ul > li:first-child > ul > li:first-child > a').keydown(function(e){
		if(e.keyCode == 9){ // tab 키 눌렀을 때
    		if(e.shiftKey){
    			setTimeout(function(){
    				$(".all-menu-close").focus();
				}, 0);
    		 }else {

    		}
    	}
	});
	// 20220412 지도보기 웹 접근성
	$('.map-bg > ul > li:first-child > a').keydown(function(e){
		if(e.keyCode == 9){ // tab 키 눌렀을 때
    		if(e.shiftKey){
    			setTimeout(function(){
        		    $('.map-close').focus();
        		}, 0);
    		 }else {
    			 
    		}
    	}
	});
	
	//상세검색 접근성 20171215
	$(".register_close").click(function(){
		$('#docType_ORIGINAL').focus();
	});
	
	// 20220531 상단바 메뉴 접근성
	$('.mn4 > h2 > a').keydown(function(e){
		if(e.keyCode == 9){ // tab 키 눌렀을 때
    		if(e.shiftKey){
    			$(".mn3 > h2 > a").focus();
    			return false;
    		 }else {

    		}
    	}
	});
	$('.mn3 > h2 > a').keydown(function(e){
		if(e.keyCode == 9){ // tab 키 눌렀을 때
    		if(e.shiftKey){
    			$(".mn2 > h2 > a").focus();
    			return false;
    		 }else {

    		}
    	}
	});
	$('.mn2 > h2 > a').keydown(function(e){
		if(e.keyCode == 9){ // tab 키 눌렀을 때
    		if(e.shiftKey){
    			$(".mn1 > h2 > a").focus();
    			return false;
    		 }else {

    		}
    	}
	});
	
	
	
	
	$(".gnb > li").bind("mouseout click", function(e){ 
	  if($(window).width() >= "1024" && e.type == "mouseout"){ 
			$(this).removeClass("on");
		}else if($(window).width() < "1024" && e.type == "click"){ 
			
		}
	});

	$(".sub-menu").bind("mouseout click", function(e){ 
	  if($(window).width() >= "1024" && e.type == "mouseout"){ 
		 $(".sub-menu, .back-gnb").hide();
	  }else if($(window).width() < "1024" && e.type == "mouseout"){
		 //$(this).parent("li").removeClass("on")/* 20180112 */
	  }
	});

	$(".header-tp, .contents").mouseover(function(){
		$(".sub-menu, .back-gnb").hide();
	});

	$(".gnb > li.mn5").click(function(){
		$(".all-menu,.mn5_bg").fadeIn("fast");
	});

	$(".all-menu-close").click(function(e){
		$(".all-menu").fadeOut('fast');
		$(".mn5_bg").fadeOut('fast');
		$(".sub-location-cont ul li:first a").focus(); /* 20171215 - 접근성추가 */
		e.stopPropagation();
	});

/*sub01*/
	$('.sub-location-cont > ul > li > a').click(function(){
		if ($(this).hasClass('on'))
		{
			$(this).removeClass('on');
			$('.sub-location-cont > ul > li > a').next().stop(true,true).slideUp();
		}else{
			$('.sub-location-cont > ul > li > a').removeClass('on');
			$('.sub-location-cont > ul > li > a').next().stop().slideUp();
			$(this).addClass('on');
			$(this).next().slideDown('fast');
		}
		
	});

	$(".left_menu_open > a").click(function(){
		if($(this).hasClass('on')){
			$(".sbcenter_left").animate({"margin-left":"-243px"},500);
			$(".sbcenter_right").animate({"width":"1140px"},500);
			$(this).hide();
			$(this).next().show();
			setCookie('quickLeft','click',10);
		}else{
			$(".sbcenter_left").animate({"margin-left":"0"},500);
			$(".sbcenter_right").animate({"width":"897px"},500);
			$(this).hide();
			$(this).prev().show();
			setCookie('quickLeft','',-1);
		}
	});
	// 2단보기 팝업 배경 오류
	$(document).on('click','.pop_open',function(){
		$("#sub_pop_bg").show();
		$("#sub_pop").show();
		$(".sbcenter_right").css("position","static");
		setTimeout(function(){
			var cheight = $('.scroll_table1').height()+300; // 테이블의 높이를 가져옴(동적)
			//alert(cheight);
			$('#sub_pop.sub02_pop').height(cheight); // 감싸고 있는 놈의 높이를 정함(배경색을 갖고 있음)
			$('.sb_search_bg').height(cheight);
		},300);
	});
	$(".pop_close, .a_search").click(function(){
		$("#sub_pop_bg").hide();
		$("#sub_pop").hide();
		$(".sbcenter_right").css("position","relative");
	});
	
	$(".pop_close, .a_search4").click(function(){
		$("#sub_pop_bg").hide();
		$("#sub_pop").hide();
		$(".sbcenter_right").css("position","relative");
	});

//	$(".a_button3").click(function(){
//		$(".sub_bgbor2").hide();
//		$(".sub_register").show();
//	});
/*	$(".register_close").click(function(){
		$(".sub_register").hide();
		$(".sub_result").show();
	});*/

	$(".file-v > ul > li > a").click(function(){
		$("#sub_pop_bg").show();
		$("#sub_pop").show();
	});

	$(".sub04_question > ul > li > div.question_title a").click(function(){
        if($(this).hasClass("on")){
            $(this).parent(".question_title").next().slideUp();
            $(this).removeClass("on");
        }else{
            $(".question_cent").slideUp();
            $(".sub04_question > ul > li > div.question_title a").removeClass("on");
            $(this).parent(".question_title").next().slideDown();
            $(this).addClass("on");
        }
    });

	$(".left_menu > ul > li > a").click(function(){
		if ( $(this).hasClass('on') )
		{
			$(".left_menu > ul > li > a").removeClass("on");
			$(".sbthree_muen").slideUp("fast");
		}else{
			$(".left_menu > ul > li > a").removeClass("on");
			$(".sbthree_muen").slideUp("fast");
			if($(this).next("div").hasClass("sbthree_muen")){
				$(this).next(".sbthree_muen").slideDown("fast");
			}
			$(this).addClass("on");
		}
	});

	$(".mo-search").click(function(){
		$(".sb_search_bg").toggle();
		$(".mobile_search").toggle();
	});
	$(".sb_search_bg").click(function(){
		$(".sb_search_bg").hide();
		$(".mobile_search").hide();
	});

/*sub01*/

	//태블릿&모바일 서브메뉴
	// Common
	var select_root = $('.l-menu');
	var select_value = $('.active');
	var select_a = $('.l-menu>ul>li>a');
	
	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine')});
	select_value.bind('focusout',function(){$(this).removeClass('outLine')});
	
	// Show
	function show_option(){
		$(this).parents('.l-menu:first').toggleClass('open');
	}
	
	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}
	
	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('.menu:first').removeClass('open');
		}, 1);
	}
	
	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.active').text('').append(v);
		$(this).parents('ul:first').prev('.active').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not(".menu a")').focus(function(){
		$('.list_lnb').parent('.menu').removeClass('open');
	});
			
	select_value.click(show_option);
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open')});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	//select_label.hover(i_hover).click(hide_option);


	//모바일 메뉴 호출
	$(".btn-gnb").click(function(){
		$(".m-back-gnb").fadeIn('fast');
		$(".gnb-box").addClass('active');
	});

	//모바일 서브 메뉴 닫기
	$(".btn-gnb-close").click(function(){
		$(".m-back-gnb").fadeOut('fast');
		$(".gnb-box").removeClass('active');
	});

	$(".m-back-gnb").click(function(){
		$(this).fadeOut('fast');
		$(".all-menu").fadeOut('fast');
		$(".map-bg").fadeOut('fast');
		$(".pop-bg").fadeOut('fast');
		$(".gnb-box").removeClass('active');
	});



	//모바일 검색창 열기
	$(".sch-trigger").click(function(){
		$('.shc-box').slideDown();

		if($(this).is(".on")){
			$(this).removeClass("on");
			$('#sub .shc-box').slideUp();
		}else{
			$(this).addClass("on");
			$('#sub .shc-box').slideDown();
		}
	});

	
	/* 리사이징 */
	$(window).on('load resize', function(){
		var width = $(window).width();
		var all_h=$(".header").height() + $("#main_container").height() + $(".footer").height()
		$("#sub_pop.sub02_pop").height(all_h+20);		
		$(".sb_search_bg").height(all_h-80);
		
		$("#sub_pop.sub02_pop").height(all_h+20);		
		if(width <= 1024){
		
			$(".gnb > li > h2 > a").click(function(){
				if ( $(this).hasClass('on') )
				{
					$(".gnb > li > h2 > a").removeClass("on");
					$(".sub-menu").slideUp("fast");
				}else{
					$(".gnb > li > h2 > a").removeClass("on");
					$(".sub-menu").slideUp("fast");
					if($(".gnb > li > h2").next("div").hasClass("sub-menu")){
						$(this).attr("href","#none");
						$(this).next(".sub-menu").slideDown("fast");
					}
					$(this).addClass("on");
				}
			});


			$("#slider001.flexslider .slides li img").height($("#slider001").height());
			$(".main-cont4-v-cont").width($(".main-cont4-v-a").width() - 30);
		
		}else{
			 $(".sub-menu, .m-back-gnb").hide();
			 $(".gnb-box").removeClass('active');
			 $('#sub .shc-box').show();
			 $(".main-cont4-v-cont").css("width","");
		}
		
		//head 검색창 배경 삭제
		if($(window).width() > 1024) { 		
			$('.sb_search_bg').css('display','none');
			$('.sub_search.mobile_search').css('display','none');
		} 

	});/*리사이징 닫기*/


	

	$(".map-bg > ul > li").mouseover(function(){
		$(".map-bg > ul > li > .map-v").hide();
		$(this).children(".map-v").show();
		$(this).css({"z-index":"1"});
	});
	$(".map-bg > ul > li > a").focus(function(){
		$(".map-bg > ul > li > .map-v").hide();
		$(this).next().show();
		$(this).parent().css({"z-index":"1"});
	});
	$(".map-bg > ul > li").mouseleave(function(){
		$(".map-bg > ul > li > .map-v").hide();
		$(".map-bg > ul > li").css({"z-index":"0"});
	});
	$(".map-bg > ul > li > .map-v > a.map_v_close").click(function(){
		$(".map-bg > ul > li > .map-v").hide();
		$(".map-bg > ul > li").css({"z-index":"0"});
		return false;
	});

	$('#slider001').flexslider({
		animation: "fade",
		animationLoop: true,
		smoothHeight: false,
		slideshow: true,
		slideshowSpeed:5000,
		animationSpeed: 400,
		controlNav: true,
		directionNav: true,
		prevText: "이전",
		nextText: "다음",
		pausePlay: true
	});
	
	if($("#marquee > li").size() > 0){ 
		var banTotal =  $('#marquee > li').size();
		var bannerSlider = $('#marquee').bxSlider({
			mode:'vertical',
			displaySlideQty:1,
			moveSlideQty: 1,
			captions: true,
			auto: true,
			pause: 3000,
			infiniteLoop : true,
			controls: false,
			// 2022-04-04 웹 접근성 추가
			onSliderLoad: function() {
				$(".bx-clone").find("a").prop("tabIndex","-1");
			},
			onSlideAfter: function() {
				$(".bannerSlider").children("li").each(function(){
					if($(this).attr("aria-hidden") == "false"){
						$(this).find("a").attr("tabIndex","0");
					}else {
						$(this).find("a").attr("tabIndex","-1");
					}
				});
			}
		});
		$(".bannerSlider a").focusin(function () {
			bannerSlider.stopAuto();
		})
	}

	if($("#marquee2 > li").size() > 0){ 
		var banTotal =  $('#marquee2 > li').size();
		var bannerSlider = $('#marquee2').bxSlider({
			mode:'vertical',
			displaySlideQty:1,
			moveSlideQty: 1,
			captions: true,
			auto: true,
			pause: 5000,
			infiniteLoop : true,
			controls: false
		});
	}
	
	$(".main-cont3-rt-cont1-v .bt-icon").click(function(){
		for(var i=0;i<$(".main-cont3-rt-cont1-v > ul > li").length;i++){
			$(".main-cont3-rt-cont1-v > ul > li:eq("+i+")").css({"margin-top": - 65*i})
		}
	});

	$(".quick-btn").click(function(){
		if($(this).hasClass("on")){
			$(this).animate({"right":"0px"},500);
//			$(this).next().animate({"right":"-198px"},500);
			$(this).find("~ .quick").animate({"right":"-198px"},500);
			$(this).children("img").attr("src",$(this).children("img").attr("src").replace("_off","_on"));
			$(this).attr('alt', '열람한 정보 펼치기');
			$(this).children("img").attr('alt', '열람한 정보 펼치기');
			$(this).removeClass("on");
			
			setCookie('quick','',-1);
		}else{
			$(this).animate({"right":"198px"},500);
//			$(this).next().animate({"right":"0"},500);
			$(this).find("~ .quick").animate({"right":"0"},500);
			$(this).children("img").attr("src",$(this).children("img").attr("src").replace("_on","_off"));
			$(this).attr('alt', '열람한 정보 숨기기');
			$(this).children("img").attr('alt', '열람한 정보 숨기기');
			$(this).addClass("on");
			
			setCookie('quick','click',10);
		}
	});
	// 펼치기메뉴 접근성 포커스
	$(".quick-btn").keydown(function(){
		$(this).css('right',198);
		$(this).find("~ .quick").css('right',0);
	});
	// 펼치기메뉴 접근성 블러
	$('.research_layer').keydown(function(e){
		var keycode = e.keyCode;
		if(keycode == '9') {
			$(".quick-btn").css('right',0);
			$(".quick").css('right',-198);
		}
	});
	var quickVal = getCookie('quick');
	if(quickVal == 'click'){		
		$('.quick').css('right',0);
		$('.quick-btn').css('right','198px').addClass('on').children().attr('src','/web/images/common/quick_off.gif');
	}
	
	var quickLeftVal = getCookie('quickLeft');
	if(quickLeftVal == 'click'){	
		$(".sbcenter_left").css("margin-left", "-243px");
		$(".sbcenter_right").css("width", "1140px");
		
		$(".left_menu_open > a").show();
		$(".left_menu_open").find(".on").hide();
		
	}
	

	
    // 쿠키 생성
    function setCookie(cName, cValue, cDay){
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }
 
    // 쿠키 가져오기
    function getCookie(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

	$(".main-cont4-v-a > a").click(function(){
		if($(this).hasClass("on")){
			$(".main-cont4-v-a-cont").hide();
			$(this).removeClass("on");
		}else{
			$(this).next(".main-cont4-v-a-cont").show();
			$(this).addClass("on");
		}
	});
	
	$(".main-cont4-v > ul > li > a").on('click focus',function(){
		$(".flag-cont,.main-cont4-v-cont").hide();
		$(".main-cont4-v > ul > li").removeClass("on");
		$(this).next(".main-cont4-v-cont").show();
		$(this).next().next(".flag-cont").show();
		$(this).parent().addClass("on");
		$(".main-cont4-v-a > a").text($(this).text());
	});
	//펼치기 버튼 삭제하면서 css조절
	$(".main-cont4-v-cont").css("height", "auto");
	
	$(".main-cont4-v-a-cont > a").click(function(){
		var num=$(this).index();
		$(".main-cont4-v-cont").hide();
		$(".main-cont4-v-a > a").text($(this).text());
		$(".main-cont4-v-a > a").removeClass("on");
		
		$(".main-cont4-v-a-cont").hide();
		$(".main-cont4-v > ul > li:eq("+num+") .main-cont4-v-cont").show();
		$(".main-cont4-v > ul > li").removeClass("on");
		$(".main-cont4-v > ul > li:eq("+num+")").addClass("on");
		
		return false;
	});
	
if ( $(".bannerArea").length ) bannerArea();
if ( $(".bannerArea1").length ) bannerArea1();
function bannerArea() {

	var $bannerArea = $(".bannerArea"),
		$controlArea = $bannerArea.children(".controlArea"),
		$prev = $controlArea.find(".controlPrev").children("a"),
		$next = $controlArea.find(".controlNext").children("a"),
		$play = $controlArea.find(".controlPlay").children("a"),
		$stop = $controlArea.find(".controlStop").children("a"),
		$outerWrap = $("<div />",{"class" : "outerWrap"}).appendTo($bannerArea),
		$innerWrap = $bannerArea.children(".banner").appendTo($outerWrap),
		$item = $innerWrap.find("li"),
		itemLength = $item.length,
		movingWidth = $item.first().width(),
		currentIdx = 0,
		visibleItem = 3,
		lastIdx = itemLength - visibleItem - 1,
		rollTimer,
		rollDelay = 4000,	
		clickable = true,
		rolling = true;

	if ( itemLength > visibleItem ) mainFunc();

	// mainFunc
	function mainFunc() {

		if ( rollTimer ) rollTimer;
		rollTimer = setInterval(rollingDirect, rollDelay);

		$stop.on({
			click : function() {
				clearInterval(rollTimer);
				rolling =  false;				
				return false;
			}
		});

		$play.on({
			click : function() {
				if ( !rolling ) {
					if ( rollTimer ) rollTimer;
					rollTimer = setInterval(rollingDirect, rollDelay);
				}
				return false;
			}
		});

		$prev.on({
			click : function() {
				if ( clickable ) {
					clearInterval(rollTimer);
					rolling = false;				
					rollReverse();
				}
				return false;
			}
		});

		$next.on({
			click : function() {
				if ( clickable ) {
					clearInterval(rollTimer);
					rolling = false;				
					rollingDirect();
				}
				return false;
			}
		});

	}

	// rolling
	function rollingDirect() {		
		clickable = false;
		currentIdx += 1;		
		if ( currentIdx == itemLength ) currentIdx = 0;
		$innerWrap.stop(true, true).animate({
			"margin-left" : - movingWidth
		}, 250, function() {
			$(this).find("li").first().appendTo($(this));
			$(this).css("margin-left",0);
			clickable = true;
		});
	}

	// rollReverse
	function rollReverse() {		
		clickable = false;
		currentIdx -= 1;
		if ( currentIdx < 0 ) currentIdx = $item.length - 1;
		$innerWrap.find("li").last().prependTo($innerWrap);
		$innerWrap.css("margin-left", - movingWidth);
		$innerWrap.stop(true, true).animate({
			"margin-left" : 0
		}, 250, function() {
			clickable = true;
		});
	}

	// setButton
	function setButton() {

	}
}



function bannerArea1() {

	var $bannerArea = $(".bannerArea1"),
		$controlArea = $bannerArea.children(".controlArea"),
		$prev = $controlArea.find(".controlPrev").children("a"),
		$next = $controlArea.find(".controlNext").children("a"),
		$play = $controlArea.find(".controlPlay").children("a"),
		$stop = $controlArea.find(".controlStop").children("a"),
		$outerWrap = $("<div />",{"class" : "outerWrap"}).appendTo($bannerArea),
		$innerWrap = $bannerArea.children(".banner").appendTo($outerWrap),
		$item = $innerWrap.find("li"),
		itemLength = $item.length,
		movingWidth = $item.first().width(),
		currentIdx = 0,
		visibleItem = 3,
		lastIdx = itemLength - visibleItem - 1,
		rollTimer,
		rollDelay = 500,	
		clickable = false,
		rolling = false;


	mainFunc();


	// mainFunc
	function mainFunc() {


		$stop.on({
			click : function() {
				clearInterval(rollTimer);
				rolling =  false;
				return false;
			}
		});

		$play.on({
			click : function() {
				if ( !rolling ) {
					if ( rollTimer ) rollTimer;
					rollTimer = setInterval(rollingDirect, rollDelay);
				}
				return false;
			}
		});

		$prev.on({
			click : function() {
				clickable = true;
				if ( clickable ) {
					clearInterval(rollTimer);
					rolling = false;				
					rollReverse();
				}
				return false;
			}
		});

		$next.on({
			click : function() {
				clickable = true;
				if ( clickable ) {
					clearInterval(rollTimer);
					rolling = false;				
					rollingDirect();
				}
				return false;
			}
		});

	}

	// rolling
	function rollingDirect() {		
		clickable = true;
		currentIdx += 1;		
		if ( currentIdx == itemLength ) currentIdx = 0;
		$innerWrap.stop(true, true).animate({
			"margin-top" : - movingWidth
		}, 0, function() {
			$(this).find("li").first().appendTo($(this));
			$(this).css("margin-top",0);
			clickable = true;
		});
	}

	// rollReverse
	function rollReverse() {		
		clickable = true;
		currentIdx -= 1;
		if ( currentIdx < 0 ) currentIdx = $item.length - 1;
		$innerWrap.find("li").last().prependTo($innerWrap);
		$innerWrap.css("margin-top", - movingWidth);
		$innerWrap.stop(true, true).animate({
			"margin-top" : 0
		}, 0, function() {
			clickable = true;
		});
		
	}
}



	



});/*JQuery*/


	var vbm = 100;

	function plus() {

				vbm = vbm + 10;

				if(vbm >= 500) vbm = 500;

				processes();

		}

	function processes(){

			document.body.style.zoom = vbm + '%';

		

		}

	function reset(){

		vbm = 100;

		processes();

	}

	function minus() {

			vbm = vbm - 10;

			processes();

	}
	
$(document).ready(function(){
	//gotop 버튼 작업
	$(window).scroll(function() {
		if ($(this).scrollTop()) {
			$(".gotop").fadeIn();
		} else {
		    $(".gotop").fadeOut();
		}
		//alert($("#foot").height());
		if($(window).scrollTop() + $(window).height() < $(document).height() - $(".footer").height()) {
			$('.gotop').css({"position":"fixed","bottom":"20px","right":"20px"});    //resetting it			
		}
		if($(window).scrollTop() + $(window).height() > $(document).height() - $(".footer").height()) {
			//$('.gotop').css("position","absolute"); // make it related
			if($(window).width() < 1024){
				$('.gotop').css("bottom","158px"); // 모바일
			}else{
				$('.gotop').css("bottom","130px"); // pc
			}
			
		}
	    
	});
	$(".gotop").click(function() {
		$("html, body").animate({scrollTop: 0}, 1000);
	});
	
	// 하단 롤링배너 접근성
	$('.controlPrev > a').keydown(function(){
		$('.controlStop > a').trigger('click');
	});
	// e

	// 우측하단 flexslider 접근성
    $('.slides > li > a').on('focus',function(){
    	var num = $(this).parent().index();  
    	var slider = $('#slider001').data('flexslider');
		var animationSpeed = slider.vars.animationSpeed; 	//save animation speed to reset later
		slider.vars.animationSpeed = 0;
		slider.flexAnimate(num); 							//position index for desired slide goes here
		slider.vars.animationSpeed = animationSpeed;
    });
    $('.flexslider a').on('focus',function(){
    	$('#slider001').flexslider('pause');
    });
    $('.slides > li:last-child > a').keydown(function(e){
    	var keycode = e.keyCode;
    	if(keycode == 9) $('#slider001').flexslider('play');
    });
    $('.flex-prev').keydown(function(e){
    	var keycode = e.keyCode;
    	if(keycode == 9) {
    		if(e.shiftKey) $('#slider001').flexslider('play');
    	}
    });
    // e
    
    // bannerArea 접근성
    $('.bannerArea a').on('focus',function(){
    	$('.controlStop a').trigger('click');
    });
    $('.bannerArea a').on('focus',function(){
    	$('.controlStop .banner > li:last-child > a').keydown(function(e){
    		var keycode = e.keyCode;
    		bannerArea();
    	});
    });
    // e
    
    //20171218 접근성 추가
    $(".btn_skip").click(function(){
		$("#search-ipt").focus();
	});
    
    // left_menu 웹접근성 
    $(".left_menu_open > a > img:eq(0)").attr('alt', '메뉴 숨기기');
    $(".left_menu_open > a > img:eq(1)").attr('alt', '메뉴 펼치기');


});

$(document).ready(function(){
	// 메인 지도 팝업 제어
	$( '.map_pin ul li a' ).click( function() {
		$(this).siblings('.pin_pop').css('display','block');
		$(this).parent().siblings().find('.pin_pop').css('display','none');
		return false;
	});
	$( '.map_p_close' ).click( function() {
		$(this).parent('.pin_pop').css('display','none');
		$(this).parent().siblings('a').focus();
		return false;
	});
});




// 롤링 알림판 제어
$(document).ready(function(){
	$('.mn_gallery').flexslider({
		animation: "fade",
		slideshow: true,
		slideshowSpeed:5000,
		animationSpeed: 400,
		animationLoop: true,
		directionNav:true,
		prevText:"이전",
		nextText:"다음",
		pausePlay:true
	});


});













