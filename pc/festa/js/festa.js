"use strict";

$(function(){


	/** festa tab - 따라다니는 탭 */
	$(window).load(function(){
		let _fixed_tab = $(".module-nav");
		let _stop_pos = $(".module-coupon").offset().top + 60;
		
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
    
    // festa category

    $(".fe-cate-tab .spec-option").click(function(){

        $(".fe-cate-tab .spec-option").removeClass('on');
        $(this).addClass('on');
    })

    $(".fe-cate-track .fe-cate-item").click(function(){

        $(".fe-cate-track .fe-cate-item").removeClass('on');
        $(this).addClass('on');
    })

    // festa time deal

    $(".fe-timeDeal-tab a").click(function(){

        $(".fe-timeDeal-tab a").removeClass('on');
        $(this).addClass('on');
    })

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

    // festa cc-live count down

    const liveCountDown = (id) => {
        const _ccLiveElement = $('#' + id);
        const live_dateValue = _ccLiveElement.find('.cc-live-time').data('value'); 
        if (!live_dateValue) return;

        // ✅ 슬래시(/) 형식도 지원하도록 수동 파싱
        const dateParts = live_dateValue.split(/[/ :]/).map(Number);
        const [year, month, day, hour = 0, minute = 0] = dateParts;
        const live_endDate = new Date(year, month - 1, day, hour, minute);

        const live_second = 1000;
        const live_minute = live_second * 60;
        const live_hour = live_minute * 60;
        const live_day = live_hour * 24;

        const updateTimer = () => {
            const now = new Date();
            const remaining = live_endDate - now;

            if (remaining <= 0) {
                clearInterval(cc_timer);
                _ccLiveElement.hide(); // 종료 시 숨기기
                return;
            }

            const days = Math.floor(remaining / live_day);
            const hours = Math.floor((remaining % live_day) / live_hour);
            const minutes = Math.floor((remaining % live_hour) / live_minute);

            _ccLiveElement.find('.cc-live-time').html(`
                <div class="days">${days}</div>
                <p>일</p>
                <div class="hours">${hours}</div>
                <p>시</p>
                <div class="seconds">${minutes}</div>
                <p>분</p>
            `);
        };

        const cc_timer = setInterval(updateTimer, 1000);
        updateTimer(); // 첫 실행 즉시 표시
    };

    // ✅ 여러 개 카운트다운 적용
    $(document).ready(() => {
        liveCountDown('cc-live01');
        liveCountDown('cc-live02');
        liveCountDown('cc-live03');
    });


    $('.fe-col2-section').slick({
        slidesToShow: 2,
        slidesToScroll:2,
        centerPadding: '30px',
        infinite: false,
        draggable: true,
        prevArrow : $('.fe-col-prev'),
        nextArrow : $('.fe-col-next')
    });

})