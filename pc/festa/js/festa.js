"use strict";

$(function(){


	/** festa tab - 따라다니는 탭 */
	$(window).load(function(){
		let _fixed_tab = $(".module-nav");
		let _stop_pos = $(".module-event").offset().top + 60;
		
		$(window).on("scroll",function(){
			let _winPos = $(this).scrollTop();
			if(_winPos + 10 >= _stop_pos){
				_fixed_tab.addClass("fixed")
			} else {
				_fixed_tab.removeClass("fixed")
			}
		});
	});

    /** festa week nav switching */ 

    let week_btn = $(".week-list li");
    week_btn.click(function(){
        $(".week-list li").removeClass('on');
        $(this).addClass('on');
    })

    // festa sub event nav

    let sub_item = $(".sub-event-list li");
    sub_item.click(function(){
        $(".sub-event-list li").removeClass('on');
        $(this).addClass('on');
    })

    $('.sub-event-list').slick({
        variableWidth: true,
        slidesToScroll: 1,
        centerPadding: '40px',
        infinite: false,
        draggable: false,
        prevArrow : $('.sub-event-prev'),
        nextArrow : $('.sub-event-next')
    });
    
    // festa main event nav
    let main_item = $(".main-event-list li");
    main_item.click(function(){
        $(".main-event-list li").removeClass('on');
        $(this).addClass('on');
    })

    $('.main-event-list').slick({
        variableWidth: true,
        slidesToScroll: 1,
        infinite: false,
        draggable: false,
        prevArrow : $('.main-event-prev'),
        nextArrow : $('.main-event-next')
    });
    
    
    /** festa cc-live tab */

    $("#rn-main").on("click", ".cc-live-tab li", function(){
        var _this = $(this);
        var _cc_btn = $(".cc-live-tab li");
    
        _cc_btn.removeClass("on");
        _this.addClass("on");
    
        /** 각 카테고리별 탭 불러오기 */
        var _tab_id = _this.data("value");
        $(".cc-live-item").removeClass('active');
        $(".cc-live-item[data-value="+ _tab_id +"]").addClass('active');
    });

})