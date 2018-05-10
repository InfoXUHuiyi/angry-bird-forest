
var flappy = (function (self) {
    'use strict';

    var controller = self.controller,
        option = self.option,
        bird = self.bird,
        flower = self.flower,
        pos = self.position,
        util = self.util,
        $ = self.util.$;

    var scoreList = new Array();

    // game start
    self.game = {
        init: function () {
            var t = this;

            t._isStart = false;
            t._isEnd = false;
            t._timer = null;
            t.chance = false;

            bird.init(t.fall, t);
            flower.init();
            pos.init(t.hit, t);

            t.addKeyListener();
        },
        addKeyListener: function () {
            var t = this;
        
            // var sound = new Howl({
            //     src: ['../media/bird.noise.mp3']
            // });

            document.onkeydown = function (e) {
                e = e || event;
                var currKey = e.keyCode || e.which || e.charCode;
                //32 == espace
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
            document.onkeyup = function(e){
               $('noise').pause();
                $('noise').currentTime = 0;
                // noise.stop();
                // noise.seek(0);
            };
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
                    //score bar
                    var scores = flower.currentId + 1;
                    var allScores = scores + pos.pigScore;
                    var higher_score = 0;
                    $('score').innerHTML = "score:" + allScores;

                    if(scoreList.length != 0){
                        for(var s in scoreList){
                            higher_score = Math.max(scoreList[s],higher_score);                           
                        }
                        higher_score = Math.max(higher_score,allScores);

                        $('higher_score').innerHTML = "higher_score:" + higher_score;
                    }
                    else{
                        higher_score = allScores;
                        $('higher_score').innerHTML = "higher_score:" + higher_score;
                    }
                });
                t._isStart = true;
                $('audio').play();
                $('noise').play();
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
        refresh: function() {
            var t = this;

            clearInterval(t._timer);
            $('chance').style.display = 'none';
            t._isStart = false;
            t._isEnd = false;
            bird.restart();
            flower.restart();
            pos.init(t.hit, t);
            $('start').style.display = 'block';
            t.chance = false;
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
            
            scoreList.push((flower.currentId + 1) + pos.pigScore);
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

    flappy.init = function () {
        self.game.init();
    };

    return self;

})(flappy || {});