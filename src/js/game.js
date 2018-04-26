
var flappy = (function (self) {
    'use strict';

    var controller = self.controller,
        option = self.option,
        bird = self.bird,
        flower = self.flower,
        pos = self.position,
        util = self.util,
        $ = self.util.$;

    // game start
    self.game = {
        init: function () {
            var t = this;

            t._isStart = false;
            t._isEnd = false;
            t._timer = null;

            bird.init(t.fall, t);
            flower.init();
            pos.init(t.hit, t);

            t.addKeyListener();
        },
        addKeyListener: function () {
            var t = this;
            document.onkeydown = function (e) {
                e = e || event;
                var currKey = e.keyCode || e.which || e.charCode;
                if (currKey == 32) {
                    if (!t._isEnd) {
                        t.jump();
                    } else {
                        window.location.reload();
                    }
                    util.preventDefaultEvent(e);
                }
            };
        },
        jump: function () {
            var t = this;
            if (!t._isStart) {
                $('start').style.display = 'none';
                t._createTimer(function () {
                    bird.start();
                    flower.move();
                    pos.judge();
                    $('score').innerHTML = flower.currentId + 1;
                });
                t._isStart = true;
            } else {
                bird.jump();
            }
        },
        hit: function () {
            var t = this;

            t.over();
            bird.hit();
        },
        fall: function () {
            var t = this;

            t.over();
            bird.fall();
        },
        over: function () {
            var t = this;
            clearInterval(t._timer);
            t._isEnd = true;
            $('end').style.display = 'block';
        },
        _createTimer: function (fn) {
            var t = this;

            t._timer = setInterval(fn, option.frequency);
        }
    };

    flappy.init = function () {
        self.game.init();
    };

    return self;

})(flappy || {});