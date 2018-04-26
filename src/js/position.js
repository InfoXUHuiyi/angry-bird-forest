
var flappy = (function (self) {
    'use strict';

    var bird = self.bird,
        flower = self.flower,
        option = self.option,
        util = self.util,
        $ = self.util.$;

    self.position = {
        init: function (overCallback, controller) {
            var t = this;

            t.flowerWrapper = $('flowerWrapper');
            
            t.birdX1 = option.birdLeft, // bird's left x
            t.birdX2 = option.birdLeft + option.birdWidth,  // bird's right x

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

            t.birdY2 = option.backgroundHeight - bird.Y; // bird's top y
            t.birdY1 = t.birdY2 - option.birdHeight; // bird's bottom y


            //t.pY1 = currentFlower.getAttribute('top');
            //t.pY2 = currentFlower.getAttribute('bottom');


            /*t.bubbleX1 = parseInt(currentFlower.style.left,10) + parseInt(t.flowerWrapper.style.left,10);
            t.bubbleX2 = t.bubbleX1 + option.flowerWidth; // flower's right x

            if (option.birdLeft + option.birdWidth >= t.bubbleX1 && option.birdLeft <= t.bubbleX2) {
                var childs = util.getChilds(currentFlower);
                for (var i = 0; i < 5; i++) {
                    t.bubbleY1 = childs[i].getAttribute('bottom') + option.bubbleHeight;
                    t.bubbleY2 = childs[i].getAttribute('bottom');
                    if (t.birdY1 <  bubbleY1 && t.birdY2 >  bubbleY2) {
                        t._dead();
                    }
                }
            }*/

            t.bubbleX1 = parseInt(currentFlower.style.left,10) + parseInt(t.flowerWrapper.style.left,10) + 25;
            t.bubbleX2 = t.bubbleX1 + option.bubbleWidth; // flower's right x
            if(option.birdLeft + option.birdWidth >= t.bubbleX1 && option.birdLeft <= t.bubbleX2){
                var childs = util.getChilds(currentFlower);
                var bubbleY1, bubbleY2;
                if(currentFlower.getAttribute('class') == 'topflower'){

                    for (var i = 0; i < 5; i++) {
                        bubbleY1 = parseInt(childs[i].style.top,10) + i*option.bubbleHeight;
                        bubbleY2 = bubbleY1 + option.bubbleHeight;
                        if ((t.birdY1 < bubbleY2 && t.birdY1 > bubbleY1) || (t.birdY2 >  bubbleY1 && t.birdY2 < bubbleY2)) {
                            t._dead();
                        }
                    }
                }else{
                    for (var j = 0; j < 5; j++) {
                        bubbleY1 = option.backgroundHeight - parseInt(childs[j].style.bottom,10) - option.flowerHeight +  j*option.bubbleHeight;
                        bubbleY2 = bubbleY1 + option.bubbleHeight;
                        if ((t.birdY1 < bubbleY2 && t.birdY1 > bubbleY1) || (t.birdY2 >  bubbleY1 && t.birdY2 < bubbleY2)) {
                            t._dead();
                        }
                    }
                }

            }
        },
        // dead after hit
        _dead: function () {
            this._overCallback.call(this._controller);
        }
    };

    return self;

})(flappy || {});