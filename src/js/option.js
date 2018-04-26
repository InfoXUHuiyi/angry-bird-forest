﻿
var flappy = (function (self) {
    'use strict';

    // setting
    self.option = {
        //重力加速度，屏幕像素和实际物理上的米有差别，所以存在换算
        g: 400,
        //跳跃的初速度，控制猪的弹跳力
        v0: 400,
        // flowers moving speed
        vf: 2.5,
        //频率，控制动画帧数，默认20ms
        frequency: 20,
        //关卡数
        levels: 100,
        //开头的空白距离
        safeLift: 500,

        //地板高度（和图片有关）
        floorHeight: 64,

        //猪的宽度
        birdWidth: 33,
        //猪的高度
        birdHeight: 30,
        //猪当前高度
        birdY: 300,
        //猪距离左边的距离,
        birdLeft: 80,

        // flowerHtml
        //flowerHtml: '<div class="top"></div><div class="bottom"></div>',
        flowerWidth: 60,

        //柱子上下间隔高度
        //flowerGapY: 300,
        //柱子左右间隔宽度
        flowerGapX: 200,

        //上柱子的基础定位值（就是top值，和css写法有关）
        flowerTop: -50,
        //下柱子的基础定位值
        //flowerBottom: -50
    };

    return self;

})(flappy || {});