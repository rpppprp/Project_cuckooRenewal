/**
 * 
 */
 var cuckoo = cuckoo || {};

 cuckoo.query = {};
 cuckoo.popupCnt = 0;
 
 cuckoo.init = function(){

	//Criteo 홈페이지 태그
	window.criteo_q.push(
		{ event: "setAccount", account: 81669}, // 이 라인은 업데이트하면 안됩니다
		{ event: "setEmail", email: "" }, // 빈 문자 일수 있습니다 
		{ event: "setSiteType", type: 'd'},
		{ event: "viewHome"}
	);

	$('#mainEvent .single-item').slick({
	    dots: true
	});
	
	$('.top_visual .single-item').slick({
	    dots: false,
		arrows: false,
		slidesToShow: 1,
  		slidesToScroll: 1,
	    asNavFor: '.slider-nav',
		waitForAnimate: false,
		draggable: false,
	});

	$('.top_visual .slider-nav').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		centerMode: false,
		focusOnSelect: true,
	    vertical: true,
		arrows: true,
		dots: false,
	    asNavFor: '.slider-for',
		autoplay: true,
  		autoplaySpeed: 2000,
	});

	if(cuckoo.keyVisualList.length <=6 ) {
		$('.top_visual .slider-nav .slick-track').addClass('slick-important');
	}

	$('.section01 .center').slick({
	    dots: false,
	    infinite: true,
	    slidesToShow: 1,
	    centerMode: true,
	    variableWidth: true
	});
	$('.section02 .single-item').slick({
	    slidesToShow: 4,
	    slidesToScroll: 4,
	    dots: true,
		autoplay: true,
  		autoplaySpeed: 3000
	});
	$('.section03 .center').slick({
	    dots: true,
	    infinite: true,
	    slidesToShow: 1,
	    centerMode: true,
	    variableWidth: true,
	});
	$('.section07 .single-item').slick({ // cuckooTv 
		infinite : false,
	    slidesToShow: 4.3,
	    slidesToScroll: 1,
	    dots: true,
		autoplay: false,
  		autoplaySpeed: 3000,
  		swipeToSlide: true
	});
	$('.section03 .center').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.pager li').hide();
		$('.pager li').eq(nextSlide).show();
	});
	
	// $('.top_visual .single-item').on('beforeChange',function(event, slick, currentSlide, nextSlide) {
	// 	cuckoo.activeNav(nextSlide);
	// });
	
	$('.top_visual .single-item').on('afterChange',function(event, slick, currentSlide, nextSlide) {
		var vid = $('.single-item .img.slick-active .main_video_in').get(0);
		var prevvid = $('.single-item .img .main_video_in').get(0);
		function playVid(){
			vid.play();
		}
		function pauseVid() {
			prevvid.pause();
		}
		
		if (vid != undefined) {
			if( $('.single-item .img.slick-active').hasClass('main_video') ){
				playVid();
	
			} else {	
				pauseVid();
			}
		}
	});
	
	$("#ui_categoryCd").children("li").children("a").on("click", function(){
		cuckoo.query.depth = $(this).data("depth") + 1
		cuckoo.query.parentCd = $(this).data("cd");
		cuckoo.targetId = "#ui_productCode";
		
		$("#ui_categoryCd").data("cd", $(this).data("cd"));
		
		cuckoo.selfAsProductSearch();
	});
	
	
	$("#ui_product_self_btn").on("click", function() {
		var categoryCd = $("#ui_categoryCd").data("cd");
		var productCode = ($("#ui_productCode").data("cd") ==  null || $("#ui_productCode").data("cd") == "undefined" || $("#ui_productCode").data("cd") == "") ? "" : $("#ui_productCode").data("cd");
		var prbCd = ($("#ui_prbCd").data("cd") ==  null || $("#ui_prbCd").data("cd") == "undefined" || $("#ui_prbCd").data("cd") == "") ? "" : $("#ui_prbCd").data("cd");
		
		if (categoryCd == null || categoryCd == "undefined" || categoryCd == "") {
			message.popup({content : "제품군을 선택 하여 주세요."});
			return false;
		}
		
		var param= "?categoryCd="+ categoryCd;
		param+="&productCode="+productCode;
		param+="&prbCd="+prbCd;
		
		
		location.href="/customer/prb/customerSelfItemSearch".concat(param);
	});
	
	if ($.cookie('popupDsiplay') != "Y" && cuckoo.popupCnt > 0) {		
		$("#mainEvent").show();
	} else {
		$("#mainEvent").hide();
	} 
	
	$("#ui_daily_tab_cuckoo").children("li").children("a").off().on("click", function(){
		var index = $(this).parent().index();
		var filter = (index == 0) ? "all" : (index == 1) ? "M" : "R";
		$("#ui_daily_tab_cuckoo").children("li").removeClass("on");
		$("#ui_daily_tab_cuckoo").children("li").eq(index).addClass("on");
		$('.section01 .center').slick('slickUnfilter');
		if (filter == "all") {
			$('.section01 .center').slick('slickFilter', function(index, elem) {
			     return true;
			});
		} else {
			$('.section01 .center').slick('slickFilter', function(index, elem) {
			     return $(elem).data("fileter") == filter;
			});	
		}
		
	})
	
 }
 

 cuckoo.selfAsProductSearch = function() {
 	var param = JSON.stringify(cuckoo.query);
 	
 	$.showMask();
 	$.post("/rest/customer/selfAsproductFamilySearch","POST", param, function(data){
 		if (data != null) {
 			if (data != null) {
 				cuckoo.createProduct(data);
 			} else {				
 				$(".manual_search_data").find(".pagination").hide();
 				message.popup({content : "제품 조회 오류가 발생 하였습니다.<br/>계속 오류 발생시 고객센터에 문의 하여 주십시오."});
 			}
 		} else {
 			$(".manual_search_data").find(".pagination").hide();
 			message.popup({content : "제품조회 처리중 조회 오류가 발생 하였습니다.<br/>계속 오류 발생시 고객센터에 문의 하여 주십시오."});
 		} 		
 		$.hideMask();
 	}, function(err){
 		$(".manual_search_data").show();
 		message.popup({content : "제품조회 처리중 조회 오류가 발생 하였습니다.<br/>계속 오류 발생시 고객센터에 문의 하여 주십시오."});
 	});		
 }
 

 cuckoo.createProduct = function(data) {
 		
 	var title = (cuckoo.query.depth == 4) ? "제품선택" : "제품증상 선택";
 	
 	if (cuckoo.query.depth == 4) {
 		$("#ui_prbCd").prev().html("제품증상 선택");
 	}	
 	
 	$(cuckoo.targetId).prev().html(title);
 	
 	if (data.length > 0) {
 		var html ="<li><a href='#' data-cd='${dtlComCd}' data-depth='${depth}'>${name}</a></li>"
 		
 		$.template("temp",html);	
 		$(cuckoo.targetId).html("");
 		$.tmpl("temp", data).appendTo(cuckoo.targetId);		
 		
 		//이벤트
 		$(cuckoo.targetId).children("li").children("a").off().on("click", function(){
 			$(cuckoo.targetId).data("cd", $(this).data("cd"));
 			if ($(this).data("depth") == 4) {
 				cuckoo.query.depth = $(this).data("depth") + 1
 				cuckoo.query.parentCd = $(this).data("cd");
 				cuckoo.targetId = "#ui_prbCd";
 				cuckoo.selfAsProductSearch();							
 			}
 		});
 	} else {
 		$(cuckoo.targetId).html("");
 	}
 }

 cuckoo.popupClose = function(){
	if ($("#ui_layer_popup_display_ck").prop("checked")) {
		$.cookie('popupDsiplay',"Y", { path: '/' });
	} 
	$("#mainEvent").hide();
}

 

 $(document).ready(function(){
 	cuckoo.init();
 });
 
 