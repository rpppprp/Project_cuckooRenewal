"use strict";

$(function(){

/** esg visual slick */
$('.esg-visual-bn-track').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dots:true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    appendDots: $('.esg-visual-pager')
});

/** esg tab nav - 따라다니는 탭 */
$(window).load(function(){
    let _fixed_esg = $(".esg-tab .inner");
    let _stop_pos = $("#esg-section01").offset().top;

    $(window).on("scroll",function(){
        let _winPos = $(this).scrollTop();
        if(_winPos + 30 >= _stop_pos){
            _fixed_esg.addClass("fixed")
        } else {
            _fixed_esg.removeClass("fixed")
        }
    });
});

/** esg tab nav - button action */
$("#rn-main").on("click",".esg-tab-wrap li a", function(){
    var _this = $(this);
    $(".esg-tab-wrap li a").removeClass("on");
    _this.addClass("on");
});

/** esg tab nav - scroll action */
$(document).on('click', '.esg-tab-wrap li a', function(e){
    e.preventDefault();
    e.stopPropagation();
    var _section = $(this).attr('href');
    var _esgNav = $(".esg-tab-wrap");
    var _navHeight = _esgNav.outerHeight();
    
    $('html, body').animate({
        scrollTop: $(_section).offset().top - _navHeight
    }, 500);
    return false;
})

/** esg tab nav - 스크롤 감지 */
$(window).on("scroll",function(){
    var _currentPos = $(this).scrollTop(); // 현재위치
    var _section = $(".esg-section");
    var _esgNav = $(".esg-tab-wrap");
    var _navHeight = _esgNav.outerHeight();

    _section.each(function(){
        var top = $(this).offset().top - _navHeight,
        bottom = top + $(this).outerHeight();
    
        if (_currentPos >= top && _currentPos <= bottom) {
            _esgNav.find('a').removeClass('on');
    
            $(this).addClass('on');
            _esgNav.find('a[href="#' + $(this).attr('id') + '"]').addClass('on');
        }
    });
});


/** esg social slick */
$('.esg-s-track').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    fade: true,
    dots:true,
    prevArrow : $('.esg-s-prev'),
    nextArrow : $('.esg-s-next'),
    appendDots: $('.esg-s-sub-track'),
    customPaging : function(slick,i) {
        var thumImg = slick.$slides.eq(i).find('img').attr('src');
        var _i = i + 1;
        return '<div class="thum'+ _i +'" style="background-image:url('+ thumImg +')"></div>'
    }
});


})