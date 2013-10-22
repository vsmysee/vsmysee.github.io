//动态修改头的文字内容
var modifySentence = function () {
    var randomItem = dataArray[Math.floor(Math.random() * dataArray.length)],
        that = $('.theme_topic .sentence_current'),
        next = that.siblings('p').eq(0);

    that.slideUp(400, function () {
        $(this).removeClass('sentence_current');
    });

    next.html(randomItem).slideDown(600, function () {
        $(this).addClass('sentence_current');
    });

}

//无节操函数
var fuckScreen = function () {
    $("#next_page").animate({
        right: "40px",
        opacity: 1
    }, function () {
        $(this).animate({right: "10px", opacity: 0.2});
    });
    $("#pre_page").animate({
        left: "40px",
        opacity: 1
    }, function () {
        $(this).animate({left: "10px", opacity: 0.2});
    });
}


var Pop = function () {
    this.box = document.createElement("div");
    this.box.id = "pop";
    this.box.className = "pop";
    this.initChild();
}


Pop.prototype = {

    initChild: function () {
        this.shadow = document.createElement("div");
        this.shadow.className = "pop_shadow";


        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        this.box.appendChild(wrapper);


        var close_tag = document.createElement("div");
        close_tag.className = "close_tag";
        wrapper.appendChild(close_tag);

        this.profile_content = document.createElement("div");
        this.profile_content.className = "content";
        wrapper.appendChild(this.profile_content);

        var root = this;
        close_tag.onclick = function () {
            root.close();
        };
    },

    show: function () {
        document.body.appendChild(this.shadow);
        document.body.appendChild(this.box);
    },

    close: function () {
        document.body.removeChild(this.box);
        document.body.removeChild(this.shadow);
    },

    setContent: function (text) {
        this.profile_content.innerHTML = text;
    }
};


var SlideBox = function (obj) {
    this.obj = obj;
    this.pot = 0;
    this.num = $(this.obj).find(".frame").length;
    this.frameWidth = $(this.obj).find(".frame:eq(0)").width();
    this.init();

    $(".profile").css("width", this.num * 1000);
}

SlideBox.prototype = {

    init: function () {
        this.createArrow();
        this.bindEvent();
    },

    createArrow: function () {
        this.pre = document.createElement("div");
        this.pre.className = "slide_pre";

        this.next = document.createElement("div");
        this.next.className = "slide_next";

        this.obj.appendChild(this.pre);
        this.obj.appendChild(this.next);
    },

    bindEvent: function () {
        var root = this;
        this.next.onclick = function () {
            root.pot++;
            root.fixPot();
            root.animate();
        };
        this.pre.onclick = function () {
            root.pot--;
            root.fixPot();
            root.animate();
        };
    },


    animate: function () {
        $(this.obj).find("ul").stop().animate({'left': -this.frameWidth * this.pot})
    },


    fixPot: function () {
        if (this.pot > this.num - 1) {
            this.pot = 0;
        }

        if (this.pot == -1) {
            this.pot = this.num - 1;
        }
    }
}


$(function () {

    $('.sentence_current').html(dataArray[Math.floor(Math.random() * dataArray.length)]);

    setInterval(modifySentence, 20 * 1000);

    //头部效果
    $("#arrow_panel").bind("click", function () {
        $("#head_section").slideToggle();
        $(this).toggleClass("hover");
    });

    //返回顶部
    (function () {
        var domHeight = $(document).height(),
            winWidth = $(window).width(),
            winHeight = $(window).height();

        if (domHeight > winHeight + 500) {
            var toTop = document.createElement("div"),
                pot_t = 0,
                pot_b = 1;

            toTop.id = "to_top";
            toTop.className = "to_top";
            var toright = (winWidth - 1000) / 2 - 40 - 10;

            $(window).bind("scroll.toTop", function () {
                var scrollTop = $(document).scrollTop();
                if (scrollTop > 290 && pot_t == 0) {
                    $(toTop).stop().animate({"right": toright, "opacity": "1"}, 200);

                    fuckScreen();

                    pot_t = 1;
                    pot_b = 0;
                } else if (scrollTop < 290 && pot_b == 0) {
                    $(toTop).stop().animate({"right": "-60px", "opacity": "0"}, 200);
                    pot_t = 0;
                    pot_b = 1;
                }
            });

            document.body.appendChild(toTop);
            toTop.onclick = function () {
                $("html,body").animate({scrollTop: 0}, 500);
            };
        }

    })();


    $("#photo_container").click(function () {
        var pop = new Pop();
        pop.setContent(document.getElementById("profile_html").innerHTML);
        pop.show();
        var slideBox = new SlideBox(document.getElementById("profile_wp"));
    });


})


