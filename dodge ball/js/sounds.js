// playing background music
function playBgMusic() {
    bgMusic.play();
}

function audioBrowser() {
    try {
        audioCtx = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        //audioCtx = window.AudioContext || window.webkitAudioContext;
        audioContext = new audioCtx();
    } catch (e) {
        alert('Web Audio API is not supported in this browser');
    }

    //    var ua = navigator.userAgent.toLocaleLowerCase();
    //    if (ua.match(/firefox/) != null) {
    //        browser = 'firefox';
    //        buildAudioGraph();
    //    } else if (ua.match(/safari/) != null) {
    //        browser = 'safari';
    //        buildAudioGraph();
    //    }

    if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
        browser = 'chrome';
    } else {
        buildAudioGraph();
    }
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

function buildAudioGraph() {
    var sourceNode = audioContext.createMediaElementSource(bgMusic);

    // Create an analyser node
    analyser = audioContext.createAnalyser();

    // Try changing for lower values: 512, 256, 128, 64...
    analyser.fftSize = 1024;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
}

function getAverageVolume(array) {
    var values = 0;
    var average;
    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
        values += array[i];
    }

    average = values / length;
    return average;
}
