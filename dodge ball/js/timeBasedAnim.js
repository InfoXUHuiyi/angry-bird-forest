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

    //score bar
    ctx.font = "30px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText("chance=" + chance, 0, 30);
    ctx.fillText("level=" + level, 155, 30);
    ctx.fillText("score=" + score, 270, 30);
}
