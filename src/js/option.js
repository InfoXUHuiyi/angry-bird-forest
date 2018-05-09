
var flappy = (function (self) {
    'use strict';

    // setting
    self.option = {
        //重力加速度，屏幕像素和实际物理上的米有差别，所以存在换算
        g: 400,
        //跳跃的初速度，控制猪的弹跳力
        v0: 400,
        // flowers moving speed
        vf: 2,
        vb: 1,
        //频率，控制动画帧数，默认20ms
        frequency: 20,
        //关卡数
        levels: 100,
        //开头的空白距离
        safeLift: 500,

        backgroundHeight: 500,
        backgroundWidth: 1000,
        //地板高度（和图片有关）
        floorHeight: 0,

        //猪的宽度
        birdWidth: 33,
        //猪的高度
        birdHeight: 30,
        //猪当前高度
        birdY: 300,
        //猪距离左边的距离,
        birdLeft: 80,

        // judge hitting tolerance
        tolerance: 10,
        flowerWidth: 60,
        flowerHeight: 125,
        // gap between two flowers
        flowerGapX: 250,
        fallingNum: 2,
        risingNum: 3,
        bubbleWidth: 50,
        bubbleHeight: 50,
        bubbleGapY: 150,
        bubbleLeft: 20,
        boxHeight: 55,
        boxWidth: 55
    };

    return self;

})(flappy || {});