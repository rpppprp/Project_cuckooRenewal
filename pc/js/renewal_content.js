"use strict";


/**------------------------------------------------------------
 * Content
 -------------------------------------------------------------*/

$(function(){


/**--- 메인빌보드 --- */

/** 메인빌보드 paging-number */

$(".visual-track").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    var index = (currentSlide ? currentSlide : slick.currentSlide) + 1;
    $('.visual-control .slick-dots').html('<span class="now">' + index + '</span><em>/</em><span class="all">' + (slick.slideCount)+'</span>');
})

/** 메인빌보드 progress bar */

var _progressBar = $('.visual-nav-progress');
var _initPercent = 100 / ($('.visual-track').find('.visual-box').length);

_progressBar.css('background-size', _initPercent + '% 100%');

$(".visual-track").on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var calc = ((nextSlide + 1) / slick.slideCount) * 100;
    _progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
});

/** 메인 빌보드 slick */

$('.visual-track').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    draggable: false,
    cssEase: 'linear',
    fade: true,
    dots:true,
    prevArrow : $('.prev-btn'),
    nextArrow : $('.next-btn'),
    appendDots: $('.pager-txt')
});

/** 메인빌보드 navigation */

$(".visual-control .stop-btn").click(function (e) {
    e.preventDefault();
    $(".visual-track").slick("slickPause");
    $(this).addClass("hidden");
    $(".visual-control .play-btn").removeClass("hidden");
});

$(".visual-control .play-btn").click(function (e) {
    e.preventDefault();
    $(".visual-track").slick("slickPlay");
    $(this).addClass("hidden");
    $(".visual-control .stop-btn").removeClass("hidden");
});


/**--- 이벤트 --- */

/** 이벤트 slick */

$('.event-wrap .evnet-track').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '30px',
    prevArrow : $('.e-prev'),
    nextArrow : $('.e-next'),
    dots: true,
    appendDots: $('.event-pager')
});


/**--- 쿠쿠라이브 ---*/

/** 쿠쿠 라이브 예고 progress bar */

var _initCclive = 100 / ($('.stream-track').find('.stream-item').length);

$(".stream-track").on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var calc = ((nextSlide + 1) / slick.slideCount) * 100;
    $(".stream-page-progress").css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
});

$(".stream-page-progress").css('background-size', _initCclive + '% 100%');

/** 쿠쿠 라이브 예고 slick */

$('.stream-track').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow : $('.s-prev'),
    nextArrow : $('.s-next')
});

/** 쿠쿠 라이브 progress bar */

var _initCcShort = 100 / ($('.short-form-track').find('.shortform-item').length);

$(".short-form-track").on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var calc = ((nextSlide + 1) / slick.slideCount) * 100;
    $(".short-page-progress").css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
});

$(".short-page-progress").css('background-size', _initCcShort + '% 100%');

/** 쿠쿠라이브 숏폼 slick */

$('.short-form-track').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow : $('.sh-prev'),
    nextArrow : $('.sh-next')
});

/** 쿠쿠라이브 숏폼 gif 제어 */

new Freezeframe({
    selector : ".video-clip > img",
    trigger : "hover",
    overlay : true
});


/**--- 타임딜 --- */

/** 타임딜 카운트다운 */

const timeDeal = (id) => {
    const _element = $('#' + id);
    const dateValue = _element.data('value'); // id에서 종료 날짜(date-value) 받아오기
    const endDate = new Date(dateValue); // 전달받은 날짜
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const updateTimer = () => {
        const now = new Date();
        const timeRemaining = endDate - now;

        if(timeRemaining < 0) {
            clearInterval(timer);
            _element.find('.t-time').html('<li><p class="time-end">종료</p></li>'); // 타임딜 종료시
            _element.addClass('timedeal-end'); // 종료 시 비활성화 스타일 추가
            return;
        }

        const days = Math.floor(timeRemaining / day);
        const hours = Math.floor((timeRemaining % day) / hour);
        const minutes = Math.floor((timeRemaining % hour) / minute);
        const seconds = Math.floor((timeRemaining % minute) / second);

        _element.find('.t-time').html(`
            <li class="t-time_day">${days}<span>일</span></li>
            <li class="t-time_hour">${hours}</li>
            <li class="t-time_minute">${minutes}</li>
            <li class="t-time_second">${seconds}</li>
        `);
    };

    const timer = setInterval(updateTimer, 1000);
};

/**timeDeal('타임딜 테이블 id') */
timeDeal('timedeal01');
timeDeal('timedeal02');
timeDeal('timedeal03');
timeDeal('timedeal04');
timeDeal('timedeal05');



/** 타임딜 slick */

$('.timedeal-track').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow : $('.t-prev'),
    nextArrow : $('.t-next'),
    dots: true,
    appendDots: $('.timedeal-pager')
});


/**--- 일상 쿠쿠 --- */

/** 일상 쿠쿠 slick */

$('.daily-product-track').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow : $('.d-prev'),
    nextArrow : $('.d-next')
});


/**--- 베스트 랭킹 --- */

/** 베스트 랭킹 카테고리 slick */

$('.best-ranking-category').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: false,
    draggable: false,
    prevArrow : $('.best-ranking-prev'),
    nextArrow : $('.best-ranking-next')
});

/** 베스트 랭킹 카테고리 아이콘 이벤트 */

$(".best-ranking-track").hide();
$(".best-ranking-track").eq(0).show();

$("#rn-main").on("click", ".best-ranking-category li a.category-icon", function(){
    var _this = $(this);
    var _cate_btn = $(".best-ranking-category li a.category-icon");

    _cate_btn.removeClass("active");
    _this.addClass("active");

    /** 각 카테고리별 탭 불러오기 */

    let _tab_id = _this.attr("data-cate");
    let _tab = $(".best-ranking-track");

    _tab.hide();
    _tab.eq(_tab_id).show();
    _tab.slick("unslick");// 베스트랭킹 탭 slick 초기화
    slick_fresh(); // 베스트랭킹 탭 slick 로드
});

/** 베스트 랭킹 컨텐츠 slick */

function slick_fresh(){
    $('.best-ranking-track').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        prevArrow : $('.best-prev'),
        nextArrow : $('.best-next')
    });    
}

slick_fresh();


});
