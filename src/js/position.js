
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
            var t = this;

            t.birdY2 = option.backgroundHeight - bird.Y; // bird's top y
            t.birdY1 = t.birdY2 - option.birdHeight; // bird's bottom y           
            //dead if fly over the top
            if(t.birdY1<=0){
                t._dead();
            }
            
            if (flower.currentId == -1) {
                return;
            }else if(flower.currentId % 5 == 0){
                var currentPig = $('pig-' + parseInt(flower.currentId/5));   
                t.pigX1 = parseInt(currentPig.parentNode.style.left,10) + parseInt(t.flowerWrapper.style.left,10);
                t.pigX2 = t.pigX1 + option.birdWidth; // pig's right x
                t.pigY2 = option.backgroundHeight - parseInt(currentPig.style.bottom,10);
                
                  // dead after hitting boxes
                if(t.birdX2 >= (t.pigX1 + option.tolerance/2) && t.birdX1 <= t.pigX1 && t.birdY1 >= t.pigY2){
                    t._dead();
                }              
            }else{
                var currentFlower = $('flower-' + (flower.currentId - parseInt(flower.currentId/5)));   
                t.flowerX1 = parseInt(currentFlower.style.left,10) + parseInt(t.flowerWrapper.style.left,10);
                t.flowerX2 = t.flowerX1 + option.flowerWidth; // flower's right x
                t.bubbleX1 = t.flowerX1 + option.bubbleLeft;
                t.bubbleX2 = t.bubbleX1 + option.bubbleWidth; // bubble's right x

                // dead after hitting flowers
                if(t.birdX2 >= (t.flowerX1 + option.tolerance) && t.birdX1 <= (t.flowerX2 - option.tolerance)){
                    if((currentFlower.getAttribute('class') == 'topflower') && (t.birdY1 <= (option.flowerHeight - option.tolerance))){
                        t._dead();
                    }else if(t.birdY2 >= (option.backgroundHeight - option.flowerHeight + option.tolerance)){
                        t._dead();
                    }
                }
                // dead after hitting bubbles
                if(t.birdX2 >= (t.bubbleX1 + option.tolerance) && t.birdX1 <= (t.bubbleX2 - option.tolerance)){ 
                    var childs = util.getChilds(currentFlower);
                    var bubbleY1, bubbleY2;
                    if(currentFlower.getAttribute('class') == 'topflower'){ // bubbles falling
                        for (var i = 0; i < option.fallingNum; i++) {
                            bubbleY1 = parseInt(childs[i].style.top,10);
                            bubbleY2 = bubbleY1 + option.bubbleHeight;
                            if ((t.birdY1 <= (bubbleY2 - option.tolerance) && t.birdY1 >= bubbleY1) || (t.birdY2 >= (bubbleY1 + option.tolerance) && t.birdY2 <= bubbleY2)) {
                                t._dead();
                            }
                        }
                    }else{ // bubbles rising
                        for (var j = 0; j < option.risingNum; j++) {
                            bubbleY1 = option.backgroundHeight - parseInt(childs[j].style.bottom,10) - option.bubbleHeight;
                            bubbleY2 = bubbleY1 + option.bubbleHeight;
                            if ((t.birdY1 <= (bubbleY2 - option.tolerance) && t.birdY1 >= bubbleY1) || (t.birdY2 >= (bubbleY1 + option.tolerance) && t.birdY2 <= bubbleY2)) {
                                t._dead();
                            }
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