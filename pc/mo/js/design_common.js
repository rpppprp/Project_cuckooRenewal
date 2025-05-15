// 하단 고정메뉴 스크롤에 따라 이동
function btmFixed() {
    var b_top = $('.btm-fix-wrap .floating-top .btn_top');
    var lastSt = 0;
    $('.btm-fix-wrap').removeClass('active');
    $(document).on('scroll',function(){
        var st = $(this).scrollTop();
        if(st > 200){ //top버튼
            b_top.addClass('on');
        } else {
            b_top.removeClass('on');
        } if(st > 0) { //스크롤 다운 업 체크
            if(st > lastSt) {
                $('.btm-fix-wrap').addClass('active');
                $('.bottom_fixed').show();
            } else {
                $('.btm-fix-wrap').removeClass('active');
	  			$('.bottom_fixed').hide();
            }
            lastSt = st;
        } else {
            $('.btm-fix-wrap').removeClass('active');
        }
    });
    b_top.on('click',function(){
        $('body, html').stop().animate({scrollTop:0},500)
    })
}



$(function(){

    btmFixed();

})