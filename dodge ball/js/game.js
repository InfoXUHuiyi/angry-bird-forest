window.onload = init;

let canvas, ctx;
let joueurPosX;
let joueurPosY;
let initPosFlow;
let flowHeight;
let initPosBub;
let initPosPigx;
let initPosPigy;
let bottom_flowers = [];
let top_flowers = [];
let bottom_bubbles = [];
let top_bubbles = [];
let pigs = [];
let score = 0;
let chance = 3;
let level = 1;
let imageObj = new Image();
let tolerance = 10;
let bgMusic;
let birdSound;
let start = 'false';
let gapWidth = 200;
let gapTopBottom = 100;

function init() {
    console.log("page chargee");
    bgMusic = document.querySelector("#audioBackground");
    birdSound = document.querySelector("#audioBird");

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");

    imageObj.src = "img/background.jpg";
    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
    };

    //   joueurPosX = canvas.width;
    //   joueurPosY = canvas.height;
    joueurPosX = 50;
    joueurPosY = 200;
    joueur = new Circle(joueurPosX, joueurPosY, 10, 0, Math.PI * 2, 'red');
    //   joueur = new Circle(joueurPosX,joueurPosY,10,0,Math.PI*2,'black');

    window.onkeydown = traiteKeydown;
    //   window.onkeyup = traiteKeyup;
    //   traiteMouseMove();

    initPosFlow = 200;
    flowHeight = 60;
    creerFlowers(6, initPosFlow, flowHeight);
    initPosBub = 230;
    creerBubbles(6, initPosBub);
    creerPigs(5);

    // on demarre l'animation
    requestAnimationFrame(animation);
}

// press "Space" to start the game
function startGame() {
    start = 'true';
    playBgMusic();
    requestAnimationFrame(animation);
}

function restart() {
    playBirdSound();
    pauseBgMusic();

    joueur.centerX = joueurPosX;
    joueur.centerY = joueurPosY;
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
        initPosPigx = Math.floor(Math.random() * (canvas.width - canvas.width / 2 + 1) + canvas.width / 2);
        initPosPigy = Math.floor(Math.random() * (canvas.height - flowHeight - flowHeight + 1) + flowHeight);

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

// drawing background image
function drawBackground() {
    ctx.save();
    ctx.drawImage(imageObj, 0, 0, 1000, 500);
    ctx.restore();
}

// playing background music
function playBgMusic() {
    bgMusic.play();
}

// background music is paused
function pauseBgMusic() {
    bgMusic.pause();
}

// reloading background music
function reloadBgMusic() {
    bgMusic.load();
    playBgMusic();
}

// playing bird sound when the bird die
function playBirdSound() {
    birdSound.play();
}

function changeLevel() {
    if (score % 10 == 0) {
        level = score / 10 + 1;
        top_bubbles.forEach((bub) => {
            bub.vitessY = level;
        })
        bottom_bubbles.forEach((bub) => {
            bub.vitessY = -level;
        })
    }
}

function calculeScores() {
    pigs.forEach((p) => {
        if ((joueur.centerX + joueur.radius > p.centerX - p.radius) && (joueur.centerX - joueur.radius < p.centerX + p.radius)) {
            if ((joueur.centerY + joueur.radius > p.centerY - p.radius) && (joueur.centerY - joueur.radius < p.centerY + p.radius)) {
                score += 2;
                p.centerX = Math.floor(Math.random() * (canvas.width - canvas.width / 2 + 1) + canvas.width / 2);
                p.centerY = Math.floor(Math.random() * (canvas.height - flowHeight - flowHeight + 1) + flowHeight);
            }
        }
    })
}


