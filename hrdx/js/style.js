//modal
function openModal(modalname){
	if ($("." + modalname).hasClass("alramPopup")){
		$("." + modalname).fadeIn(300);
	} else {
		$(".modalBg").fadeIn(300);
		$("." + modalname).fadeIn(300);
	}
}

$(".modalBg, .closePop").on('click',function(){
	$(".modalBg").fadeOut(300);
	$(".modalContents").fadeOut(300);
});

//alret
function openAlret(alretname){
	$(".alretBg").fadeIn(300);
	$("." + alretname).fadeIn(300);

}

$(".closeAlret").on('click',function(){
	$(".alretBg").fadeOut(300);
	$(".alretContents").fadeOut(300);
});	

//select
$(function(){
	$('.selectInner button').click(function(){
		if ($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			$(this).removeClass('on');
			$(this).siblings('.selectOption').css('display','none');
		} else {
			$(this).parent().addClass('active');
			$(this).addClass('on');
			$(this).siblings('.selectOption').css('display','block');
		}
	});
	$('.selectInner').mouseleave(function(){
			$(this).removeClass('active');
			$(this).children('button').removeClass('on');
			$(this).children('.selectOption').css('display','none');
	});
});

//combobox
$(function(){
	$('.combobox button').click(function(){
		if ($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			$(this).removeClass('on');
			$(this).siblings('.comboOption').css('display','none');
		} else {
			$(this).parent().addClass('active');
			$(this).addClass('on');
			$(this).siblings('.comboOption').css('display','block');
		}
	});
	$('.comboInner').mouseleave(function(){
			$(this).removeClass('active');
			$(this).children('button').removeClass('on');
			$(this).children('.comboOption').css('display','none');
	});
	$('.comboOption ul li label').hover(function(){
		if ($(this).children('input').attr('disabled')){
			$(this).css('cursor','default');
		} else {
	
		}
	});
});


//스위치
$(function(){
	
	$('.srhRadio input[type="radio"]').click(function(){
		var id_check = $(this).attr("class");

		$(id_check).css('display', "flex");
		$(id_check).siblings('.keywordContInner').css('display','none');
			alert(id_check);

	});
});


//☆ 관심 저장
$(function(){
	$('.mbookMark').on('click', function(){
		if ($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).html('저장').attr('title','저장');
		} else {
			$(this).addClass('active');
			$(this).html("해제").attr('title','해제');
		}
	
	});
});


//마우스 over 팝업 이벤트
$(function(){
    $('.icView1').mouseenter(function () {
        $(this).children('.icView1Pop').css('display', 'block');
    });
    $('.icView1').mouseleave(function () {
        $(this).children('.icView1Pop').css('display', 'none');
    });
	$('.iconState1').mouseenter(function () {
        $(this).children('.icView1Pop').css('display', 'block');
    });
    $('.iconState1').mouseleave(function () {
        $(this).children('.icView1Pop').css('display', 'none');
    });
	$('.iconState3 ul li').mouseenter(function () {
        $(this).children('.icView1Pop').css('display', 'block');
    });
    $('.iconState3 ul li').mouseleave(function () {
        $(this).children('.icView1Pop').css('display', 'none');
    });
	$('.inforgtList ul li').mouseenter(function () {
        $(this).children('.icView1Pop').css('display', 'block');
    });
    $('.inforgtList ul li').mouseleave(function () {
        $(this).children('.icView1Pop').css('display', 'none');
    });
	$('.inforgTxt').mouseenter(function () {
        $(this).children('.icView1Pop').css('display', 'block');
    });
    $('.inforgTxt').mouseleave(function () {
        $(this).children('.icView1Pop').css('display', 'none');
    });

	$('.treeList .dep3 .depInner').mouseenter(function () {
        $(this).children('.icView1Pop').css('display', 'block');
    });
    $('.treeList .dep3 .depInner').mouseleave(function () {
        $(this).children('.icView1Pop').css('display', 'none');
    });
});


 
//조직 발령 이력 가로 스크롤
$(function(){
	var swiper = new Swiper(".infohisList", {
		slidesPerView: "auto",  
		spaceBetween: 0, 
		resistanceRatio: 0, 
		observer: true, // 팝업 오류
		observeParents: true, // 팝업 오류
	  	freeMode: true,
		scrollbar: {
		el: ".infohisList-scroll",
		hide: true,
		},
	});
});


//서비스 퀵가이드
$(function(){
	var swiper = new Swiper(".guideSlide", {
		spaceBetween: 30,
		effect: "fade",
		observer: true, // 팝업 오류
		observeParents: true, // 팝업 오류
		fadeEffect: { crossFade: true },
		navigation: {
		  nextEl: ".swiper-button-next",
		  prevEl: ".swiper-button-prev",
		},
		pagination: {
		  el: ".guide-pagination",
		  debugger: true,
		},
		touchRatio: 0,
	  });
});

//서비스 퀵가이드 - 카드 선택
$(".swiper-slide ul li.chartCard").click(function () {
	$(this).addClass("active");
	$(this).siblings().removeClass("active");
	$(".buttonsSection button:disabled").css("display", "none");
	$(".buttonsSection button.swiper-button-next").css("display", "block");
});


//인재 비교하기
//$(function(){
//	var swiper = new Swiper(".comparisonList", {
//		slidesPerView: "auto",  
//		spaceBetween: 0, 
//		resistanceRatio: 0, 
//		observer: true, // 팝업 오류
//		observeParents: true, // 팝업 오류
//		freeMode: true,
//		scrollbar: {
//		el: ".swiper-scrollbar",
//		hide: true,
//		},
//	});
//});

//Team 직무Link
$(function(){
var swiper = new Swiper(".tdGrid", {
	slidesPerView: "auto",  
	spaceBetween: 0, 
	resistanceRatio: 0, 
	observer: true, // 팝업 오류
	observeParents: true, // 팝업 오류
	
	scrollbar: {
	  el: ".tdGrid-scroll",
	  hide: true,
	},
  });
});


//조직 핵심업무 상세
$(function(){
	var lnbUI = {
		clickE: function(target, speed) {
			// var _self = this;
			var $target = $(target);
			// _self.speed = speed || 300;
			
			$target.each(function() {
				if($(this).find('> ul').length > 0) {
					return true;
				}
				$(this).addClass('noDepth');
			});
			
			$target.on('click', 'a', function() {
				var $this = $(this);
				var $depthTarget = $this.next(); // ul
				var $siblings = $this.parent().siblings(); // li
				
				if(!$this.parent('li').hasClass('noDepth')) {
					$this.parent('li').find('ul li').removeClass('active');
					$siblings.removeClass('active');
					$this.parent('li').find('ul').slideUp();
					$siblings.find('ul').css('display','none');
					if($depthTarget.css('display') == 'none') {
						$depthTarget.css('display','block');
						$this.parent().addClass('active');
					} else {
						$depthTarget.css('display','none');
						$this.parent().removeClass('active');
					}
				} else {
					console.log('noDepth');
				}
				return false;
			});            
		}
	}  
	lnbUI.clickE('.coreList ul li', 300);
});


//올해 업무 positioing > 구성원
$(function(){
	$('.positioingList > ul > .pSelect > a').on( 'mousedown', function(event) {
		$(this).parent().children('.pSelectOption').slideToggle();
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
		}else {
			$(this).parent().addClass('active');
			$(this).parent().parent().siblings().children('.pSelect').removeClass('active');
			$(this).parent().parent().siblings().children('.pSelect').children('.pSelectOption').slideUp();
		}
		event.preventDefault();
	});
});



// 조직 구성원 - 이름으로 검색
$(function(){
	$('.headSrh .inner input').on( 'keydown', function() {
		$(this).siblings('.SrcList').css('display', 'block');
	});

	$('.headSrh ul li a').on( 'click', function() {
		$(this).parents('.SrcList').css('display', 'none');
	});

    $('.headSrh .inner input').on( 'focusout', function() {
		$(this).siblings('.SrcList').css('display', 'none');
		$(this).parent().removeClass('active');
	});

	$('.headSrh .inner input').on( 'click', function() {
		$(this).parent().addClass('active');
	});
});


//조직 구성원 - 조직원 리스트 슬라이드
$(function(){
	var swiper = new Swiper(".compositionList", {
		slidesPerView: "auto",  
		loop: false,
		spaceBetween: 0, 
		resistanceRatio: 0, 
		navigation: {
			nextEl: ".composition-button-next",
			prevEl: ".composition-button-prev",
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: false,
		},
		touchRatio: 0,
	});
});

//육성프로그램 - 교육 영상 슬라이드
$(function(){
	var swiper = new Swiper(".tableInnerSection", {
		slidesPerView: "auto",  
		spaceBetween: 12,
		loop: false,
		resistanceRatio: 0, 
		observer: true, // 팝업 오류
		observeParents: true, // 팝업 오류
		navigation: {
			nextEl: ".tableInne-button-next",
			prevEl: ".tableInne-button-prev",
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: false,
		},
		touchRatio: 0,
	});
});

//Positionaing 수정
$(function(){
	$('.popBotBtn .next').on('click', function(){
		$(this).parent().parent().css("display","none");
		$(this).parent().parent().siblings().css("display","flex");
	});

	$('.popBotBtn .prve').on('click', function(){
		$(this).parent().parent().css("display","none");
		$(this).parent().parent().siblings().css("display","flex");
	});

});

// Career Advisor 활용 가이드 (서비스 퀵가이드 = 랜딩)
$(function () {
	$(".tab_content").css("display", "none");
	$(".tab_content:first").css("display", "block");

	$("ul.tabs li").click(function () {
			$("ul.tabs li").removeClass("active");
			$(this).addClass("active");
			$(".tab_content").hide()
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).css("display", "block");
	});
});







