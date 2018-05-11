window.onload = init;

let canvas, ctx;
// let joueurPosX;
// let joueurPosY;
let bottom_flowers = [];
let top_flowers = [];
let bottom_bubbles = [];
let top_bubbles = [];
let pigs = [];
let score = 0;
let chance = 3;
let level = 1;

function init() {
  console.log("page chargee");
  
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  
//   var bg = new Image();
//     bg.onload = function(){
//         ctx.drawImage(bg,0,0,bg.width,bg.height);
//     }
//     //have to change to the local picture
//     bg.src = "https://d2ujflorbtfzji.cloudfront.net/package-screenshot/97f9e568-7710-4d26-ac47-5d7a4fbe1c25_scaled.jpg";
    
  
//   joueurPosX = canvas.width;
//   joueurPosY = canvas.height;
  
  joueur = new Circle(50,200,10,0,Math.PI*2,'black');
//   joueur = new Circle(joueurPosX,joueurPosY,10,0,Math.PI*2,'black');

  window.onkeydown = traiteKeydown;
//   window.onkeyup = traiteKeyup;
  
//   traiteMouseMove();
  
  creerFlowers(6,200);
  creerBubbles(6,230);
    creerPigs(5,800,500);
  
  // on demarre l'animation
  requestAnimationFrame(animation);
}
//to move the elements
function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  dessineEtDeplaceLesObjets();
  testCollisions();
    
  requestAnimationFrame(animation);
}

function dessineEtDeplaceLesObjets() {
  
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
  
  
  
  ctx.font="20px Georgia";
  ctx.fillText("chance="+chance,0,17);
  ctx.fillText("level="+level,100,17);
  ctx.fillText("score="+score,200,17);
}

function creerFlowers(nb,pos){
    var gapWidth = 200;
    var gapTopBottom = 100;
  for(var i=0; i<nb; i++){
    topflow = new Flower((pos+gapTopBottom +i*gapWidth),0,60,60,'pink');
    downflow = new Flower((pos +i*gapWidth),canvas.height-60,60,60,'pink');
    
    topflow.vitesseX = -1;
    downflow.vitesseX = -1;
    
    top_flowers.push(topflow);
    bottom_flowers.push(downflow);
  }
}

function creerBubbles(nb,pos){
    var gapWidth = 200;
    var gapTopBottom = 100;
  for(var i=0; i<nb; i++){
    topbub = new Circle((pos+gapTopBottom +i*gapWidth) ,60,20,0,Math.PI*2,'orange');
    downbub = new Circle((pos +i*gapWidth),canvas.height-60,20,0,Math.PI*2,'cyan');
    topbub.vitessX = -1;
    topbub.vitessY = 1;
    downbub.vitessX = -1;
    downbub.vitessY = -1; 
    
    top_bubbles.push(topbub);
    bottom_bubbles.push(downbub);
  }
}

function creerPigs(nb,posX,posY){
    for(var i=0; i<nb; i++){
        pig = new Circle(posX*Math.random(),posY*Math.random(),10,0,Math.PI*2,'green');
        pig.vitessX = -1;
        
        pigs.push(pig);
    }
}

function testCollisions(){
  testCollisionFlowers();
  testCollisionBubbles();
  testCollisionJoueurAvecMur();
    testCollisionAvecFlowers();
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
    var flowh = 60;
  top_bubbles.forEach((bub)=>{
    if(bub.centerX <= -bub.radius){
      bub.centerX = 1180;
    }
    if(bub.centerY >= canvas.height - bub.radius){
      bub.centerY = bub.radius + flowh;
    }
  })
  
  bottom_bubbles.forEach((bub)=>{
    if(bub.centerX <= -bub.radius){
      bub.centerX = 1180;
    }
    if(bub.centerY <= bub.radius){
      bub.centerY = canvas.height - bub.radius - flowh;
    }
  })
}

function testCollisionJoueurAvecMur(){
    if(joueur.centerY < joueur.radius){
        alert("You have lost 1 chance");
        location.reload();
    }else if(joueur.centerY > canvas.height - joueur.radius){
        alert("You have lost 1 chance");
        location.reload();
    }
  
  if(joueur.centerX <= joueur.radius){
    joueur.centerX = joueur.radius;
  }else if(joueur.centerX >= canvas.width - joueur.radius){
    joueur.centerX = canvas.width - joueur.radius;
  }
}

function testCollisionAvecFlowers(){
//    top_flowers.forEach((fl) => {
//        if((joueur.centerX > fl.x - joueur.radius) && (joueur.centerX < fl.x + fl.l - joueur.radius)){
//            if(joueur.centerY < flowh + joueur.radius){
//                alert("You have lost 1 chance");
//                location.reload();
//              }else if(joueur.centerY > canvas.height - flowh - joueur.radius){
//                  alert("You have lost 1 chance");
//                  location.reload();
//              }
//        }
//    })
    
   
    
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
//     var bird = new Image();
//     bird.onload = function(){
//         ctx.drawImage(bird,this.x,this.y);
//     }
//     //have to change to the local picture
//     bird.src = "https://vignette.wikia.nocookie.net/angrybirdsfanon/images/f/f0/Angry_Bird_red.png";
    
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