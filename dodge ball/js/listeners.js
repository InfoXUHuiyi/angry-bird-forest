//key event
function traiteKeydown(evt) {
    let code = evt.code;
    switch (code) {
        case 'Space':
            if (start == 'false') startGame();
            break;
        case 'ArrowUp':
            birdY -= birdVmax;
            break;
        case 'ArrowDown':
            birdY += birdVmax;
            break;
        case 'ArrowLeft':
            birdX -= birdVmax;
            break;
        case 'ArrowRight':
            birdX += birdVmax;
            break;
    }
}
