/**
 这是我要实现的表达我自己对编程认识的js工具库，loof是逻辑，面向对象，函数的缩写，这个库需要充分表达我对这三点的理解
 */

Loof = {};


//属性赋值
Loof.apply = function (o, c) {
    for (var p in c) {
        o[p] = c[p];
    }
}

//类生产
Class = function () {

}

Fx = {};

//动画引擎
Fx.Engine = new function () {

    //闭包变量，引擎的运行线程，动画队列和动画数量
    var me = this, thread = null, queue = [], count = 0;

    Loof.apply(me, {

        //每帧间隔时间为1毫秒，也就是千分之一秒
        delay: 1,

        add: function (anim) {
            queue.push(anim);
            count++;
        },

        remove: function (anim) {
            count--;
            for (var i = 0; i < queue.length; i++) {
                if (queue[i] === anim) {
                    queue.splice(i, 1);
                }
            }
            if (count <= 0) {
                me.stop();
            }
        },

        stop: function () {
            clearInterval(thread);
            queue = [];
            thread = null;
            count = 0;
        },

        start: function () {
            if (thread === null) {
                thread = setInterval(me.run, me.delay);
            }
        },

        //引擎会在每一个时间片执行这个函数
        run: function () {
            for (var i = 0; i < queue.length; i++) {
                var anim = queue[i];
                if (anim.on()) {
                } else {
                    me.remove(anim);
                }
            }
        }
    });


};

Fx.Easing = {
    easeNone: function (t, b, c, d) {
        return c * t / d + b;
    }
}

//动画抽象，每个动画必须提供所代理的dom和动画的样式，动画持续时间，和动画轨迹的物理算法
Fx.BaseAnimate = function (el, attr, dur, math) {
    this.el = el;
    this.math = math;
    this.curFrame = 0;
    this.totalFrames = 1000 * dur;
    this.attributes = attr;
}

Fx.BaseAnimate.prototype.css = function (attr, val) {
    var style = this.el.style;
    style[attr] = val + "px";
}

Fx.BaseAnimate.prototype.on = function () {
    if (this.curFrame >= this.totalFrames) {
        return false;
    }
    this.curFrame++;
    for (var attr in this.attributes) {
        var animP = this.attributes[attr];
        var move = this.math(this.curFrame, animP.from, animP.to - animP.from, this.totalFrames);
        this.css(attr, move)
    }
    return true;
}