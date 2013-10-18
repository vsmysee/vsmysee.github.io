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
    this.init();
}


Pop.prototype = {

    init: function () {
        this.box.id = "profile_pop";
        this.box.className = "profile_pop";

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
            scrollTop = $(document).scrollTop(),
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


    var profile_one_frame =
        '<div class="contact fl">' +
            '<h2><a href="http://weibo.com/u/1894517483">我的微博</a></h2>' +
            '<h2><a href="https://github.com/oojdon">我的github</a></h2>' +
            '</div>' +
            '<div class="profile_img fr"><img src="/images/me.png"/></div>';


    $("#photo_container").click(function () {
        var profile_pop = new Pop();
        profile_pop.setContent(profile_one_frame);
        profile_pop.show();
    });

})


