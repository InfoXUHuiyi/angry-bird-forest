function creerFlowers(nb, pos) {
    for (var i = 0; i < nb; i++) {
        topflow = new Flower((pos + gapTopBottom + i * gapWidth), 0, 60, flowHeight, 'pink');
        downflow = new Flower((pos + i * gapWidth), canvas.height - flowHeight, 60, flowHeight, 'pink');

        topflow.vitesseX = -1/3;
        downflow.vitesseX = -1/3;

        top_flowers.push(topflow);
        bottom_flowers.push(downflow);
    }
}

function creerBubbles(nb, pos) {
    for (var i = 0; i < nb; i++) {
        topbub = new Circle((pos + gapTopBottom + i * gapWidth), 60, 20, 0, Math.PI * 2, 'orange');
        downbub = new Circle((pos + i * gapWidth), canvas.height - 60, 20, 0, Math.PI * 2, 'yellow');
        topbub.vitessX = -1/3;
        topbub.vitessY = 1/3;
        downbub.vitessX = -1/3;
        downbub.vitessY = -1/3;

        top_bubbles.push(topbub);
        bottom_bubbles.push(downbub);
    }
}

function creerPigs(nb) {
    for (var i = 0; i < nb; i++) {
        initPosPigx = Math.floor(Math.random() * (canvas.width - canvas.width / 2 + 1) + canvas.width / 2);
        initPosPigy = Math.floor(Math.random() * (canvas.height - flowHeight - flowHeight + 1) + flowHeight);
        pig = new Circle(initPosPigx, initPosPigy, 10, 0, Math.PI * 2, 'cyan');
        pig.vitessX = -1/2;

        pigs.push(pig);
    }
}