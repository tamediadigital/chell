export default function toggleMic(stream) {
  const audioTracks = stream.getAudioTracks();
  for (let i = 0, l = audioTracks.length; i < l; i += 1) {
    audioTracks[i].enabled = false;
    audioTracks[i].stop();
  }
}
