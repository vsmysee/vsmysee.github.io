
//动态修改头的文字内容
var modifySentence = function() {
  var randomItem = dataArray[Math.floor(Math.random()*dataArray.length)],
      that = $('.theme-topic .sentence_current'),
      next = that.siblings('p').eq(0);

  that.slideUp(400, function(){
     $(this).removeClass('sentence_current');
  });

  next.html(randomItem).slideDown(600, function(){
     $(this).addClass('sentence_current');
  });

}

$(function () {

    $('.sentence_current').html(dataArray[0]); 
	
    setInterval(modifySentence,5000); 

	//头部效果
    $("#arrow_panel").bind("click", function () {
        $("#head_section").slideToggle();
        $(this).toggleClass("hover");
    });

    //返回顶部
	(function(){
		var domHeight = $(document).height(),
			scrollTop = $(document).scrollTop(),
			winWidth = $(window).width(),
			winHeight = $(window).height(); 

		if (domHeight>winHeight+500){
			var toTop = document.createElement("div"),
				pot_t=0,
				pot_b=1;
			
			toTop.id = "to-top";	
			toTop.className = "to-top";
			var toright=(winWidth-1000)/2-40-10;
			
			$(window).bind("scroll.toTop", function(){
				var scrollTop = $(document).scrollTop();
					if(scrollTop>290&&pot_t==0){
						$(toTop).stop().animate({"right":toright,"opacity":"1"},200);
						pot_t=1;
						pot_b=0;
					}else if(scrollTop<290&&pot_b==0){
						$(toTop).stop().animate({"right":"-60px","opacity":"0"},200);
						pot_t=0;
						pot_b=1;
					}
			});
			
			document.body.appendChild(toTop);
			toTop.onclick = function(){
				$("html,body").animate({scrollTop: 0}, 500);
			};
		}
			
	})();

})


