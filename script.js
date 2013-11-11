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
    this.close = function () {
        document.body.removeChild(this.shadow);
        document.body.removeChild(this.box);
    };

    cfg.close && (this.close = cfg.close);

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

        if (this.cfg.b) {
            this.shadow.style.backgroundColor = this.cfg.b;
            this.shadow.style.opacity = 1;
        }

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

        this.shadow.onclick = function () {
            root.close();
        };

        $(document).keyup(function (event) {
            if (event.keyCode == 27) {
                root.close();
            }
        });

        document.body.appendChild(this.shadow);
        document.body.appendChild(this.box);
    },

    show: function (cb) {
        this.shadow.style.visibility = "visible";
        //如果有显示定制，则执行传进来的函数
        if (cb) {
            cb.call(this);
        } else {
            this.box.style.visibility = "visible";
        }

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

    //返回顶部
    (function () {

        if (getDocumentHeight() - getWindowHeight() < 290) {
            $("#next_page,#pre_page").css({opacity: 1});
        }

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


    var pop = new Pop({w: "1000", h: "600", close: function () {
        var targetTop = -(getWindowHeight() - 600) / 2 - 600 - 320;
        var root = this;
        $(this.box).stop().animate({marginTop: parseInt(targetTop)}, 400, function () {
            root.shadow.style.visibility = "hidden";
            root.box.style.visibility = "hidden";
            root.box.style.marginTop = "-300px";
        });

    }});

    pop.setContent(document.getElementById("profile_html").innerHTML);

    new SlideBox(document.getElementById("profile_wp"));


    var showProfile = function () {

        pop.show(function () {
            var targetHeight = this.box.style.marginTop;
            this.box.style.marginTop = -getWindowHeight() / 2 - this.cfg.h + "px";
            this.box.style.visibility = "visible";
            $(this.box).stop().animate({marginTop: targetHeight}, 800);

        });
    };

    if (getWindowWidth() < 1400) {
        $("#baby").css({display: "none"});
        $(".index_head").css({cursor: "pointer"});
        $(".index_head").click(showProfile);
    } else {
        $("#baby").click(showProfile);
        if (location.href.indexOf("blog") != -1) {
            $("#baby").delay(1500).animate({left: "-300px"});
        }
    }


    //给代码段加入放大图标
    (function () {
        if ($(".highlight").length != 0) {

            $(".highlight").append("<div class='codezoom'></div>");
            $(".codezoom").click(function () {
                var pop = new Pop({w: getWindowWidth() * 0.98, h: getWindowHeight() * 0.95, b: "#FFF"});
                pop.setContent("<div class='highlight pop_highlight'>" + $(this).parent().html() + "</div>");
                pop.show();
            });
        }
    })()

    //先把个人信息图片加载一把利用浏览器缓存
    var loadMyProfileImg = function () {
        var forload = [];
        forload.push("/images/slide_left.png", "/images/slide_right.png", "/images/close.png");
        document.getElementById("profile_html").innerHTML.replace(/<img\s+src=[\'|\"](.*)[\'|\"]/igm, function ($, $1) {
            forload.push($1);
        });
        asyLoadImg(forload);
    }

    setTimeout(loadMyProfileImg, 5000);


})
