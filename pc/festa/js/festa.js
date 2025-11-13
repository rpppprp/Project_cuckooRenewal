"use strict";


$(function(){


	/**----------------------------------------
	 * 
	 *  festa tab - 따라다니는 탭 
	 * 
	 ----------------------------------------**/
	$(window).load(function(){
		let _fixed_tab = $(".module-nav");
		let _stop_pos = $(".module-roulette").offset().top + 0;
		
		$(window).on("scroll",function(){
			let _winPos = $(this).scrollTop();
			if(_winPos + 10 >= _stop_pos){
				_fixed_tab.addClass("fixed")
			} else {
				_fixed_tab.removeClass("fixed")
			}
		});
	});

    /**----------------------------------------
	 * 
	 * festa week nav switching 
	 * 
	 ----------------------------------------**/ 

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
    
    
    
    /**----------------------------------------
	 * 
	 * festa Reserve Section
	 * 
	 ----------------------------------------**/ 
    
    // festa reserve time
    
	const $rs_timer = $("#timeTable");
	const rs_endTime = new Date($rs_timer.data("value")).getTime();
	
	const $rs_days = $rs_timer.find(".days");
	const $rs_hours = $rs_timer.find(".hours");
	const $rs_minutes = $rs_timer.find(".minutes");
	const $rs_seconds = $rs_timer.find(".seconds");
	
	let timerInterval; // 🔸 선언을 위로 올림
	
	function updateCountdown() {
	    const rs_now = new Date().getTime();
	    const rs_distance = rs_endTime - rs_now;
	
	    // 종료 시 처리
	    if (rs_distance <= 0) {
	        clearInterval(timerInterval);
	        $rs_days.text("00");
	        $rs_hours.text("00");
	        $rs_minutes.text("00");
	        $rs_seconds.text("00");
	        $rs_timer.addClass("time-end");
	        return;
	    }
	
	    // 남은 시간 계산
	    const rs_days = Math.floor(rs_distance / (1000 * 60 * 60 * 24));
	    const rs_hours = Math.floor((rs_distance / (1000 * 60 * 60)) % 24);
	    const rs_minutes = Math.floor((rs_distance / (1000 * 60)) % 60);
	    const rs_seconds = Math.floor((rs_distance / 1000) % 60);
	
	    // DOM 업데이트
	    $rs_days.text(String(rs_days).padStart(2, "0"));
	    $rs_hours.text(String(rs_hours).padStart(2, "0"));
	    $rs_minutes.text(String(rs_minutes).padStart(2, "0"));
	    $rs_seconds.text(String(rs_seconds).padStart(2, "0"));
	}
	
	// 최초 1회 실행 후 1초마다 갱신
	updateCountdown();
	timerInterval = setInterval(updateCountdown, 1000);
	    
    
    /**----------------------------------------
	 * 
	 * festa Category
	 * 
	 ----------------------------------------**/ 
    
    // festa category

    $(".fe-cate-tab .spec-option").click(function(){

        $(".fe-cate-tab .spec-option").removeClass('on');
        $(this).addClass('on');
    })

    $(".fe-cate-track .fe-cate-item").click(function(){

        $(".fe-cate-track .fe-cate-item").removeClass('on');
        $(this).addClass('on');
    })
    
    

    /**----------------------------------------
	 * 
	 * festa Time Deal
	 * 
	 ----------------------------------------**/ 

    // festa time deal

    var $slider = $(".fe-timeDeal-content .fe-timedeal-track");

    // slick 초기화
    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        draggable: false,
        prevArrow : $('.fe-timedeal-prev'),
        nextArrow : $('.fe-timedeal-next'),
        dots: true,
        appendDots: $('.fe-timedeal-pager')
    });
    
    // 만료된 슬라이드 제거
    var currentDate = new Date();
    var indexesToRemove = [];
    
    $slider.find('.fe-timedeal-inner').each(function() {
        var dateValue = $(this).data('value');
        var targetDate = new Date(dateValue);
        
        // 날짜가 만료되었으면 해당 슬라이드의 인덱스 수집
        if (targetDate < currentDate) {
            var $slide = $(this).closest('.slick-slide');
            var index = $slide.data('slick-index');
            if (index !== undefined && indexesToRemove.indexOf(index) === -1) {
                indexesToRemove.push(index);
            }
        }
    });
    
    // 높은 인덱스부터 제거
    indexesToRemove.sort(function(a, b) { return b - a; });
    
    indexesToRemove.forEach(function(index) {
        $slider.slick('slickRemove', index);
    });
    
    // 슬라이드가 1개 이하면 slick 비활성화
    var remainingSlides = $slider.slick('getSlick').slideCount;
    
    if (remainingSlides <= 1) {
        $slider.slick('unslick');
        // 화살표, 페이저 숨기기 (옵션)
        $('.fe-timedeal-prev, .fe-timedeal-next, .fe-timedeal-pager').hide();
    }
    
    
    
    /**----------------------------------------
	 * 
	 * festa Cuckoo Live Alarm
	 * 
	 ----------------------------------------**/ 
    
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

        const dateParts = live_dateValue.split(/[/ :]/).map(Number);
        const [year, month, day, hour = 0, minute = 0] = dateParts;
        const live_endDate = new Date(year, month - 1, day, hour, minute);

        const live_second = 1000;
        const live_minute = live_second * 60;
        const live_hour = live_minute * 60;
        const live_day = live_hour * 24;

        const _updateTimer = () => {
            const now = new Date();
            const remaining = live_endDate - now;

            if (remaining <= 0) {
                clearInterval(cc_timer);
                _ccLiveElement.hide(); // 종료시 컨텐츠 숨김
                return;
            }

            const days = Math.floor(remaining / live_day);
            const hours = Math.floor((remaining % live_day) / live_hour);
            const minutes = Math.floor((remaining % live_hour) / live_minute);
            const seconds = Math.floor((remaining % live_minute) / live_second);

            _ccLiveElement.find('.cc-live-time').html(`
                <div class="days">${days}</div>
                <p>일</p>
                <div class="hours">${hours}</div>
                <p>시</p>
                <div class="minutes">${minutes}</div>
                <p>분</p>
                <div class="seconds">${seconds}</div>
                <p>초</p>
            `);
        };

        const cc_timer = setInterval(_updateTimer, 1000);
        _updateTimer(); // 첫 실행 즉시 표시
    };


    liveCountDown('cc-live01');
    liveCountDown('cc-live02');
    liveCountDown('cc-live03');
    
    
    
    /**----------------------------------------
	 * 
	 * festa 2 cols Product Event
	 * 
	 ----------------------------------------**/ 
 
    // festa cols event

    $('.fe-col2-section').slick({
        slidesToShow: 2,
        slidesToScroll:2,
        centerPadding: '30px',
        infinite: false,
        draggable: true,
        prevArrow : $('.fe-col-prev'),
        nextArrow : $('.fe-col-next')
    });


    /**----------------------------------------
	 * 
	 * festa Wish Button
	 * 
	 ----------------------------------------**/ 

    // festa wish button

    $(".wish-btn").each(function(){
        // 툴팁 span을 버튼 내부에 미리 추가
        $(this).append('<span class="wish-tooltip"></span>');
    });
    
    $(".wish-btn").click(function(){
        var _this = $(this);
        var tooltip = _this.find('.wish-tooltip');
    
        // 상태 토글
        if (_this.hasClass('on')) {
            _this.removeClass('on');
            tooltip.text('관심제품에서 해제되었습니다.').stop(true, true).fadeIn(150).delay(500).fadeOut(300);
        } else {
            _this.addClass('on');
            tooltip.text('관심제품에 추가되었습니다.').stop(true, true).fadeIn(150).delay(500).fadeOut(300);
        }
    });


});

