import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { musicData } from "@/utils/musicTrack";
import {
  playMusic,
  pauseMusic,
  setTrack,
  setVolume,
  toggleLoop,
  syncAudioState,
} from "@/app/slices/musicSlice";
function useAudioPlayer() {
  const dispatch = useDispatch();

  const { isPlaying, currentTrack, currentTime, duration, volume, isLooping } =
    useSelector((state) => state.music);

  const currentIndex = musicData.findIndex(
    (track) => track.id === currentTrack?.id,
  );

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseMusic());

      chrome.runtime.sendMessage({
        type: "PAUSE",
      });
    } else {
      dispatch(playMusic());

      chrome.runtime.sendMessage({
        type: "PLAY",
        src: currentTrack.src,
      });
    }
  };

  const handleNext = () => {
    const nextTrack =
      musicData[currentIndex === musicData.length - 1 ? 0 : currentIndex + 1];

    dispatch(setTrack(nextTrack));

    chrome.runtime.sendMessage({
      type: "SET_TRACK",
      src: nextTrack.src,
    });
  };

  const handlePrev = () => {
    const prevTrack =
      musicData[currentIndex === 0 ? musicData.length - 1 : currentIndex - 1];

    dispatch(setTrack(prevTrack));

    chrome.runtime.sendMessage({
      type: "SET_TRACK",
      src: prevTrack.src,
    });
  };

  const handleTrackChange = (track) => {
    dispatch(setTrack(track));

    chrome.runtime.sendMessage({
      type: "SET_TRACK",
      src: track.src,
    });
  };

  const handleVolumeChange = (value) => {
    dispatch(setVolume(value));

    chrome.runtime.sendMessage({
      type: "SET_VOLUME",
      volume: value,
    });
  };

  const handleToggleLoop = () => {
    dispatch(toggleLoop());

    chrome.runtime.sendMessage({
      type: "SET_LOOP",
      loop: !isLooping,
    });
  };

  const handleSeek = (newTime) => {
    chrome.runtime.sendMessage({
      type: "SEEK",
      currentTime: newTime,
    });
  };
  useEffect(() => {
    const listener = (message) => {
      if (message.type !== "AUDIO_STATE") return;
      if (message.type === "FOCUS_SESSION_COMPLETED") {
        window.location.reload();
      }
      dispatch(syncAudioState(message));
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, [dispatch]);
  return {
    currentTime,
    duration,

    isPlaying,
    currentTrack,
    volume,
    isLooping,

    handlePlayPause,
    handleNext,
    handlePrev,
    handleSeek,
    handleTrackChange,
    handleVolumeChange,
    handleToggleLoop,
  };
}

export default useAudioPlayer;
