"use strict";

$(function(){


    // 서비스신청일 캘린더

    // 테스트를위해 임시로 처리해두었습니다. (추후 공휴일 db 연동 필요)
    var yyyy = new Date().getFullYear();
    var holiday = [
        new Date(yyyy, 0, 1).getTime(), 
        new Date(yyyy, 0, 28).getTime(), 
        new Date(yyyy, 0, 29).getTime(), 
        new Date(yyyy, 0, 30).getTime(), 
        new Date(yyyy, 2, 1).getTime(), 
        new Date(yyyy, 2, 3).getTime(), 
        new Date(yyyy, 4, 5).getTime(), 
        new Date(yyyy, 5, 6).getTime(), 
        new Date(yyyy, 7, 15).getTime(), 
        new Date(yyyy, 9, 3).getTime(), 
        new Date(yyyy, 9, 5).getTime(), 
        new Date(yyyy, 9, 6).getTime(), 
        new Date(yyyy, 9, 7).getTime(), 
        new Date(yyyy, 11, 25).getTime(), 
    ];

    // datepicker 불러오기
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
        minDate: "+2D", //최소 선택일자
        maxDate: "+1M", //최대 선택일자
        // 주말&공휴일 제외
        beforeShowDay: function(date) {
            var showDay = true;
            if (date.getDay() == 0 || date.getDay() == 6) {
                showDay = false;
            }
            if ($.inArray(date.getTime(), holiday) > -1) {
                showDay = false;
            }
            return [showDay];
        },
		onSelect: function(dateText) {
		    $(this).val(dateText).trigger('input');
		
		    // hidden input에도 날짜 전달
		    $('.matress-service-date').val(dateText).trigger('change'); 
		
		    validateForm();
		}
    });
    
	
	// 버튼, 주소 관련 요소 캐싱
	const $submitBtn = $(".matressSubmit-btn");
	const $zipcode = $(".zipcode");
	const $address0 = $("#address0");
	const $address1 = $("#address1");
	
	// 필수 입력 텍스트 필드 셀렉터 배열 (.matress-service-date 추가됨)
	const requiredInputs = [
	    '.client-name',
	    '.client-tel',
	    '#address1',
	    '.matress-service-date'
	];
	
	// 필수 체크해야 할 라디오 그룹 이름 배열
	const radioGroups = [
	    'use-period',
	    'matress-size'
	];
	
	// 라디오 그룹 체크 여부 함수
	function isRadioGroupChecked(name) {
	    return $("input[name='" + name + "']:checked").length > 0;
	}
	
	// 텍스트 입력란 체크 함수
	function areInputsFilled() {
	    return requiredInputs.every(selector => {
	        return $(selector).val().trim() !== '';
	    });
	}
	
	// 주소 입력 체크 함수
	function isAddressFilled() {
	    return $zipcode.val().trim() !== '' && $address0.val().trim() !== '';
	}
	
	// 전체 유효성 검사 후 버튼 활성화/비활성화
	function validateForm() {
	    const radiosValid = radioGroups.every(isRadioGroupChecked);
	    const inputsValid = areInputsFilled();
	    const addressValid = isAddressFilled();
	
	    if (radiosValid && inputsValid && addressValid) {
	        $submitBtn.prop('disabled', false);
	    } else {
	        $submitBtn.prop('disabled', true);
	    }
	}
	
	// 주소찾기 버튼 클릭 시 다음 주소 API 호출
	$('.zipcode-btn').on('click', function () {
	    new daum.Postcode({
	        oncomplete: function (data) {
	            $zipcode.val(data.zonecode);
	            $address0.val(data.roadAddress || data.jibunAddress);
	            validateForm();
	        }
	    }).open();
	});
	
	// 라디오 변경 시 유효성 검사 재실행
	radioGroups.forEach(name => {
	    $("input[name='" + name + "']").on('change', validateForm);
	});
	
	// 텍스트 입력 시 유효성 검사 재실행
	requiredInputs.forEach(selector => {
	    $(selector).on('input change', validateForm); // change 이벤트도 추가!
	});
	
	// 초기 검사 실행
	validateForm();

});