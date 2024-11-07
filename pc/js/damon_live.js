window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {window.setTimeout(callback , 1000/60);};
})();

window.cancelAnimFrame = (function(){
	return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {window.clearTimeout(id);};
})();

var live = {

	stage : {
		width : 0,
		height : 0
	},

	device : '',				//디바이스 여부(아이폰,안드로이드)

	touchPoints : {startX : 0 , startY : 0 , curX : 0 , curY : 0 , prevX : -1 , prevY : -1 , deltaX : 0 , deltaY : 0, type : '' , swipe : ''},

	swiperHammer : null,
	swiperContainer : null,
	swiperDistance : 130,
	swiperVerticalCur : 0,
	swiperVerticalPrev : -1,
	swiperVerticalLen : -1,
	swiperCurTarget : null,
	swiperPrevTarget : null,
	swiperTargetList : [],
	swiperViewTotal : -1,
	swiperTouchEvent : {},
	eventStats : '',
	eventStatsAll : '',
	eventStatsStart : '',
	eventStatsEnd : '',
	first : true,
	flipClockTimer : [],
	autoTimer : null,
	autoTimerDelay : 5000,
	autoStockTimer : null,
	autoStockTimerDelay : 10000,
	flag : true,


	init : function(){		
		var _this = this;
		
		// stage set
		this.stage.width = $('.main-hot-deal').find('.live-slider').width();
		this.stage.height = $('.main-hot-deal').find('.live-slider').height();

		// swiper set
		this.swiperContainer = $('.vertical-contents');

		this.swiperContainer.find('.vertical-cell').each(function(){
			//$(this).addClass('touch-none').attr('data-index' , $(this).index());
			$(this).attr('data-index' , $(this).index());
			live.swiperTargetList.push($(this));
		
			var viewTime = "";
			var clockTime = $(this).attr('data-day');
			
			if(clockTime) {
				var clockParseTime = clockTime.substring(0,4)+"-"+clockTime.substring(4,6)+"-"+clockTime.substring(6,8)+" "+clockTime.substring(8,10)+":"+clockTime.substring(10,12)+":"+clockTime.substring(12,14)+".0";
				var parseTime = clockParseTime.substring(0,10)+"T"+clockParseTime.substring(11,19)+"+09:00";
				var curTime = new Date();
				var pastDate = new Date(parseTime)
				viewTime = (pastDate.getTime() / 1000) - (curTime.getTime() / 1000);
			}			

			var flipFlock = $(this).find('.live-timer-data').FlipClock( viewTime , {
				clockFace: 'DailyCounter',
				countdown : true,
				language : 'Korean',
				/* 20201118 수정 : s */
				showSeconds:true,
				/* 20201118 수정 : e */
				callbacks: {
					stop: function() {
						$('.message').html('The clock has stopped!')
					}
				}
			}); 

			live.flipClockTimer.push(flipFlock);
		});

		$(document).on('click' , '.btn-live-next' , function(){

		});

		$('.btn-live-next').on('mouseenter mouseleave click' , function(e){
			if(e.type == 'mouseenter'){
				live.autoStop();
			}else if(e.type == 'mouseleave') {
				live.autoStart();
			}else if(e.type == 'click'){
			if(live.flag) live.swiperVerticalControlNext();
			}
		});

		$('.live-slider').on('mouseenter mouseleave' , function(e){
			if(e.type == 'mouseenter'){
				live.autoStop();
			}else {
				live.autoStart();
			}
		});
		
		this.swiperVerticalIndexSet();
		this.resize();
	},	

	ready : function(){
		this.resize();
	},

	load : function(){		
		this.resize();
	},

	resize : function(){
		this.stage.width = $('.main-hot-deal').find('.live-slider').width();
		this.stage.height = $('.main-hot-deal').find('.live-slider').height();
	},

	// swiper vertical index set
	swiperVerticalIndexSet : function(index){
		this.swiperVerticalPrev = -1;
		this.swiperVerticalCur = (index == undefined) ? 0 : index;
		this.swiperVerticalLen = this.swiperContainer.find('.vertical-cell').length;
		this.swiperViewTotal = (this.swiperVerticalLen > 4) ? 4 : this.swiperVerticalLen ;	
		this.swiperSetTarget();
		this.swiperPrevTarget = this.swiperCurTarget;
		this.swiperSetIndex();
		this.swiperSetPos();
		this.autoStart();

		this.swiperCurTarget.addClass('actived').siblings().removeClass('actived');
	},
	
	// swiper vertical next
	swiperVerticalControlNext : function(){
		var posX = 0;
		
		TweenMax.killTweensOf(this.swipercurTarget);
		TweenMax.to(this.swiperCurTarget , 0.45 , {y : 10 , scale : 1.1 , alpha : 0 , ease:Quad.easeOut , onComplete : function(){
			if(live.swiperTargetList.length > 4){
				TweenMax.set(this.target , {x : 0 , y : (live.swiperViewTotal * 10) * -1 , alpha : 0 , scale : ((live.swiperViewTotal * 0.1) - 1) * -1});
				this.target.css({'z-index' : -1});
			}
		}});

		this.swiperPrevTarget = this.swiperCurTarget;
		this.swiperVerticalPrev = this.swiperVerticalCur;
		this.swiperVerticalCur = (this.swiperVerticalCur >= this.swiperVerticalLen - 1) ? 0 : this.swiperVerticalCur = this.swiperVerticalCur + 1;		
		//console.log('vPrev :: ' + (this.swiperVerticalLen - 1) + '   vCur :: ' + this.swiperVerticalCur);
		this.swiperSetTarget();
		this.swiperSetIndex();
		this.swiperSetPos();
		this.first = false;
		this.flag = false;
		this.swiperCurTarget.addClass('actived').siblings().removeClass('actived');
		
		
		setTimeout(function(){
			live.flag = true;
			//live.autoStart();
		},1400);
		
	},

	swiperSetTarget : function(){
		this.swiperCurTarget = this.swiperTargetList[this.swiperVerticalCur];
		//console.log(this.swiperTarget);
	},

	swiperSetIndex : function(){
		for(var i = 0; i < this.swiperTargetList.length; i++){
			//console.log(this.swiperTargetList.length - k);
			var index = (i - this.swiperVerticalCur < 0) ? (i - this.swiperVerticalCur) + this.swiperTargetList.length : i - this.swiperVerticalCur ;			
			this.swiperTargetList[i].attr('data-pos' , index);
		}
	},

	swiperSetPos : function(){
		for(var i = 0; i < this.swiperTargetList.length; i++){
			var realIndex = this.swiperTargetList[i].attr('data-index');
			var activeIndex = this.swiperTargetList[i].attr('data-pos');
			var item = this.swiperTargetList[i];
			var pos = {};
			pos.x = 0;
			pos.y = 0;
			pos.alpha = 0;
			pos.scale = 0;
			item.css({'z-index' : Math.abs(activeIndex - this.swiperTargetList.length)});
			if(activeIndex < this.swiperViewTotal){
				pos.x = 0;
				pos.y = (activeIndex * 10) * -1;
				pos.alpha = ((activeIndex * 0.2) - 1) * -1;
				pos.scale = ((activeIndex * 0.1) - 1) * -1;				
			} else {
				pos.x = 0;
				pos.y = (this.swiperViewTotal * 10) * -1;
				pos.alpha = 0;
				pos.scale = ((this.swiperViewTotal * 0.1) - 1) * -1;
			}
			
			if(this.swiperTargetList.length > 4){
				this.swiperPrevTarget.css({'z-index' : this.swiperTargetList.length + 1});
				if(this.swiperPrevTarget.attr('data-index') == i){

				}else{
					TweenMax.killTweensOf(item);
					TweenMax.to(item , 0.65 , {x : pos.x , y : pos.y , alpha : pos.alpha , scale : pos.scale , ease:Quad.easeOut});
				}
			}else{
				TweenMax.to(item , 0.65 , {x : pos.x , y : pos.y , alpha : pos.alpha , scale : pos.scale , ease:Quad.easeOut});
			}			

		}
	},

	autoRun : function(){
		if(live.swiperVerticalLen > 1){
			live.swiperVerticalControlNext();
		}
	},
	
	autoStockRun : function(){
		$.post("/rest/common/timeDeal","POST", JSON.stringify({ searchType : 1 }), function(data){
			if(data != null) {
				var reload = false;
				var useProductCount = 0;
				
				$.each(data.timeDealProductList, function(idx, item) {
					// 전시 제품 건수
					if(item.useYn == "Y") useProductCount++
											
					var product = $('.vertical-cell[product-no="' + item.productNo + '"]');
					if(product != undefined && product != null && product.length > 0){
						// 전시 제품의 타임딜 여부가 변경되면 reload 
						if(product.attr('data-useyn') != item.useYn) {
							reload = true;
							return false;
						}

						let product_info = product.find('.list-buy-number');
						let product_stock = product_info.find('.stock');
						let product_sold = product_info.find('.sold');
						
						product_stock.text("잔여 " + (item.stockQty - item.saleQty) + "개");
						
						//재고가 0개면 품절 / 10개 이하로 떨어지면 품절임박 출력
						if(item.stockQty - item.saleQty <= 0) {
							product_sold.text(" ");
							product_stock.text("SOLD OUT");
						} else {
							if(item.stockQty - item.saleQty <= 10 && item.stockQty - item.saleQty >= 1) {
								product_sold.text("품절임박 ");
							} else {
								product_sold.text(" ");
							}
						}
						
						//시간 변경
						if(product.attr('data-day') != item.strEndDt) {
							product.attr('data-day', item.strEndDt);
							var viewTime = "";
							var clockTime = product.attr('data-day');
							
							if(clockTime) {
								var clockParseTime = clockTime.substring(0,4)+"-"+clockTime.substring(4,6)+"-"+clockTime.substring(6,8)+" "+clockTime.substring(8,10)+":"+clockTime.substring(10,12)+":"+clockTime.substring(12,14)+".0";
								var parseTime = clockParseTime.substring(0,10)+"T"+clockParseTime.substring(11,19)+"+09:00";
								var curTime = new Date();
								var pastDate = new Date(parseTime)
								viewTime = (pastDate.getTime() / 1000) - (curTime.getTime() / 1000);
							}			
							
							var flipFlock = product.find('.live-timer-data').FlipClock( viewTime , {
								clockFace: 'DailyCounter',
								countdown : true,
								language : 'Korean',
								/* 20201118 수정 : s */
								showSeconds:true,
								/* 20201118 수정 : e */
								callbacks: {
									stop: function() {
										$('.message').html('The clock has stopped!')
									}
								}
							});
						} 						
					}
				}) //data.timeDealProductList
				
				// 전체 전시 건수 변경 체크
				if($('.vertical-cell').length != useProductCount) reload = true;
				
				if(reload) {
					//console.log('reload');
					window.location.reload();
				}
			} else {
				// data가 null 이면 메인 타임딜이 없거나 종료된 경우로 종료 처리 필요
				live.autoStop();
				$(".main-hot-deal").remove();
			}
		}, function(err){
			console.log('데이터 처리에 실패했습니다.');
		});	
	},
	
	autoStart : function(){	
		clearInterval(live.autoTimer);
		live.autoTimer = setInterval(live.autoRun , live.autoTimerDelay);
		live.autoStockTimer = setInterval(live.autoStockRun , live.autoStockTimerDelay);
	},
	
	autoStop : function(){
		clearInterval(live.autoTimer);
		clearInterval(live.autoStockTimer);
	}
}

$(function(){
	live.init();
	live.autoStockRun(); // 강제로 초기 1회 실행
});
