class Pig {
    constructor(centerX, centerY, radius, startAngle, endAngle, couleur) {
        this.centerX = centerX || 10;
        this.centerY = centerY || 10;
        this.radius = radius || 30;
        this.startAngle = startAngle || 0;
        this.endAngle = endAngle || Math.PI * 2;
        this.couleur = couleur || 'black';
        this.vitessX = 0;
        this.vitessY = 0;
        this.vitessMax = 10;
    }

    drawImg(ctx, objectType) {
        ctx.save();
        ctx.drawImage(objectType, (this.centerX - this.radius), (this.centerY - this.radius), this.radius * 2, this.radius * 2);
        ctx.restore();
    }

    move() {
        this.centerX += this.vitessX;
        this.centerY += this.vitessY;
    }
}
