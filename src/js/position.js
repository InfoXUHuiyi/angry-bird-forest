
var flappy = (function (self) {
    'use strict';

    var bird = self.bird,
        flower = self.flower,
        option = self.option,
        $ = self.util.$;

    self.position = {
        init: function (overCallback, controller) {
            var t = this;

            t.flowerWrapper = $('flowerWrapper');
            
            t.birdX1 = option.birdLeft,
            t.birdX2 = option.birdLeft + option.birdWidth, //猪的左右位置，固定的

            t._controller = controller;
            t._addListener(overCallback);
        },

        _addListener: function (overCallback) {
            this._overCallback = overCallback;
        },
        judge: function () {
            var t = this,
                currentFlower = $('flower-' + flower.currentId);

            if (flower.currentId == -1) {
                return;
            }

            t.birdY2 = 600 - bird.Y;
            t.birdY1 = t.birdY2 - option.birdHeight; //猪的上下位置
            t.pY1 = currentFlower.getAttribute('top');
            t.pY2 = currentFlower.getAttribute('bottom');
            t.pX1 = parseInt(currentFlower.style.left,10) + parseInt(t.flowerWrapper.style.left,10);
            t.pX2 = t.pX1 + option.flowerWidth; //柱子的上下左右位置

            if (option.birdLeft + option.birdWidth >= t.pX1 && option.birdLeft <= t.pX2) {
                if (t.birdY1 < t.pY1 || t.birdY2 > t.pY2) {
                    t._dead();
                }
            }
        },
        //撞到柱子时触发
        _dead: function () {
            this._overCallback.call(this._controller);
        }
    };

    return self;

})(flappy || {});