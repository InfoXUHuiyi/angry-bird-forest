
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
            t._factor = option.flowerBottom - option.flowerGapY + 450;
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

                if(i % 3 == 0){
                    el.className = 'topflower';

                    var inittop = option.bubbleTop;
                    for(var n = 0; n < 5; n++){
                        var child = document.createElement('div');
                        child.id = 'bubble-' + i + n;
                        child.className = 'bubbledown';
                        child.style.top = inittop + 'px';
                        child.style.left = option.bubbleLeft + 'px';
                        el.appendChild(child);
                        inittop += option.bubbleGapY;
                    }
                }
                else{
                    el.className = 'bottomflower';

                    var initbottom = option.bubbleBottom;
                    for(var n = 0; n < 5; n++) {
                        var child = document.createElement('div');
                        child.id = 'bubble-' + i + n;
                        child.className = 'bubbleup';
                        child.style.bottom = initbottom + 'px';
                        child.style.left = option.bubbleLeft + 'px';
                        el.appendChild(child);
                        initbottom += option.bubbleGapY*2;
                    }
                }

                el.id = 'flower-' + i;
                el.style.left = initleft + 'px';

                var childs = util.getChilds(el),
                    //topEl = childs[0],
                    //bottomEl = childs[1],
                    pos = t._random(i);

                //topEl.style.top = pos.top + 'px';
                //bottomEl.style.bottom = pos.bottom + 'px';

                //el.setAttribute('top', 600 + pos.top);
                //el.setAttribute('bottom', 0 - pos.bottom);

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
                top: option.flowerTop + h,
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
        // find current flower
        _find: function (l) {
            var t = this,
                x = (t._s + l - option.safeLift) / option.flowerGapX,
                intX = parseInt(x,10); // intX is current flower

            if (x > 0 && t.currentId != intX && Math.abs(x - intX) < 0.1) {
                t.currentId = intX;
            }
        }
    };

    return self;

})(flappy || {});