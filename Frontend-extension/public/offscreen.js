const audio = document.getElementById("player");



chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.type) {
    case "OFFSCREEN_PLAY": {
        if (!audio.src){
            audio.src = chrome.runtime.getURL(message.src);
        }
      audio.play().catch(console.error);
      break;
    }
    case "PAUSE":
      audio.pause();
      break;
    case "SET_TRACK":
      if (!message.src) break;
      audio.src = chrome.runtime.getURL(message.src);
        audio.play().catch(console.error);
      break;
    case "SET_VOLUME":
      audio.volume = message.volume / 100;
      break;
    case "SET_LOOP":
      audio.loop = message.loop;
      break;
    case "SEEK":
      audio.currentTime = message.currentTime;
      break;
  }
});
let lastSent = 0;

const sendAudioState = () => {
  const now = Date.now();

  if (now - lastSent < 250) return;

  lastSent = now;

  chrome.runtime.sendMessage({
    type: "AUDIO_STATE",
    currentTime: audio.currentTime,
    duration: audio.duration,
    isPlaying: !audio.paused,
    volume: audio.volume,
    loop: audio.loop,
    src: audio.src,
  });
};

audio.addEventListener("timeupdate", sendAudioState);