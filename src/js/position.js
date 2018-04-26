
var flappy = (function (self) {
    'use strict';

    var pig = self.pig,
        flower = self.flower,
        option = self.option,
        $ = self.util.$;

    self.position = {
        init: function (overCallback, controller) {
            var t = this;

            t.flowerWrapper = $('flowerWrapper');
            
            t.pigX1 = option.pigLeft,
            t.pigX2 = option.pigLeft + option.pigWidth, //猪的左右位置，固定的

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

            t.pigY2 = 600 - pig.Y;
            t.pigY1 = t.pigY2 - option.pigHeight; //猪的上下位置
            t.pY1 = currentFlower.getAttribute('top');
            t.pY2 = currentFlower.getAttribute('bottom');
            t.pX1 = parseInt(currentFlower.style.left,10) + parseInt(t.flowerWrapper.style.left,10);
            t.pX2 = t.pX1 + option.flowerWidth; //柱子的上下左右位置

            if (option.pigLeft + option.pigWidth >= t.pX1 && option.pigLeft <= t.pX2) {
                if (t.pigY1 < t.pY1 || t.pigY2 > t.pY2) {
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