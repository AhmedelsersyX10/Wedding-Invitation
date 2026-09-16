import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AudioPlayer Component
 * 
 * A floating Play/Pause button fixed at the bottom-left of the screen (RTL layout).
 * Plays background wedding music.
 * 
 * To add your own music:
 * 1. Place an MP3 file at `public/music.mp3`
 * 2. The player will automatically pick it up
 */

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser may block autoplay — user interaction required
        console.log('Audio playback requires user interaction');
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={togglePlay}
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-maroon to-maroon-dark text-cream shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
    >
      {/* Pulse ring when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-maroon-light"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      {/* Play / Pause icon */}
      {isPlaying ? (
        // Pause icon — animated bars
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1 bg-cream rounded-full"
            animate={{ height: [12, 18, 12] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.div
            className="w-1 bg-cream rounded-full"
            animate={{ height: [18, 12, 18] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.div
            className="w-1 bg-cream rounded-full"
            animate={{ height: [12, 18, 12] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      ) : (
        // Play icon
        <svg className="w-6 h-6 mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
};

export default AudioPlayer;
