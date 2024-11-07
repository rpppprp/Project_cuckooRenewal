"use strict";

$('.layer_pop.w100p').scroll(function(){
	var scrollValue = $(this).scrollTop();
	TweenMax.to( $('.layer_pop.w100p .btn-close-pop'), .3, {top:scrollValue + 30, ease: es_step});
});


var winW;
var winH;
var es_step = "Expo.ease";
var $window = $(window);
var winSc;
var htmlH;
var winh = $(window).width();

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");

    var $header = $('#header');
    var $footer = $('#footer');
    var $btnTop = $('.btn-top');
    var $kakaoBox = $('.kakao_box');

    $(window).scroll(function () {
        winSc = $(this).scrollTop();

        var position = $(window).scrollTop(); // 현재 스크롤바의 위치
    		// headerHeight = $('#header').outerHeight(true),
    		// asideBoxH  = $(".aside_box").outerHeight(true),
            // topContH = $(".top_content").outerHeight(true)

        if(!($header.hasClass('all_menu_open'))){
            if(winSc > 0){
                $header.addClass('fixed');
                $btnTop.addClass('fixed');
                $kakaoBox.addClass('fixed');
                if(position + 850 >= $footer.offset().top) {
                    $btnTop.addClass('stop');
                    $kakaoBox.addClass('stop');
                }
                else {
                    $btnTop.removeClass('stop');
                    $kakaoBox.removeClass('stop');
                }
            }
            else {
                $header.removeClass('fixed');
                $btnTop.removeClass('fixed');
                $kakaoBox.removeClass('fixed');
            }
        }
    });
    //main();
	setTimeout(function(){
		layout();
	},150);
    //scrollBg();
    //locationJS();
    object();
    comparisonLayer();
    uiTab();
    uiAcodian();
	gnb_resize();
    // newGnb();
    newGnb2();

    $(document).on('click', '.select_box > a', function(e){
        e.preventDefault();
	
        if(!($(this).parent().hasClass('disabled'))){
            if(!($(this).hasClass('on'))) {
                $('.select_box a').removeClass('on');
                //$(this).parent().siblings().find('a').removeClass('on');
                $(this).addClass('on');
                $(document).on('click', '.select_box .hidden a', function(e){
                    e.preventDefault();
                    var thisText = $(this).text();
                    
                    $(this).closest('.hidden').prev().removeClass('on');
                    $(this).closest('.hidden').prev().addClass('selected');
                    $(this).closest('.hidden').prev().empty();
                    $(this).closest('.hidden').prev().append(thisText);
                    $(this).parents('.hidden').find('li').removeClass('on');
                    $(this).parent().addClass('on');
					if($('#select_month > a').hasClass('selected')){					
						$('.price_area').hide();
						$('.price_area.price_area_02').show();
					}
                });
            } else {
                $(this).removeClass('on');
            }
        }
		
	
    });
    $(document).on('click', '.btn-top', function(e){
        e.preventDefault();
        $('html, body').stop().animate({scrollTop :0})
    })
    var $wrap_tooltip = $('.tooltip_wrap'),
        $box_tooltip = $wrap_tooltip.find('.box_tooltip'),
        $ico_tooltip = $box_tooltip.find('.ico.tooltip'),
        $tooltip_cnt = $ico_tooltip.find('.tooltip_cnt');

    $ico_tooltip.on('mouseenter',function(){
        var $this = $(this);
        var arrow = '<span class="bg_arrow"></span>';
        var boxW = $this.parent().outerWidth();
        var icoW = $this.outerWidth();
        var arrowW = $('.bg_arrow').outerWidth();
        var tooltip_cntW = $('.tooltip_cnt').outerWidth();

        $this.parent().append(arrow);
        $this.next().fadeIn('fast');

        $this.parent().find('.bg_arrow').css('left',(boxW-(icoW/2))-$('.bg_arrow').outerWidth()/2);
        $this.parent().find('.tooltip_cnt').css('left',(boxW-(icoW/2))-$('.bg_arrow').outerWidth()/2 - (tooltip_cntW/2));
        if($this.hasClass('typeA')){
            $this.parent().find('.tooltip_cnt').css('left','-95px');
        }
		if($this.hasClass('type02')){
            $this.parent().find('.tooltip_cnt').css('left','30px');
        }
		

    });
    $ico_tooltip.on('mouseleave',function(){
        var $this = $(this);
        $this.next().fadeOut('fast');
        $this.parent().find('.bg_arrow').remove();

    });
    $('.star a, .star_big_size a').on('click', function(e){
		console.log('ddd');
		e.preventDefault();
		var starIndex = $(this).parent().index()+1;

		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		$(this).parent().prevAll().addClass('on');

	});
	/*
    $('#inputFile').on('change', function(){
		$('.file-view-wrap').css('z-index',0);
		$('.close-view').show();
		readURL(this);
	});
	$('.close-view').on('click', function(){
		$(this).hide();
		$('#inputFile').val('');
		$('.file-view').attr('src','/pc/images/common/img_file.png');
		//$('.file-view-wrap').css('z-index',-100);
	});
	var uploadFile = $('.fileBox2 .uploadBtn');
	uploadFile.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.fileName').val(filename);
	});
	function readURL(input) {
		if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
				$('.file-view').attr('src', e.target.result);
			}
		  reader.readAsDataURL(input.files[0]);
		}
	}
    $(document).on('click', '.qa_list .more', function(e){
        e.preventDefault();
        if(!($(this).parents('li').hasClass('on'))){
            $(this).parents('li').addClass('on');
        }else{
            $(this).parents('li').removeClass('on');
        }

    });
    
    /*$(document).on('click', '.like', function(e){
        e.preventDefault();
        if(!($(this).hasClass('on'))){
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
    });*/
    /*상품상세 앵커이동*/
    if($('#container').hasClass('prd_view')){
        var tabArray = [];
    	$('.prd_tab').each(function(index){
    		tabArray[index] = parseInt($(this).offset().top-73);//탭영역 제외
    	});

    	$('.prd_tab a').on('click', function(e){
    		e.preventDefault();
    		var index = $(this).parent().index();

    		$('html, body').stop().animate({scrollTop:tabArray[index]},500);
    	});
        $('.line_type input[type="text"], input[type="password"], input[type="number"], input[type="tel"]').on('focus', function(){
            $(this).closest('tr').addClass('on')
        });
        $('.line_type input[type="text"], input[type="password"], input[type="number"], input[type="tel"]').on('blur', function(){
            $(this).closest('tr').removeClass('on')
        });
    }

});
function layout() {
    var $header = $("#header");
    var	$gnb = $header.find("#gnb"),
        $gnbOpenDepth = $gnb.find(".open_depth"),
        $gnbAllDepth = $gnb.find(".all_depth"),
        $gnbAllDepthWrap = $gnbAllDepth.find(".depth_wrap"),
        $allMenuWrap = $('.all_menu'),
        $allMenuClose = $('.all_menu_close');
    var _allDepthH = $gnbAllDepthWrap.innerHeight(),
        _allMenuH = $allMenuWrap.find('.inner').innerHeight();

    var $gnbDimmed = $("#gnbDimmed");
    var $allNavBtn = $("#allNavBtn");

    /*//gnb open/close
    $gnbOpenDepth.find("li a").mouseenter( function () {
	
		if( $('#header').hasClass('shop') || $('#header').hasClass('rental')){
			gnbOpen(_allDepthH);
		}
    });
    $gnbAllDepth.mouseleave(function () {
        gnbClose();
    });
    $gnbDimmed.mouseenter  (function () {
       
		if( $('.all_menu').height() > 0 ){
		
		}else{
			 gnbClose();
		}
    });


    function gnbOpen(_gnbHeight) {
        $gnbAllDepthWrap.addClass("open");
        TweenMax.to($gnbAllDepth, .3, {height: _gnbHeight, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.8, ease:es_step});
    }

    function gnbClose() {
        $gnbAllDepthWrap.removeClass("open");
        TweenMax.to($gnbAllDepth, .3, {height: 0, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});
    }

    $('#headerAllBtn').on('click', function(){
		$header.addClass('all_menu_open');
		TweenMax.to($allMenuWrap, .3, {height: _allMenuH, ease: es_step});
		TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.8, ease:es_step});
		TweenMax.to($allMenuClose, .8, {display:"block", opacity:.8, ease:es_step}).delay(0.4);	
    });
    
    $('.all_menu_close').on('click', function(){
		if( $('.depth_wrap').hasClass('open') ){
			console.log('dddddddddd');
			$header.removeClass('all_menu_open');
			TweenMax.to($allMenuClose, .3, {display:"none", opacity:0, ease:es_step, delay:.3});
			TweenMax.to($allMenuWrap, .3, {height: 0, ease: es_step});
		}else{
			$header.removeClass('all_menu_open');
			TweenMax.to($allMenuClose, .3, {display:"none", opacity:0, ease:es_step, delay:.3});
			TweenMax.to($allMenuWrap, .3, {height: 0, ease: es_step});
			TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});
		}

    });*/

    //헤더 뉴스 모션
    var $headerNews = $header.find(".header_news"),
        $headerNewsObject = $headerNews.find("li"),
        _headerNewsLength = $headerNews.find("li").length;

    var headerNewsCrr = {};
    Object.defineProperty(headerNewsCrr, 'number', {
        get: function () {
            return this.num || 0;
        },
        set: function (_index) {
            _index = _index % _headerNewsLength;
            TweenMax.to($headerNewsObject.eq(_index-1), .3, {y: -20});
            TweenMax.fromTo($headerNewsObject.eq(_index), .3, {y: 20}, {y: 0});
            this.num = _index;
        }
    });

    var headerNewsDuration = 3000;
    var headerNewsTimer = setInterval(visualSet, headerNewsDuration);

    function visualSet(){
        headerNewsCrr.number++;
    }

    $headerNews.find("a").mouseenter(function () {
        clearInterval(headerNewsTimer);
    }).mouseleave(function () {
        headerNewsTimer = setInterval(visualSet, headerNewsDuration);
    });

    //장바구니, 검색 오픈
    var $headerCartSearchBtn = $header.find(".cart_btn, .search_btn");
    var $headerPopupClose = $header.find(".header_popup_close");
    $headerCartSearchBtn.click(function () {
    	$.getKeyword();
        TweenMax.to($(this).siblings(".header_popup"), .3, {y:0, opacity:1, display:"block", ease:es_step});
        TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.8, ease:es_step});
    });

    $headerPopupClose.click(function () {
        TweenMax.to($(this).parent(".header_popup"), .3, {y:20, opacity:0, display:"none", ease:es_step});
        TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});
    });

    //gnb_search
    /*$allNavBtn.click(function () {
        var _this = $(this);
        if (!_this.hasClass("active")) {
            _this.addClass("active");
            TweenMax.to($headerSiteMap, .3, {height:525});
            TweenMax.to($navDimmed, .3, {display:"block", opacity:.6, ease:es_step});
            $fpNav.css({display: "none"});
            navOpen = true;
        } else {
            _this.removeClass("active");
            TweenMax.to($headerSiteMap, .3, {height:0});
            TweenMax.to($navDimmed, .3, {display:"none", opacity:0, ease:es_step});
            $fpNav.css({display: "block"});
            navOpen = false;
        }
    });*/

    //footer
    var $familySite = $("#familySite");
    var $familyBtn = $familySite.find(".tit");
    var $familySiteH = $familySite.find('.hidden').height() + 137;
    $familyBtn.click(function (e) {
        e.preventDefault();
        if(!$familySite.hasClass("on")){
            TweenMax.to($familySite, .2, {height:$familySiteH});
            $familySite.addClass("on");
        } else {
            TweenMax.to($familySite, .2, {height: 48});
            $familySite.removeClass("on");
        }
    });
    $familySite.mouseleave(function () {
        TweenMax.to($familySite, .2, {height: 48});
        $familySite.removeClass("on");
    });
    if($('.datepicker_input').length > 0){
        $('.datepicker_input').datepicker({
            dateFormat: 'yy-mm-dd',
            showMonthAfterYear:true ,
            monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
            monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'], //달력의 월 부분 Tooltip 텍스트 //달력의 월 부분 텍스트
            dayNamesMin: ['일','월','화','수','목','금','토'], //달력의 요일 부분 텍스트
        });

     
		if( $(".datepicker_input").hasClass('no_date') ){
			$(".datepicker_input").datepicker();
		}else{
			//$(".datepicker_input").datepicker().datepicker("setDate", new Date());
			$(".datepicker_input").datepicker();
		}
    }



}

function object(){
    var $popup = $("#modalPopup");
    var $popupOpen = $(".popup_open");
    var $close = $(".popup_close");
    var $popupWrap = $popup.find(".popup_wrap");

    $popupOpen.click(function () {
        var _this = $(this);
        var _popUpName = _this.attr("id").replace("OpenBtn","");
        $("html").addClass("no_scroll");
        $("#"+_popUpName).show();
        TweenMax.to($popup, .5, {opacity: 1, display: "block"});
        TweenMax.fromTo($(".popup_container"), .5, {y: 50}, {y: 0, ease: es_step});
    });

    function noscroll(){
        $("html").removeClass("no_scroll");
        $popupWrap.hide();
    }

    $close.on("click", function () {
        TweenMax.to($popup, .3, {opacity: 0, display: "none", ease: es_step, onComplete: noscroll});
    });

    //쿠키 정책 팝업
    var $cookiePopup = $("#cookiePopup");
    var $cookieBtn = $cookiePopup.find("button");

    $cookieBtn.click(function () {
        TweenMax.to($cookiePopup, .3, {y:70});
    });
}

function comparisonLayer(){
    var $comparisonWrap = $('.comparison_wrap'),
        $comparsionBtn = $comparisonWrap.find('.btn-layer'),
        _comparsionBtnHeight = $comparsionBtn.innerHeight(),
        $comparsionBody = $comparisonWrap.find('.comparison_body'),
        _comparsionHeight = $comparsionBody.find('.inner').innerHeight();

    //gnb open/close
    
    //사업자 관련 추가!!
    $comparsionBtn.on("click", function () {
    	var joinType = $comparsionBtn.data("jointype");
    	var authFg = $comparsionBtn.data("auth");
    	
    	if (joinType == "1" && authFg != "1") {
			var msg = (authFg == "0") ? "사업자 회원은 관리자 승인 후 이용하실 수 있습니다<br/>빠르게 확인 후 처리 드리겠습니다." : "사업자 승인 반려되었습니다.<br/>고객센터에 문의 하여 주세요.";
			message.popup({content : msg});
    		return false;
    	}
        if(!$(this).parent().hasClass('open')){
            $(this).parent().addClass('open');
            $comparsionBody.css('height',_comparsionHeight);
            $('.prd_list').addClass('comparsion_layer_open');
        }else{
            $(this).parent().removeClass('open');
            $comparsionBody.css('height',0)
            $('.prd_list').removeClass('comparsion_layer_open');
        }

    });

}
$(".wrap_layer_pop ").bind("mousewheel", function(e) {
  //return false;
   e.stopPropagation()

});
$(function(){
	$('.gallery_wrap .slider-for').slick({
	 slidesToShow: 1,
	 slidesToScroll: 1,
	 arrows: false,
	 fade: true,
	 asNavFor: '.gallery_wrap .slider-nav'
	});
	$('.gallery_wrap .slider-nav').slick({
	 slidesToShow: 5,
	 slidesToScroll: 1,
	 asNavFor: '.gallery_wrap .slider-for',
	 centerMode: true,
	 focusOnSelect: true,
	 vertical:true,

	});
	
});
function layerPopOpen(obj){// 레이어팝업 열기, obj : 해당팝업 id
	$('.wrap_layer_pop').removeClass('open');
	var thisPop = $('#'+obj).find('.layer_pop');
    var winW = $(window).width();
    var winH = $(window).height();
	//dimOn();


	if($('#'+obj).length >= 1){
		$('html, body').css('overflow','hidden');
		$('#'+obj).addClass('open');
		$('#'+obj).children('.layer_pop').wrapInner( '<div class="new00"></div>');       
    }

}


function layerPopClose(obj){// 레이어팝업 닫기, obj : 해당팝업 id
	$('.new00').contents().unwrap();
	
    $('#'+obj).removeClass('open');
	$('#'+obj).removeClass('ex_pd');
    $('html, body').css('overflow','auto');
	//$('.photo_review').slick('unslick');
}

function uiTab(){

    $(document).on('click', '.ui_tab.tab_btn a', function(e){
        e.preventDefault();
		var uri = $(this).attr("href");
		
		if (uri != "" && uri != "#") {
	        location.href=uri;
	        return false;
        }
        var index = $(this).parent().index();
        
        if (!$(this).hasClass("nojs")) {
            $(this).parent().siblings().removeClass('on');
            $(this).parent().addClass('on');
            $('.tab_cont_wrap').find('.cont').siblings().hide();
            $('.tab_cont_wrap').find('.cont').eq(index).show();
    		$('.choice_prd_bottom_fixed').find('.prd_bottom_fixed').siblings().hide();
    		$('.choice_prd_bottom_fixed').find('.prd_bottom_fixed').eq(index).show();        	
        }
    });
    /*
    $(document).on('click', '.tab_btn a', function(e){
        e.preventDefault();

        var index = $(this).parent().index();
		var uri = $(this).attr("href");
		
        $(this).parent().siblings().removeClass('on');
        $(this).parent().addClass('on');
        
        
        if (uri != "" && uri != "#") {
	        location.href=uri;
        }
    });
    */
}
function uiAcodian(){
    $(document).on('click', '.ui_acodian .btn-view', function(e){
        e.preventDefault();
        if(!($(this).parents('.ui_acodian').hasClass('on'))){
            $(this).parents('.ui_acodian').addClass('on');
        }else{
            $(this).parents('.ui_acodian').removeClass('on');
        }

    })
}

/*
if (navigator.userAgent.match(/Trident\/7\./)) { //ie 픽스트 버그처리
    $('body').on("mousewheel", function (e) {
    e.preventDefault();

    var wheelDelta = event.wheelDelta;

    var currentScrollPosition = window.pageYOffset;
    window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
};
*/

function loadingOpen(){ //로딩열기
	var str = '';
	str += '<div id="layer_pop_loading" class="wrap_layer_pop">';
	str	+= '<div class="layer_pop">';
	str	+= '<img src="../../images/common/Loading.gif" alt="">';
	str	+= '</div>';
	str	+= '</div>';
	$('body').append(str);
}
function loadingClose(){ //로딩닫기
	$('#layer_pop_loading').remove();
}
// 레이어팝업 슬릭작동
function popup_slick(){
	$('.gallery_wrap .slider-for').slick({
		slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery_wrap .slider-nav',
	});
    $('.gallery_wrap .slider-nav').slick({
		slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.gallery_wrap .slider-for',
        centerMode: true,
        focusOnSelect: true,
        vertical:true,
	});
    $('.photo_review').slick({
		dots: true
    });
};
$(document).ready(function(){
	// 검색영역 벨류값 삭제
	$('.search_del').click(function(){
		console.log('del_click');
		$(this).parent('.search_input').children('input').val('').trigger('change').focus();
	});

	// 장바구니
	orderfix();
	// 주문결제 아코디언
	$('.accordion_tab > .arco_in > .tit').click(function(){
		$(this).parents('.arco_in').toggleClass('on');

	});
});
$(window).resize(function(){
	// 장바구니
	orderfix();
});


// 장바구니 픽스
function orderfix() {
	$(window).on('scroll',function(){
		if($('.aside_box').length > 0){
			var position = $(window).scrollTop(); // 현재 스크롤탑의 위치
			var	contTop = $('.content').offset().top; // 컨텐츠의 탑위치값
			var asideBoxH  = $('.aside_box').outerHeight(true);
			var pa = position + asideBoxH;
			var fot = $('#footer').offset().top-72;
			var documentScrollLeft = $(document).scrollLeft();
			var scrll_l = $(this).scrollLeft();
			var lastScrollLeft = 0;	
			if(position > contTop ){
				if(lastScrollLeft < documentScrollLeft){
					$('.aside_box').css('left', 950 - scrll_l);
					$('.aside_box').css('top','72px');
					$('.aside_box').addClass('fixed');
				}else{
					$('.aside_box').css('top','72px');
					$('.aside_box').addClass('fixed');
				}
    		}else{
				if(lastScrollLeft < documentScrollLeft){
					$('.aside_box').css('top','');
					$('.aside_box').removeClass('fixed');
					$('.aside_box').css('left', '');
				}else{
					$('.aside_box').css('top','');
					$('.aside_box').removeClass('fixed');
				}
			}
			if( pa > fot ){
				var top = ( $('#footer').offset().top) - (position+asideBoxH+30);
    			$('.aside_box').css('top',top);	
			}
		}
	});
}

$(document).ready(function(){
  var fileTarget = $('.filebox.txt_type .upload-hidden');
	/*
    fileTarget.on('change', function(){
	
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
		$(this).parents('.fr').parents('.clear').children('.fl').find('.upload-name').val(filename);
		
    });
    */
}); 

function inputTelNumber(obj) {

    var number = obj.value.replace(/[^0-9]/g, "");
    var tel = "";

    // 서울 지역번호(02)가 들어오는 경우
    if(number.substring(0, 2).indexOf('02') == 0) {
        if(number.length < 3) {
            return number;
        } else if(number.length < 6) {
            tel += number.substr(0, 2);
            tel += "-";
            tel += number.substr(2);
        } else if(number.length < 10) {
            tel += number.substr(0, 2);
            tel += "-";
            tel += number.substr(2, 3);
            tel += "-";
            tel += number.substr(5);
        } else {
            tel += number.substr(0, 2);
            tel += "-";
            tel += number.substr(2, 4);
            tel += "-";
            tel += number.substr(6);
        }
    
    // 서울 지역번호(02)가 아닌경우
    } else {
        if(number.length < 4) {
            return number;
        } else if(number.length < 7) {
            tel += number.substr(0, 3);
            tel += "-";
            tel += number.substr(3);
		

        } else if(number.length < 11) {
            tel += number.substr(0, 3);
            tel += "-";
            tel += number.substr(3, 3);
            tel += "-";
            tel += number.substr(6);
		
        } else {
            tel += number.substr(0, 3);
            tel += "-";
            tel += number.substr(3, 4);
            tel += "-";
            tel += number.substr(7);
        }
    }

    obj.value = tel;
}


function licenseNum(obj){

	var number = obj.value.replace(/[^0-9]/g, "");
    var cln = "";

    if(number.length < 4) {
        return number;
    } else if(number.length < 6) {
        cln += number.substr(0, 3);
        cln += "-";
        cln += number.substr(3, 2);

    } else {
        cln += number.substr(0, 3);
        cln += "-";
        cln += number.substr(3, 2);
        cln += "-";
        cln += number.substr(5);	
    }
    obj.value = cln;
}

function gnb_resize(){
	$(window).on('scroll',function(){
		var windowWidth = $(window).width();
		var scrll_l = $(this).scrollLeft();
		//console.log(windowWidth);

		if(windowWidth < 1590){
			$('.header_wrap').css('left', 0 - scrll_l);
			$('.all_menu .inner').css('left', 0 - scrll_l ); 
			$('.prd_bottom_fixed .inner').css('left', 0 - scrll_l);
		}else{
			$('.header_wrap').css('left', 0 );
			$('.all_menu .inner').css('left', 0 );
			$('.prd_bottom_fixed .inner').css('left', 0 );	
		}
	});
	
}

function newGnb(){
 
    $('.header_menu_cate').click(function(){
        if( $(this).hasClass('on') == true ){
            $('.header_menu_cate_wrap').slideUp();
            $(this).removeClass('on');

        }else{
            $('.header_menu_cate_wrap').slideDown();
            $(this).addClass('on');

        }
        

    });

    $('.header_menu_cate_wrap > .shop_type > .tit + ul > li').mouseenter(function(){
        $('.sub_depth_layout').hide();
		
		if($(this).children('.sub_depth_layout').length > 0){
			$('.header_menu_cate_wrap').css('width','540px');
	        $(this).children('.sub_depth_layout').show();
		} else {
			$('.header_menu_cate_wrap').css('width','275px');
		}
		
		

    });

}

/* 2022-10-28 : KSY _ 쿠쿠몰 메인 카테고리 UI 변경 _ START */

/**
 * 카테고리 탭 변경
 * @param {String} type mall(쿠쿠몰), rental(쿠쿠렌탈), regular(정기구독관)
 */
function gnbTabChang(type){
    $('.tab').removeClass('show');
    $('.tab.'+type).addClass('show');
}

/**
 * 카테고리 메뉴 이벤트
 */
function newGnb2(){
    // gnb-lnb 슬라이딩 클릭 이벤트
    $('.header_menu_cate').click(function(){
        if( $(this).hasClass('on') == true ){
            $('.header_menu_cate_gnb_wrap').slideUp();
            $(this).removeClass('on');
        }else{
            $('.header_menu_cate_gnb_wrap').slideDown();
            $(this).addClass('on');
        }
        categoryTabEvent();
    });
    
/*
    // 탭 변경 클릭 이벤트 -->수정 전 이벤트 
    $('.cate_type_tit .tit').click(function(){
        var $this = $(this);
        if(!$this.hasClass('sel')){
            $this.parent().find('.tit').removeClass('sel');
            $this.addClass('sel');
            gnbTabChang($this.data('type'));
        }
    });
 */  
 
 	// 탭 변경 클릭 이벤트
	function handleTabClick() {
    	var $this = $(this);
    	if (!$this.hasClass('stopSel')) {
        	$this.parent().find('.tit').removeClass('stopSel');
        	$this.addClass('stopSel');
        	gnbTabChang($this.data('type'));
    	}
	}

	// 카테고리 탭 마우스 오버 이벤트
	function handleTabMouseOver() {
    	var $this = $(this);
    	var useFlag = $this.parent().find('.tit').hasClass('stopSel');
    	if (!$this.hasClass('sel') && !useFlag) {
        	$this.parent().find('.tit').removeClass('sel');
        	$this.addClass('sel');
        	gnbTabChang($this.data('type'));
    	}
	}

	// gnb-lnb 슬라이딩시 실행되는 함수
	function categoryTabEvent() {
    	$('.cate_type_tit .tit').click(handleTabClick);
    	$('.cate_type_tit .tit').mouseover(handleTabMouseOver);
	}

}
/* 2022-10-28 : KSY _ 쿠쿠몰 메인 카테고리 UI 변경 _ END */

(function($) {
	$.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight > this.height();
	}
})(jQuery);

