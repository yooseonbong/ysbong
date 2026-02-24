
$(function(){
	//달력
	$('.datepicker').datepicker({
		showOn: 'both',
		buttonImage: './images/btn_date.png',
		buttonText: '날짜 선택'
	});


	//파일찾기
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
	
    //tab 소스
	var tabMenu = $('.tab_area');
	
	//문서를 불러올때 탭의 컨텐츠의 크기의 따라 탭의 height값 주기
	var $optionDiv = $('.tab_area ul li.active .tab_article');
	var $subtable = $('.tab_area');
	$subtable.css('height', $optionDiv.height()+85);

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
		$subtable.css('height', $optionDiv.height()+85);
	}

	tabMenu.find('ul > li > a').click(tabList).focus(tabList);
	tabMenu.find('ul > li > a').focusin(tabList).focus(tabList);    



});



