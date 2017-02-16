var kick = document.getElementById('kick'),
    hihat = document.getElementById('hihat'),
    snare = document.getElementById('snare'),
    clap = document.getElementById('clap'),
    controls = document.querySelectorAll('.inst-controls');

function playInst (event) {
    var code = event.keyCode;
    if (code === 83) { // 83 = s
        snare.currentTime = 0;
        snare.play();
        return;
    } else if (code === 67) { // 67 = c
        clap.currentTime = 0;
        clap.play();
        return;
    } else if (code === 72) { // 72 = h
        hihat.currentTime = 0;
        hihat.play();
        return;
    } else if (code === 75) { // 75 = k
        kick.currentTime = 0;
        kick.play();
        return;
    } else {
        return;
    }
}
function changeVolume (event) {
    var val = this.value;
    var valString = '0.' + val;
    var valFloat = parseFloat(valString);
    if (val.length === 1) {
        this.parentElement.nextElementSibling.volume = valFloat;
    } else if (val.length === 2) {
        this.parentElement.nextElementSibling.volume = 1;
    }
}
Array.prototype.forEach.call (controls, function (control) {
    var volumebar = control.children[1];
        volumebar.value = 10;
        control.nextElementSibling.volume = 1;
    volumebar.addEventListener('change', changeVolume);
});
window.addEventListener('keydown', playInst);