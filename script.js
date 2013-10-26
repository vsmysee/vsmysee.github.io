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
        $(this).animate({right: "10px"});
    });
    $("#pre_page").animate({
        left: "40px",
        opacity: 1
    }, function () {
        $(this).animate({left: "10px"});
    });
}

//收起头部
var slideSection = function () {
    $("#head_section").slideToggle();
    $("#head_top").slideToggle();
    $(this).toggleClass("hover");
};

//执行图片加载
var asyLoadImg = function (option) {

    function createImg(url) {
        new Image().src = url;
    }

    if (typeof option == "String") {
        createImg(option);
    } else if (option instanceof  Array) {
        for (var i = 0; i < option.length; i++) {
            createImg(option[i]);
        }
    }

}


var getWindowHeight = function () {
    return $(window).height();
};


var getWindowWidth = function () {
    return $(window).width();
};

var getDocumentHeight = function () {
    return $(document).height();
}


var Pop = function (cfg) {
    this.box = document.createElement("div");
    this.box.className = "pop";
    this.cfg = cfg;
    this.init();
}


Pop.prototype = {

    init: function () {
        this.box.style.width = this.cfg.w + "px";
        this.box.style.height = this.cfg.h + "px";

        this.box.style.marginTop = -this.cfg.h / 2 + "px";
        this.box.style.marginLeft = -this.cfg.w / 2 + "px";

        this.shadow = document.createElement("div");
        this.shadow.className = "pop_shadow";

        var close_tag = document.createElement("div");
        close_tag.className = "close_tag";
        this.box.appendChild(close_tag);

        this.profile_content = document.createElement("div");
        this.profile_content.className = "content";
        this.box.appendChild(this.profile_content);

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
    $("#arrow_panel").bind("click", slideSection);

    //返回顶部
    (function () {

        if (getDocumentHeight() > getWindowHeight() + 500) {
            var toTop = document.createElement("div"),
                pot_t = 0,
                pot_b = 1;

            toTop.id = "to_top";
            toTop.className = "to_top";
            var toright = (getWindowWidth() - 1000) / 2 - 40 - 10;

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

                    $("#next_page,#pre_page").animate({opacity: 0.01});

                }
            });

            document.body.appendChild(toTop);
            toTop.onclick = function () {
                $("html,body").animate({scrollTop: 0}, 500);
            };
        }

    })();


    $("#photo_container").click(function () {
        var pop = new Pop({w: "1000", h: "600"});
        pop.setContent(document.getElementById("profile_html").innerHTML);
        pop.show();
        new SlideBox(document.getElementById("profile_wp"));
    });


    //非首页执行折叠
    setTimeout(function () {
        if (location.href.indexOf("blog") != -1) {
            slideSection.call($("#arrow_panel"));
        }
    }, 1000);


    //给代码段加入放大图标
    (function () {
        if ($(".highlight").length != 0) {

            $(".highlight").append("<div class='codezoom'></div>");
            $(".codezoom").click(function () {
                var codeHeight = $(this).parent().height();
                var popHeight = getWindowHeight() * 0.8;
                if (codeHeight <= popHeight) {
                    popHeight = codeHeight + 20;
                }
                var pop = new Pop({w: getWindowWidth() * 0.8, h: popHeight });
                pop.setContent("<div class='highlight pop_highlight'>" + $(this).parent().html() + "</div>");
                pop.show();
            });
        }
    })()


    //先把个人信息图片加载一把利用浏览器缓存
    var loadMyProfileImg = function () {
        var forload = [];
        document.getElementById("profile_html").innerHTML.replace(/<img\s+src=[\'|\"](.*)[\'|\"]/igm, function ($, $1) {
            forload.push($1);
        });
        forload.push("/images/slide_left.png", "/images/slide_right.png", "/images/close.png");
        asyLoadImg(forload);
    }

    setTimeout(loadMyProfileImg, 5000);


})
