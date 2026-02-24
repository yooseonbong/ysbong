//문답 유형선택 탭소스
$(function(){
	$('.tab_area > ul > li > a').on('click', function() {
		if($(this).parent('li').hasClass('on')){
		}else {
			$(this).parent('li').addClass('on');
			$(this).parent('li').siblings('li').removeClass('on');
		}
		return false
	});
});


//진술조서작성 문답 여닫기
$(function(){
	$('.accordion_list > ul > li > a').on('click', function() {
		if($(this).parent('li').hasClass('active')){
			$(this).parent('li').removeClass('active');
		}else {
			$(this).parent('li').addClass('active');
		}
		return false
	});
});


//문답 추가 팝업
$(function(){
	$('.pop_open').click(function(){
		if($(this).hasClass('active')){
			$('#pop_layer').css('display','none');
			$(this).removeClass('active');
		}else {
			$('#pop_layer').css('display','block');
			$(this).addClass('active');
		}
		
		
	});
});

//팝업닫기
$(function(){
	$('.pop_close').click(function(){
		$('#pop_layer').css('display','none');
		$('.pop_open').removeClass('active');
	});
});


//datepicker
$(function(){
	$('.date').datepicker({
		showOn: 'both',
		buttonImage: './images/btn_date.png',
		buttonText: '날짜 선택',
		changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
		changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
	});
});

//마우스 over 팝업 이벤트
$(function(){
    $('.in_depth ul li label').mouseenter(function () {
        $(this).children('.over-pop').css('display', 'block');
    });
    $('.in_depth ul li label').mouseleave(function () {
        $(this).children('.over-pop').css('display', 'none');
    });


});











