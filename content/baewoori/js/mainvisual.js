function new_rolling_banner(container){	
	(function() {
		$(function() {
			
			var intervalId;
			var number = container.find('.success-case  li > .btn_rolling');
			var image = container.find('.success-case  li > .slide');
			image.css('position', 'absolute');
			var playBtn = container.find('.success-case .controller > .play');
			var stopBtn = container.find('.success-case .controller > .stop');
			var current = 0;
			var delay = 700;
			var timerDelay = 10000;
			var easeStr = 'easeOutCubic';
			var autoRolling = true;
			var maxSize = number.size();
			image.css('left', '100%');
			image.eq(current).css('left', 0);
			timer();

			function timer() {
					intervalId = setInterval(function() {
							var cnt = current + 1;
							if (maxSize <= cnt) {
									cnt = 0;
							}
							number.eq(cnt).trigger('click');
					}, timerDelay);
			}
			playBtn.on({
					click: function(e) {
							playBtn.removeClass('on').addClass('on');
							stopBtn.removeClass('on');
							e.preventDefault();
							if (!intervalId) timer();
							autoRolling = true;
					}
			});
			stopBtn.on({
					click: function(e) {
							playBtn.removeClass('on');
							stopBtn.removeClass('on').addClass('on');
							e.preventDefault();
							clearInterval(intervalId);
							intervalId = null;
							autoRolling = false;
					}
			});
			number.each(function(i) {
					var btn = $(this);
					btn.click(function(e) {
							e.preventDefault();
							var t = $(this).parent();
							var i = t.index();
							number.removeClass('on');
							btn.addClass('on');
							move(i);
					});
					btn.mouseover(function(e) {
							e.preventDefault();
							clearInterval(intervalId);
							intervalId = null;
					});
					btn.mouseout(function(e) {
							e.preventDefault();
							if (!intervalId) timer();
					});
			});

			function move(i) {
					if (current == i) return;
					var currentImage = image.eq(current);
					var nextImage = image.eq(i);
					currentImage.css('left', 0).stop().animate({
							left: '-100%'
					}, {
							duration: delay,
							easing: easeStr
					});
					nextImage.css('left', '100%').stop().animate({
							left: 0
					}, {
							duration: delay,
							easing: easeStr
					});
					current = i;
			}
			number.on('focusin', function() {
					clearInterval(intervalId);
					intervalId = null;
			});
			number.on('focusout', function() {
					if (!intervalId) timer();
			});
			image.on('focusin', function() {
					image.css('left', '-100%');
					$(this).parents('li').find('.slide').css('left', 0);
					current = $(this).parents('li').index();
					number.removeClass('on');
					$(this).parents('li').find('> .btn_rolling').addClass('on');
					clearInterval(intervalId);
					intervalId = null;
			});
			image.on('focusout', function() {
					if (!intervalId) timer();
			});
		});
	})(jQuery); /* change Title */
}

$( document ).ready( function(){	
	new_rolling_banner( $( ".rolling-sns-graph" ) );
});