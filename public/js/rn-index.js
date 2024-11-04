"use strict";


$(function(){

/** 스크롤 reset */

history.scrollRestoration = "manual"

/** 스크롤 제어 // 241030 추가 */

function scrollDisable() {
    $('html, body').addClass('scroll-none');
}

/** 스크롤 제어 off // 241030 추가  */

function scrollAble() {
    $('html, body').removeClass('scroll-none');
}

/** 메인 팝업 paging-number */

$(".main-popup-track").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    var index = (currentSlide ? currentSlide : slick.currentSlide) + 1; // 현재 슬라이드
    $('.main-popup-page .slick-dots').html('<b class="now">' + index + '</b><em>/</em><span class="all">' + (slick.slideCount)+'</span>');
})

/** 메인 팝업 slick // 241030 수정 */

function _mainPopup(){
    $(".main-popup-track").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        draggable: false,
        cssEase: 'linear',
        dots:true,
        prevArrow : $('.popup-prev'),
        nextArrow : $('.popup-next'),
        appendDots: $('.main-popup-page')
    });
}

// 메인팝업 불러오기 // 241030 추가


$(".main-popup-wrap").show(function(){
    _mainPopup(); // 메인팝업 오픈할 때 slick 리셋
});


/** 메인 팝업 닫기 */

$(".main-popup-wrap").on("click", ".main-popup-footer .main-popup-close", function(){
    var _popup = $(".main-popup-wrap");
    _popup.hide();
});

/** 검색모달 열기 */

let _searchBox = $(".search-modal-wrap");
$("#rn-header").on("click", ".search-wrap .search-form", function(){
    _searchBox.removeClass("hidden");
    scrollDisable();
});

/** 검색모달 닫기( 모달영역외에 클릭시 닫기) // 241030 수정*/

$(document).on("mouseup", ".search-modal-wrap", function(e){
    if(_searchBox.has(e.target).length === 0){
        _searchBox.addClass("hidden");
        scrollAble();
    } else {
        _searchBox.removeClass("hidden");
    }
});


/**--------- header --------- */


/**--- Top 텍스트 slick --- // 241031 수정 */


$(".top-txt-track").slick({
    arrows: false,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
});

/** Top 배너 불러오기 // 241031 추가 */

$(".rn-top").show(100, function(){
    $(".top-txt-track").slick('refresh');
})

$(document).on("click", ".top-wrap .close-top", function(){
    var _top_bn = $(".rn-top");
    _top_bn.fadeOut(500);
});

/**--- 헤더 스크롤 --- */

$(window).load(function(){
    let _header = $("#rn-header");

    $(window).on("scroll",function(){
        let _winPos = $(this).scrollTop(); // 현재위치
        if(_winPos >= 300){
            _header.addClass("fixed")
        } else {
            _header.removeClass("fixed")
        }
    });
})

/**--- GNB --- */

let _lnb_cate = $(".rn-lnb-wrap .inner > .lnb-cetegory-wrap"); // lnb 카테고리
let _lnb = $(".rn-lnb-wrap");
_lnb_cate.hide(); // lnb 카테고리 리셋

/** GNB 열기 */ 

$("#rn-header").on("mouseenter", ".rn-gnb .rn-nav-wrap li.nav-link", function(){
    var _this = $(this);
    let data_id = _this.attr("data-lnb");

    $(".rn-nav-wrap > li.nav-link").removeClass("on");
    _this.addClass("on");
    _lnb.removeClass("hidden");
    
    _lnb_cate.hide();
    _lnb_cate.eq(data_id).show();
});

/** GNB 닫기 */

$("#rn-header").on("mouseleave", ".rn-gnb", function(){
    $(".rn-nav-wrap > li.nav-link").removeClass("on");
    _lnb.addClass("hidden");
})

/** 브랜드관 메뉴 열기&닫기 */

$("#rn-header").on("click", ".brand-gnb", function(e){
    e.preventDefault();
    var brand_menu = $(this).find("ul");
    if(brand_menu.hasClass("hidden")){
        brand_menu.removeClass("hidden");
    } else {
        brand_menu.addClass("hidden");
    }
});

$(document).on("mouseup",  function(e){
    var _brand = $(".brand-gnb .brand-lnb");
    if(_brand.has(e.target).length === 0){
        _brand.addClass("hidden");
    }else{
        _brand.removeClass("hidden");
    }
});

/** 회사소개 메뉴 열기&닫기 */

$("#rn-header").on("click", ".nav-etc .company-btn", function(e){
    e.preventDefault();
    var _co_menu = $(this).next("ul");
    if(_co_menu.hasClass("hidden")){
        _co_menu.removeClass("hidden");
    } else {
        _co_menu.addClass("hidden");
    }
});

$(document).on("mouseup", function(e){
    var _coper = $(".nav-etc .company-lnb");
    if(_coper.has(e.target).length === 0){
        _coper.addClass("hidden");
    }else{
        _coper.removeClass("hidden");
    }
});

/** 검색어 vertical slick */

$(".search-slide").slick({
    arrows: false,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
});

/** 어카운트 드롭다운 메뉴 // 241030 추가 */

$("#rn-header").on("click", ".icon-wrap .user-icon", function(){
    var _account = $(this).next("ul.account-menu");
    if(_account.is(":visible")){
        _account.hide();
    } else {
        _account.show();
    }
});

$(document).on("mouseup", function(){
    var _account = $("ul.account-menu");
    _account.hide();
});


/** 카트 팝업 뱃지 유무 // 241104 추가 */

function _cartPopupBadge(){
    var _cNum = 0; // 카트 상품 개수 기본값(0개)

    $(".mall-cart-num, .rental-cart-num, .subs-cart-num").each(function(e){
        var _this = $(this); 
        var _thisNum = _this.text(); // 해당 영역의 상품 개수 불러오기
        // 카트에 담긴 상품이 없을 때 상품 개수 뱃지 비노출
        if(_cNum == _thisNum) {
            _this.hide();
        }
    });
}

_cartPopupBadge();

/** 카트 팝업 열기 */

$("#rn-header").on("click", ".cart-icon", function(){
    var _cartPopup = $(".cart-popup-wrap");
    _cartPopup.show();
    scrollDisable();
});

/** 카트 팝업 닫기 */

$("#rn-header").on("click", ".cart-popup-close", function(e){
    e.preventDefault();
    var _cartPopup = $(".cart-popup-wrap");
    _cartPopup.hide();
    scrollAble();
});

$(document).on("mouseup",".cart-popup-wrap", function(e){
    var _cartPopup = $(".cart-popup-wrap");
    if(_cartPopup.has(e.target).length === 0){
        _cartPopup.hide();
        scrollAble();
    }
});


/**--------- container ---------*/


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


/** 메인 빌보드 더보기 팝업 // 241030 수정 */

let _visualPopup = $(".visual-detail-wrap");
$("#rn-main").on("click", ".visual-control .detail-btn", function(){
    if(_visualPopup.hasClass("hidden")){
        _visualPopup.removeClass("hidden");
        scrollDisable();
    }else {
        _visualPopup.addClass("hidden");
    }
});


$("#rn-main").on("click", ".vs-close", function(){
    _visualPopup.addClass("hidden");
    scrollAble();
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


/**--------- footer --------- */

/**따라다니는 메뉴 - 상담버튼 열기&닫기 */

$(".floating-quick .cs-btn-wrap").hide();
$("#rn-main").on("click", ".floating-quick .cs-btn", function(){
    $(".floating-quick .cs-btn-wrap").fadeIn();
});

$("#rn-main").on("click", ".cs-btn-wrap .cs-close", function(){
    $(".floating-quick .cs-btn-wrap").fadeOut();
});


/** 따라다니는 메뉴 - 상담버튼 */

$(window).load(function(){
    let _fixed_box = $(".floating-quick");
    let _stop_pos = $(".rn-footer").offset().top;

    $(window).on("scroll",function(){
        let _winPos = $(this).scrollTop(); // 현재위치
        if(_winPos + 1000 >= _stop_pos){
            _fixed_box.addClass("stop")
        } else {
            _fixed_box.removeClass("stop")
        }
    });
})

/** top 버튼 */ 

$(document).on('click', '.top-btn', function(e){
    e.preventDefault();
    $('html, body').stop().animate({scrollTop :0})
})

/** 패밀리사이트 드롭다운메뉴 열기&닫기 */

$(".family-list").hide();
$("#rn-footer").on("click", ".family-site .family-label", function(e){
    e.preventDefault();
    var _dropdown = $(this).next("ul");
    
    if(_dropdown.is(":visible")){
        _dropdown.fadeOut();
    } else {
        _dropdown.fadeIn();
    }
});

$(document).on("mouseup", function(e){
    var _family = $(".family-site .family-list");
    if(_family.has(e.target).length === 0){
        _family.fadeOut();
    }
});


});