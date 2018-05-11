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

function init() {
  console.log("page chargee");
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");

    imageObj.src = "img/background.jpg";
    imageObj.onload = function () {
        //ctx.save();
        ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);   
//        var bg = ctx.createPattern(imageObj, "no-repeat");  
//        ctx.fillStyle = bg;  
//        ctx.fillRect(0, 0, width, height);         
//         ctx.restore();         
    };     
  
//   joueurPosX = canvas.width;
//   joueurPosY = canvas.height;
  joueurPosX = 50;
    joueurPosY = 200;
  joueur = new Circle(joueurPosX,joueurPosY,10,0,Math.PI*2,'red');
//   joueur = new Circle(joueurPosX,joueurPosY,10,0,Math.PI*2,'black');

  window.onkeydown = traiteKeydown;
//   window.onkeyup = traiteKeyup;
  
//   traiteMouseMove();

  initPosFlow = 200;
    flowHeight = 60;
  creerFlowers(6,initPosFlow,flowHeight);
    initPosBub = 230;
  creerBubbles(6,initPosBub);

    creerPigs(5);
  
  // on demarre l'animation
  requestAnimationFrame(animation);
}
//to move the elements
function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  dessineEtDeplaceLesObjets();
  testCollisions();
    calculeScores();
    changeLevel();
    
  requestAnimationFrame(animation);
}

function drawBackground(){
    ctx.save();
    ctx.drawImage(imageObj, 0, 0, 1000, 500);     
    ctx.restore();         
}

function dessineEtDeplaceLesObjets() {
  drawBackground();
  joueur.draw(ctx);
//   joueur.move();
  
  top_flowers.forEach((fl) => {
    fl.draw(ctx);
    fl.move();
  })
    
    bottom_flowers.forEach((fl) => {
    fl.draw(ctx);
    fl.move();
  })
  
  top_bubbles.forEach((bub) => {
    bub.draw(ctx);
    bub.move();
  })
  
  bottom_bubbles.forEach((bub) => {
    bub.draw(ctx);
    bub.move();
  })
    
    pigs.forEach((p) => {
        p.draw(ctx);
        p.move();
    })
  
  
  
  ctx.font="30px Georgia";
    ctx.fillStyle = "white";
  ctx.fillText("chance="+chance,0,30);
  ctx.fillText("level="+level,155,30);
  ctx.fillText("score="+score,270,30);
    
}

function changeLevel(){
    if(score % 10 == 0){
        level = score/10 + 1;
        top_bubbles.forEach((bub) => {
            bub.vitessY = level;
        })
        bottom_bubbles.forEach((bub) => {
            bub.vitessY = -level;
        })
    }
}

function calculeScores(){
    pigs.forEach((p) => {
        if((joueur.centerX + joueur.radius > p.centerX - p.radius) && (joueur.centerX - joueur.radius < p.centerX + p.radius)){
            if((joueur.centerY + joueur.radius > p.centerY - p.radius) && (joueur.centerY - joueur.radius < p.centerY + p.radius) ){
                score += 2;
                //write code here: kill pig when joueur touch it
                p.centerX = Math.floor(Math.random()*(canvas.width-canvas.width/2+1)+canvas.width/2);
                p.centerY = Math.floor(Math.random()*(canvas.height-flowHeight-flowHeight+1)+flowHeight);
            }
        }
    })
    
    
}

let gapWidth = 200;
let gapTopBottom = 100;
function creerFlowers(nb,pos){
    
  for(var i=0; i<nb; i++){
    topflow = new Flower((pos+gapTopBottom +i*gapWidth),0,60,flowHeight,'pink');
    downflow = new Flower((pos +i*gapWidth),canvas.height-flowHeight,60,flowHeight,'pink');
    
    topflow.vitesseX = -1;
    downflow.vitesseX = -1;
    
    top_flowers.push(topflow);
    bottom_flowers.push(downflow);
  }
}

function creerBubbles(nb,pos){
  for(var i=0; i<nb; i++){
    topbub = new Circle((pos+gapTopBottom +i*gapWidth) ,60,20,0,Math.PI*2,'orange');
    downbub = new Circle((pos +i*gapWidth),canvas.height-60,20,0,Math.PI*2,'yellow');
    topbub.vitessX = -1;
    topbub.vitessY = 1;
    downbub.vitessX = -1;
    downbub.vitessY = -1; 
    
    top_bubbles.push(topbub);
    bottom_bubbles.push(downbub);
  }
}

function creerPigs(nb){
    for(var i=0; i<nb; i++){
        initPosPigx = Math.floor(Math.random()*(canvas.width-canvas.width/2+1)+canvas.width/2);
        initPosPigy = Math.floor(Math.random()*(canvas.height-flowHeight-flowHeight+1)+flowHeight);
        pig = new Circle(initPosPigx,initPosPigy,10,0,Math.PI*2,'cyan');
        pig.vitessX = -1;
        
        pigs.push(pig);
    }
}

function testCollisions(){
  testCollisionFlowers();
  testCollisionBubbles();
    testCollisionPigs();
  testCollisionJoueurAvecMur();
    testCollisionJoueurAvecFlowers();
    testCollisionJoueurAvecBubbles();
}

function testCollisionFlowers(){
  top_flowers.forEach((fl)=>{
    if(fl.x <= -fl.l){
      fl.x = 1140;
    }
  })
    bottom_flowers.forEach((fl)=>{
    if(fl.x <= -fl.l){
      fl.x = 1140;
    }
  })
}

function testCollisionBubbles(){
  top_bubbles.forEach((bub)=>{
    if(bub.centerX <= -bub.radius){
      bub.centerX = 1180;
    }
    if(bub.centerY >= canvas.height - bub.radius){
      bub.centerY = bub.radius + flowHeight;
    }
  })
  
  bottom_bubbles.forEach((bub)=>{
    if(bub.centerX <= -bub.radius){
      bub.centerX = 1180;
    }
    if(bub.centerY <= bub.radius){
      bub.centerY = canvas.height - bub.radius - flowHeight;
    }
  })
}

function testCollisionPigs() {
    pigs.forEach((p) => {
    if(p.centerX<canvas.width/50){
                p.centerX = Math.floor(Math.random()*(canvas.width-canvas.width/2+1)+canvas.width/2);
                p.centerY = Math.floor(Math.random()*(canvas.height-flowHeight-flowHeight+1)+flowHeight);
    }
    })
    // write code here: reproduce pigs
}

function testCollisionJoueurAvecMur(){
    if(joueur.centerY < joueur.radius){
        joueur.centerY = joueur.radius;
    }else if(joueur.centerY > canvas.height - joueur.radius){
        joueur.centerY = canvas.height - joueur.radius;
    }
  
  if(joueur.centerX <= joueur.radius){
    joueur.centerX = joueur.radius;
  }else if(joueur.centerX >= canvas.width/2 - joueur.radius){
    joueur.centerX = canvas.width/2 - joueur.radius;
  }
}

function testCollisionJoueurAvecFlowers(){
    top_flowers.forEach((fl) => {
        if((joueur.centerX + joueur.radius > fl.x) && (joueur.centerX - joueur.radius < fl.x + fl.l)){
            if((joueur.centerY - joueur.radius < fl.y + fl.h)){
                restart();
              }
        }
    })
    
    bottom_flowers.forEach((fl) => {
        if((joueur.centerX + joueur.radius > fl.x) && (joueur.centerX - joueur.radius < fl.x + fl.l)){
            if((joueur.centerY + joueur.radius > fl.y)){
                restart();
                
              }
        }
    })
}

function testCollisionJoueurAvecBubbles(){
    top_bubbles.forEach((bub) => {
        if((joueur.centerX + joueur.radius > bub.centerX - bub.radius + tolerance) 
           && (joueur.centerX - joueur.radius < bub.centerX + bub.radius - tolerance)){
            if((joueur.centerY + joueur.radius > bub.centerY - bub.radius + tolerance) 
               && ((joueur.centerY - joueur.radius < bub.centerY + bub.radius - tolerance))){
                restart();
              }
        }
    })
    
    bottom_bubbles.forEach((bub) => {
        if((joueur.centerX + joueur.radius > bub.centerX - bub.radius + tolerance) 
           && (joueur.centerX - joueur.radius < bub.centerX + bub.radius - tolerance)){
            if((joueur.centerY + joueur.radius > bub.centerY - bub.radius + tolerance) 
               && ((joueur.centerY - joueur.radius < bub.centerY + bub.radius - tolerance))){
                restart();
              }
        }
    })
}


function restart(){
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
        initPosPigx = Math.floor(Math.random()*(canvas.width-canvas.width/2+1)+canvas.width/2);
        initPosPigy = Math.floor(Math.random()*(canvas.height-flowHeight-flowHeight+1)+flowHeight);
        
        p.centerX = initPosPigx;
        p.centerY = initPosPigy;
    })
    
    if(chance == 1){
        alert("Game over");
        location.reload();
    }else{
        alert("You have lost 1 chance");
        chance--;
    }
}

//key event
function traiteKeydown(evt) {
  let code = evt.code;
  switch(code) {
    case 'ArrowUp':
      joueur.centerY -= joueur.vitessMax;
      break;
    case 'ArrowDown':
      joueur.centerY += joueur.vitessMax;
      break;
    case 'ArrowLeft':
      joueur.centerX -= joueur.vitessMax;
      break;
    case 'ArrowRight':
      joueur.centerX += joueur.vitessMax;
      break;
  }
}

//mouse event
// function traiteMouseMove(){
//   canvas.addEventListener('mousemove', function (evt) {
//     mousePos = getMousePos(canvas, evt);
//     joueur.centerX = mousePos.x;
//     joueur.centerY = mousePos.y;
//   }, false);
// }

// function getMousePos(canvas, evt) {
//   // necessary to take into account CSS boudaries
//   var rect = canvas.getBoundingClientRect();
//   return {
//       x: evt.clientX - rect.left,
//       y: evt.clientY - rect.top
//   };
// }

//class example
class Circle{
  constructor(centerX,centerY,radius,startAngle,endAngle,couleur){
    this.centerX = centerX || 10;
    this.centerY = centerY || 10;
    this.radius = radius || 30;
    this.startAngle = startAngle || 0;
    this.endAngle = endAngle || Math.PI*2;
    this.couleur = couleur || 'black';
    this.vitessX = 0;
    this.vitessY = 0;
    this.vitessMax = 10;
    
  }
  
  draw(ctx) {
    ctx.save();
      
    ctx.beginPath();
    ctx.fillStyle = this.couleur;
    ctx.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle, false);
    ctx.lineWidth = 3;
    //ctx.stroke();//circle creux
    ctx.fill();//circle solide
    
    ctx.restore();
  }
  
  move(){
    this.centerX += this.vitessX;
    this.centerY += this.vitessY;
  }
}

class Flower{
  constructor(x, y, l, h, couleur){
    this.x = x || 0;
    this.y = y || 0;
    this.l = l || 20;
    this.h = h || 20;
    this.couleur = couleur || 'black';
    this.vitesseX = 0; // en pixels par image d'animation
    this.vitesseY = 0; // en pixels par image d'animation

  }
  
  draw(ctx) {
    ctx.save();
    
    ctx.fillStyle = this.couleur;
    ctx.fillRect(this.x, this.y, this.l, this.h);
    
    ctx.restore();
  }
  
  move() {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
  }
  
}