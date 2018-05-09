﻿
var flappy = (function (self) {
    'use strict';

    var option = self.option,
        $ = self.util.$;

    //bird
    self.bird = {
        Y: 0, //current position of bird(bottom)
        left: 0,
        liveNb: 3,
        init: function (overCallback, controller) {
            var t = this;

            t.s = 0; //displacement
            t.time = 0; //flying time
            t.$bird = $('bird');
            t.$bird.style.left = option.birdLeft + 'px';
            t._controller = controller;

            t._addListener(overCallback);
        },
        //keyboard listener
        _addListener: function (overCallback) {
            this._overCallback = overCallback;
        },
        restart: function(){
            var t = this;

            option.birdY = 300;
            if(t.liveNb == 2){
                t.$bird.style.backgroundImage = "url(./img/bird2.png)";
            }
            if(t.liveNb == 1){
                t.$bird.style.backgroundImage = "url(./img/bird7.png)";
            }
            t.start();
        },
        //start
        start: function () {
            var t = this,
                interval = option.frequency / 1000;

            t.s = option.v0 * t.time - t.time * t.time * option.g * 2; //竖直上抛运动公式
            t.Y = option.birdY + t.s;
            $('bird').style.left = option.birdLeft + t.left + 'px';
            if (t.Y >= option.floorHeight) {
                t.$bird.style.bottom = t.Y + 'px';
            } else {
                t._dead();
            }
            t.time += interval;
        },
        //jump
        jump: function () {
            var t = this;

            option.birdY = parseInt(t.$bird.style.bottom, 10);
            t.s = 0;
            t.time = 0;
            if(t.left!=0){
                t.left=0;
            }
        },
        // dead after hitting
        _dead: function () {
            this._overCallback.call(this._controller);
        },
        // falling on the floor
        fall: function () {
            var t = this;

            t.Y = option.floorHeight;
            t.$bird.style.bottom = t.Y + 'px';
        },
        hit: function () {
            var t = this;

            var timer = setInterval(function () {
                t.$bird.style.bottom = t.Y + 'px';
                if (t.Y <= option.floorHeight) {
                    clearInterval(timer);
                }
                t.Y -= 12;
            }, option.frequency);
        }
    };

    return self;

})(flappy || {});