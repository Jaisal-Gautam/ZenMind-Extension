import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePreferences } from "@/app/slices/setting/settingsThunk";
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
  const volumeTimeout = useRef(null);

  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    volume,
    isLooping,
  } = useSelector((state) => state.music);

  const currentIndex = musicData.findIndex(
    (track) => track.id === currentTrack?.id,
  );

  // -------------------------
  // Preference helpers
  // -------------------------

  const savePreference = async (data, errorMessage) => {
    try {
      await dispatch(updatePreferences(data)).unwrap();
    } catch (err) {
      console.error(errorMessage, err);
    }
  };

  const saveTrackPreference = (track) => {
    savePreference(
      {
        defaultMusic: track.id,
      },
      "Failed to save default music:",
    );
  };

  const saveVolumePreference = (value) => {
    if (volumeTimeout.current) {
      clearTimeout(volumeTimeout.current);
    }

    volumeTimeout.current = setTimeout(() => {
      savePreference(
        {
          defaultMusicVolume: value,
        },
        "Failed to save volume:",
      );
    }, 400);
  };

  const saveLoopPreference = (loop) => {
    savePreference(
      {
        musicLoop: loop,
      },
      "Failed to save loop preference:",
    );
  };

  // -------------------------
  // Player controls
  // -------------------------

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

  const handleTrackChange = (track) => {
    dispatch(setTrack(track));

    chrome.runtime.sendMessage({
      type: "SET_TRACK",
      src: track.src,
    });

    saveTrackPreference(track);
  };

  const handleNext = () => {
    const nextTrack =
      musicData[currentIndex === musicData.length - 1 ? 0 : currentIndex + 1];

    handleTrackChange(nextTrack);
  };

  const handlePrev = () => {
    const prevTrack =
      musicData[currentIndex === 0 ? musicData.length - 1 : currentIndex - 1];

    handleTrackChange(prevTrack);
  };

  const handleVolumeChange = (value) => {
    dispatch(setVolume(value));

    chrome.runtime.sendMessage({
      type: "SET_VOLUME",
      volume: value,
    });

    saveVolumePreference(value);
  };

  const handleToggleLoop = () => {
    const nextLoopState = !isLooping;

    dispatch(toggleLoop());

    chrome.runtime.sendMessage({
      type: "SET_LOOP",
      loop: nextLoopState,
    });

    saveLoopPreference(nextLoopState);
  };

  const handleSeek = (newTime) => {
    chrome.runtime.sendMessage({
      type: "SEEK",
      currentTime: newTime,
    });
  };

  // -------------------------
  // Sync from service worker
  // -------------------------

  useEffect(() => {
    const listener = (message) => {
      if (message.type === "AUDIO_STATE") {
        dispatch(syncAudioState(message));
      } else if (message.type === "AUDIO_ENDED") {
        let activeIndex = currentIndex;
        if (message.src) {
          const found = musicData.findIndex((track) => {
            const cleanSrc = message.src.split("?")[0].split("#")[0];
            const cleanTrackSrc = track.src.split("?")[0].split("#")[0];
            return cleanSrc.endsWith(cleanTrackSrc) || cleanTrackSrc.endsWith(cleanSrc) || cleanSrc.includes(cleanTrackSrc);
          });
          if (found !== -1) {
            activeIndex = found;
          }
        }
        const nextIndex = activeIndex === musicData.length - 1 ? 0 : activeIndex + 1;
        handleTrackChange(musicData[nextIndex]);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, [dispatch, currentIndex]);

  // -------------------------
  // Cleanup
  // -------------------------

  useEffect(() => {
    return () => {
      if (volumeTimeout.current) {
        clearTimeout(volumeTimeout.current);
      }
    };
  }, []);

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