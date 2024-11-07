"use strict";


/**------------------------------------------------------------
 * Footer
 -------------------------------------------------------------*/

$(function(){

/**따라다니는 메뉴 - 상담버튼 열기&닫기 */

$(".floating-quick .cs-btn-wrap").hide();
$("#rn-footer").on("click", ".floating-quick .cs-btn", function(){
    $(".floating-quick .cs-btn-wrap").fadeIn();
});

$("#rn-footer").on("click", ".cs-btn-wrap .cs-close", function(){
    $(".floating-quick .cs-btn-wrap").fadeOut();
});


/** 따라다니는 메뉴 - 상담버튼 */

$(window).load(function(){
    let _fixed_box = $(".floating-quick");
    let _stop_pos = $(".rn-footer").offset().top;

    $(window).on("scroll",function(){
        let _winPos = $(this).scrollTop(); // 현재위치
        if($(this).scrollTop() > 250){
            if(_winPos + 1000 >= _stop_pos){
                _fixed_box.addClass("stop")
            } else {
                _fixed_box.removeClass("stop")
            }
        } else {
            _fixed_box.addClass("stop")
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