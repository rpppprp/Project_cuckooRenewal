"use strict";

/* -- 공통 스크립트 -- */

$(function(){

// 모달 팝업 닫기

$(".main-popup-wrap").on("click", ".main-popup-footer .main-popup-close", function(){
    var _popup = $(".main-popup-wrap");
    _popup.hide();
});

// 검색모달 열기

let _searchBox = $(".search-modal-wrap");
$("#rn-header").on("click", ".search-wrap .search-form", function(){
    _searchBox.removeClass("hidden");
});

// 검색모달 닫기( 모달영역외에 클릭시 닫기 )

$(document).on("mouseup", function(e){
    if(_searchBox.has(e.target).length === 0){
        _searchBox.addClass("hidden");
    }else{
        _searchBox.removeClass("hidden");
    }
})

//--------- GNB ---------//

let _lnb_cate = $(".rn-lnb-wrap .inner > .lnb-cetegory-wrap"); // lnb 카테고리
let _lnb = $(".rn-lnb-wrap");
_lnb_cate.hide(); // lnb 카테고리 리셋

// GNB 열기 

$("#rn-header").on("mouseenter", ".rn-gnb .rn-nav-wrap li.nav-link", function(){
    var _this = $(this);
    let data_id = _this.attr("data-lnb");

    $(".rn-nav-wrap > li.nav-link").removeClass("on");
    _this.addClass("on");
    _lnb.removeClass("hidden");
    
    _lnb_cate.hide();
    _lnb_cate.eq(data_id).show();
});

// GNB 닫기

$("#rn-header").on("mouseleave", ".rn-gnb", function(){
    $(".rn-nav-wrap > li.nav-link").removeClass("on");
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

$("#rn-header").on("click", ".nav-etc .compant-btn", function(e){
    e.preventDefault();
    var _co_menu = $(this).next("ul");
    if(_co_menu.hasClass("hidden")){
        _co_menu.removeClass("hidden");
    } else {
        _co_menu.addClass("hidden");
    }
});


//--------- container ---------//

// 메인 빌보드 더보기 팝업
let _visualPopup = $(".visual-detail-wrap");
$("#rn-main").on("click", ".visual-control .detail-btn", function(){
    if(_visualPopup.hasClass("hidden")){
        _visualPopup.removeClass("hidden");
    }else {
        _visualPopup.addClass("hidden");
    }
});

$("#rn-main").on("click", ".vs-close", function(){
    _visualPopup.addClass("hidden");
});

// gif 제어

new Freezeframe({
    selector : ".video-clip > img",
    trigger : "hover",
    overlay : true
});


//--------- footer ---------//

// 따라다니는 메뉴 - 상담버튼 열기&닫기

$(".floating-quick .cs-btn-wrap").hide();
$("#rn-main").on("click", ".floating-quick .cs-btn", function(){
    $(".floating-quick .cs-btn-wrap").fadeIn();
});

$("#rn-main").on("click", ".cs-btn-wrap .cs-close", function(){
    $(".floating-quick .cs-btn-wrap").fadeOut();
});


// 따라다니는 메뉴 - 상담버튼 고정

$(window).load(function(){
    let _fixed_box = $(".floating-quick");
    let _stop_pos = $(".rn-footer").offset().top;

    $(window).on("scroll",function(){
        let _winPos = $(this).scrollTop(); //현재위치
        if(_winPos + 1000 >= _stop_pos){
            _fixed_box.addClass("stop")
        } else {
            _fixed_box.removeClass("stop")
        }
    });
})

// top 버튼 

$(document).on('click', '.top-btn', function(e){
    e.preventDefault();
    $('html, body').stop().animate({scrollTop :0})
})

// 패밀리사이트 드롭다운

$(".family-list").hide();
$("#rn-footer").on("click", ".family-site .family-label", function(e){
    e.preventDefault();
    var _dropdown = $(this).next("ul");
    
    if(_dropdown.is(":visible")){
        _dropdown.hide(300);
    } else {
        _dropdown.show(300);
    }
});

});