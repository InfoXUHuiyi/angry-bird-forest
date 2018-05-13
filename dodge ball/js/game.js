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
let imageBird = new Image();
let birdVmax = 10;
let birdX,birdY,birdWidth,birdHeight;
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

    //bird parameters
    birdX = 50;
    birdY = 150;
    birdWidth = birdHeight = 50;
    imageBird.src = "img/bird1.png";
    imageBird.onload = function(){
        ctx.drawImage(imageBird,birdX,birdY,birdWidth,birdHeight);
    }
    
    //keyboard event
    window.onkeydown = traiteKeydown;

    //flowers and pigs parameters
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

//when lost one chance, flowers have to go back to the initial positon
function restart() {
    playBirdSound();
    pauseBgMusic();
    
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
    ctx.drawImage(imageBird,birdX,birdY,birdWidth,birdHeight);
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
//10 points will add a level, bubbles speed will increase
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
//if bird touch the pig, earn 2 points and pig disappear
function calculeScores() {
    pigs.forEach((p) => {        
        if ((birdX + birdWidth > p.centerX - p.radius) && (birdX < p.centerX + p.radius)) {
            if ((birdY + birdHeight > p.centerY - p.radius) && (birdY < p.centerY + p.radius)) {
                score += 2;
                p.centerX = Math.floor(Math.random() * (canvas.width - canvas.width / 2 + 1) + canvas.width / 2);
                p.centerY = Math.floor(Math.random() * (canvas.height - flowHeight - flowHeight + 1) + flowHeight);
            }
        }
    })
}


