var trackContainer = document.getElementById('tracks'),
    trackTemplate = document.getElementById('track-template'),
    track = [],
    feedbackElement = document.getElementById('feedback');
    recordButton = document.getElementById('record'),
    stopButton = document.getElementById('stop');
    audioContext = new AudioContext(),
    audioContextStreamDest = audioContext.createMediaStreamDestination(),
    kickStream = kick.mozCaptureStream(),
    snareStream = snare.mozCaptureStream(),
    hihatStream = hihat.mozCaptureStream(),
    clapStream = clap.mozCaptureStream(),
    kickSource = audioContext.createMediaStreamSource(kickStream),
    snareSource = audioContext.createMediaStreamSource(snareStream),
    hihatSource = audioContext.createMediaStreamSource(hihatStream),
    clapSource = audioContext.createMediaStreamSource(clapStream);

var Recorder = new MediaRecorder(audioContextStreamDest.stream);
    Recorder.ondataavailable = function (chunk) {
        track.push(chunk.data);
    }
    Recorder.onstop = function () {
        var trackBlob = new Blob(track, { 'type' : 'audio/ogg; codecs=opus'});
        var trackURL = URL.createObjectURL(trackBlob);
        addTrack(trackURL);
        track = [];
    }


kickSource.connect(audioContextStreamDest);
kickSource.connect(audioContext.destination);
snareSource.connect(audioContextStreamDest);
snareSource.connect(audioContext.destination);
hihatSource.connect(audioContextStreamDest);
hihatSource.connect(audioContext.destination);
clapSource.connect(audioContextStreamDest);
clapSource.connect(audioContext.destination);



function playTrack (event) {
    var audio = this.querySelector('audio');
    var icon = this.querySelector('i');
        if(audio.paused) {
            audio.play();
            icon.innerHTML = 'stop';
        } else {
            audio.pause();
            icon.innerHTML = 'play_arrow';
        }
    audio.onended = function () {
        icon.innerHTML = 'play_arrow';
    }    
    audio.currentTime = 0;
}

function addTrack(blobURL) {
    var name = trackTemplate.content.children[0].children[0];
    var audio = trackTemplate.content.children[0].children[1].querySelector('audio');
    var dl = trackTemplate.content.children[0].children[2].querySelector('a');
    name.textContent = 'Track' + trackContainer.childElementCount;
    audio.src = blobURL;
    dl.href = blobURL;
    trackContainer.appendChild(trackTemplate.content.cloneNode(true));
    trackContainer.children[trackContainer.childElementCount-1].children[1].addEventListener('click', playTrack);
}
function record() {
    Recorder.start();
    recordButton.children[0].classList.add('recording');
    recordButton.removeEventListener('click', record);
    stopButton.addEventListener('click', stop);
}

function stop() {
    Recorder.stop();
    recordButton.children[0].classList.remove('recording')
    recordButton.addEventListener('click', record);
    stopButton.removeEventListener('click', stop);
}

recordButton.addEventListener('click', record);