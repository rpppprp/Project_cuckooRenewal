"use strict";

$(function(){

    /** navBar */

    $(".nav-item").click(function(){
        var _this = $(this);
        var _dropdown = _this.next('ul.dropdown-menu');
        
        _this.toggleClass('on');// 클래스 토글
        _dropdown.slideToggle();// 드롭다운 토글

    })

    /** image number */

    const imgObj = $(".manual-img").length;

    // paging 삽입
    $(".manual-img").html(
        "<div class='image-page'><span class='current'></span>/<em class='all'>" + imgObj + "</em></div>"
    );
    
    // 각 이미지 번호 부여
    $('.manual-img').each(function(index, node){
        $(node).attr('data-img-no', index + 1);
        $(this).find('span.current').text(index + 1);
    });

    /** Zoomist */

    // 모든 zoomist-container 선택
    const zoomistContainers = document.querySelectorAll('.zoomist-container');

    // 각각에 Zoomist 인스턴스 생성
    zoomistContainers.forEach(container => {
        new Zoomist(container, {
            // 옵션 예시
            zoomer: true,
            draggable: true,
            wheelable: false,
            slider: true
        });
    });


    /** 스크롤 이동 */

    $(".dropdown-item").click(function(){
        var _link = $(this).data('link');
        var _target = $(".manual-img[data-img-no='" + _link + "']");

        $(".dropdown-item").removeClass('on');
        $(this).addClass("on");

        if(_target.length){
            $("html, body").animate({
                scrollTop: _target.offset().top - 80
            }, 600);
        }

    })

})
