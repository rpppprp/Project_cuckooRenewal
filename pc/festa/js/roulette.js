$(document).ready(function() {
    Kakao.init(cuckoo.kakao);
});

var rolLength = 5; // 해당 룰렛 콘텐츠 갯수
var setNum; // 랜덤숫자 담을 변수

function roulette(){
    if (cuckoo.user == null || cuckoo.user == 0 ) {
        message.popup({
            content : "로그인이 필요한 서비스입니다.\n로그인하시겠습니까?",
            btn_cnt : 2,
            callback1 : function() {
                location.href='/login';
            }
        });			
    } else {
        if (cuckoo.event1cnt > 0) {
            if (cuckoo.event1cnt > 2) {
                winPopup(6);
            } else {
                winPopup(5);
            }
        } else {
            $(".rouletter-btn").prop("disabled", true).css("pointer-events", "none");
            insertEvent();
        }
    }
}


function rRotate(_this){
    var deg = [];
    // 룰렛 각도 설정(rolLength = 6)
    for (var i = 1, len = rolLength; i <= len; i++) {
        deg.push((360 / len) * i);
      }
    // 랜덤 생성된 숫자를 히든 인풋에 넣기
    var num = 0;
    var setNum = _this;
    var animationId;
    var slowDownFactor = 0.9; // 서서히 멈추는 속도 조절 (조절 가능한 값)
    var targetDeg = 0;
    if (typeof $(".rouletter-wacu").attr("style")==="undefined") {
        targetDeg = 1080 + deg[setNum];
    } else {
        targetDeg = 1080 * (cuckoo.event1cnt) + deg[setNum];
    }
      
    function animate() {
        num += (targetDeg - num) * (1 - slowDownFactor);
        $(".rouletter-wacu").css("transform", "rotate(" + targetDeg + "deg)");
        if (Math.abs(targetDeg - num) < 0.1) {
            rReset(_this);
            return;
        } 
        animationId = requestAnimationFrame(animate);
    }
    animate();

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
              animationId = null;
        }
    }
    setTimeout(stopAnimation, 3900);
};

// reset
function rReset(setNum){
    setTimeout(() => {
        rLayerPopup(setNum);
        $(".rouletter-btn").prop("disabled", false).css("pointer-events", "auto");
      }, 3900);
};

// 정해진 alert띄우기, custom modal등
function rLayerPopup(num){
    switch (num) {
        case 4:
            winPopup(num);
            break;
        case 3:
            winPopup(num);
            break;
        case 2:
            winPopup(num);
            break;
        case 1:
            winPopup(num);
            break;
        case 0:
            winPopup(num);
            break;
        default:
            message.popup({content : "문제가 발생하였습니다."});
      }
};

function shareKakao(){
    if (cuckoo.event1cnt > 2) {
        winPopup(6);
    } else {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '친구가 보낸 100% 당첨 선물 확인🍀',
                description : '쿠쿠 룰렛게임하고 \n선물 받자!',
                imageUrl : 'https://cuckoo.co.kr/upload_cuckoo/_bo_rep/event/roulette/pc/kakao.png?v1',
                imageWidth : 370,
                imageHeight : 370,
                link : {
                    mobileWebUrl: cuckoo.url + '/event/rouletteEventDetail',
                    webUrl: cuckoo.url + '/event/rouletteEventDetail'
                }
            },
            buttons: [{
                title : '이벤트 참여하기',
                link : {
                    mobileWebUrl: cuckoo.url + '/event/rouletteEventDetail',
                    webUrl: cuckoo.url + '/event/rouletteEventDetail'
                }
            }],
            callback : function() {
                layerPopClose('popup_passible_boom');
                insertEvent();
            }
        });
    }
}

//--- 당첨 확인 버튼 클릭
function winLog(){
    if (cuckoo.user == null || cuckoo.user == 0 ) {
        message.popup({
            content : "로그인이 필요한 서비스입니다.\n로그인하시겠습니까?",
            btn_cnt : 2,
            callback1 : function() {
                location.href='/login';
            }
        });
        
    } else {
        var obj = {eventIdx : 86}
        $.post("/rest/event/roulettePrizedGift","POST", JSON.stringify(obj), function(data){
            if (data.result == "0") {
                if (data.win.length > 5) {
                    message.popup({content : "<h4>당첨 목록</h4>" + data.win.replaceAll(",","<br>")});
                } else {
                    message.popup({content : "당첨내역이 없습니다."});
                }
                
            } else if (data.result=="-1") {
                message.popup({content : '로그인이 필요합니다.',callback1 : function() {
                    location.href = "/login";
                }});
            } else {
                alert("데이터 처리중 오류가 발생 하였습니다.");
            }
        }, function(err){
            alert(err);		 
        });
    }
}

//--- 당첨 확인 버튼 클릭
function goEvent(type){
    var offset;
    if (type == 2) {
        offset = $("#roulet").offset().top;
    }
    $('html, body').animate({scrollTop : offset - 60}, 400);
}

//--- 룰렛 당첨 이벤트
function insertEvent(){
    var currentDate = new Date();
    var startDate = new Date('2023/09/01 00:00:00');
    var endDate = new Date('2023/09/30 23:59:59');
    if (currentDate >= startDate && currentDate <= endDate) {
        var isSuccess = true;
        $(".rouletter-btn").prop("disabled", true).css("pointer-events", "none");
        var param = JSON.stringify({replyType: "roulette", content: "rank5"});
        if (cuckoo.event1cnt < 3) {
            cuckoo.event1cnt++;
            $.post("/rest/event/rouletteEventIns", "POST", param, function(data){
                if (data != null) {
                    if (data.result == "0") {
                        var num = 0;
                        if (data.win=="rank5") {
                            num = 0;
                        } else if(data.win=="rank4") {
                            num = 1;
                        } else if(data.win=="rank3") {
                            num = 2;
                        } else if(data.win=="rank2") {
                            num = 3;
                        } else if(data.win=="rank1") {
                            num = 4;
                        }
                        rRotate(num);
                    } else if(data.result =="-2") {
                        winPopup(6);
                    } else if(data.result =="-4") {
                        message.popup({content : "이벤트 참여 기간이 아닙니다."});
                    } else if(data.result =="-5") {
                        message.popup({content : '로그인이 필요합니다.',callback1 : function() {
                            location.href = "/login";
                        }});
                    } else {
                        isSuccess = false;
                    }
                } else {
                    isSuccess = false;
                }
                if (!isSuccess) {
                    $(".rouletter-btn").prop("disabled", false).css("pointer-events", "auto");
                    message.popup({content : "이벤트 응모 중 오류가 발생하였습니다. 잠시 후 재시도 부탁드립니다."});
                }
            }, function(e) {
                $(".rouletter-btn").prop("disabled", false).css("pointer-events", "auto");
                message.popup({content : "이벤트 응모 중 오류가 발생하였습니다. 잠시 후 재시도 부탁드립니다."});
            });
        } else {
            winPopup(6);
        }
    } else {
        $(".rouletter-btn").prop("disabled", false).css("pointer-events", "auto");
        message.popup({content : "이벤트 참여 기간이 아닙니다."});
    }
}

//이벤트 팝업
function winPopup(num){
    $(".winPopup").remove();
    if(num <= 4) {
        $('#passiblePopup').prepend('<img class="winPopup" src=\"'+cuckoo.cdn+'/upload_cuckoo/_bo_rep/event/roulette/pc/result_'+num+'.png\" usemap="#popup_passible_map"/>');
        layerPopOpen("popup_passible_boom");
    } else if (num === 5) {
        $('#passiblePopup').prepend('<img class="winPopup" src="'+cuckoo.cdn+'/upload_cuckoo/_bo_rep/event/roulette/pc/result_'+num+'.png" usemap="#popup_kakao_map"/>');
        layerPopOpen("popup_passible_boom");
    } else if (num === 6) {
        $('#impassiblePopup').prepend('<img class="winPopup" src="'+cuckoo.cdn+'/upload_cuckoo/_bo_rep/event/roulette/pc/result_'+num+'.png" usemap="#popup_impassible_map"/>');
        layerPopOpen("popup_impassible_boom");
    } else {
        message.popup({content : "문제가 발생하였습니다."});
    }
}