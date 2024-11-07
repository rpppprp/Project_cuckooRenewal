"use strict";


/**------------------------------------------------------------
 * Popup
 -------------------------------------------------------------*/

$(function(){

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
        history.scrollRestoration = "auto"
    } else {
        _searchBox.removeClass("hidden");
    }
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

/** 카트 팝업 열기 // 241104 추가 */

$("#rn-header").on("click", ".cart-icon", function(){
    var _cartPopup = $(".cart-popup-wrap");
    _cartPopup.show();
    scrollDisable();
});

/** 카트 팝업 닫기 // 241104 추가 */

$("#rn-header").on("click", ".cart-popup-close", function(e){
    e.preventDefault();
    var _cartPopup = $(".cart-popup-wrap");
    _cartPopup.hide();
    scrollAble();
});


/** 메인 빌보드 더보기 팝업 // 241030 수정 */

let _visualPopup = $(".visual-detail-wrap");
$("#rn-main").on("click", ".visual-control .detail-btn", function(){
    if(_visualPopup.is(":visible")){
        _visualPopup.hide();
    } else {
        _visualPopup.show();
        scrollDisable();
    }
});

$("#rn-main").on("click", ".vs-close", function(){
    _visualPopup.hide();
    scrollAble();
});


});