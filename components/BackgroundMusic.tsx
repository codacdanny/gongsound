"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Generates a soothing ambient pad using Web Audio API.
 * Multiple sine wave oscillators at low frequencies create a calm, evolving soundscape.
 */
export default function BackgroundMusic() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        // Master volume control
        const masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        masterGain.gain.value = 0; // Start muted for browser autoplay policy
        masterGainRef.current = masterGain;

        // Create a soothing pad: multiple low-frequency sine waves
        const baseFrequencies = [55, 110, 165]; // Low bass notes (A1, A2, A3)

        baseFrequencies.forEach((baseFreq, idx) => {
          const osc = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          osc.type = "sine";
          osc.frequency.value = baseFreq;

          // Soft, subtle volume (0.06 - 0.12 range for each oscillator)
          gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);

          // Gentle LFO modulation for evolving texture (very slow)
          const lfo = audioContext.createOscillator();
          const lfoGain = audioContext.createGain();
          lfo.frequency.value = 0.05 + idx * 0.02; // Slow evolving: 0.05, 0.07, 0.09 Hz
          lfoGain.gain.value = 0.015; // Subtle pitch variation

          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);

          // Connect oscillator to master
          osc.connect(gainNode);
          gainNode.connect(masterGain);

          // Start both oscillators
          osc.start();
          lfo.start();

          oscillatorsRef.current.push(osc);
        });
      } catch (err) {
        console.warn("Background music failed to initialize:", err);
      }
    };

    // Initialize on first interaction or immediately
    initAudio();

    return () => {
      // Cleanup: stop all oscillators
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      oscillatorsRef.current = [];
    };
  }, []);

  const toggleMute = () => {
    if (!masterGainRef.current || !audioContextRef.current) return;

    if (isMuted) {
      // Fade in
      masterGainRef.current.gain.setTargetAtTime(
        0.12,
        audioContextRef.current.currentTime,
        0.15,
      );
      setIsMuted(false);
    } else {
      // Fade out
      masterGainRef.current.gain.setTargetAtTime(
        0,
        audioContextRef.current.currentTime,
        0.5,
      );
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
