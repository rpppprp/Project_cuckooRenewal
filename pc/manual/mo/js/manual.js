"use strict";

$(function(){
	
	/** mobile menu */
	
	$("#menuCheckbox").click(function(){
		var _this = $(this);
		var _menu = $(".navBar");
		
		if(_this.is(":checked")){
			$(".dimd").show();
			_menu.addClass("on");
			$('html, body').addClass('scroll-none'); // scroll off
		} else {
			$(".dimd").hide();
			_menu.removeClass('on');
			$('html, body').removeClass('scroll-none');// scroll on
		}
	})


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

    zoomistContainers.forEach(container => {
        // Zoomist 인스턴스 생성
        const zoom = new Zoomist(container, {
            zoomer: true,       // 확대/축소 버튼 활성화
            draggable: true,    // 항상 드래그 가능
            wheelable: false,   // 마우스 휠 확대 비활성화
            slider: true        // 슬라이더 기능 활성화
        });

        // 세로 스크롤 우선
        container.style.touchAction = "pan-y";

        // 드래그 이벤트 중 페이지 스크롤 유지
        const img = container.querySelector('.zoomist-image');
        if (img) {
            img.addEventListener('touchmove', function (e) {
                e.stopPropagation(); // 이미지 드래그는 막지 않고, 페이지 스크롤은 정상
            }, { passive: false });
        }
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
