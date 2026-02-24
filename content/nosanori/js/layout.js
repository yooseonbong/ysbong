// left 메뉴 여닫기
$(function(){
	$('.b-colse').click(function(){
		if ($('#snb').hasClass('active')){
			$('#snb').removeClass('active');
			$('#contents').removeClass('active'); 
			$(this).removeClass('active'); 
			$(this).text('메뉴 닫기');
			
		} else {
			$('#snb').addClass('active');
			$('#contents').addClass('active');
			$(this).addClass('active'); 
			$(this).text('메뉴 열기');
		}
		
	});
});


//  left 메뉴 탭
$(function(){
	var tabMenu = $('.snbTab');
	//컨텐츠 내용을 숨긴다
	tabMenu.find('ul > li > .tab_cont').hide();
	tabMenu.find('li.active > .tab_cont').show();

	function tabList(e){
	  e.preventDefault();       //#의 기능을 차단
	  var target = $(this);
	  target.next().show().parent('li').addClass('active').siblings('li').removeClass('active').find('.tab_cont').hide();
	  //버튼을 클릭하면 ~ div를 보여주고
	  //부모의 li 태그에 클래스 추가하고
	  //형제의 li 태그에 클래스 제거하고
	  //제거한 자식의 div 태그를 숨겨줍니다
	}

	tabMenu.find('ul.tab_list > li > a').click(tabList).focus(tabList);
	tabMenu.find('ul.tab_list > li > a').focusin(tabList).focus(tabList);
});


//left 3depth 아코디언
$(function(){
	$('.snb_list ul li a').click(function(){
		if ($(this).parent('li').hasClass('on')){
			$(this).parent('li').removeClass('on');
		} else {
			$(this).parent('li').addClass('on');
		}
	});
});

//페이지 타이틀 즐겨찾기 아이콘 이미지 변경
$(function(){
	$('.page_title button').on('click', function(e){
		var $this = $(this); //element e
		$this.find('img').attr('src', function(index, attr){
			if (attr.match('_on')){
				return attr.replace('_on.png', '_off.png');
			} else {
				return attr.replace('_off.png', '_on.png');
			}
		});

		$this.find('img').attr('alt', function(index, attr){
			if (attr.match('즐겨찾기 추가')){
				return attr.replace('즐겨찾기 추가', '즐겨찾기 해제');
			} else {
				return attr.replace('즐겨찾기 해제', '즐겨찾기 추가');
			}
		});
	});
});

//datepicker
$(function(){
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
});

//참고사항 여닫기
$(function(){
	$('.referenceBox button').click(function(){
		if ($(this).parent('.referenceBox').hasClass('close')){
			$(this).parent('.referenceBox').removeClass('close');
			$(this).children('span').text('참고사항 닫기');
		} else {
			$(this).parent('.referenceBox').addClass('close');
			$(this).children('span').text('참고사항 보기');
		}
	});
});

//테이블 스크롤
$(function () {
        // divBodyScroll의 스크롤이 동작할때에 함수를 불러옵니다.
        $('#divBodyScroll').scroll(function () {
            // divBodyScroll의 x좌표가 움직인 거리를 가져옵니다.
            var xPoint = $('#divBodyScroll').scrollLeft();
 
            // 가져온 x좌표를 divHeadScroll에 적용시켜 같이 움직일수 있도록 합니다.
            $('#divHeadScroll').scrollLeft(xPoint);
        });
 
        // 처음에 divBodyScroll의 세로스크롤 너비를 알수 없기 때문에
        // 스크롤을 우측으로 최대한 움직인 후 버튼을 눌러 두 스크롤의 차이를 찾아서 그 크기 만큼 tblHead의 공백 Column의 width를 지정해줍니다.
        $('#btnCheck').click(function () {
            var headMaximum = $('#divHeadScroll').scrollLeft();
            var bodyMaximum = $('#divBodyScroll').scrollLeft();
 
            alert('head: ' + headMaximum + '\nbody: ' + bodyMaximum);
        });
    });




