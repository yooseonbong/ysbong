
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
        dimmed.className = 'popup-dimmed';
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
      $('.popup-dimmed').remove();
    };

    // 팝업 열기 버튼 클릭
    popupBtns.forEach(btn => btn.addEventListener('click', popupOpen));

    // 팝업 닫기 버튼 클릭
    popupCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.getAttribute('popup-close-all') === 'true') return popupCloseAll();
        $('.popup-dimmed').remove();
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

  // swiper - 메인
  var swiper = new Swiper('.career-swiper', {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 8, 
    resistanceRatio: 0, 
    navigation: {
      nextEl: '.main-swiper-next',
      prevEl: '.main-swiper-prev',
    },
    breakpoints: {
      // 760 이상에서는 1개의 슬라이드를 보여줌
      0: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      // 760 이상에서는 1개의 슬라이드를 보여줌
      768: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      // 1024 이상에서는 2개의 슬라이드를 보여줌
      1100: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  });


  
});

