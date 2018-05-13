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

    draw(ctx, flowerType) {
        ctx.save();
        ctx.drawImage(flowerType, this.x, this.y, this.l, this.h);
        //ctx.drawImage(imageBottom, this.x, this.y, this.l, this.h);
        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}