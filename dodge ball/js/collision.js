function testCollisions() {
    testCollisionFlowers();
    testCollisionBubbles();
    testCollisionPigs();
    testCollisionJoueurAvecMur();
    testCollisionJoueurAvecFlowers();
    testCollisionJoueurAvecBubbles();
}
//if flowers reach the left edge, they will appear on the right edge
function testCollisionFlowers() {
    top_flowers.forEach((fl) => {
        if (fl.x <= -fl.l) {
            fl.x = 1140;
        }
    })
    bottom_flowers.forEach((fl) => {
        if (fl.x <= -fl.l) {
            fl.x = 1140;
        }
    })
}
//similar test collision with collision flowers
function testCollisionBubbles() {
    var height = canvas.height / ratio;
    top_bubbles.forEach((bub) => {
        if (bub.centerX <= -bub.radius) {
            bub.centerX = 1180;
        }
        if (bub.centerY >= height + bub.radius) {
            bub.centerY = bub.radius + flowHeight;
        }
    })

    bottom_bubbles.forEach((bub) => {
        if (bub.centerX <= -bub.radius) {
            bub.centerX = 1180;
        }
        if (bub.centerY <= -bub.radius) {
            bub.centerY = height - bub.radius - flowHeight;
        }
    })
}
//if pig reach the edge
function testCollisionPigs() {
    pigs.forEach((p) => {
        if (p.centerX + p.radius < 0) {
            p.centerX = canvas.width / ratio;
            p.centerY = Math.floor(Math.random() * (canvas.height / ratio - flowHeight - flowHeight + 1) + flowHeight);
        }
    })
}
//if bird touch the edge of canvas
function testCollisionJoueurAvecMur() {
    var width = canvas.width / ratio;
    var height = canvas.height / ratio;
    if (birdY < 0) {
        birdY = 0;
    } else if (birdY + birdHeight > height) {
        birdY = height - birdHeight;
    }

    if (birdX < 0) {
        birdX = 0;
    } else if (birdX + birdWidth > width / 2) {
        birdX = width / 2 - birdWidth;
    }
}
//if bird touch the flowers
function testCollisionJoueurAvecFlowers() {

    top_flowers.forEach((fl) => {
        if ((birdX + birdWidth - tolerance > fl.x) && (birdX + tolerance < fl.x + fl.l)) {
            if ((birdY + tolerance < fl.y + fl.h)) {
                restart();
            }
        }
    })

    bottom_flowers.forEach((fl) => {
        if ((birdX + birdWidth - tolerance > fl.x) && (birdX + tolerance < fl.x + fl.l)) {
            if ((birdY + birdHeight - tolerance > fl.y)) {
                restart();

            }
        }
    })

}
//if bird touch the bubbles
function testCollisionJoueurAvecBubbles() {

    top_bubbles.forEach((bub) => {
        if ((birdX + birdWidth - tolerance > bub.centerX - bub.radius + tolerance) &&
            (birdX + tolerance < bub.centerX + bub.radius - tolerance)) {
            if ((birdY + birdHeight - tolerance > bub.centerY - bub.radius + tolerance) &&
                ((birdY + tolerance < bub.centerY + bub.radius - tolerance))) {
                restart();
            }
        }
    })

    bottom_bubbles.forEach((bub) => {
        if ((birdX + birdWidth - tolerance > bub.centerX - bub.radius + tolerance) &&
            (birdX + tolerance < bub.centerX + bub.radius - tolerance)) {
            if ((birdY + birdHeight - tolerance > bub.centerY - bub.radius + tolerance) &&
                ((birdY + tolerance < bub.centerY + bub.radius - tolerance))) {
                restart();
            }
        }
    })
}
