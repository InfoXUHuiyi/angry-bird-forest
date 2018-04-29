
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
                //32 == espace
                if (currKey == 32) {
                    if (!t._isEnd) {
                        t.jump();
                        $('audio').play();
                        $('noise').play();
                    } else {
                        window.location.reload();
                    }
                    util.preventDefaultEvent(e);
                }
                //39 == ->
                if(currKey == 39){
                    if (!t._isEnd) {
                        t.dash();
                    } 
                    util.preventDefaultEvent(e);
                }
            };
            document.onkeyup = function(e){
                $('noise').pause();
                $('noise').currentTime = 0;
            };
        },
        dash: function(){
            var t = this;
            if (t._isStart) {
                bird.dash();
                //pos.judge();
            } 
        },
        jump: function () {
            var t = this;
            if (!t._isStart) {
                $('start').style.display = 'none';
                t._createTimer(function () {
                    bird.start();                  
                    t.scroll();
                    flower.move();
                    flower.bubblefall();
                    flower.bubblerise();
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
        scroll: function () {
            var bg1 = document.getElementById('bg1');
            var bg2 = document.getElementById('bg2');
            var left1 = parseFloat(bg1.style.left,10) - option.vf/3;
            var left2 = parseFloat(bg2.style.left,10) - option.vf/3; 
            if(left1 + option.backgroundWidth <= 0){
                left1 = 0;
                left2 = option.backgroundWidth;
            }
            bg1.style.left = left1 + 'px';
            bg2.style.left = left2 + 'px';
        },
        over: function () {
            var t = this;
            clearInterval(t._timer);
            t._isEnd = true;
            $('end').style.display = 'block';
            $('over').play();
            $('audio').pause();
            $('audio').currentTime = 0;
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