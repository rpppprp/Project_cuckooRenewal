/**
 * 공통 스크립트 
 */
(function($){
	
	/*====================================================================================
	' 함수명 : $.layerInit
	' 기  능 : jquery ui dialog 헤더 제거
	' 리턴값 : 없음.
	'=====================================================================================*/	
	$.layerInit = function(ts) {
		$(ts).removeClass("ui-dialog-content");
		$(ts).dialog('widget').find(".ui-dialog-titlebar").remove();
		$(ts).dialog('widget').removeClass("ui-corner-all");
		$(ts).dialog('widget').removeClass("ui-widget-content");
		$(ts).removeClass("ui-widget-content");
	}
	
	/*====================================================================================
    ' 함수명 : $.fn.showBlockMask(msg)
    ' 인  수 : msg - 로딩 메세지
    ' 기  능 : 특정 Element 마스크 처리 및 로딩문구 노출
    ' 리턴값 : 없음.
    '=====================================================================================*/	
	$.fn.showBlockMask = function(msg){
		$(this).block({
            message: "<img src='/pc/images/common/Loading.gif' alt=''>", //(msg == "" || msg == undefined) ? "<img src='/images/loadding.gif' alt=''>" : msg,
            css: {
            	 border: 'none',
                 padding: '15px',
                 backgroundColor: "rgba(255, 255, 255, 0)",
                 '-webkit-border-radius': '10px',
                 '-moz-border-radius': '10px',
                 opacity: 5,
                 color: 'rgba(255, 255, 255, 0)',
                 zIndex: 99999999999999
            },
            overlayCSS: {
            	backgroundColor: '#ffffff',
                opacity: 0.6,
                cursor: 'wait',
                zIndex: 99999999999000
            }
        });
	},
	/*====================================================================================
    ' 함수명 :$.fn.hideBlockMask(msg)
    ' 인  수 : msg - 완료 메세지
    ' 기  능 : 특정 Element 마스크 해제 처리
    ' 리턴값 : 없음.
     '=====================================================================================*/
	$.fn.hideBlockMask = function(msg){
		if (msg == "" || msg == undefined) {
            $(this).unblock();
        }
        else {
            $(this).unblock({
                onUnblock: function () {
                    alert(msg);
                }
            });
        }
	},
	 /*====================================================================================
    ' 함수명 : $.showMask(msg)
    ' 인  수 : msg - 로딩 메세지
    ' 기  능 : 페이지 마스크 처리 및 로딩문구 노출
    ' 리턴값 : 없음.
    '=====================================================================================*/	
	$.showMask = function(msg){
		$.blockUI({
			message: "<img src='/pc/images/common/Loading.gif' alt=''>",
            css: {
            	 border: 'none',
                 padding: '15px',
                 backgroundColor: "rgba(255, 255, 255, 0)",
                 '-webkit-border-radius': '10px',
                 '-moz-border-radius': '10px',
                 opacity: 5,
                 color: 'rgba(255, 255, 255, 0)',
                 zIndex: 99999999999999
            },
            overlayCSS: {
            	backgroundColor: '#ffffff',
                opacity: 0.6,
                cursor: 'wait',
                zIndex: 99999999999000
            }
        });
	},
	/*====================================================================================
    ' 함수명 : $.hideMask(msg)
    ' 인  수 : msg - 완료 메세지
    ' 기  능 : 페이지 마스크 제거
    ' 리턴값 : 없음.
    '=====================================================================================*/
	$.hideMask = function(msg){
		if (msg == "" || msg == undefined) {
            //setTimeout($.unblockUI(), 9000);
            $.unblockUI();
        }
        else {
            $.unblockUI({
                onUnblock: function () {
                    alert(msg);
                }
            });
        }
	},
	/*=======================================================================================
    ' 함수명 : $.fn.checkEmail()
    ' 인  수 : Email - 이메일주소
    ' 기  능 : 이메일 체크
    ' 리턴값 : true/false
    '======================================================================================*/
	$.fn.checkEmail = function(msg){
		var reg = new RegExp("^[\\w\\-]+(\\.[\\w\\-_]+)*@[\\w\\-]+(\\.[\\w\\-]+)*(\\.[a-zA-Z]{2,3})$", "gi");
		
		if(msg == undefined || msg == null || msg == "") {
	    	if (!reg.test(this.val())) {
	    		return false;
	    	}
	    	else {
	    		return true;
	    	}
		} else {
			if (!reg.test(msg)) {
	    		return false;
	    	}
	    	else {
	    		return true;
	    	}
		} 
	},
	/*====================================================================================
    ' 함수명 : $.fn.pager(obj)
    ' 인  수 : obj.size   - 페이지 사이즈
    '          obj - obj.page  		: page no
    '          obj - obj.pageCount  : total count
    '          obj - obj.size  		: pageSize
    '          obj - obj.fun  		: function 
    ' 기  능 :  페이지 네비게이션 생성처리
    ' 리턴값
    '=====================================================================================*/
	$.fn.pager = function(obj){
		var Total = Number(obj.pageCount);
        var PageSize = obj.size;
        var Page = Number(obj.page);
        var Html = "";
        
        if (isNaN(Page)) Page = 1
        if (isNaN(Total)) Total = 0

        var PageCount = Math.ceil(Total / PageSize);
        var iNowBlock = Math.ceil(Page / 10);
        var blockpage = (iNowBlock - 1) * 10 + 1;
        var iLastPage = blockpage + (10 - 1);
        
        if (Page > 1 ) {
        	Html += "<a href='#' onclick='"+ obj.fun +".changePage(\"1\");return false;' class='paging first'><span class='blind'>첫페이지</span></a>";
        } else {
        	Html += "<a href='#' class='paging first disabled' onclick='return false;'><span class='blind'>첫페이지</span></a>";
        }
        
        if (PageCount <= 1) {
        	Html += "<a href='#' class='paging prev disabled' onclick='return false;'><span class='blind'>이전</span></a>";
        } else {
        	Html += "<a href='#' class='paging prev' onclick='"+ obj.fun +".prev(\"" + PageCount + "\");return false;'><span class='blind'>이전</span></a>";
        }
        
        if (iLastPage > PageCount) {
            iLastPage = PageCount;
        }

        for (i = blockpage; i <= iLastPage; i++) {
            if (i == Page) {
            	Html += "<a href=''#' class='on' onclick='return false;'>"+i+"</a>";
            }
            else {
            	Html += "<a href='#' onclick=\""+obj.fun+".changePage(" + i + ");return false;\">" + i + "</a>";
            }
            blockpage = blockpage + 1;
        }

        if (Total == 0) {
            Html += "<a href='#' onclick='return false;' class='on'>1</a>";
        }
        
        if (PageCount <= 1) {
        	Html += "<a href='#' class='paging next' onclick='return false;'><span class='blind'>다음</span></a>";
        } else {
        	Html += "<a href='#' class='paging next' onclick='"+ obj.fun +".next(\"" + PageCount + "\");return false;'><span class='blind'>다음</span></a>";
        }
        
        if (Page == PageCount || PageCount < 1 ) {
        	Html += "<a href='#'  class='paging last' onclick='return false;'><span class='blind'>마지막페이지</span></a>";
        } else {
        	Html += "<a href='#' class='paging last' onclick='"+ obj.fun +".changePage(\"" + PageCount + "\");return false;'><span class='blind'>마지막페이지</span></a>";
        }
        this.html(Html);
	},
	/*====================================================================================
    ' 함수명 : $.post(url, reqMethod, param, successfn, failFn)
    ' 인  수 : url   - 호출 주소
    '        reqMethod - post, get
    '        param  - parameter 값 (Json)
    '        successfn : 처리 성공시 호출 함수 
    '        failFn    : 실패시 호출 함수 
    ' 기  능 :  Ajax 처리
    ' 리턴값
    '=====================================================================================*/
	$.post = function(url, reqMethod, param, successfn, failFn, dateType, async){
		var method = (reqMethod == null || reqMethod == undefined || reqMethod == "") ? "POST" : reqMethod;
		$.ajax({
	        type: method,
	        url: url,
	        data : param,
	        dataType: (dateType == null || dateType == undefined || dateType == "")  ? "json" : dateType,
			async : (async == null || async == undefined || undefined == "") ? true : async,
	        contentType : "application/json",
	        cache: false,
	        success: function (data) {
	        	successfn(data);	
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	        	if (failFn == null || failFn == undefined || failFn == "") {
	        		alert("Error" + thrownError);
	        	} else {
	        		failFn(xhr, ajaxOptions, thrownError);	
	        	}
	        }
		});		
	},
	/*====================================================================================
	' 함수명 : $.fn.serializeFormToJson()
    ' 기  능  :  form data to json data
    ' 리턴값 : json data 
	'=====================================================================================*/
	$.fn.serializeFormToJson = function(){
		var obj = null; 
		try { 
        	  var arr = this.serializeArray(); 
              if(arr){ obj = {}; 
              jQuery.each(arr, function() { 
            	  obj[this.name] = this.value; }); 
              } 
	      }catch(e) { 
	    	  alert(e.message); 
	      }finally {} 
	      return obj; 
	}
	
	/*====================================================================================
    ' 함수명 : $.fn.pass()
    ' 기  능  :  비밀번호 유효성 검사
    '         최소 6 자 및 최대 18 자, 하나 이상의 영문, 하나의 숫자 및 하나의 특수 문자
    ' 리턴값 : true - 사용가능 , false - 사용불가능
    '=====================================================================================*/	
	$.fn.pass = function(){
		var regex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*+=-])(?=.*[0-9])[A-Za-z\d!@#$%^&*+=-]{6,18}$/;
		
		if(!regex.test(this.val())) {
			return false;
		} 
		
		return true;
	}
	
	/*====================================================================================
    ' 함수명 : $.fn.idCheck()
    ' 기  능  : 아이디 유효성 검사
    ' 리턴값 : true / false 
    '=====================================================================================*/	
	$.fn.idCheck = function(){
		var regex = /^(?=.*[a-z])(?=.*[0-9])[a-z\d]{6,18}$/;
		
		if(!regex.test(this.val())) {
			return false;
		} 
		return true;
	}
	
	
	/*=========================
	' 함수명 : $.fn.maxTxt
    ' 기  능  :글자수 제한
 	==========================*/
 	$.fn.maxTxt = function() {
 		var max = (this.attr("data-max") == undefined || this.attr("data-max") == "") ? 1000 : this.attr("data-max"); 		
 		this.on("keyup", function(e){

 			if(e.target.tagName.toLowerCase() == "input") {
	 			var lengthCheckRegEx = new RegExp('^.{'+max+',}$');
			    if(lengthCheckRegEx.test(e.target.value)){//정규표현식 test 메서드로 최대길이 이상인지 체크
			        //최대 길이 초과 차단
			        e.target.value = e.target.value.substr(0, max);// 최대 글자수만큼 잘라냄
			        console.log(e.target.value);
			    }
 			}
 			if(e.target.tagName.toLowerCase() == "textarea") {
 				
 				var textLength = e.target.value.length;
 				if(textLength > max) {
 					e.target.value = e.target.value.substr(0, max);// 최대 글자수만큼 잘라냄
 				}

 				if($(".text_length_state").length > 0) {
			    	$(".text_length_state").find("span").text(e.target.value.length);
			    }
 			}
 		});
 	}	
	
	/*====================================================================================
    ' 함수명 : $.getDateByjQueryDateFormat
    ' 기  능  :  query datepicker의 y m d 형식의 문자열로 날짜 구하기
    ' @param value jquery datepicker의 "-1y +1m +2d" 형식 
    '=====================================================================================*/		
	$.getDateByjQueryDateFormat = function (value, baseDate) {
		var today = new Date();
		if(baseDate != null && typeof(baseDate) === 'object')
			today = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
		//alert("today : " + today);
		var elements = value.toString().split(' ');
		for(var x in elements) {
			var num = eval(elements[x].substr(0, elements[x].length - 1).toString());
			var flag = elements[x].substr(elements[x].length -1).toString().toLowerCase();
			if(flag == 'd')
				today.setDate(today.getDate() + num);
			else if(flag == 'm')
				today.setMonth(today.getMonth() + num);
			else if(flag == 'y')
				today.setFullYear(today.getFullYear() + num);
		}
		return today;
	}
	
	/*=========================
	' 함수명 : $fn.getyyyyMMdd
    ' 기  능  : 날짜 객체를 yyyy-MM-dd 형식으로 가져옴
    ' 구분자 : 기본값 (-)
	==========================*/
	$.fn.getyyyyMMdd = function (dataObject, separator) {
		if( separator == null)
			separator = '-';

		var str = null;
		var month = dataObject.getMonth() + 1;
		var day = dataObject.getDate();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		str = dataObject.getFullYear() + separator + month + separator + day;
		return str;
	}
	
	$.maxLengthCheck = function(object){
	    if (object.value.length > object.maxLength){
	    	object.value = object.value.slice(0, object.maxLength);
	    }    
	    
	    if(object.type == 'number') {
	    	try {
		    	var min = object.min;
		    	var max = object.max;
		    	if(min != '' && max != '') {
		    		if(min < max) {
		    			value = $.toNumber(object.value);
		    			if(value < min || max < value) {
		    				object.value = '';
		    			} 
		    		}
		    	}
	    	} catch(e) {console.log(e);}
	    }
	}
	
	$.generateRandom = function (min, max) {
	  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
	  return ranNum;
	}	
	
	/*=========================
	' 함수명 : $fn.getUrl
    ' 기  능  :날짜 유효성 체트
 	==========================*/
	$.fn.getUrl = function(){
		var pattern = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])+(.[a-z])?/; 
		var regex = new RegExp(pattern); 
		var website_url = this.val();// url of the website 
		
		if (website_url.match(regex)) { 
		    return true 
		} else { 
		    return false; 
		} 
	}
	
	/*=========================
	' 함수명 : $fn.getProtocal
    ' 기  능  :날짜 유효성 체트
 	==========================*/
	$.fn.getProtocal = function(){
		var pattern = /^(http|https):\/\/?/; 
		var regex = new RegExp(pattern); 
		var website_url = this.val();// url of the website 
		
		if (website_url.match(regex)) { 
		    return true 
		} else { 
		    return false; 
		} 
	}
	
	/*====================================================================================
    ' 함수명 : $.xss(str, flg)
    ' 기  능 : XSS 방지 필터
    ' 인  수 : str - 치환할 문자열
    '		   flg - html 태그 제거 여부 (true - 삭제)
    ' 리턴값 : 치환값
    '=====================================================================================*/
	$.xss = function(str, flg){
		var RegExpJS = "<script[^>]*>(.*?)</SCRIPT>";
		var relpaceStr = str;

		if (str != null && str != "") {
			if (flg){
				relpaceStr = relpaceStr.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
			}
			relpaceStr = relpaceStr.replace(RegExpJS,"");
			relpaceStr = relpaceStr.replace(/onerror/gi,'');
			relpaceStr = relpaceStr.replace(/onchange/gi,'');
			relpaceStr = relpaceStr.replace(/onclick/g,'');
			relpaceStr = relpaceStr.replace(/onmouseover/g,'');
			relpaceStr = relpaceStr.replace(/onmouseout/g,'');
			relpaceStr = relpaceStr.replace(/onkeydown/g,'');
			relpaceStr = relpaceStr.replace(/onload/g,'');
			relpaceStr = relpaceStr.replace(/javascript/g,'');
		} else {
			relpaceStr = "";
		}

		return relpaceStr;
	}
	
	/*====================================================================================
    ' 함수명 : $.toNumber
    ' 기  능 : string --> integer
    ' 리턴값 :
    '=====================================================================================*/
	$.toNumber = function(n) {
		var str = (n == '' || n == null || n == undefined || n == 'undefined') ? 0 : n;
		var reg = /^[0-9]*$/;
		return reg.test(str) ? Number(str) : 0;
	}
	
	/*====================================================================================
    ' 함수명 : $.toNumber
    ' 기  능 : 음수처리 및 정수부분 3자리 소수점아래 둘쨰자리까지 가능한 정규식
    ' 리턴값 :
    '=====================================================================================*/
	$.toDouble = function(n) {
		var str = (n == '' || n == null || n == undefined || n == 'undefined') ? 0.0 : n;
		var reg =  /^-?(\d{1,3}([.]\d{0,2})?)?$/;
		return reg.test(str) ? str : 0.0;
	}
	
	/*====================================================================================
    ' 함수명 : $.toString
    ' 기  능 : string --> string
    ' 리턴값 :
    '=====================================================================================*/
	$.toString = function(n) {
		try {
			var str = (n == null || n == undefined || n.toLowerCase() == 'undefined' || n.toLowerCase() == 'null') ? "" : n;
			return str.toString();
		} catch(e) {
			return n;
		}
	}
	
	/*====================================================================================
    ' 함수명 : $.rnbr
    ' 기  능 : 개행문자 br처리
    ' 리턴값 :
    '=====================================================================================*/
	$.rnbr = function(n) {
		return n.replace(/(?:\r\n|\r|\n)/g, '<br/>');
	}
	
	/*====================================================================================
    ' 함수명 : $.comma
    ' 기  능 : 콤마 추가
    ' 리턴값 : 
    '=====================================================================================*/	
	$.comma = function(n) {
		var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
		n += '';  						// 숫자를 문자열로 변환
		while (reg.test(n))
			n = n.replace(reg, '$1' + ',' + '$2');
		return n;
	}
	
	/*====================================================================================
    ' 함수명 : $.uncomma
    ' 기  능 : 콤마 추가
    ' 리턴값 : 숫자
    '=====================================================================================*/	
	$.uncomma = function(n) {
		var str = $.toString(n);
		return str.toString().replace(/[^\d]+/g, '');
	}
	
	/*====================================================================================
    ' 함수명 : $.maskingName
    ' 기  능 : 첫글자, 마지막글자 제외하고 *처리
    ' 리턴값 : 
    '=====================================================================================*/
	$.maskingName = function(n){
		var str = (n == null || n == undefined || n.toLowerCase() == 'undefined' || n.toLowerCase() == 'null') ? "" : n;
		
		if (str.length > 2) {
			var originName = str.split('');
			originName.forEach(function(name, i) {
				if (i === 0 || i === originName.length - 1) return;
				originName[i] = '*';
			});
			var joinName = originName.join();
			return joinName.replace(/,/g, '');
		} else {
			var pattern = /.$/; // 정규식
			return str.replace(pattern, '*');
		}
	} 
	
	/*====================================================================================
    ' 함수명 : $.maskingId
    ' 기  능 : cnt만큼 제외하고 *처리
    ' 리턴값 : 
    '=====================================================================================*/
	$.maskingId = function(n, cnt){
		var str = (n == null || n == undefined || n.toLowerCase() == 'undefined' || n.toLowerCase() == 'null') ? "" : n;
		
		var maskingStr = str.split('').map(function(o, i){
			if(i < cnt){
				return o;
			}else{
				return "*";
			}
		}).join('');
		
		return maskingStr; 
	}
	
	/*====================================================================================
    ' 함수명 : $.fn.onEnter
    ' 기  능 : 엔터 이벤트 설정
    ' 리턴값 : 
    '=====================================================================================*/	
	$.fn.onEnter = function(func) {
		this.bind('keypress', function(e) {
			if (e.keyCode == 13) func.apply(this, [e]);    
		});               
		return this; 
	};
	
	/*====================================================================================
    ' 함수명 : $.fn.isBusinessNumber()
    ' 기  능 : 사업자 번호 유효성 검사
    ' 리턴값 : true, false
    '=====================================================================================*/
	$.fn.isBusinessNumber = function() {
		var numberMap = this.val().replace(/-/gi, '').split('').map(function(item) {
        	return parseInt(item, 10);
	    });
	
	    if (numberMap.length == 10) {
	    	var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
			var chk = 0;
			
			keyArr.forEach(function(d, i){
				chk += d * numberMap[i];
			});
			
			chk += parseInt((keyArr[8] * numberMap[8])/ 10, 10);
			console.log(chk);
			return Math.floor(numberMap[9]) === ( (10 - (chk % 10) ) % 10);
	    }
	
	    return false;
	}
	
	/*====================================================================================
    ' 함수명 : $.fn.businessNumber()
    ' 기  능  : 사업자 번호 하이픈 처리
    ' 리턴값 : 사업자번호
    '=====================================================================================*/	
	$.fn.businessNumber = function(){
		this.on("keyup", function(){
			var str = $(this).val();
			str = str.replace(/[^\d]+/g, '');
		    //str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
			str = str.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
			$(this).val(str);
		});
	};
	
	$.fn.businessNumberComplete = function(){
		var str = $(this).val();
		str = str.replace(/[^\d]+/g, '');
		str = str.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
		$(this).val(str);
	};
	
	/*====================================================================================
    ' 함수명 : $.fn.birthdayNumber()
    ' 기  능  : 생년월일 하이픈 처리
    ' 리턴값 : 생년월일
    '=====================================================================================*/	
	$.fn.birthdayNumber = function(){
		this.on("keyup", function(){
			var str = $(this).val();
			str = str.replace(/[^\d]+/g, '');
			str = str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
			$(this).val(str);
		});
	};
	
	/*====================================================================================
    ' 함수명 : $.fn.number()
    ' 기  능  : 숫자만 입력
    ' 리턴값 : 입력값
    '=====================================================================================*/	
	$.fn.number = function(){
		this.on("keyup", function(){
			var str = $(this).val();
			str = str.replace(/[^\d]+/g, '');
		    //str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');			
			$(this).val(str);
		});
	};
	
	/*====================================================================================
    ' 함수명 : $.fn.phone()
    ' 기  능  : 전화번호 하이픈 넣기
    ' 리턴값 : 입력값
    '=====================================================================================*/	
	$.fn.phone = function(){
		this.on("keyup", function(){
			var str = $(this).val();
			str = str.replace(/[^\d]+/g, '');
		    //str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');			
			$(this).val(str.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));
		});
	};
	
	
	/*====================================================================================
    ' 함수명 : $.fn.mobile()
    ' 기  능  : 핸드폰 번호 하이픈 넣기
    ' 리턴값 : 입력값
    '=====================================================================================*/	
	$.fn.mobile = function(){
		this.on("keyup", function(){
			var str = $(this).val().replace(/[^\d]+/g, '');			
			$(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );			
		});
	};
	
	/*====================================================================================
    ' 함수명 : $.fn.isNumber()
    ' 기  능  :  유효성 검사 : 숫자
    ' 리턴값 : true, false
    '=====================================================================================*/	
	$.fn.isNumber = function(){
		var str = (this.val() == '' || this.val() == null || this.val() == undefined || this.val() == 'undefined') ? 0 : this.val();
		var reg = /^[0-9]*$/;
		return reg.test(str) ? true : false;
	};
	
	/*====================================================================================
    ' 함수명 : $.fn.serializeObject
    ' 기  능  : form data object 
    ' 리턴값 : object
    '=====================================================================================*/	
	$.fn.serializeObject = function() {
	  "use strict"
	  var result = {}
	  var extend = function(i, element) {
	    var node = result[element.name]
	    if ("undefined" !== typeof node && node !== null) {
	      if ($.isArray(node)) {
	        node.push(element.value)
	      } else {
	        result[element.name] = [node, element.value]
	      }
	    } else {
	      result[element.name] = element.value
	    }
	  }

	  $.each(this.serializeArray(), extend)
	  return result
	}
	
	/*====================================================================================
    ' 함수명 : $.headerTxt
    ' 기  능  : 쿠쿠 텍스트 배너 조회
    '=====================================================================================*/	
	$.headerTxt = function() {
		$.post("/rest/common/bannerText","POST", null, function(data){
			if(data != null && data != undefined && data != "") {
				
				var tempTxt = "<li><a href='${link}' target='{{if linkGb == '0'}}_self{{else}}_blank{{/if}}'>${title}</a></li>";
				
				$.template("tempHeadText", tempTxt);
				$( "#ui_gnb_header_txt_list" ).empty();
				$.tmpl("tempHeadText", data).appendTo("#ui_gnb_header_txt_list");
							
			} else {
			console.log("txt", data);	
				return false;
			}
		},function(xhr, ajaxOptions, thrownError){
			return false;
		});	
	}
	/*====================================================================================
    ' 함수명 : $.goUserPage
    ' 기  능  : 쿠쿠 마이이페이지 이동처리
    '=====================================================================================*/	
	$.goUserPage = function(type, _this){
		var url = $(_this).data("url");
		url += (type == 0) ? "/login" : "/mycuckoo/";
		location.href= url; 
	}
	/*====================================================================================
    ' 함수명 : $.gnb
    ' 기  능  : 쿠쿠 GNB 카테고리 메뉴 생성
    '=====================================================================================*/
	/* 2022-10-28 : KSY _ 쿠쿠몰 메인 카테고리 UI 변경 _ START */
	$.gnb = function(comCd){	

		$.post('/rest/common/menu', 'POST', null, function (data) {
			
			var cuckooUrl=$('.mycuckoo_btn').data('url');
			if(data != null && data != undefined && data != ''){
				var parentId = '';
				var urlPath = '';
				// 카테고리 top 그룹 생성
				$.each(data, function (idx, dt) {
					if(dt.parentNo==0&&dt.useYn=="Y"){
						
						var html="";
						if($('.cate_type_tit').children().length==0){
							html+='<div class="tit sel" data-type="'+dt.menuIdx+'">'+dt.title+'</div>';	
						}else{
							html+='<div class="tit" data-type="'+dt.menuIdx+'">'+dt.title+'</div>';
						}
						$('.cate_type_tit').append(html);
						
						html=""
						if($('.cate_type_tab').children().length==0){
							html+='<div class="tab '+dt.menuIdx+' show" data-type="'+dt.menuIdx+'" id="ui_lnd_list_'+dt.menuIdx+'" th:data-url="'+cuckooUrl+'">';
						}else{
							html+='<div class="tab '+dt.menuIdx+'" data-type="'+dt.menuIdx+'" id="ui_lnd_list_'+dt.menuIdx+'" th:data-url="'+cuckooUrl+'">';
						}
						html+='</div>';
						$('.cate_type_tab').append(html);
						
					}
					
				});
				
				//상위 카테고리 높이 가져와 sub카테고리 높이 생성 
				var titHeight=$('.header_menu_cate_gnb_wrap').height();
				titHeight= titHeight-20;
				titHeight+="px";
				$('.cate_type_tab .tab').css('height',titHeight);
				
				
				// 카테고리 하위 그룹 리스트 생성
				$.each(data, function (idx, dt) {
					if(dt.parentNo!=0){
						
						switch(dt.kind){
						case 'M': // 쿠쿠몰
							urlPath = '/mall/productList?categoryCd=';
							break;
						case 'R': // 쿠쿠렌탈
							urlPath = '/rental/productList?cateUid=';
							break;
						case 'S': // 정기구독관
							urlPath = '/regular/productList?categoryCd=';
							break;
						}
						
						var url = urlPath;
						url+=dt.categoryCd;
						if(dt.iconLink != null && dt.iconLink != ''){
						url = dt.iconLink;
						}

						var html="";
						html+='<div class="lnb_wrap">';
						html+='<div class="lnb_tit" style="background-image:url('+ $("#cuckooCdn").val() + dt.iconPath+'); background-size: 30px 30px;">';
						html+='<a href="'+url+'" rel="nosublink">'+dt.title+'</a>';
						html+='</div>';
						html+='<ul class="lnb_sub_list">';
						dt.menuList.forEach(function(item, i) {
							html+='<li><a href="'+url+'&amp;filter='+item.filterSeq+'" rel="nosublink">'+item.filterNm+'</a></li>';
						});
						html+='</ul>';
						html+='</div>';
						$('#ui_lnd_list_'+dt.parentNo+'').append(html);
						
					}
					
				});
				
				
			} else {

				var lnb_no = '<div class="lnb_wrap"><div class="lnb_tit">메뉴없음</div></div>';
				$('.cate_type_tab').find('.tab').each(function(idx, item){
					$(item).append($(lnb_no));
				});

			}

		}, function(xhr, ajaxOptions, thrownError){
			console.log('# error')
			return false;
		});
		
	}
	
	/* 이전 UI
	$.gnb = function(comCd){	

		$.post('/rest/common/menu', 'POST', null, function (data) {
			
			if(data != null && data != undefined && data != ''){

				var parentId = '';
				var urlPath = '';
				
				// 카테고리 메뉴 생성
				$.each(data, function (idx, dt) {

					switch(dt.kind){
						case 'M': // 쿠쿠몰
							parentId = 'ui_lnb_list_mall'; 
							urlPath = '/mall/productList?categoryCd=';
							break;
						case 'R': // 쿠쿠렌탈
							parentId = 'ui_lnb_list_rental'; 
							urlPath = '/rental/productList?cateUid=';
							break;
						case 'S': // 정기구독관
							parentId = 'ui_lnb_list_regular'; 
							urlPath = '/regular/productList?categoryCd=';
							break;
					}

					urlPath += dt.categoryCd;
					if(dt.iconLink != null && dt.iconLink != ''){
						urlPath = dt.iconLink;
					}

					var lnb_list = '<div class="lnb_wrap">';
					lnb_list += '		<div class="lnb_tit" style="background-image:url(' + dt.iconPath + ');">';
					lnb_list += '			<a href="' + urlPath + '" target="">' + dt.title + '</a>';
					lnb_list += '		</div>';
					lnb_list += '		<ul class="lnb_sub_list"></ul>';
					lnb_list += '	</div>';
					var $lnbList = $(lnb_list);

					var filterMenu = '';
					dt.menuList.forEach(function(menu){
						filterMenu += '<li><a href="' + urlPath + '&amp;filter=' + menu.filterSeq + '">' + menu.filterNm + '</a></li>';
					});

					$lnbList.find('.lnb_sub_list').html(filterMenu);
					$('div[id="'+parentId+'"]').append($lnbList);
					
				});

				var lenList = [];
				var typeList = [];

				$('.cate_type_tab').find('.tab').each(function(idx, item){
					lenList.push($(item).find('.lnb_wrap').length);
					typeList.push($(item).data('type'));
				});

				var maxLen = Math.max.apply(null, lenList);

				lenList.forEach(function (len, idx) {
					if(maxLen > len){
						for(var i=0; i<(maxLen - len); i++){
							var $emptLnb = $('<div class="lnb_wrap"></div>');
							$('.tab.'+typeList[idx]).append($emptLnb);
						}
					}
				});

			} else {

				var lnb_no = '<div class="lnb_wrap"><div class="lnb_tit">메뉴없음</div></div>';
				$('.cate_type_tab').find('.tab').each(function(idx, item){
					$(item).append($(lnb_no));
				});

			}

		}, function(xhr, ajaxOptions, thrownError){
			console.log('# error')
			return false;
		});
		
	}
	*/

	/* $.gnb = function(comCd){	
		if ($("#ui_gnb_rental_sub_14").children("li").length < 1 ) {
			var mergeFlg = true;
			var name = "";
			function merge(x1) {
				if (x1 != name) {
					name = x1;
					return true;
				}  else{
					return false;
				}
			}

			$.post("/rest/common/menu","POST", null, function(data){				
				if(data != null && data != undefined && data != "") {
					//--- 쿠쿠몰 메뉴
					var mallJson = data.filter(function(x) {return x.kind == 'M'});
					var mallLi = '';
					$.each(mallJson, function(idx, rs){
						mallLi += '<li style="background-image:url('+rs.iconPath+');">';
						
						var mallLink = '/mall/productList?categoryCd='+rs.categoryCd;
						if(rs.iconLink != null && rs.iconLink != ''){
							mallLink = rs.iconLink;
						}
						
						mallLi += 	'<a href="'+mallLink+'" target="'+(rs.iconLinkGb == '1' ? '_blank' : '')+'">'+rs.title+'</a>';
						
						if(rs.menuList != null && rs.menuList.length > 0){
							mallLi += 	'<div class="sub_depth_layout" style="background-image:url('+rs.iconBgPath+'); '+(idx==0 ? 'display:block;' : '')+'">';
							mallLi += 		'<ul id="ui_gnb_mall_sub_'+rs.categoryCd+'">';
								$.each(rs.menuList, function(idx, dtl){
									mallLi += 	'<li><a href="/mall/productList?categoryCd='+rs.categoryCd+'&amp;filter='+dtl.filterSeq+'">'+dtl.filterNm+'</a></li>';
								});
							mallLi += 		'</ul>';
							mallLi += 	'</div>';
						} else if(idx==0){
							//--- 첫번째 카테고리가 필터정보가 없는 경우 너비 수정
							$('.header_menu_cate_wrap').css('width','275px');
						}
						
						mallLi += '</li>';
					});
					
					$("#ui_gnb_mall_category").html(mallLi);
					
					//--- 쿠쿠렌탈 메뉴
					var rentalJson = data.filter(function(x) {return x.kind == 'R'});
					var rentalLi = '';
					$.each(rentalJson, function(idx,rs){
						rentalLi += '<li style="background-image:url('+rs.iconPath+');">';
						
						var rentalLink = '/rental/productList?cateUid='+rs.categoryCd;
						if(rs.iconLink != null && rs.iconLink != ''){
							rentalLink = rs.iconLink;
						}
						
						rentalLi += 	'<a href="'+rentalLink+'" target="'+(rs.iconLinkGb == '1' ? '_blank' : '')+'">'+rs.title+'</a>';
						
						if(rs.menuList != null && rs.menuList.length > 0){
							rentalLi += 	'<div class="sub_depth_layout" style="background-image:url('+rs.iconBgPath+');">';
							rentalLi += 		'<ul id="ui_gnb_rental_sub_'+rs.categoryCd+'">';
								$.each(rs.menuList, function(idx, dtl){
									rentalLi += 	'<li><a href="/rental/productList?cateUid='+rs.categoryCd+'&amp;filter='+dtl.filterSeq+'">'+dtl.filterNm+'</a></li>';
								});
							rentalLi += 		'</ul>';
							rentalLi += 	'</div>';
						}
						
						rentalLi += '</li>';
					});
					
					$("#ui_gnb_rental_category").html(rentalLi);
					
				} else {
					return false;
				}
			}, function(xhr, ajaxOptions, thrownError){
				return false;
			});
		}
	} */
	/* 2022-10-27 : KSY _ 쿠쿠몰 메인 카테고리 UI 변경 _ END */

	/*====================================================================================
    ' 함수명 : $.gnbSearchInit
    ' 기  능  : GNB 공통 검색 창 이벤트 생성
    '=====================================================================================*/	
	$.gnbSearchInit = function(){
		$("#ui_gnb_search_word").onEnter($.searchProduct);
		$("#ui_gnb_search_btn").on("click", $.searchProduct)
	}
	
	/*====================================================================================
    ' 함수명 : $.searchProduct
    ' 기  능  : GNB 공통 검색 처리
    '=====================================================================================*/	
	$.searchProduct = function(){
		
		$("#ui_gnb_search_word").val($("#ui_gnb_search_word").val().trim());
		
		if ($("#ui_gnb_search_word").val() == "") {
			message.popup({content : "검색어를 입력해 주세요." , callback1 : function(){
				$("#ui_gnb_search_word").focus();
			}});
			return false;
		}
		var url = "/searchWord?searchWord=" + encodeURIComponent($("#ui_gnb_search_word").val());
		
		$.setWordList(url, $("#ui_gnb_search_word").val());
		
		location.href=url;
	}
	
	/*====================================================================================
    ' 함수명 : $.goSearch
    ' 기  능  : 최근검색어 클릭 시 랜딩 처리
    '=====================================================================================*/
	$.goSearch = function(word){
		
		var url = "/searchWord?searchWord=" + encodeURIComponent(word);
		
		$.setWordList(url, word);
		
		location.href=url;
	}
	
	/*====================================================================================
    ' 함수명 : $.setWordList
    ' 기  능  : 최근검색어 저장
    '=====================================================================================*/	
	$.setWordList = function(url, word){
		try {
			//--- 최근검색어 리스트
			var wordList = [];
			
			//--- 현재 검색하는 검색어 첫번째 저장
			var obj = { title : word , url  : url , idx  : 0};
			wordList.push(obj);
			
			if (localStorage.getItem("wordList") != null && localStorage.getItem("wordList") != "") {
				
				var data = JSON.parse(localStorage.getItem("wordList"));
				
				//--- 이미 저장된 최근검색어 제거
				data = data.filter(function(x){return x.title != word});
				
				//--- 스토리지 저장된 검색어 저장(두번째 ~ 여섯번째)
				$.each(data, function(idx, rs){
					//--- 최대 6개까지 저장
					if (idx < 5) {
						var obj = { title : rs.title, url : rs.url, idx : idx+1};
						wordList.push(obj);
					}
				});
			}
			
			localStorage.setItem("wordList", JSON.stringify(wordList));
			
		} catch(e) {
			// nothing to do
		}
	}
	
	/*====================================================================================
    ' 함수명 : $.getUserCartCount
    ' 기  능  : 장바구니 카운트
    '=====================================================================================*/	
	$.getUserCartCount = function(){
		/* 2022-11-08 : KSY _ 장바구니 정기구독관 추가 _ START */
		var mallUrl = "/mall/productList";
		var rentalUrl = "/rental/productList";
		var regularUrl = "/regular/productList";
		
		$.post("/rest/common/cartCount","POST", null, function(data){
			var total = data.mallCnt + data.rentalCnt + data.regularCnt;
			
			if (total == 0) {
				$("#ui_gnb_cart_count").hide();
				$("#ui_gnb_mall_cart_cnt").hide();
				$("#ui_gnb_rental_cart_cnt").hide();
				$("#ui_gnb_regular_cart_cnt").hide();
				$("#ui_gnb_mall_cart_txt").html("장바구니에 <br>상품을 담아주세요.");
				$("#ui_gnb_mall_rental_txt").html("장바구니에 <br>상품을 담아주세요.");
				$("#ui_gnb_mall_regular_txt").html("장바구니에 <br>상품을 담아주세요.");
				$("#ui_gnb_mall_link_btn").html("상품보러 가기").attr("href", mallUrl);
				$("#ui_gnb_rental_link_btn").html("상품보러 가기").attr("href", rentalUrl);
				$("#ui_gnb_regular_link_btn").html("상품보러 가기").attr("href", regularUrl);
			} else {
				total = (total > 99) ? "99+" : total;
				$("#ui_gnb_cart_count").show().html(total);
				if (data.mallCnt > 0) {
					var mallCnt = (data.mallCnt > 99) ? data.mallCnt + "+" : data.mallCnt;
					var mallTxt ="현재 쿠쿠몰 장바구니에 <br><em>"+mallCnt+"</em>개의 상품이 담겨 있습니다.";
					mallUrl = "/mall/cartList";
					$("#ui_gnb_mall_cart_txt").html(mallTxt);
					$("#ui_gnb_mall_link_btn").html("결제하러 가기").attr("href", mallUrl);
					$("#ui_gnb_mall_cart_cnt").show().html(data.mallCnt);
					// $("#ui_tab_link_mall_txt").html("쿠쿠전자 일시불("+mallCnt+")");
										
				} else {
					$("#ui_gnb_mall_cart_cnt").hide();
					$("#ui_gnb_mall_cart_txt").html("장바구니에 <br>상품을 담아주세요.");					
					$("#ui_gnb_mall_link_btn").html("상품보러 가기").attr("href", mallUrl);
				}
				
				if(data.rentalCnt > 0) {
					var rentalCnt = (data.rentalCnt > 99) ? data.rentalCnt + "+" : data.rentalCnt;
					var rentalTxt ="현재 쿠쿠렌탈 장바구니에 <br><em>"+rentalCnt+"</em>개의 상품이 담겨 있습니다.";
					rentalUrl = "/rental/cartList?kind=1";					
					$("#ui_gnb_mall_rental_txt").html(rentalTxt);
					$("#ui_gnb_rental_link_btn").html("주문하러 가기").attr("href", rentalUrl);
					$("#ui_gnb_rental_cart_cnt").show().html(data.rentalCnt);	
				} else {
					$("#ui_gnb_rental_cart_cnt").hide();
					$("#ui_gnb_mall_rental_txt").html("장바구니에 <br>상품을 담아주세요.");
					$("#ui_gnb_rental_link_btn").html("상품보러 가기").attr("href", rentalUrl);
				}			

				if(data.regularCnt > 0) {
					var regularCnt = (data.regularCnt > 99) ? data.regularCnt + "+" : data.regularCnt;
					var regularTxt ="현재 정기구독관 장바구니에 <br><em>"+regularCnt+"</em>개의 상품이 담겨 있습니다.";
					regularUrl = "/regular/cartList";					
					$("#ui_gnb_mall_regular_txt").html(regularTxt);
					$("#ui_gnb_regular_link_btn").html("구독하러 가기").attr("href", regularUrl);
					$("#ui_gnb_regular_cart_cnt").show().html(data.regularCnt);	
				} else {
					$("#ui_gnb_regular_cart_cnt").hide();
					$("#ui_gnb_mall_regular_txt").html("장바구니에 <br>상품을 담아주세요.");
					$("#ui_gnb_regular_link_btn").html("상품보러 가기").attr("href", regularUrl);
				}				
			}
		}, function(err){
			$("#ui_gnb_cart_count").hide();
			$("#ui_gnb_mall_cart_cnt").hide();
			$("#ui_gnb_rental_cart_cnt").hide();
			$("#ui_gnb_regular_cart_cnt").hide();
			$("#ui_gnb_mall_cart_txt").html("장바구니에 <br>상품을 담아주세요.");
			$("#ui_gnb_mall_rental_txt").html("장바구니에 <br>상품을 담아주세요.");
			$("#ui_gnb_mall_regular_txt").html("장바구니에 <br>상품을 담아주세요.");
			$("#ui_gnb_mall_link_btn").html("상품보러 가기").attr("href", mallUrl);
			$("#ui_gnb_rental_link_btn").html("상품보러 가기").attr("href", rentalUrl);
			$("#ui_gnb_regular_link_btn").html("상품보러 가기").attr("href", regularUrl);
		});
		/* 2022-11-08 : KSY _ 장바구니 정기구독관 추가 _ END */
	}
	
	/*====================================================================================
    ' 함수명 : $.getKeyword()
    ' 기  능  : 검색창 인기검색어 조회
    '=====================================================================================*/
	$.getKeyword = function(){
		var cnt = $("#ui_gnb_popular_word_list").children("li").length;
		if (cnt == null || cnt == undefined || cnt == 0) {
			$.post("/rest/common/popular","POST", null, function(data){
				if (data != null && data.length > 0) {
					var html = "";
					var filteredData = data.filter(item => item.useYn !== "N");
					$("#ui_gnb_popular_word_list").html("");
					filteredData.forEach(function(item, index) {
                    	html += "<li><span class='popularSearch'>"+(index+1)+"</span><a href='"+item.link+"'>"+item.title+"</a></li>";
                	});
					$("#ui_gnb_popular_word_list").html(html);
					$("#ui_gnb_popular_word_list").show();
					$("#ui_gnb_popular_word_list_no_reulst").hide();
				}
			}, function(err){
				$("#ui_gnb_popular_word_list").hide();
				$("#ui_gnb_popular_word_list_no_reulst").show();				
			});
		}

		//최근검색어
		if (localStorage.getItem("wordList") != null && localStorage.getItem("wordList") != "") {
			var data = JSON.parse(localStorage.getItem("wordList"));
			var html = "<li><a href='#' onclick='$.goSearch(\"${title}\")' class='pdr10'>${title}</a> <a href='#' onclick='$.getRemovewWord(${idx})' class='btn-del'><i class='ico del2'></i></a></li>";
			$("#ui_gnb_lately_search_word").html("");
			$.template("temp",html);	
			$.tmpl("temp", data).appendTo("#ui_gnb_lately_search_word");
			$("#ui_gnb_lately_search_word").show();
			$("#ui_gnb_lately_search_word_no_result").hide();
		} else {
			$("#ui_gnb_lately_search_word").hide();
			$("#ui_gnb_lately_search_word_no_result").show();
		}
	}
	
	/*====================================================================================
    ' 함수명 : $.getKeyword()
    ' 기  능  : 검색창 인기검색어 삭제
    '=====================================================================================*/
	$.getRemovewWord = function(idx){
		var data = JSON.parse(localStorage.getItem("wordList"));
		var arrWord = data.filter(function(x){return x.idx != idx});
		if (arrWord == null || arrWord == "" || arrWord.length == 0) {
			$("#ui_gnb_lately_search_word").html("");
			localStorage.removeItem("wordList");
			$("#ui_gnb_lately_search_word").hide();
			$("#ui_gnb_lately_search_word_no_result").show();
		} else {
			//--- 삭제된 인기 검색어 제외 인덱스 재설정
			$.each(arrWord, function(i, rs){
				rs.idx = i;
			});
			
			localStorage.setItem("wordList", JSON.stringify(arrWord));
			var html = "<li><a href='#' onclick='$.goSearch(\"${title}\")' class='pdr10'>${title}</a> <a href='#' onclick='$.getRemovewWord(${idx})' class='btn-del'><i class='ico del2'></i></a></li>";
			$("#ui_gnb_lately_search_word").html("");
			$.template("temp",html);	
			$.tmpl("temp", arrWord).appendTo("#ui_gnb_lately_search_word");
		}
		
	}
	
	/*====================================================================================
    ' 함수명 : $.lpad
    ' 기  능 : n(숫자) 앞에 len(자릿수)에 맞춰서 '0'추가
    ' 사용예 : $.lpad(123, 5)
    ' 리턴값 : "00123"
    '=====================================================================================*/
	$.lpad = function(n, len) {
		n = n + '';
		return n.len >= length ? n : new Array(len - n.length + 1).join('0') + n;
	}
	
	/*====================================================================================
    ' 함수명 : $.
    ' 기  능 : 날짜(new Date() 타입)를 원하는 포맷으로 변경
    ' 사용예 : $.dateFormat(new Date(), "yyyy년MM월dd일")
    ' 리턴값 : "2018년07월25일"
    '=====================================================================================*/
	$.dateFormat = function(date, f) {
	    if (!this.valueOf()) return "";
	    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	    var d = date;
	    return f.replace(/(yyyy|yy|MM|M|dd|d|E|hh|mm|ss|a\/p)/gi, function($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear();
	            case "yy": return (d.getFullYear() % 1000).subFormat(2);
	            case "MM": return $.lpad(d.getMonth() + 1, 2);
	            case "M": return $.lpad(d.getMonth() + 1, 1);
	            case "dd": return $.lpad(d.getDate(), 2);
	            case "d": return $.lpad(d.getDate(), 1);
	            case "E": return weekName[d.getDay()];
	            case "HH": return $.lpad(d.getHours(), 2);
	            case "hh": return $.lpad(((h = d.getHours() % 12) ? h : 12), 2);
	            case "mm": return $.lpad(d.getMinutes(), 2);
	            case "ss": return $.lpad(d.getSeconds(), 2);
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
	            default: return $1;
	        }
	    });
	}
	
	/*====================================================================================
    ' 함수명 : $.bizMsg
    ' 기  능 : 관리자 승인 메세지
    ' 사용예 : $.bizMsg('0')
    '=====================================================================================*/
	$.bizMsg = function(authFg){
		var msg = (authFg == "0") ? "주문/결제는 관리자 승인 후 이용하실 수 있습니다.<br/>빠르게 확인 후 처리 드리겠습니다" : "사업자 승인 반려되었습니다.<br/>고객센터에 문의 하여 주세요.";
		message.popup({content : msg});	
	}
	
	$.kakao = function(siteType){
		var chatUrl = "https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%BF%A0%EC%BF%A0%EC%A0%84%EC%9E%90&site_id=1000217800&category_id=105217&division_id=105227";
		if(siteType == 'R') {
			chatUrl = "https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%BF%A0%EC%BF%A0%EB%A0%8C%ED%83%88&site_id=4000001029&category_id=97012&division_id=97013";
		}
		window.open(chatUrl,"_kakao");
	}
	
	/*====================================================================================
    ' 함수명 : $.isEmpty()
    ' 기  능  : 빈값 체크
    '=====================================================================================*/	
	$.isEmpty = function(value){ 
		if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ 
			return true 
		} else { 
			return false 
		} 
	}
	
	/*====================================================================================
    ' 함수명 : $.lazyLoading()
    ' 기  능  : lazy-img class를 가지는 img 태그에 대해 lazy load 처리
    '=====================================================================================*/
	$.lazyLoading = function(){
		const observerOption = {
			root: null,
			rootMargin: "0px",
			threshold: 0.1
		}
		
		// IntersectionObserver 인스턴스 생성
		const io = new IntersectionObserver((entries, observer) => {
	        entries.forEach(entry => {
	            // entry.isIntersecting: 특정 요소가 뷰포트와 10%(threshold 0.1) 교차되었으면
	            if (entry.isIntersecting) {
					if(entry.target.tagName == 'IMG') {
		                entry.target.src = entry.target.dataset.src;
					} else {
						entry.target.style.backgroundImage = 'url('+entry.target.dataset.src+')';
					}
	                observer.unobserve(entry.target)	// entry.target에 대해 관찰 종료
	            }
	        })
    	}, observerOption)

		// lazy-img 클래스 요소 순회
		const lazyImgs = document.querySelectorAll(".lazy-img")
			lazyImgs.forEach(el => {
			io.observe(el)  // el에 대하여 관측 시작
		})
	}
	
	$.getCoupon = function(couponIdx){
		if(/^\d+$/.test(couponIdx)){
		//////////////	
    	var param = JSON.stringify({couponIdx : couponIdx });
    	$.post("/rest/event/exhibitGetCoupon", "POST", param, function(data){
        	if(data != null){							
				if(data == "0"){
	    			message.popup({content : "쿠폰이 정상적으로 발급되었습니다.<br>(구매 시 쿠폰 적용 하시어 사용가능하며, 쿠폰 발급 내역은 마이쿠쿠에서 확인하실 수 있습니다)"});	
				} else if(data == "-5"){
	    			message.popup({
	        			content : "해당 쿠폰의 경우 로그인 후 쿠폰을 발급 받을 수 있습니다.<br>(회원가입 > 쿠폰 다운로드 클릭 시 자동 발급)",
	        			btn_cnt : 2,
	        			callback1 : function() {
							location.href = "/login";
	        			}		
	    			});	
				}else if(data == "-4"){
	    			message.popup({content : "쿠폰발급 기간이 아닙니다."});	
				}else if(data == "-3"){
	    			message.popup({content : "이미 해당 쿠폰을 발급받으셨습니다."});	
				}else {
	    			message.popup({content : "쿠폰 발급 중 오류가 발생했습니다. 홈페이지 1:1 문의하기에 남겨주세요."});	
				}
        	}							
    	}, function(e){
			message.popup({content : "쿠폰 발급 중 오류가 발생했습니다. 홈페이지 1:1 문의하기에 남겨주세요."});
    	});
		//////////////	
		} else{
		//////////////	
    	var param = JSON.stringify({encryptCouponIdx : couponIdx });
    	$.post("/rest/event/downloadCoupon", "POST", param, function(data){
        	if(data != null){							
				if(data == "0"){
	    			message.popup({content : "쿠폰이 정상적으로 발급되었습니다.<br>(구매 시 쿠폰 적용 하시어 사용가능하며, 쿠폰 발급 내역은 마이쿠쿠에서 확인하실 수 있습니다)"});	
				} else if(data == "-5"){
	    			message.popup({
	        			content : "해당 쿠폰의 경우 로그인 후 쿠폰을 발급 받을 수 있습니다.<br>(회원가입 > 쿠폰 다운로드 클릭 시 자동 발급)",
	        			btn_cnt : 2,
	        			callback1 : function() {
							location.href = "/login";
	        			}		
	    			});	
				}else if(data == "-4"){
	    			message.popup({content : "쿠폰발급 기간이 아닙니다."});	
				}else if(data == "-3"){
	    			message.popup({content : "이미 해당 쿠폰을 발급받으셨습니다."});	
				}else {
	    			message.popup({content : "쿠폰 발급 중 오류가 발생했습니다. 홈페이지 1:1 문의하기에 남겨주세요."});	
				}
        	}							
    	}, function(e){
			message.popup({content : "쿠폰 발급 중 오류가 발생했습니다. 홈페이지 1:1 문의하기에 남겨주세요."});
    	});
		//////////////		
		}
	}
	
	$.getLivePoint = function(pointInfoIdx){
		if (/^\d+$/.test(pointInfoIdx)) {
			message.popup({content : "잘못된 접근입니다."});
		} else {
	    	var param = JSON.stringify({encryptPointInfoIdx : pointInfoIdx });
	    	$.post("/rest/event/downloadLivePoint", "POST", param, function(data){
	        	if (data != null) {
					if (data == "0") {
		    			message.popup({content : "포인트가 정상적으로 발급되었습니다.<br>(구매 시 포인트 사용가능하며, 포인트 발급 내역은 마이쿠쿠에서 확인하실 수 있습니다.)<br> - 라이브 종료 후 발급받은 포인트는 차감됩니다."});	
					} else if(data == "-5") {
		    			message.popup({
		        			content : "해당 포인트의 경우 로그인 후 발급 받을 수 있습니다.<br>(회원가입 > 포인트 다운로드 클릭 시 자동 발급)",
		        			btn_cnt : 2,
		        			callback1 : function() {
								location.href = "/login";
		        			}
		    			});
					} else if (data == "-4") {
		    			message.popup({content : "포인트 발급 기간이 아닙니다."});	
					} else if (data == "-3") {
		    			message.popup({content : "이미 해당 포인트를 발급받으셨습니다."});	
					} else {
		    			message.popup({content : "포인트 발급 중 오류가 발생했습니다. 홈페이지 1:1 문의하기에 남겨주세요."});	
					}
	        	}
	    	}, function(e){
				message.popup({content : "포인트 발급 중 오류가 발생했습니다. 홈페이지 1:1 문의하기에 남겨주세요"});
	    	});
		}
	}
	
	$.liveAlimOpen = function(_this, time) {
		$.showMask();
		var param = JSON.stringify({cuckooTvIdx : _this});
		var obj = {
			 cuckooTvIdx : _this
			,contentsGb : time
		};
		$.post("/rest/event/alimCheck","POST", param, function(data){
			if (data.result == "1") {
				$.hideMask();
				$("#ui_layer").html("");
				$("#ui_layer").load("/popup/liveAlimPopup #alimPop", obj, function(response, status, xhr){
					if (status == "success") {
						layerPopOpen('alimPop');
						$("#ui_live_alim_mobile").val(data.mobile);
					} else {
						message.popup({content : "라이브 알림 페이지 생성에 실패하였습니다."});
					}
				});
				return;
			} else if (data.result == "-1") {
				$.hideMask();
				message.popup({content : "라이브 사전알람 신청 완료 되었습니다.<br>" + time + "에 문자 발송 예정입니다."});
				return;
			} else if (data.result == "-2") {
				$.hideMask();
				$("#ui_layer").html("");
				$("#ui_layer").load("/popup/liveAlimPopup #alimPop", obj, function(response, status, xhr){
					if (status == "success") {
						layerPopOpen('alimPop');
					} else {
						message.popup({content : "라이브 알림 페이지 생성에 실패하였습니다."});
					}
				});
				return;
			}
		}, function(){
			$.hideMask();
			message.popup({content : "오류가 발생 하였습니다"});
		});
		$.hideMask();
	}
	
	$.liveAlimReserve = function() {
		if ($("#ui_live_alim_mobile").val() == '' || $("#ui_live_alim_mobile").val().length < 10 || !$("#ui_live_alim_mobile").val().startsWith("010")) {
			message.popup({content : "휴대폰 번호를 입력해주세요.", callback1 : function(){$("#ui_live_alim_mobile").focus();}});
			return false;
		}
		
		if (!$("#ui_live_alim_agreeYn").prop("checked")) {
			message.popup({content : "개인 정보 수집 및 이용에 동의해주세요.", callback1 : function(){$("#ui_live_alim_agreeYn").focus();}});
			return false;
		}
		
		$.showMask();
		var param = JSON.stringify({keyword : $("#ui_live_alim_mobile").val(), cuckooTvIdx : $("#ui_live_alim_idx").val()});
		$.post("/rest/event/alim","POST", param, function(data){
			if (data == "1") {
				$.hideMask();
				layerPopClose('alimPop');
				message.popup({content : "라이브 알림 신청이 완료되었습니다."});
				return;
			} else if (data == "-1") {
				$.hideMask();
				message.popup({content : "라이브 알림 신청 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."});
				return;
			} else if (data == "-2") {
				$.hideMask();
				message.popup({content : "오류가 발생하였습니다. 잠시 후 다시 시도해주세요."});
				return;
			} else if (data == "-3") {
				$.hideMask();
				layerPopClose('alimPop');
				message.popup({content : "라이브 사전알람 신청 완료 되었습니다.<br>" + $("#ui_live_alim_time").val() + "에 문자 발송 예정입니다."});
				return;
			} else if (data == "-4") {
				$.hideMask();
				layerPopClose('alimPop');
				message.popup({content : "라이브 시작 후에는 알림 신청이 불가능합니다."});
				return;
			} else if (data == "-5") {
				$.hideMask();
				layerPopClose('alimPop');
				message.popup({content : "잠시 후 라이브가 시작될 예정입니다."});
				return;
			} else {
				$.hideMask();
				message.popup({content : "오류가 발생 하였습니다."});
				return;
			}
		}, function(){
			$.hideMask();
			message.popup({content : "오류가 발생 하였습니다"});
		});
	}
})(jQuery);


/* 	만든이 	: 이진우
	개발 완료 	: 2019.11.08
	사용법	: 	message.popup({
					title : "큰 문자 제목 title 생략시 공백",
					content : "내용 생략시 공백",
					btn_cnt : "버튼 갯수 1~2개 가능 생략시 1개",
					btn1_txt : "버튼1 텍스트 생략시 텍스트= 확인 ",
					btn2_txt : "버튼2 텍스트 생략시 텍스트= 취소 ",
					callback1: function(){"버튼1 클릭시 실행되는 콜백함수"},
					callback2: function(){"버튼2 클릭시 실행되는 콜백함수"},
				}); */
var message = {};

Object.defineProperties( message , {
	popup : {
		value : function popup(option) {
			$('html, body').css('overflow','hidden');
			var this_pop = $(''
					+ '<div class="wrap_layer_pop type_confirm" id="cm_dynamic_pop">'
					+ 	'<div class="layer_pop w400">'
					+ 		'<div class="new00">'
					+ 			'<div class="container_pop">'
					+ 				'<div class="inner_txt">'
					+ 					'<p class="tit" id="cm_pop_title"></p>'
					+ 					'<p class="txt1" id="cm_pop_content"></p>'
					+ 				'</div>'
					+ 			'</div>'
					+ 			'<div class="btn_box mt50 type_full">'
					+ 				'<button type="button" class="btn_typeC btn radius black" id="cm_btn_1"></button>'
					+ 				'&nbsp;<button type="button" class="btn_typeC btn radius" id="cm_btn_2"></button>'
					+ 			'</div>' 
					+ 			'<button type="button" class="btn-close-pop" style="display:none;"><span class="blind">팝업닫기</span></button><span class="blind">팝업닫기</span></button>'
					+ 				'<span class="blind">팝업닫기</span>'
					+			'</button>' 
					+ 		'</div>' 
					+ 	'</div>' 
					+ '</div>'
					+ '');
			option = {
				"btn_cnt" : option.btn_cnt || 1,
				"title" : option.title || "",
				"content" : option.content,
				"btn1_txt" : option.btn1_txt || "확인",
				"btn2_txt" : option.btn2_txt || "취소",
				"callback1" : option.callback1,
				"callback2" : option.callback2,
				"close_btn"	: option.close_btn
			}
			this_pop.find("#cm_pop_title").html(option.title);
			this_pop.find("#cm_pop_content").html(option.content);
			this_pop.find("#cm_btn_1").html(option.btn1_txt);
			this_pop.find("#cm_btn_2").html(option.btn2_txt);
			
			this_pop.find(".btn-pop-close").off("click").on("click", function(e) {
				e.preventDefault();
				$("html, body").css("overflow","visible");
				$("#cm_dynamic_pop").remove();
			});
			this_pop.find(".btn-close-pop").off("click").on("click", function(e) {
				e.preventDefault();
				$("html, body").css("overflow","visible");
				$("#cm_dynamic_pop").remove();
			});
			this_pop.find("#cm_btn_1").off("click").on("click", function(e) {
				e.preventDefault();

				$("#cm_dynamic_pop").remove();
				if (option.callback1 != undefined) {
					option.callback1();
				}
				$("html, body").css("overflow","visible");
				return false;
			});
			if(option.close_btn == true){
				this_pop.find(".btn-pop-close").show();
				this_pop.find(".btn-close-pop").show();
			}
			if(option.btn_cnt == 1){
				this_pop.find("#cm_btn_2").hide();
				this_pop.find("#cm_btn_2").parent().parent().removeClass("btn2");
				this_pop.find("#cm_btn_2").parent().parent().addClass("btn1");
			}else{
				this_pop.find("#cm_btn_2").off("click").on("click", function(e) {
					e.preventDefault();

					$("#cm_dynamic_pop").remove();
					if (option.callback2 != undefined) {
						option.callback2();
					}
					$("html, body").css("overflow", "visible");
					return false;
				});
			}
			
            $("#cm_dynamic_pop").remove();
			$("body").append(this_pop);
			$("#cm_dynamic_pop").css("display", "block");
			//PC팝업 닫기
			$(".btn-close-pop").on("click",function(){
				$("#cm_dynamic_pop").remove();
			})
		},
		editable : false,
		configurable : false,
		enumerable : true
	}
});

$(document).ready(function(){
	if(document.getElementById('header')) {
		$.headerTxt();
		$.gnbSearchInit();
		$.getUserCartCount();
		$.gnb();
	} 
});
