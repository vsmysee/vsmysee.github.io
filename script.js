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
    } else if (option instanceof Array) {
        for (var i = 0; i < option.length; i++) {
            createImg(option[i]);
        }
    }

}


var getWindowHeight = function () {
    return $(window).height();
}


var getWindowWidth = function () {
    return $(window).width();
}


var getDocumentHeight = function () {
    return $(document).height();
}


var Pop = function (cfg) {
    this.el = document.createElement("div");
    this.el.className = "pop";
    cfg.close && (this.close = cfg.close);

    this.init(cfg);
}

Pop.prototype = {

    init: function (cfg) {

        var me = this;

        me.width = cfg.w;
        me.height = cfg.h;

        me.el.style.width = cfg.w + "px";
        me.el.style.height = cfg.h + "px";

        me.el.style.marginTop = -cfg.h / 2 + "px";
        me.el.style.marginLeft = -cfg.w / 2 + "px";

        me.shadow = document.createElement("div");
        me.shadow.className = "pop_shadow";

        if (cfg.b) {
            me.shadow.style.backgroundColor = cfg.b;
            me.shadow.style.opacity = 1;
        }

        var close_tag = document.createElement("div");
        close_tag.className = "close_tag";
        me.el.appendChild(close_tag);

        me.profile_content = document.createElement("div");
        me.profile_content.className = "content";
        me.el.appendChild(me.profile_content);

        var closeFunc = function () {
            me.close();
        }

        close_tag.onclick = me.shadow.onclick = closeFunc;

        $(document).keyup(function (event) {
            if (event.keyCode == 27) {
                closeFunc();
            }
        });

        document.body.appendChild(me.shadow);
        document.body.appendChild(me.el);
    },

    close: function () {
        document.body.removeChild(this.shadow);
        document.body.removeChild(this.el);
    },

    display: function () {
        this.shadow.style.visibility = "visible";
        this.el.style.visibility = "visible";
    },

    hidden: function () {
        this.shadow.style.visibility = "hidden";
        this.el.style.visibility = "hidden";
    },

    show: function (cb) {
        //如果有显示定制，则执行传进来的函数
        cb ? cb.call(this) : this.display();
    },

    setMarginTop: function (top) {
        this.el.style.marginTop = top + "px";
    },

    getMarginTop: function () {
        return this.el.style.marginTop;
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

    var pop = new Pop({
        w: 1000,
        h: 600,
        close: function () {
            var height = this.height;
            var targetTop = -(getWindowHeight() - height) / 2 - height - height / 2 - 20;
            var root = this;
            $(this.el).stop().animate({marginTop: parseInt(targetTop)}, 400, function () {
                root.hidden();
                root.setMarginTop(-height / 2);
            });

        }
    });

    pop.setContent(document.getElementById("profile_html").innerHTML);

    new SlideBox(document.getElementById("profile_wp"));


    var showProfile = function () {
        pop.show(function () {
            var oldTop = this.getMarginTop();
            this.setMarginTop(-getWindowHeight() / 2 - this.height);
            this.display();
            $(this.el).stop().animate({marginTop: oldTop}, 800);
        });
    };

    //返回顶部
    (function () {

        if (getDocumentHeight() - getWindowHeight() < 290) {
            $("#next_page,#pre_page").css({opacity: 1});
        }

        var aboutMe = document.createElement("div"), backHome = document.createElement("div"),
            docker = document.createElement("div"), git = document.createElement("div"),
            kubernetes = document.createElement("div");

        aboutMe.id = "me";
        aboutMe.className = "me";

        backHome.id = "home"
        backHome.className = "home";

        docker.id = "docker";
        docker.className = "docker";

        git.id = "git";
        git.className = "git";

        kubernetes.id = "kubernetes";
        kubernetes.className = "kubernetes";


        document.body.appendChild(backHome);
        document.body.appendChild(aboutMe);
        document.body.appendChild(docker);
        document.body.appendChild(git);
        document.body.appendChild(kubernetes);


        aboutMe.onclick = showProfile;

        backHome.onclick = function () {
            window.location = "/";
        }

        docker.onclick = function () {
            window.location = "/blog/2019/11/29/docker-command";
        }

        git.onclick = function () {
            window.location = "/blog/2015/07/02/git-command";
        }

        kubernetes.onclick = function () {
            window.location = "/blog/2019/12/05/kubernetes-command"
        }


        if (getDocumentHeight() > getWindowHeight() + 500) {


            var toTop = document.createElement("div"),
                pot_t = 0, pot_b = 1;

            toTop.id = "to_top";
            toTop.className = "to_top";


            var toright = (getWindowWidth() - 1000) / 2 - 40 - 20;


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


    //先把个人信息图片加载一把利用浏览器缓存
    var loadMyProfileImg = function () {
        var forload = [];
        forload.push("/images/close.png");
        document.getElementById("profile_html").innerHTML.replace(/<img\s+src=[\'|\"](.*)[\'|\"]/igm, function ($, $1) {
            forload.push($1);
        });
        asyLoadImg(forload);
    }

    setTimeout(loadMyProfileImg, 5000);


})
