"use strict";


/**------------------------------------------------------------
 * header
 -------------------------------------------------------------*/

 $(function(){

/** 스크롤 reset */

history.scrollRestoration = "manual"   

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
    let _header = $(".rn-header-wrap");

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

var brand_menu = $(".brand-lnb");
var _arrow = $('.brand-link .dropdown-icon');

$("#rn-header").on("click", ".brand-gnb .brand-link", function(e){
    e.preventDefault();
    if(brand_menu.is(":visible")){
        brand_menu.hide();
        _arrow.removeClass('on');
    } else {
        brand_menu.show();
        _arrow.addClass('on');
    }
});

$(document).on("mouseup",  function(e){
    var _brand = $(".brand-gnb")

    if(!_brand.is(e.target) && _brand.has(e.target).length === 0) {
        _brand.find('ul').hide();
        _arrow.removeClass('on');
    }
});


/** 회사소개 메뉴 열기&닫기 */

var _co_menu = $(".company-lnb");
var _co_arrow = $('.company-btn .dropdown-icon');

$("#rn-header").on("click", ".nav-etc .company-btn", function(e){
    e.preventDefault();
    if(_co_menu.is(":visible")){
        _co_menu.hide();
        _co_arrow.removeClass('on');
    } else {
        _co_menu.show();
        _co_arrow.addClass('on');
    }
});

$(document).on("mouseup",  function(e){
    var _comBtn = $(".nav-etc li").eq(0)

    if(!_comBtn.is(e.target) && _comBtn.has(e.target).length === 0) {
        _comBtn.find('ul').hide();
        _co_arrow.removeClass('on');
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


 });