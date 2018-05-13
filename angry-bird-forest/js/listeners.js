//key event
function traiteKeydown(evt) {
    let code = evt.code;
    switch (code) {
        case 'Space':
            if (start == 'false') startGame();
            break;
        case 'ArrowUp':
            if (start == 'true') birdY -= birdVmax;
            break;
        case 'ArrowDown':
            if (start == 'true') birdY += birdVmax;
            break;
        case 'ArrowLeft':
            if (start == 'true') birdX -= birdVmax;
            break;
        case 'ArrowRight':
            if (start == 'true') birdX += birdVmax;
            break;
    }
}
