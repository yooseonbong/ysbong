//레이어 팝업
document.addEventListener('DOMContentLoaded', () => {
  const popupBtns = document.querySelectorAll('[aria-haspopup="dialog"]');
  const popupCloseBtns = document.querySelectorAll('[popup-close]');
  const popups = document.querySelectorAll('[role="dialog"]');

  let focusStack = []; // 팝업 열릴 때마다 trigger 버튼 저장
  let popupDepth = 0;
  let dimmed = null;

  // dimmed 생성
  const createDimmed = () => {
    if (!dimmed) {
      dimmed = document.createElement('div');
      dimmed.className = 'popup-dimmed2';
      dimmed.addEventListener('click', popupCloseAll);
      document.body.appendChild(dimmed);
    }
  };

  // 단일 팝업 열기
  const popupOpen = (e) => {
    const trigger = e.target.closest('button, a');
    if (!trigger) return;

    const popupId = trigger.getAttribute('data-popup') || trigger.getAttribute('popup-open');
    const popupEl = document.querySelector(`.wrap-layer-popup[data-popup='${popupId}']`);
    if (!popupEl) return;

    createDimmed();

    popupDepth++;
    focusStack.push(trigger);

    popupEl.classList.add('popup-open');
    popupEl.removeAttribute('inert');
    popupEl.setAttribute('aria-hidden', 'false');
    popupEl.setAttribute('popup-depth', popupDepth);

    // 타이틀에 포커스
    const title = popupEl.querySelector('.wrap-layer-popup-title');
    if (title) title.focus();

    document.body.classList.add('scroll-lock');

    // 이전 팝업 dimmed 처리
    if (popupDepth > 1) {
      const prevPopup = document.querySelector(`.wrap-layer-popup[popup-depth='${popupDepth - 1}']`);
      if (prevPopup) prevPopup.classList.add('prev-popup');
    }
  };

  // 단일 팝업 닫기
  const popupClose = (popupEl) => {
    if (!popupEl) return;

    // 1️⃣ 닫기 버튼 focus 제거
    const closeBtn = popupEl.querySelector('.btn-layer-close');
    if (closeBtn === document.activeElement) closeBtn.blur();

    // 2️⃣ 이전 trigger 버튼 또는 body로 focus 이동
    if (focusStack.length) focusStack.pop().focus();
    else document.body.focus();

    // 3️⃣ inert + aria-hidden 적용
    requestAnimationFrame(() => {
      popupEl.classList.remove('popup-open');
      popupEl.setAttribute('aria-hidden', 'true');
      popupEl.setAttribute('inert', 'true');
      popupEl.removeAttribute('popup-depth');
      popupEl.classList.remove('prev-popup');

      popupDepth = Math.max(0, popupDepth - 1);

      // dimmed 처리
      const openPopups = document.querySelectorAll('.popup-open');
      if (!openPopups.length && dimmed) {
        dimmed.remove();
        dimmed = null;
        document.body.classList.remove('scroll-lock');
      } else if (openPopups.length) {
        const lastPopup = openPopups[openPopups.length - 1];
        lastPopup.classList.remove('prev-popup');
      }
    });
  };

  // 모든 팝업 닫기
  const popupCloseAll = () => {
    const openPopups = document.querySelectorAll('.popup-open');
    openPopups.forEach(popupEl => popupClose(popupEl));
    $('.popup-dimmed2').remove();
  };

  // 팝업 열기 버튼 클릭
  popupBtns.forEach(btn => btn.addEventListener('click', popupOpen));

  // 팝업 닫기 버튼 클릭
  popupCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.getAttribute('popup-close-all') === 'true') return popupCloseAll();
       $('.popup-dimmed2').remove();
      const popupId = btn.getAttribute('popup-close');
      const popupEl = document.querySelector(`.wrap-layer-popup[data-popup='${popupId}']`);
      popupClose(popupEl);
    });
  });

  // ESC 키로 마지막 팝업 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openPopups = document.querySelectorAll('.popup-open');
      if (openPopups.length) {
        const lastPopup = openPopups[openPopups.length - 1];
        popupClose(lastPopup);
      }
    }
  });
});


$(document).ready(function () {

  

 //aside
  var screenWidth = $(window).width();
  $('.ki-header-open button').click(function(){
    if($(this).parent().parent().parent().hasClass('active')){
      $(this).parent().parent().parent().removeClass('active');
      $(this).parent().parent().parent().parent('#ki-wrap').removeClass('active');
      $('#ki-wrap').removeClass('active');
      if (screenWidth < 1024) {
        $('.popup-dimmed').remove();
      } else {
          
      }
    }else {
      $(this).parent().parent().parent().addClass('active');
      $(this).parent().parent().siblings('.ki-header').addClass('active');
      $(this).parent().parent().parent().parent('#ki-wrap').addClass('active');
      if (screenWidth < 1024) {
        $('body').append("<div class='popup-dimmed'></div>");
        $('#ki-wrap').removeClass('active');
      } else {
         $('#ki-wrap.active').removeClass('active');  
      }
      
    }
  });

  //aside
  $('.ki-aside .dep2 li a').click(function(){
    if($(this).parent().hasClass('active')){
      $(this).parent().removeClass('active');
    }else {
      $(this).parent().addClass('active');
    }
    
  });

  //aside
  $(window).on('resize', function(){
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 1025) {
     $('.ki-header').removeClass('active');
     $('#ki-wrap').removeClass('active');
     $('.popup-dimmed').remove(); 
    } else if (newWindowWidth > 1025) {
      $('.popup-dimmed').remove();
      
    }
  });


  // swiper - 메인
  var swiper = new Swiper('.ki-main-swiper', {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 8, 
    resistanceRatio: 0, 
    navigation: {
      nextEl: '.main-swiper-next',
      prevEl: '.main-swiper-prev',
    },
    breakpoints: {
      // 760 이상에서는 3개의 슬라이드를 보여줌
      760: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      // 1024 이상에서는 3개의 슬라이드를 보여줌
      1024: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      // 1300 이상에서는 5개의 슬라이드를 보여줌
      1300: {
        slidesPerView: 4,
        spaceBetween: 16
      }
    }
  });

  // swiper - 메인
  var swiper = new Swiper('.ki-use-swiper', {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 8, 
    resistanceRatio: 0, 
  });
  
  // swiper - 슬기로운 활용법
  const swiperContainer = document.querySelector('.ki-category-swiper');

  const kiTypeSwiper = new Swiper('.ki-category-swiper', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 8,
    on: {
      reachEnd: () => {
        swiperContainer.classList.add('is-end');
      },
      fromEdge: () => {
        swiperContainer.classList.remove('is-end');
      }
    }
  });

  
  // textarea 글자수 제한
  $('.textarea-count').on('input', function () {
    const maxLength = 100;
    const content = $(this).val();

    // 공백(띄어쓰기, 탭, 줄바꿈 등) 제거한 글자만 계산
    const textWithoutSpaces = content.replace(/\s/g, '');
    const currentLength = textWithoutSpaces.length;

    // 글자수 표시 (현재 textarea 바로 다음 .textCount만 변경)
    $(this).siblings('.ki-textarea-count').find('.textCount').text(currentLength);

    // 글자수 제한
    if (currentLength > maxLength) {
      // 공백 제외 글자 기준으로 자르기
      let trimmed = '';
      let count = 0;

      for (let i = 0; i < content.length; i++) {
        if (!/\s/.test(content[i])) count++;
        if (count > maxLength) break;
        trimmed += content[i];
      }

      $(this).val(trimmed);
      $(this).siblings('.ki-textarea-count').find('.textCount').text(maxLength);
      alert('글자수는 공백 제외 100자까지 입력 가능합니다.');
    }
  });

  $('.textarea-count2').on('input', function () {
    const maxLength = 1000;
    const content = $(this).val();

    // 공백(띄어쓰기, 탭, 줄바꿈 등) 제거한 글자만 계산
    const textWithoutSpaces = content.replace(/\s/g, '');
    const currentLength = textWithoutSpaces.length;

    // 글자수 표시 (현재 textarea 바로 다음 .textCount만 변경)
    $(this).siblings('.ki-textarea-count').find('.textCount').text(currentLength);

    // 글자수 제한
    if (currentLength > maxLength) {
      // 공백 제외 글자 기준으로 자르기
      let trimmed = '';
      let count = 0;

      for (let i = 0; i < content.length; i++) {
        if (!/\s/.test(content[i])) count++;
        if (count > maxLength) break;
        trimmed += content[i];
      }

      $(this).val(trimmed);
      $(this).siblings('.ki-textarea-count').find('.textCount').text(maxLength);
      alert('글자수는 공백 제외 1000자까지 입력 가능합니다.');
    }
  });
  $('.textarea-count3').on('input', function () {
    const maxLength = 500;
    const content = $(this).val();

    // 공백(띄어쓰기, 탭, 줄바꿈 등) 제거한 글자만 계산
    const textWithoutSpaces = content.replace(/\s/g, '');
    const currentLength = textWithoutSpaces.length;

    // 글자수 표시 (현재 textarea 바로 다음 .textCount만 변경)
    $(this).siblings('.ki-textarea-count').find('.textCount').text(currentLength);

    // 글자수 제한
    if (currentLength > maxLength) {
      // 공백 제외 글자 기준으로 자르기
      let trimmed = '';
      let count = 0;

      for (let i = 0; i < content.length; i++) {
        if (!/\s/.test(content[i])) count++;
        if (count > maxLength) break;
        trimmed += content[i];
      }

      $(this).val(trimmed);
      $(this).siblings('.ki-textarea-count').find('.textCount').text(maxLength);
      alert('글자수는 공백 제외 500자까지 입력 가능합니다.');
    }
  });
  
  // select 박스
  const selectBoxElements = document.querySelectorAll(".select");

  function toggleSelectBox(selectBox) {
    const isActive = selectBox.classList.contains("active");
    document.querySelectorAll(".select.active").forEach(box => box.classList.remove("active"));
    if (!isActive) selectBox.classList.add("active");
  }

  function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const selectedElement = selectBox.querySelector(".selected-value");
    selectedElement.textContent = optionElement.textContent;
    selectBox.classList.add("selected-option");
    selectBox.classList.remove("active");

    selectBox.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    const liElement = optionElement.closest('li');
    if (liElement) liElement.classList.add('active');
  }

  selectBoxElements.forEach(selectBoxElement => {
    selectBoxElement.addEventListener("click", function(e) {
      let optionElement = null;

      // 1. 클릭한 요소가 .option이면 그대로
      if (e.target.classList.contains('option')) {
        optionElement = e.target;
      }
      // 2. 클릭한 요소가 .option 안쪽에 있을 경우 상위 .option 찾기
      else {
        optionElement = e.target.closest('.option');
      }

      // 3. 만약 클릭한 요소가 <a> 안쪽이고 .option을 찾지 못하면 <a> 안의 .option 선택
      if (!optionElement) {
        const aTag = e.target.closest('a');
        if (aTag && selectBoxElement.contains(aTag)) {
          optionElement = aTag.querySelector('.option') || aTag; // .option 있으면 사용, 없으면 aTag 자체
        }
      }

      // 최종 optionElement가 있으면 선택
      if (optionElement && selectBoxElement.contains(optionElement)) {
        e.preventDefault();
        selectOption(optionElement);
        return;
      }

      // select 박스 열기/닫기
      toggleSelectBox(selectBoxElement);
    });
  });

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', e => {
    selectBoxElements.forEach(box => {
      if (!box.contains(e.target)) box.classList.remove('active');
    });
  });

  // 셀렉트 박스 닫기
  $(document).on('click', function(e) {
    // 2. 팝업 밖 클릭
    if($(e.target).parents('.select').length == 0) { 
      // 3. 팝업 밖일 경우 창 닫기
      $(".select").removeClass('active');
    }
  })

  // 자소서 템플릿 - 답변
  $('.ki-top-question button').click(function(e){
    if ($(this).siblings('strong').hasClass('active')){
      $(this).siblings('strong').removeClass('active');
      $(this).removeClass('active');
    } else {
      $(this).siblings('strong').addClass('active');
      $(this).addClass('active');
    }
  })

  // 자소서 템플릿 - 버튼
  $('.ki-utill-icon .btn-write').click(function(e){
    if ($(this).children('.ki-write').hasClass('active')){
      $(this).children('.ki-write').removeClass('active');
    } else {
      $(this).children('.ki-write').addClass('active');
    }
  })

  // 자주 묻는 질문
  $('.ki-notice-list ul li a').click(function(e){
    if ($(this).parent('.ki-qna-question').parent('li').hasClass('active')){
      $(this).parent('.ki-qna-question').parent('li').removeClass('active');
      $(this).parent('.ki-qna-question').parent('li').children('.ki-qna-anser').slideUp(250);
      
    } else {
      $(this).parent('.ki-qna-question').parent('li').addClass('active');
      $(this).parent('.ki-qna-question').parent('li').children('.ki-qna-anser').slideDown(250);
      $(this).parent('.ki-qna-question').parent('li').siblings('li').removeClass('active');
      $(this).parent('.ki-qna-question').parent('li').siblings('li').children('.ki-qna-anser').slideUp(250);
    }
  })

  // 슬기로운 활용법 - 북마크
  $('.ki-card-sect .ki-bookmark').click(function(e){
    if ($(this).parent().hasClass('active')){
      $(this).parent().removeClass('active');
    } else {
      $(this).parent().addClass('active');
    }
  })
  // 슬기로운 활용법 - 북마크
  $('.ki-card-sect .ki-wirte').click(function(e){
    if ($(this).next().hasClass('active')){
      $(this).next().removeClass('active');
      
    } else {
      $(this).next().addClass('active');
      $(this).parent().siblings().find('.ki-wirte-pop').removeClass('active');
    }
  })

   // 슬기로운 활용법 - 북마크
  $('.ki-wirte-pop ul li a').click(function(e){
    if ($(this).parent().parent().parent('.ki-wirte-pop').hasClass('active')){
      $(this).parent().parent().parent('.ki-wirte-pop').removeClass('active');
    } else {
      $(this).parent().parent().parent('.ki-wirte-pop').addClass('active');
    }
  })

  
});
// scroll 여백
document.addEventListener('DOMContentLoaded', () => {
  const updateScrollPadding = (scrollBox) => {
    if (!scrollBox) return;

    const applyPadding = () => {
      const hasScroll = scrollBox.scrollHeight > scrollBox.clientHeight;
      scrollBox.style.paddingRight = hasScroll ? '7px' : '0';
    };

    // display:none일 때 잠시 대기 후 계산
    if (getComputedStyle(scrollBox).display === 'none') {
      setTimeout(applyPadding, 50);
    } else {
      applyPadding();
    }
  }; 

  const applyAll = () => {
    document.querySelectorAll('.ki-card-list').forEach(el => updateScrollPadding(el));
  };

  // 초기 로딩 시
  applyAll();

  // DOM 변경 감지 (요소 추가/삭제 시)
  const observer = new MutationObserver(applyAll);
  observer.observe(document.body, { childList: true, subtree: true });

  // 리사이즈 시
  window.addEventListener('resize', () => {
    // 리사이즈 중 과도한 호출 방지 (디바운스)
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(() => {
      applyAll();
    }, 1);
  });
  

  // ✅ #ki-wrap 높이에 맞춰 .ki-header 높이 자동 동기화
function syncHeaderHeight() {
  const wrap = document.getElementById('ki-wrap');
  const header = document.querySelector('.ki-header');
  if (!wrap || !header) return;

  requestAnimationFrame(() => {
    header.style.height = wrap.offsetHeight + 'px';
  });
}

// 1️⃣ DOM 로드 완료 시 적용
document.addEventListener('DOMContentLoaded', syncHeaderHeight);

// 2️⃣ 이미지/폰트 등 모든 리소스 로드 후 재적용
window.addEventListener('load', () => {
  syncHeaderHeight();
  setTimeout(syncHeaderHeight, 50);
});

// 3️⃣ 브라우저 리사이즈 시 자동 반응
window.addEventListener('resize', syncHeaderHeight);

// 4️⃣ #ki-wrap 높이 변화 감지 (예: container 클릭, 콘텐츠 토글 등)
const wrap = document.getElementById('ki-wrap');
if (wrap && 'ResizeObserver' in window) {
  const resizeObserver = new ResizeObserver(() => {
    syncHeaderHeight();
  });
  resizeObserver.observe(wrap);
}

// 5️⃣ 내부 콘텐츠 클릭 시 (예: .container 토글 등) 보조로 다시 계산
const container = document.querySelector('.container');
if (container) {
  container.addEventListener('click', () => {
    setTimeout(syncHeaderHeight, 50);
  });
}

});


// scroll 여백
document.addEventListener('DOMContentLoaded', () => {
  const updateScrollPadding = (scrollBox) => {
    if (!scrollBox) return;

    const applyPadding = () => {
      const hasScroll = scrollBox.scrollHeight > scrollBox.clientHeight;
      scrollBox.style.paddingRight = hasScroll ? '7px' : '13px';
    };

    // display:none일 때 잠시 대기 후 계산
    if (getComputedStyle(scrollBox).display === 'none') {
      setTimeout(applyPadding, 50);
    } else {
      applyPadding();
    }
  }; 

  const applyAll = () => {
    document.querySelectorAll('.wrap-layer-popup .ki-inquiry-input-cont').forEach(el => updateScrollPadding(el));
  };

  // 초기 로딩 시
  applyAll();

  // DOM 변경 감지 (요소 추가/삭제 시)
  const observer = new MutationObserver(applyAll);
  observer.observe(document.body, { childList: true, subtree: true });

  // 리사이즈 시
  window.addEventListener('resize', () => {
    // 리사이즈 중 과도한 호출 방지 (디바운스)
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(() => {
      applyAll();
    }, 1);
  });
});


