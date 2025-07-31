"use strict";

$(function(){

    // 서비스신청일 캘린더
    $("#event-request-calendar").datepicker({
        regional: "ko",
        closeText: "닫기",
        dateFormat: "yy-mm-dd",
        showMonthAfterYear: true ,
        currentText: "오늘",
        prevText: 'Prev',
        nextText: 'Next',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        weekHeader: "주",
        yearSuffix: '년',
        minDate: "+2D",
        maxDate: "+1M",
        // 주말제외
        beforeShowDay: function(date){
            var day = date.getDay();
            return [(day != 0 && day != 6)];
        }	
    });



});