// playing background music
function playBgMusic() {
    bgMusic.play();
}

// background music is paused
function pauseBgMusic() {
    bgMusic.pause();
}

// reloading background music
function reloadBgMusic() {
    bgMusic.load();
    playBgMusic();
}

// playing bird sound when the bird die
function playBirdSound() {
    birdSound.play();
}