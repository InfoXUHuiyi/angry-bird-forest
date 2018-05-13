//to move the elements
function animation() {
    // 1 on efface
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dessineEtDeplaceLesObjets(start);
    testCollisions();
    calculeScores();
    changeLevel();

    requestAnimationFrame(animation);
}

function dessineEtDeplaceLesObjets(start) {
    drawBackground();

    if (start == 'true') {
        top_flowers.forEach((fl) => {
            fl.draw(ctx, imageTop);
            fl.move();
        })

        bottom_flowers.forEach((fl) => {
            fl.draw(ctx, imageBottom);
            fl.move();
        })

        top_bubbles.forEach((bub) => {
            bub.drawImg(ctx, imageDown);
            bub.move();
        })

        bottom_bubbles.forEach((bub) => {
            bub.drawImg(ctx, imageUp);
            bub.move();
        })

        pigs.forEach((p) => {
            p.drawImg(ctx, imagePig);
            p.move();
        })
    } else {
        top_flowers.forEach((fl) => {
            fl.draw(ctx, imageTop);
        })

        bottom_flowers.forEach((fl) => {
            fl.draw(ctx, imageBottom);
        })

        top_bubbles.forEach((bub) => {
            bub.drawImg(ctx, imageDown);
        })

        bottom_bubbles.forEach((bub) => {
            bub.drawImg(ctx, imageUp);
        })

        pigs.forEach((p) => {
            p.drawImg(ctx, imagePig);
        })
    }

    scoreBar();
}
