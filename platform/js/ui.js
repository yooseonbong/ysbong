$(document).ready(function () {

  //모달 팝업
  const popupBtnAll = document.querySelectorAll('[aria-haspopup="dialog"]');
  if (popupBtnAll) {
    let currentTarget, focusEl = [], popupDepth = 0, popupDimmed, keyEscapeEvt, KeyEvtEl;
    const _$this = this,
    popupAll = document.querySelectorAll('[role="dialog"]'),
    popupCloseBtnAll = document.querySelectorAll('[popup-close]');
    // ESC 누름 감지
    const keyEvent = {
      get keyEscape() {
        return this._state;
      },
      set keyEscape(state) {
        this._state = state;
        if (state) escKeyEvt(KeyEvtEl, keyEscapeEvt);
      },
    };
    keyEvent;
    // popup dimmed 생성
    const createdDimmed = () => {
      const createDiv = document.createElement('div');
      createDiv.classList.add('popup-dimmed');
      document.querySelector('body').appendChild(createDiv);
    };
    // popup dimmed click 시 팝업 닫기
    const dimmedClick = (e) => {
      if (e.target.classList.contains('wrap-layer-popup')) {
        //popupCloseAll();
        keyEvent.keyEscape = false;
      }
    };
    // popup open
    const popupOpen = (e) => {
      currentTarget = e.target.tagName;
      currentTarget === 'BUTTON' || currentTarget === 'A' ? currentTarget = e.target : currentTarget = e.target.closest('button') || e.target.closest('a');
      
      popupDimmed = document.querySelectorAll('.popup-dimmed');
      if (popupDimmed.length === 0) createdDimmed();

      popupAll.forEach((popupEl) => {
        if (popupEl.getAttribute('data-popup') === currentTarget.getAttribute('data-popup')) {
          popupDepth += 1; // popup depth 저장
          focusEl.splice((popupDepth - 1), 0, currentTarget); // popup focus Element 저장
          popupEl.classList.add('popup-open'); // open class add
          popupEl.setAttribute('popup-depth', popupDepth); // popup depth 설정
          popupEl.setAttribute('aria-hidden', 'false');
          $('.jm-focus-btn').css('display','none');
          // dimmed click 이벤트 할당
          popupEl.removeEventListener('click', dimmedClick);
          popupEl.addEventListener('click', dimmedClick);

          document.body.classList.add('scroll-lock'); // popup scroll lock
          popupEl.querySelector('.wrap-layer-popup-title').focus(); // popup 오픈 시 타이틀에 포커스

          // shift+tab 또는 <- 화살표 키 키보드 동작 시 팝업 밖으로 포커스 이동 방지 이벤트 할당
          popupEl.querySelector('.wrap-layer-popup-title').removeEventListener('keydown', titleKeyDown);
          popupEl.querySelector('.wrap-layer-popup-title').addEventListener('keydown', titleKeyDown);
          
          // popup 위 팝업 케이스 dimmed 수정
          if (popupDepth > 1) document.querySelector(`[popup-depth='${popupDepth - 1}']`).classList.add('prev-popup');

          KeyEvtEl = popupEl; // ESC 키 동작을 위한 현재 활성화 된 popup element 저장
        };
      });
    };
    // popup close
    const popupClose = (e) => {
      // 키보드 이벤트 ESC 일 경우 currentTarget 설정
      if (e.key == 'Escape' || e.key == 'Esc') currentTarget = KeyEvtEl.querySelector('.btn-layer-close');
      // 일반적인 클릭, 키보드 이벤트 일 경우 currentTarget 설정
      else {
        currentTarget = e.target.tagName;
        currentTarget === 'BUTTON' || currentTarget === 'A' ? currentTarget = e.target : currentTarget = e.target.closest('button') || e.target.closest('a');
        let popupId = currentTarget.getAttribute('popup-close');
        if (currentTarget.getAttribute('popup-close-all') === 'true') return popupCloseAll();
        if (currentTarget.getAttribute('popup-confirm')) confirmEvt[popupId]();
        else if (currentTarget.getAttribute('popup-cancel')) cancelEvt[popupId]();
      }
      popupAll.forEach((popupEl) => {
        if (popupEl.getAttribute('data-popup') === currentTarget.getAttribute('popup-close')) {
          popupEl.classList.remove('popup-open');
          // 저장된 focus element 가 있을 때
          if (focusEl.length > 0) {
            focusEl[popupDepth - 1].focus(); // focus 상태 재설정
            focusEl.splice((popupDepth - 1), 1); // popup focus Element 삭제
            popupDepth -= 1; // popup depth 재설정
            KeyEvtEl = document.querySelector(`.wrap-layer-popup[popup-depth='${popupDepth}']`); // ESC 키 동작을 위한 현재 활성화 된 popup element 저장
          } else { // 저장된 focus element 가 없을 때
            document.body.setAttribute('tabindex', '0');
            document.body.focus();
            KeyEvtEl = null;
          }
        };
      });
      // 오픈 된 popup이 있는 지 확인
      const openPopups = document.querySelectorAll(`.popup-open`);
      if (openPopups.length === 0) popupCloseAll('none');
      else if (openPopups.length > 0) { // 오픈된 popup이 있을 경우 popup dimmed 수정
        const getPopupValue = currentTarget.getAttribute('popup-close') || currentTarget.getAttribute('data-popup');
        const getPopupDepth = Number(document.querySelector(`.wrap-layer-popup[data-popup='${getPopupValue}']`).getAttribute('popup-depth'));
        document.querySelector(`.wrap-layer-popup[popup-depth='${getPopupDepth - 1}']`).classList.remove('prev-popup');
        document.querySelector(`.wrap-layer-popup[data-popup='${getPopupValue}']`).removeAttribute('popup-depth');
      };
    };
    // popup close All
    const popupCloseAll = (focusActionNone) => {
      // dimmed 삭제
      const popupDimmed = document.querySelector('.popup-dimmed');
      popupDimmed.style.opacity = 0;
      popupDimmed.addEventListener('transitionend', function() {
        if (popupDimmed.parentNode !== null) popupDimmed.parentNode.removeChild(popupDimmed);
      });
      // popup depth 설정 삭제
      popupAll.forEach((popupEl) => {
        popupEl.classList.remove('prev-popup');
        popupEl.removeAttribute('popup-depth');
        popupEl.setAttribute('aria-hidden', 'true');
        $('.jm-focus-btn').css('display','block');
      });
      // scroll lock 해지
      document.body.classList.remove('scroll-lock');
      // popupClose Event 통해서 focus 설정이 되지 않았을 경우 (popupCloseAll 단독 실행일 경우)
      if (focusActionNone !== 'none') {
        if (focusEl.length > 0) focusEl[0].focus();  // 저장된 focus element 가 있을 때
        else { // 저장된 focus element 가 없을 때
          document.body.setAttribute('tabindex', '0');
          document.body.focus();
        };
        focusEl = []; // focus reset
      }
      popupAll.forEach((popupEl) => popupEl.classList.remove('popup-open')); // open class 삭제
      popupDepth = 0; // popup depth reset
      KeyEvtEl = null; // KeyEvtEl reset
    };

    // ESC 키보드 이벤트
    const escKeyEvt = (El, e) => {
      
      $('.jm-focus-btn').css('display','none');
      const openPopups = document.querySelectorAll(`.popup-open`);
      // 팝업 열린 상태에서 키보드 ESC 키 이벤트 실행 
      if (openPopups.length > 0) popupClose(e);
    };
    // popup 닫기 키보드 이벤트
    const closeBtnKeyDown = (e) => {
      if ((e.key == 'Tab' && !e.shiftKey) || e.key == 'ArrowRight') {
        e.preventDefault();
        popupAll.forEach((popupEl) => {
            if (popupEl.getAttribute('data-popup') === e.target.getAttribute('popup-close')) {
                popupEl.querySelector('.wrap-layer-popup-title').focus();
                popupEl.setAttribute('aria-hidden', 'false');
                $('.jm-focus-btn').css('display','block');
            };
        });
      };
      
      $('.jm-focus-btn').css('display','none');
    };
    // popup title 키보드 이벤트
    const titleKeyDown = (e) => {
      if ((e.key == 'Tab' && e.shiftKey) || e.key == 'ArrowLeft') {
        e.preventDefault();
        popupAll.forEach((popupEl) => {
          if (popupEl.getAttribute('data-popup') === e.target.closest('.wrap-layer-popup').getAttribute('data-popup')) {
            popupEl.querySelector('.btn-layer-close').focus();
          };
        });
      };
      $('.jm-focus-btn').css('display','none');
    };

    // 키보드 ESC 키 누름 감지 이벤트
    const escKeyDown = (e) => {
      if (e.key == 'Escape' || e.key == 'Esc') {
        keyEscapeEvt = e;Escape
        keyEvent.keyEscape = true;
      };
    };

    // 클릭/키보드 팝업 이벤트 제거/할당
    // 팝업 열기
    popupBtnAll.forEach((popupBtn) => {
      popupBtn.removeEventListener('click', popupOpen);
      popupBtn.addEventListener('click', popupOpen);
      
    });
    // 팝업 닫기 
    popupCloseBtnAll.forEach((popupCloseBtn) => {
      popupCloseBtn.removeEventListener('click', popupClose);
      popupCloseBtn.addEventListener('click', popupClose);
      if (popupCloseBtn.classList.contains('btn-layer-close')) {
        popupCloseBtn.removeEventListener('keydown', closeBtnKeyDown);
        popupCloseBtn.addEventListener('keydown', closeBtnKeyDown);
      }
    });
    // ESC 키로 팝업 닫기
    window.removeEventListener('keydown', escKeyDown);
    window.addEventListener('keydown', escKeyDown);
  }


  //haed utill
  $('.mis-utill-btn a').click(function(){                                                         
    if ($(this).parent().hasClass('active')){
      $(this).parent().removeClass('active');
    } else {
      $(this).parent().addClass('active');
    }
  });

  //aside
  $('.mis-aside > ul > li > a').click(function(){
    if($(this).parent().hasClass('active')){
      $(this).parent().removeClass('active');
    }else {
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
    }
  });


  //datepicker
  $(".datepicker-day").datepicker({
    showOn:"button",
    currentText: "오늘",
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    yearSuffix: '년',
    weekHeader: "주",
    showButtonPanel: true,
    buttonImage: "../images/icon_ calendar_on.svg",
    showOtherMonths:true,
    dateFormat:"yy.mm.dd",
    showMonthAfterYear: true,
  });

  $(".datepicker-month").monthpicker({
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월','7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      showOn: "button",
      buttonImage: "../images/icon_ calendar_on.svg",
      buttonImageOnly: true,
      changeMonth: false,
      showOtherMonths:true,
      changeYear: false,
      yearRange: 'c-2:c+2',
      dateFormat: 'yy.mm',
      showMonthAfterYear: true,
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

  // 테이블 내림차순 올림차순
   $('.mis-thead-btn').click(function(){
    if($(this).hasClass('down')){
      $(this).removeClass('down');
      $(this).addClass('up');
    }else if($(this).hasClass('up')) {
      $(this).removeClass('up');
      $(this).addClass('down');
    }
  });


  // textarea 글자수 제한
  $('.textarea-count').on('input', function () {
    const maxLength = 500;
    const content = $(this).val();

    // 공백(띄어쓰기, 탭, 줄바꿈 등) 제거한 글자만 계산
    const textWithoutSpaces = content.replace(/\s/g, '');
    const currentLength = textWithoutSpaces.length;

    // 글자수 표시
    $('.textCount').text(currentLength);

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
      $('.textCount').text(maxLength);
      alert('글자수는 공백 제외 500자까지 입력 가능합니다.');
    }
  })
  
  // textarea 글자수 제한
  $('.textarea-count2').on('input', function () {
    const maxLength = 4064;
    const content = $(this).val();

    // 공백(띄어쓰기, 탭, 줄바꿈 등) 제거한 글자만 계산
    const textWithoutSpaces = content.replace(/\s/g, '');
    const currentLength = textWithoutSpaces.length;

    // 글자수 표시
    $('.textCount').text(currentLength);

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
      $('.textCount').text(maxLength);
      alert('글자수는 공백 제외 4000자까지 입력 가능합니다.');
    }
  })

  // textarea 글자수 제한 (팝업)
  $('.pop-count').keyup(function (e) {
	  const maxLength = 100;
    const content = $(this).val();

    // 공백(띄어쓰기, 탭, 줄바꿈 등) 제거한 글자만 계산
    const textWithoutSpaces = content.replace(/\s/g, '');
    const currentLength = textWithoutSpaces.length;

    // 글자수 표시
    $('.textCount').text(currentLength);

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
      $('.textCount').text(maxLength);
      alert('글자수는 공백 제외 100자까지 입력 가능합니다.');
    }
  })

  // 검색
  $(".search-key").keydown(function(e) {
    $(this).parent().siblings('.search-key-list').css('display','block');
     //alert(e.keyCode);
  });
  $(".search-key").focusout(function(e) {
    $('.search-key-list').css('display','none');
     //alert(e.keyCode);
  });

  $('.checkbox_all .all').click(function () {
    if ($(this).prop('checked')) {
        $('.checkbox .normal').prop('checked', true);
    } else {
        $('.checkbox .normal').prop('checked', false);
    }
  });

  // 약관동의
  $('.checkbox').on('click', '.normal', function () {
      var is_checked = true;
      $('.checkbox .normal').each(function () {
          is_checked = is_checked && $(this).is(':checked');
      });
      $('.checkbox_all .all').prop('checked', is_checked);
  });





  // .mis-bbs 중에서 .another1 클래스가 없는 테이블만 선택
  const $tables = $('.mis-bbs').not('.another1');

  // 1️⃣ 페이지 로드 시 이미 체크된 항목에 active 추가
  $tables.find('input[type="checkbox"]:checked').each(function () {
    $(this).closest('tr').addClass('active');
  });

  // 2️⃣ label 클릭 시 active 토글 (체크 상태 기준)
  $tables.on('click', '.input_box label', function () {
    const $input = $('#' + $(this).attr('for'));
    const $tr = $(this).closest('tr');

    setTimeout(function () {
      if ($input.is(':checked')) {
        $tr.addClass('active');
      } else {
        $tr.removeClass('active');
      }
    }, 0);
  });


});

document.addEventListener('DOMContentLoaded', () => {
  const updateScrollPadding = (scrollBox) => {
    if (!scrollBox) return;

    const applyPadding = () => {
      // scroll-y padding
      const scrollPadding = scrollBox.scrollHeight > scrollBox.clientHeight ? '7px' : '0';
      scrollBox.style.paddingRight = scrollPadding;

      // 연결된 .mis-bbs-thead padding
      const theadBox = scrollBox.previousElementSibling;
      if (theadBox && theadBox.classList.contains('mis-bbs-thead')) {
        const theadPadding = scrollBox.scrollHeight > scrollBox.clientHeight ? '13px' : '0';
        theadBox.style.paddingRight = theadPadding;

        // 내부 table에도 동일하게 적용
        const tableEl = theadBox.querySelector('table');
        if (tableEl) tableEl.style.paddingRight = theadPadding;
      }
    };

    // display:none일 때 잠시 대기 후 계산
    if (getComputedStyle(scrollBox).display === 'none') {
      setTimeout(applyPadding, 50);
    } else {
      applyPadding();
    }
  };

  // 초기 로딩 시 모든 scroll-y 적용
  document.querySelectorAll('.mis-bbs.scroll-y').forEach(el => updateScrollPadding(el));

  // DOM 변경 감지
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.mis-bbs.scroll-y').forEach(el => updateScrollPadding(el));
  });
  observer.observe(document.body, { childList: true, subtree: true });
});



document.addEventListener('DOMContentLoaded', () => {
  const updateScrollPadding = (scrollBox) => {
    if (!scrollBox) return;

    const applyPadding = () => {
      // scroll-y padding
      const scrollPadding = scrollBox.scrollHeight > scrollBox.clientHeight ? '0' : '0';
      scrollBox.style.paddingRight = scrollPadding;

      // 연결된 .mis-bbs-thead padding
      const theadBox = scrollBox.previousElementSibling;
      if (theadBox && theadBox.classList.contains('mis-thead-another1')) {
        const theadPadding = scrollBox.scrollHeight > scrollBox.clientHeight ? '0' : '0';
        theadBox.style.paddingRight = theadPadding;

        // 내부 table에도 동일하게 적용
        const tableEl = theadBox.querySelector('table');
        if (tableEl) tableEl.style.paddingRight = theadPadding;
      }
    };

    // display:none일 때 잠시 대기 후 계산
    if (getComputedStyle(scrollBox).display === 'none') {
      setTimeout(applyPadding, 50);
    } else {
      applyPadding();
    }
  };

  // 초기 로딩 시 모든 scroll-y 적용
  document.querySelectorAll('.mis-bbs.scroll-y.scroll-another1').forEach(el => updateScrollPadding(el));

  // DOM 변경 감지
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.mis-bbs.scroll-y.scroll-another1').forEach(el => updateScrollPadding(el));
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
