

/* -- 공통 스크립트 -- */

$(function(){

// 모달 팝업 닫기

$(".main-popup-wrap").on("click", ".main-popup-footer .main-popup-close", function(){
    var _popup = $(".main-popup-wrap");
    _popup.hide();
});

//GNB

$(".rn-gnb").on("mouseenter", ".rn-nav-wrap > li.nav-link", function(){
    var _this = $(this);
    var _lnb = $(".rn-lnb-wrap");

    $(".rn-nav-wrap > li.nav-link").removeClass("on");
    _this.addClass("on");
    _lnb.removeClass("hidden");
});


$(".rn-gnb").on("mouseover", ".rn-nav-wrap", function(){
    var _this = $(this);
    var _lnb = $(".rn-lnb-wrap");
    _lnb.addClass("hidden");
})


// 브랜드관 메뉴 열기&닫기

$("#rn-header").on("click", ".brand-gnb .brand-link", function(e){
    e.preventDefault();
    var brand_menu = $(this).next("ul");

    if(brand_menu.hasClass("hidden")){
        brand_menu.removeClass("hidden");
    } else {
        brand_menu.addClass("hidden");
    }
});

// 회사소개 메뉴 열기&닫기

$(".rn-gnb").on("click", ".nav-etc .compant-btn", function(e){
    e.preventDefault();
    var _co_menu = $(this).next("ul");
    if(_co_menu.hasClass("hidden")){
        _co_menu.removeClass("hidden");
    } else {
        _co_menu.addClass("hidden");
    }
});

//



});