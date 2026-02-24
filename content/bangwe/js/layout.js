


//nav 포커스 이동시 여닫기
$(function(){
	$('#nav > ul > li > a').focus(function() {
		$(this).siblings('.depth2').css('display', 'block');
		$(this).parent().siblings().children('.depth2').css('display', 'none');
	});
	$('#nav > ul > li:last > .depth2 ul li:last').focusout(function() {
		$('.depth2').css('display', 'none');
	});
});


//main 검색박스
$(function(){
	$('.srchTitle a').click(function(){
		if ($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			$(this).removeClass('on');
			$(this).siblings('.select_list').css('display','none');
		} else {
			$(this).parent().addClass('active');
			$(this).addClass('on');
			$(this).siblings('.select_list').css('display','block');
		}
	});

	$('.srchTitle').mouseleave(function () {
		$(this).removeClass('active');
		$(this).children('.srchTitleBtn').removeClass('on');
		$(this).children('.select_list').css('display','none');
    });

	$('.select_list ul li:last').focusout(function() {
		$(this).parents('.srchTitle').removeClass('active');
		$(this).parents('.srchTitle').siblings('.quick_link').removeClass('on');
		$(this).parents('.select_list').css('display', 'none');
	});
});

//이번주 시행법령 탭소스 
$(function(){
	$( document ).ready(function() {
		var tabMenu = $('.dayTab');

		//컨텐츠 내용을 숨긴다
		tabMenu.find('ul > li > .dayCont').hide();
		tabMenu.find('li.active > .dayCont').show();

		function tabList(e){
			e.preventDefault();       //#의 기능을 차단
			var target = $(this);
			target.next().show().parent('li').addClass('active').siblings('li').removeClass('active').find('.dayCont').hide();
			//버튼을 클릭하면 ~ div를 보여주고
			//부모의 li 태그에 클래스 추가하고
			//형제의 li 태그에 클래스 제거하고
			//제거한 자식의 div 태그를 숨겨줍니다
		}

		tabMenu.find('ul > li > a').click(tabList).focus(tabList);
		tabMenu.find('ul > li > a').focusin(tabList).focus(tabList);
	});
	
	//이번주 시행법령 화살표 롤링
	$('.week-next').click(function() {
		var $el = $('.dayTab > ul > li.active').removeClass('active');
		var $next = $el.next();

		$el.children('.dayCont').css('display','none');

		if ($next.length == 0)
			$next = $('.dayTab > ul > li').first();

		$next.addClass('active');
		$next.children('.dayCont').css('display','block');
	});
	
	
	$('.week-prev').click(function() {
		var $el = $('.dayTab > ul > li.active').removeClass('active');
		var $prev = $el.prev();

		$el.children('.dayCont').css('display','none');

		if ($prev.length == 0)
			$prev = $('.dayTab > ul > li').last();

		$prev.addClass('active');
		$prev.children('.dayCont').css('display','block');
	});
});


//footer 관련기관 바로가기
$(function(){
	$('.quick a').click(function(){
		if ($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			$(this).removeClass('on');
			$(this).siblings('.select_list').css('display','none');
		} else {
			$(this).parent().addClass('active');
			$(this).addClass('on');
			$(this).siblings('.select_list').css('display','block');
		}
	});
	
	$('.quick').mouseleave(function () {
		$(this).removeClass('active');
		$(this).children('.srchTitleBtn').removeClass('on');
		$(this).children('.select_list').css('display','none');
    });

	$('.select_list li:last').focusout(function() {
		$(this).parent().parent().removeClass('active');
		$(this).parent().siblings('.quick_link').removeClass('on');
		$(this).parent().css('display', 'none');
	});







});








