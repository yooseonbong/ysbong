 $(document).ready(function(){
  // table
  // $("#listTable tbody tr:nth-child(even)").css("background", "#F6F2ED");
  $('#listTable tbody').on('click', 'tr', function(){
    $(this).toggleClass('selected');
    $(this).children().children('.downIcon').toggleClass('upIcon');
  });

  // hide
  var article = ('.recruit.show');
  $('.recruit .item td').click(function(){
    var myArticle = $(this).parents().next("tr");
    if($(myArticle).hasClass('hide')) {
      $(article).removeClass('show').addClass('hide');
      $(myArticle).removeClass('hide').addClass('show');
    } else {
      $(myArticle).addClass('hide').removeClass('show');
    }
  });
});

//외부 영역 클릭 시 팝업 닫기
$(document).mouseup(function (e){
  if($(".alramPopup").has(e.target).length === 0){
    $(".alramPopup").hide();
  }
});

//ESC 키 누를 시 팝업 닫기
$(document).keydown(function(e){
  //keyCode 구, which 현재
    var code = e.keyCode || e.which;

    if (code == 27) {
        $('.alramPopup').hide();
    }
});

//document.body.addEventListener('mouseup', () => { alert('mouseup'); });

