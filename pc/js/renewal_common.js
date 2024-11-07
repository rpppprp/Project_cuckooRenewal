"use strict";


/**------------------------------------------------------------
 * COMMON
 -------------------------------------------------------------*/

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


});