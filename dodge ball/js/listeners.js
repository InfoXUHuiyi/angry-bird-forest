//key event
function traiteKeydown(evt) {
    let code = evt.code;
    switch (code) {
        case 'Space':
            if (start == 'false') startGame();
            break;
        case 'ArrowUp':
            joueur.centerY -= joueur.vitessMax;
            break;
        case 'ArrowDown':
            joueur.centerY += joueur.vitessMax;
            break;
        case 'ArrowLeft':
            joueur.centerX -= joueur.vitessMax;
            break;
        case 'ArrowRight':
            joueur.centerX += joueur.vitessMax;
            break;
    }
}
