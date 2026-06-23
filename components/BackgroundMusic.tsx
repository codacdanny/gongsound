"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Background ambient music player. Plays automatically (unmuted) on page load.
 * User can mute/unmute with the button in the corner.
 * Music URL is fetched from admin settings.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);

  // Fetch music URL from settings
  useEffect(() => {
    const fetchMusicUrl = async () => {
      try {
        const res = await fetch("/api/settings", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setMusicUrl(data.backgroundMusicUrl);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setMusicUrl("/ambient.mp3"); // Fallback to default
      }
    };

    fetchMusicUrl();
  }, []);

  useEffect(() => {
    if (!musicUrl) return;

    // Create and setup audio element with fetched URL
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.25; // 25% volume, soothing level
    audioRef.current = audio;

    // Try to autoplay (unmuted by default)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay blocked by browser; user will need to click unmute button
        console.warn("Autoplay blocked:", err);
        setIsMuted(true);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [musicUrl]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      // Unmute
      audioRef.current.play().catch(console.warn);
      setIsMuted(false);
    } else {
      // Mute
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute ambient music" : "Mute ambient music"}
      data-cursor-label={isMuted ? "Unmute" : "Mute"}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold/70 transition-all hover:border-gold hover:text-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:bottom-8 sm:right-8"
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" aria-hidden />
      ) : (
        <Volume2 className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
