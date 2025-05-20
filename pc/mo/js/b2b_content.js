"use strict";

function b2bInit(){
    
	// debounce 함수 추가
	function debounce(func, wait) {
	    let timeout;
	    return function () {
	        const context = this, args = arguments;
	        clearTimeout(timeout);
	        timeout = setTimeout(() => func.apply(context, args), wait);
	    };
	}
	
	// B2B 탭 스와이퍼 초기화 (가로 스크롤)
	var b2bswiper = new Swiper('.b2b-tab-scroll', {
	    slidesPerView: "auto",
	    observer: true,
	    observeParents: true,
	    slideToClickedSlide: true,
	    freeMode: true
	});

	// B2B 탭 고정 (스크롤 따라다니는 탭)
	$(window).on("load", function () {
	    const $tabInner = $(".b2b-tab .inner");
	    const stopPos = $("#b2b-section01").offset().top;
	
	    $(window).on("scroll", function () {
	        const winTop = $(this).scrollTop();
	        if (winTop + 30 >= stopPos) {
	            $tabInner.addClass("fixed");
	        } else {
	            $tabInner.removeClass("fixed");
	        }
	    });
	});

	// B2B 탭 버튼 클릭 이벤트
	const $b2bBtns = $(".b2b-tab-wrap li a");
	$b2bBtns.on("click", function (e) {
	    e.preventDefault();
	
	    const $targetLi = $(this).parent('li');
	    const targetSection = $(this).attr('href');
	    const $b2bNav = $(".b2b-tab-wrap");
	    const navHeight = $b2bNav.outerHeight() + 60;
	
	    $b2bBtns.parent('li').removeClass('on');
	    $targetLi.addClass('on');
	
	    // 섹션으로 스크롤 이동
	    $('html, body').animate({
	        scrollTop: $(targetSection).offset().top - navHeight
	    }, 500);
	
	    // 탭 가운데 정렬
	    b2bFocus($targetLi);
	});
	
	// 탭을 가운데로 이동시키는 함수
	function b2bFocus($target) {
	    const $wrap = $('.b2b-tab-scroll .b2b-tab-wrap');
	    const $box = $('.b2b-tab-scroll');
	    const boxHalf = $box.width() / 2;
	    let listWidth = 0;
	
	    $wrap.find(".swiper-slide").each(function () {
	        listWidth += $(this).outerWidth();
	    });
	
	    const targetCenter = $target.position().left + ($target.outerWidth() / 2);
	    let scrollPos;
	
	    if (targetCenter <= boxHalf) {
	        scrollPos = 0;
	    } else if (listWidth - targetCenter <= boxHalf) {
	        scrollPos = listWidth - $box.width();
	    } else {
	        scrollPos = targetCenter - boxHalf;
	    }
	
	    setTimeout(function () {
	        // 스와이퍼의 트랜스폼 적용
	        $wrap.css({
	            transform: `translate3d(${-scrollPos}px, 0, 0)`,
	            transitionDuration: "500ms"
	        });
	    }, 200);
	}
	
	// 스크롤 위치에 따른 탭 활성화 변경
	$(window).on("scroll", debounce(function () {
	    const scrollTop = $(this).scrollTop();
	    const $sections = $(".b2b-section");
	    const $b2bNav = $(".b2b-tab-wrap");
	    const navHeight = $b2bNav.outerHeight() + 60;
	
	    $sections.each(function () {
	        const sectionTop = $(this).offset().top - navHeight - 20;
	        const sectionBottom = sectionTop + $(this).outerHeight() + 20;
	
	        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
	            const targetId = $(this).attr('id');
	            $b2bNav.find('li').removeClass('on');
	
	            const $activeTab = $b2bNav.find(`a[href="#${targetId}"]`).parent('li');
	            $activeTab.addClass('on');
	
	            // 가운데 정렬 (부드럽게, debounce 적용됨)
	            b2bFocus($activeTab);
	        }
	    });
	}, 100)); // ← 100ms 동안 대기 후 실행
	
	// b2b partner slider 
	var partner_swiper = new Swiper('.b2b-partner-wrap', {
        slidesPerView:"auto",
        autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
		  delay : 1000,   // 시간 설정
		  disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
		},
		loop : true,
        loopAdditionalSlides : 1
	});	
	
	// b2b partner pop-up
	$("#b2b-section02 .more-btn").click(function(e){
		e.preventDefault();
		var _b2bPop = $(".b2b-partner-popup-wrap");
		_b2bPop.slideToggle();
		$('html, body').addClass('scroll-none'); // scroll off
	});
	
	$(".b2b-partner-popup .b2b-p-close").click(function(e){
		e.preventDefault();
		var _b2bPop = $(".b2b-partner-popup-wrap");
		_b2bPop.slideToggle();
		$('html, body').removeClass('scroll-none');// scroll on
	});
	
    // b2b 팝업 높이 감지
    function b2bPopContact(){
        var lastSt = 0;
        $(window).on('scroll',function(){
            var _popUp = $(".b2b-partner-popup-wrap");
            var _float_st = $(this).scrollTop();
            if(_float_st > 0) { //스크롤 다운 업 체크
                if(_float_st > lastSt) {
                    _popUp.addClass('on');
                } else {
                    _popUp.removeClass('on');
                }
                lastSt = _float_st;
            } else {
                _popUp.removeClass('on');
            }
        });
    }

    b2bPopContact();

	// b2b 기업도입사례 tab
	$(".b2b-c-tab li a").click(function(){
		var _this = $(this);
		var _btn = _this.data("value");
		
		//tab
		var _tab = _this.parent('li');
		$(".b2b-c-tab li").removeClass("on");
		_tab.addClass("on");
		
		//content
		$(".b2b-c-content").removeClass("on");
		$("#"+_btn).addClass("on");
		
	})
}

$(function(){
	
	b2bInit();
	
});