function scoreBar(){
    //score bar
    ctx.font = "30px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText("chance=" + chance, 0, 30);
    ctx.fillText("level=" + level, 155, 30);
    ctx.fillText("score=" + score, 270, 30);
}

//10 points will add a level, bubbles speed will increase
function changeLevel() {
    if (score % 10 == 0) {
        level = score / 10 + 1;
        top_bubbles.forEach((bub) => {
            bub.vitessY = level / 3;
        })
        bottom_bubbles.forEach((bub) => {
            bub.vitessY = -level / 3;
        })
    }
    if (level == 10) {
        pauseBgMusic();
        winSound.play();
        alert("Congratulations!!!");
        location.reload();
    }
}
//if bird touch the pig, earn 2 points and pig disappear
function calculeScores() {
    var width = canvas.width / ratio;
    var height = canvas.height / ratio;
    pigs.forEach((p) => {
        if ((birdX + birdWidth - tolerance > p.centerX - p.radius) && (birdX + tolerance < p.centerX + p.radius)) {
            if ((birdY + birdHeight - tolerance > p.centerY - p.radius) && (birdY + tolerance < p.centerY + p.radius)) {
                scoreSound.play();
                score += 2;
                p.centerX = canvas.width / ratio;
                p.centerY = Math.floor(Math.random() * (height - flowHeight - flowHeight + 1) + flowHeight);
            }
        }
    })
}