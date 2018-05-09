
var flappy = (function (self) {
    'use strict';

    var option = self.option,
        util = self.util,
        $ = util.$;

    //flower
    self.flower = {
        currentId: -1, // current flower id
        init: function () {
            var t = this;

            //缓存上下柱子位置的换算因子
            //t._factor = option.flowerBottom - option.flowerGapY + 450;

            //s表示一个位置，到达这个位置的柱子就是“当前的柱子”，就算是靠近猪了，开始计算猪有没有撞到这根柱子，10是提前量。
            t._s = option.birdLeft + option.birdWidth + 10;

            t._render();
        },
        // add flowers to DOM
        _render: function () {
            var t = this,
                initleft = option.safeLift;

            t.left = 0;
            t.dom = document.createElement('div');

            t.dom.className = t.dom.id = 'flowerWrapper';

            for (var i = 0, j = option.levels; i < j; i++) {
                var el = document.createElement('div');
                
                if (i%5 == 0){                                            
                    var n= Math.floor(Math.random()*4) + 3;
                    el.className = 'boxes';
                    for(var m = 0; m < n; m++){
                        if(m == n - 1){
                            var pig = document.createElement('div');
                            pig.className = 'pig';
                            pig.style.bottom = option.boxHeight*m + 'px';
                            pig.id= 'pig-' + parseInt(i/5);
                            el.appendChild(pig);                      
                        }else{
                            var box = document.createElement('div');
                            box.className = 'box';
                            box.style.bottom = option.boxHeight*m + 'px';
                            box.id = 'box-' + parseInt(i/5) + m;
                            el.appendChild(box);                             
                        }
                    }    
                    
                }else{
                    el.id = 'flower-' + (i - parseInt(i/5));
                    if(i % 3 == 0){
                        el.className = 'topflower';
                        var initTop = option.flowerHeight - option.bubbleHeight/2;
                        for(var n = 0; n < option.fallingNum; n++){
                            var child = document.createElement('div');
                            child.id = 'bubble-' + i + n;
                            child.className = 'bubbledown';
                            child.style.top = initTop + 'px';
                            child.style.visibility = 'hidden';
                            el.appendChild(child);
                            initTop += option.bubbleGapY;

                        }
                    }
                    else{
                        el.className = 'bottomflower';
                        var initBottom = option.flowerHeight - option.bubbleHeight/2;
                        for(var n = 0; n < option.risingNum; n++) {
                            var child = document.createElement('div');
                            child.id = 'bubble-' + i + n;
                            child.className = 'bubbleup';
                            child.style.bottom = initBottom + 'px';
                            child.style.visibility = 'hidden';
                            el.appendChild(child);
                            initBottom += option.bubbleGapY + option.bubbleHeight*2;   

                        }
                    }
                }
             
                el.style.left = initleft + 'px';
                var childs = util.getChilds(el),
                    //topEl = childs[0],
                    //bottomEl = childs[1],
                    pos = t._random(i);

                t.dom.appendChild(el);
                initleft += option.flowerGapX;
            }
            $('screen').appendChild(t.dom);
        },
        // calculate flowers (x,y)
        _random: function (i) {
            var t = this,
                x = Math.random(),
                h = Math.abs(Math.sin((i+1) * x)) * 290;

            return {
                //top: option.flowerTop + h,
                bottom: t._factor - h
            };
        },
        // flowers moving
        move: function () {
            var t = this;

            t.dom.style.left = -t.left + 'px';
            t._find(t.left);

            t.left += option.vf;
        },
        // bubbles rising
        bubblefall: function () {
            var bubbles = document.getElementsByClassName('bubbledown');
            for(var i = 0; i < bubbles.length; i++){
                var tmp = parseInt(bubbles[i].style.top,10) + option.vb;               
                if(i == 0){
                    bubbles[i].style.visibility = 'visible';
                }
                if(tmp >= option.backgroundHeight){
                    tmp = option.flowerHeight;
                    bubbles[i].style.visibility = 'visible';
                }
                bubbles[i].style.top = tmp + 'px';
            }
        },
        // bubbles rising
        bubblerise: function () {       
            var bubbles = document.getElementsByClassName('bubbleup');
            for(var i = 0; i < bubbles.length; i++){
                var tmp = parseInt(bubbles[i].style.bottom,10) + option.vb;               
                if(i == 0){
                    bubbles[i].style.visibility = 'visible';
                }
                if(tmp >= option.backgroundHeight){
                    tmp = option.flowerHeight;
                    bubbles[i].style.visibility = 'visible';
                }                           
                bubbles[i].style.bottom = tmp + 'px';
            }           
        },
        // find current flower
        _find: function (l) {
            var t = this,
                x = (t._s + l - option.safeLift) / option.flowerGapX,
                intX = parseInt(x,10); // intX is current flower

            if (x > 0 && t.currentId != intX && Math.abs(x - intX) < 0.1) {
                t.currentId = intX;
            }
        },
        restart: function () {
            var t = this;
            
            document.getElementById('bg1').style.left = 0 + 'px';
            document.getElementById('bg2').style.left = option.backgroundWidth + 'px';
            
            var child = document.getElementById('flowerWrapper');
            document.getElementById("screen").removeChild(child);
            t.currentId = -1;
            t.init();
        }
    };

    return self;

})(flappy || {});