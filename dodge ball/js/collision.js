function testCollisions() {
    testCollisionFlowers();
    testCollisionBubbles();
    testCollisionPigs();
    testCollisionJoueurAvecMur();
    testCollisionJoueurAvecFlowers();
    testCollisionJoueurAvecBubbles();
}

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

function testCollisionBubbles() {
    top_bubbles.forEach((bub) => {
        if (bub.centerX <= -bub.radius) {
            bub.centerX = 1180;
        }
        if (bub.centerY >= canvas.height - bub.radius) {
            bub.centerY = bub.radius + flowHeight;
        }
    })

    bottom_bubbles.forEach((bub) => {
        if (bub.centerX <= -bub.radius) {
            bub.centerX = 1180;
        }
        if (bub.centerY <= bub.radius) {
            bub.centerY = canvas.height - bub.radius - flowHeight;
        }
    })
}

function testCollisionPigs() {
    pigs.forEach((p) => {
        if (p.centerX < canvas.width / 50) {
            p.centerX = Math.floor(Math.random() * (canvas.width - canvas.width / 2 + 1) + canvas.width / 2);
            p.centerY = Math.floor(Math.random() * (canvas.height - flowHeight - flowHeight + 1) + flowHeight);
        }
    })
}

function testCollisionJoueurAvecMur() {
    if (joueur.centerY < joueur.radius) {
        joueur.centerY = joueur.radius;
    } else if (joueur.centerY > canvas.height - joueur.radius) {
        joueur.centerY = canvas.height - joueur.radius;
    }

    if (joueur.centerX <= joueur.radius) {
        joueur.centerX = joueur.radius;
    } else if (joueur.centerX >= canvas.width / 2 - joueur.radius) {
        joueur.centerX = canvas.width / 2 - joueur.radius;
    }
}

function testCollisionJoueurAvecFlowers() {
    top_flowers.forEach((fl) => {
        if ((joueur.centerX + joueur.radius > fl.x) && (joueur.centerX - joueur.radius < fl.x + fl.l)) {
            if ((joueur.centerY - joueur.radius < fl.y + fl.h)) {
                restart();
            }
        }
    })

    bottom_flowers.forEach((fl) => {
        if ((joueur.centerX + joueur.radius > fl.x) && (joueur.centerX - joueur.radius < fl.x + fl.l)) {
            if ((joueur.centerY + joueur.radius > fl.y)) {
                restart();

            }
        }
    })
}

function testCollisionJoueurAvecBubbles() {
    top_bubbles.forEach((bub) => {
        if ((joueur.centerX + joueur.radius > bub.centerX - bub.radius + tolerance) &&
            (joueur.centerX - joueur.radius < bub.centerX + bub.radius - tolerance)) {
            if ((joueur.centerY + joueur.radius > bub.centerY - bub.radius + tolerance) &&
                ((joueur.centerY - joueur.radius < bub.centerY + bub.radius - tolerance))) {
                restart();
            }
        }
    })

    bottom_bubbles.forEach((bub) => {
        if ((joueur.centerX + joueur.radius > bub.centerX - bub.radius + tolerance) &&
            (joueur.centerX - joueur.radius < bub.centerX + bub.radius - tolerance)) {
            if ((joueur.centerY + joueur.radius > bub.centerY - bub.radius + tolerance) &&
                ((joueur.centerY - joueur.radius < bub.centerY + bub.radius - tolerance))) {
                restart();
            }
        }
    })
}
