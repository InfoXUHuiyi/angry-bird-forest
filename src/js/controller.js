
var flappy = (function (self) {
    'use strict';

    var bird = self.bird,
        flower = self.flower,
        pos = self.position,
        util = self.util,
        $ = util.$,
        option = self.option;

    //controller
    self.controller = {
        init: function () {
            var t = this;

            t._isStart = false;
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
                        if(t.chance){
                            t.refresh();
                        }
                    }else {
                        window.location.reload();
                    }
                    util.preventDefaultEvent(e);
                }
            };
        },
        jump: function () {
            var t = this;
            if (!t._isStart) {
                $('begin').style.display = 'none';
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
//            scoreList.push(flower.currentId + 1);
            clearInterval(t._timer);
            t.chance = true;
            $('chance').style.display = 'block';

            $('over').play();
            $('audio').pause();
            $('audio').currentTime = 0;

            bird.liveNb--;
            $('life').innerHTML = "chance:" + bird.liveNb;
            
            if(bird.liveNb==0){
                t._isEnd = true;
                $('chance').style.display = 'none';
                $('end').style.display = 'block';
            }
        },
        _createTimer: function (fn) {
            var t = this;

            t._timer = setInterval(fn, option.frequency);
        }
    };

    return self;

})(flappy || {});