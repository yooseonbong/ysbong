
$(function(){
	//3depth 여닫기
	$('#lnb > ul > li > .depth2 > ul > li ').on('click', function() {
		$(this).children('.depth3').slideToggle();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else {
			$(this).addClass('on');
			$(this).siblings('li').removeClass('on');
			$(this).siblings('li').children('.depth3').slideUp();
		}
	});
	
	//포커스 이동시 여닫기
	$('#lnb > ul > li > a').focus(function() {
		$(this).siblings('.depth2').css('display', 'block');
		$(this).parent().siblings().children('.depth2').css('display', 'none');
	});
	$('#lnb > ul > li:last > .depth2 ul li:last').focusout(function() {
		$('.depth2').css('display', 'none');
	});

	//마우스 이동했을때 3depth 닫기
	$('#lnb > ul > li ').mouseleave(function() {
		$('.depth3').css('display', 'none');
		$('.dep3_box').removeClass('on');
	});

	//메인 3depth 여닫기
	$('.main_lnb > ul > li > .depth2 > ul > li ').on('click', function() {
		$(this).children('.depth3').slideToggle();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else {
			$(this).addClass('on');
			$(this).siblings('li').removeClass('on');
			$(this).siblings('li').children('.depth3').slideUp();
		}
	});

	//메인 포커스 이동시 여닫기
	$('.main_lnb > ul > li > a').focusin(function() {
		$(this).parent().addClass('on');
		$(this).parent().siblings().removeClass('on');
		$(this).siblings('.depth2').css('display', 'block');
		$(this).parent().siblings().children('.depth2').css('display', 'none');
	});

	$('.main_lnb > ul > li:last > .depth2 ul li:last').focusout(function() {
		$('.depth2').css('display', 'none');
	});
	
	//메인 마우스 이동했을때 3depth 닫기
	$('.main_lnb > ul > li ').mouseleave(function() {
		$('.depth3').css('display', 'none');
		$('.dep3_box').removeClass('on');
	});



	//datepicker

	$('#date1').datepicker({
		showOn: 'both',
		buttonImage: './images/btn_date.png',
		buttonText: '날짜 선택'
	});
	$('#date2').datepicker({
		showOn: 'both',
		buttonImage: './images/btn_date.png',
		buttonText: '날짜 선택'
	});
	$('#date3').datepicker({
		showOn: 'both',
		buttonImage: './images/btn_date.png',
		buttonText: '날짜 선택'
	});



	
   //right메뉴 있을때와 없을때
	$('.snb').find(function() {
		if($('.snb').length > 0){
			$('.article').addClass('snb_page')
		}else {
			
		}
	});
	
	//tab 소스
	var tabMenu = $('.tab_area');
	
	//문서를 불러올때 탭의 컨텐츠의 크기의 따라 탭의 height값 주기
	var $optionDiv = $('.tab_area ul li.active .tab_article');
	var $subtable = $('.tab_area');
	$subtable.css('height', $optionDiv.height()+40);

	//컨텐츠 내용을 숨긴다
	tabMenu.find('ul > li > .tab_article').hide();
	tabMenu.find('li.active > .tab_article').show();

	function tabList(e){
		e.preventDefault();       //#의 기능을 차단
		var target = $(this);
		target.next().show().parent('li').addClass('active').siblings('li').removeClass('active').find('.tab_article').hide();
		//버튼을 클릭하면 ~ div를 보여주고
		//부모의 li 태그에 클래스 추가하고
		//형제의 li 태그에 클래스 제거하고
		//제거한 자식의 div 태그를 숨겨줍니다
		
		//탭 클릭할때마다 컨텐츠의 크기의 따라 탭의 height값 변화
		var $optionDiv = $('.tab_area ul li.active .tab_article');
		var $subtable = $('.tab_area');
		$subtable.css('height', $optionDiv.height()+40);
	}

	tabMenu.find('ul > li > a').click(tabList).focus(tabList);
	tabMenu.find('ul > li > a').focusin(tabList).focus(tabList);



	
           



});



