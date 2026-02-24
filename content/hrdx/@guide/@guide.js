//select
$(function(){
	$('.select button').click(function(){
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


// table 
$(document).ready(function(){
	// $("#listTable tbody tr:nth-child(even)").css("background", "#F6F2ED");
	$('#listTable tbody').on('click', 'tr', function(){
	  $(this).toggleClass('selected');
	});
  });
