"use strict";


$(function(){


	/** b2b tab - 따라다니는 탭 */
	$(window).load(function(){
		var _fixed_b2b = $(".b2b-tab .inner");
		var _stop_pos_b2b = $("#b2b-section01").offset().top;
		
		$(window).on("scroll",function(){
			let _winPos = $(this).scrollTop();
			if(_winPos + 10 >= _stop_pos_b2b){
				_fixed_b2b.addClass("fixed")
			} else {
				_fixed_b2b.removeClass("fixed")
			}
		});
	});

	/** b2b tab - button action */
	$("#rn-main").on("click",".b2b-tab-wrap li", function(){
		var _this = $(this);
		$(".b2b-tab-wrap li").removeClass("on");
		_this.addClass("on");
	});

	/** b2b tab - scroll action */
	$(document).on('click', '.b2b-tab-wrap li a', function(e){
		e.preventDefault();
		e.stopPropagation();
		var _section = $(this).attr('href');
		var _b2bNav = $(".b2b-tab-wrap");
		var _navHeight = _b2bNav.outerHeight() + 100;
		
		$('html, body').animate({
			scrollTop: $(_section).offset().top - _navHeight
		}, 500);
		return false;
	})

	/** b2b scroll contact */

	$(window).on("scroll",function(){
		var _currentB2bPos = $(this).scrollTop(); // 현재위치
		var _b2bSection = $(".b2b-section");
		var _b2bNav = $(".b2b-tab-wrap");
		var _navHeight = _b2bNav.outerHeight() + 100;
		
		_b2bSection.each(function(){
			var top = $(this).offset().top - _navHeight,
			bottom = top + $(this).outerHeight();
			
			if (_currentB2bPos >= top && _currentB2bPos <= bottom) {
				_b2bNav.find('li').removeClass('on');
				
				$(this).addClass('on');
				_b2bNav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('on');
			}
		});
	});

	/* b2b partner slick */
	$('.b2b-p-track').slick({
		speed: 5000,
		autoplay: true,
		autoplaySpeed: 0,
		centerMode: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		infinite: true,
		initialSlide: 1,
		arrows: false,
		buttons: false
	})
	
	/** b2b partner modal popup-open */
	$("#rn-main").on("click", ".b2b-tab-title .more-btn", function(e){
		var _popup = $(".b2b-partner-popup-wrap");
		e.preventDefault();
		_popup.show();
		$('html, body').addClass('scroll-none'); // scroll off
	});

	$("#rn-main").on("click", ".b2b-partner-header .b2b-p-close", function(e){
		var _popup = $(".b2b-partner-popup-wrap");
		e.preventDefault();
		_popup.hide();
		$('html, body').removeClass('scroll-none');// scroll on
	});


	/** b2b company tab contents  */
	$("#rn-main").on("click", ".b2b-c-tab li a", function(e){
		e.preventDefault();
		var _this = $(this);

		// tab menu
		var _tab_a = _this.parent('li');
		$(".b2b-c-tab li").removeClass("on");
		_tab_a.addClass("on");
		
		//contents
		var _target = _this.data("value");
		$(".b2b-c-content").removeClass("on");
		$("#"+_target).addClass("on");
	});

	
});