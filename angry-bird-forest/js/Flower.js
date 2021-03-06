class Flower {
    constructor(x, y, l, h, couleur) {
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
        // dancing with background music
        if ((start == 'true') && (browser != 'chrome')) {
            analyser.getByteFrequencyData(dataArray);
            var average = getAverageVolume(dataArray);
            if (flowerType == imageTop) {
                ctx.drawImage(flowerType, this.x, this.y, this.l, this.h + average);
            } else {
                ctx.drawImage(flowerType, this.x, this.y - average, this.l, this.h + average);
            }
        } else {
            if (flowerType == imageTop) {
                ctx.drawImage(flowerType, this.x, this.y, this.l, this.h + 25);
            } else {
                ctx.drawImage(flowerType, this.x, this.y - 25, this.l, this.h + 25);
            }
        }

        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}
