// 2depth 여닫기

$(function(){
	$('#snb > ul > li > a').on( 'mousedown', function() {
		$(this).parent().children('.depth2').slideToggle();
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
		}else {
			$(this).parent().addClass('on');
			$(this).parent().siblings('li').removeClass('on');
			$(this).parent().siblings('li').children('.depth2').slideUp();
		}
	});
});

// 포커스 이동시 2depth 여닫기
$(function(){
	$('#snb > ul > li > a').on( 'focusin', function() {
		$(this).parent().addClass('on');
		$(this).parent().siblings('li').removeClass('on');
		$(this).parent().siblings('li').children('.depth2').slideUp();
		
	});
	$('#snb > ul > li:last > .depth2 ul li:last').on( 'focusout', function() {
		$(this).parents('.depth2').slideUp();
		$(this).parents().removeClass('on');
		 
	});
});


// snb height 
$(function(){
	resizeContents();
	// 레프트 메뉴와 컨텐츠의 높이를 문서의 높이에서 헤더 부분을 뺀 크기로 지정한다.
	function resizeContents() {
		var $optionDiv = $('#wrap');
		
		//공통 left 메뉴 height
		var $subtable = $('#snb');
		$subtable.css('height', $optionDiv.height()+0);
	}
});
//datepicker
$(function(){
	$('#date1').datepicker({
		showOn: 'both',
		buttonImage: './images/bg_datapicker.png',
		buttonText: '날짜 선택',
		dateFormat: 'yy.mm.dd'
	});
	$('#date2').datepicker({
		showOn: 'both',
		buttonImage: './images/bg_datapicker.png',
		buttonText: '날짜 선택',
		dateFormat: 'yy.mm.dd'
	});
});

//파일찾기 소스
$(function(){
	var fileTarget = $('#filebox .upload-hidden'); 
	fileTarget.on('change', function(){ // 값이 변경되면
		if(window.FileReader){ // modern browser 
			var filename = $(this)[0].files[0].name; 
		} 
		else { // old IE 
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
		} 
		$(this).siblings('.upload-name').val(filename); // 추출한 파일명 삽입 
	});
});