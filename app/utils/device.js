let videoElement;
const audioInputSelect = document.querySelector('select#audioSource');
const audioOutputSelect = document.querySelector('select#audioOutput');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];
const getUserMedia = require('getusermedia');
const capture = require('rtc-captureconfig');

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map((select) =>
    select.value
  );
  selectors.forEach((select) => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (const i = 0; i !== deviceInfos.length; i + 1) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label ||
          'microphone ' + (audioInputSelect.length + 1);
      audioInputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'audiooutput') {
      option.text = deviceInfo.label || 'speaker ' +
          (audioOutputSelect.length + 1);
      audioOutputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some((n) =>
      n.value === values[selectorIndex]
    )) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
    .catch((error) => {
      let errorMessage = error;
      if (error.name === 'SecurityError') {
        errorMessage = 'You need to use HTTPS for selecting audio output ' +
            'device: ' + error;
      }
      console.error(errorMessage);
      // Jump back to first output device in the list as it's the default.
      audioOutputSelect.selectedIndex = 0;
    });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function changeAudioDestination() {
  videoElement = document.getElementById('l-video');
  const audioDestination = audioOutputSelect.value;
  attachSinkId(videoElement, audioDestination);
}

function gotStream(stream) {
  videoElement = document.getElementById('l-video');
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const audioSource = audioInputSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

audioInputSelect.onchange = start;
audioOutputSelect.onchange = changeAudioDestination;
videoSelect.onchange = start;

start();

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// get the sources
MediaStreamTrack.getSources((sources) => {
  const constraints = capture('camera:0').toConstraints({ sources: sources });

  // get user media
  getUserMedia(constraints, (err, stream) => {
    if (err) {
      return console.log('Could not capture stream: ', err);
    }

    console.log('captured stream: ', stream);
  });
});

function toggleMic(stream) { // stream is your local WebRTC stream
  const audioTracks = stream.getAudioTracks();
  for (const i = 0, l = audioTracks.length; i < l; i + 1) {
    audioTracks[i].enabled = !audioTracks[i].enabled;
  }
}
