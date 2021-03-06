window.onload = init;

let canvas, ctx;
let birdXinit, birdYinit;
let initPosFlow, initPosBub, initPosPigx, initPosPigy;
let flowHeight;
let bottom_flowers = [];
let top_flowers = [];
let bottom_bubbles = [];
let top_bubbles = [];
let pigs = [];
let score = 0;
let chance = 3;
let level = 1;
let imageObj = new Image();
let imageBird = new Image();
let birdVmax = 25;
let birdX, birdY, birdWidth, birdHeight;
let tolerance = 8;
let imageTop = new Image();
let imageBottom = new Image();
let imageUp = new Image();
let imageDown = new Image();
let imagePig = new Image();
let bgMusic, birdSound, scoreSound, winSound;
let start = 'false';
let gapWidth = 200;
let gapTopBottom = 100;
let ratio;
let audioContext;
let analyser;
let browser = 'other';

function init() {
    console.log("page chargee");

    bgMusic = document.querySelector("#audioBackground");
    birdSound = document.querySelector("#audioBird");
    scoreSound = document.querySelector("#audioscore");
    winSound = document.querySelector("#audiowin");

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    optimizeDisplay();

    imageObj.src = "img/background.jpg";

    //bird parameters
    birdX = birdXinit = 50;
    birdY = birdYinit = 150;
    birdWidth = birdHeight = 30;
    imageBird.src = "img/bird1.png";

    //keyboard event
    window.onkeydown = traiteKeydown;

    //flowers and pigs parameters
    initPosFlow = 200;
    flowHeight = 75;
    imageTop.src = "img/topflower.png";
    imageBottom.src = "img/bottomflower.png";
    creerFlowers(6, initPosFlow, flowHeight);

    initPosBub = 230;
    creerBubbles(6, initPosBub);
    imageUp.src = "img/bubbleup.png";
    imageDown.src = "img/bubbledown.jpg";
    imagePig.src = "img/pig6.png";
    creerPigs(5);

    // on demarre l'animation
    requestAnimationFrame(animation);
}

// press "Space" to start the game
function startGame() {
    start = 'true';
    playBgMusic();
    audioBrowser();
    requestAnimationFrame(animation);
}

//when lost one chance, flowers have to go back to the initial positon
function restart() {
    var width = canvas.width / ratio;
    var height = canvas.height / ratio;
    playBirdSound();
    pauseBgMusic();

    birdX = birdXinit;
    birdY = birdYinit;

    if (chance == 3) {
        imageBird.src = "img/bird2.png";
    } else if (chance == 2) {
        imageBird.src = "img/bird7.png";
    }

    top_flowers.forEach((fl) => {
        fl.x = initPosFlow + gapTopBottom + top_flowers.indexOf(fl) * gapWidth;
    })
    bottom_flowers.forEach((fl) => {
        fl.x = initPosFlow + bottom_flowers.indexOf(fl) * gapWidth;;
    })
    top_bubbles.forEach((bub) => {
        bub.centerX = initPosBub + gapTopBottom + top_bubbles.indexOf(bub) * gapWidth;
    })
    bottom_bubbles.forEach((bub) => {
        bub.centerX = initPosBub + bottom_bubbles.indexOf(bub) * gapWidth;
    })

    pigs.forEach((p) => {
        initPosPigx = Math.floor(Math.random() * (width - width / 2 + 1) + width / 2);
        initPosPigy = Math.floor(Math.random() * (height - flowHeight - flowHeight + 1) + flowHeight);

        p.centerX = initPosPigx;
        p.centerY = initPosPigy;
    })

    if (chance == 1) {
        alert("Game over");
        location.reload();
    } else {
        alert("You have lost 1 chance");
        chance--;
    }

    reloadBgMusic();
}

function optimizeDisplay() {
    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

    ratio = devicePixelRatio / backingStoreRatio;

    var oldWidth = canvas.width;
    var oldHeight = canvas.height;
    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;
    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';
    ctx.scale(ratio, ratio);
}
