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