import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Hero Component — Animated Envelope
 * 
 * Displays a beautiful envelope that the user clicks to "open" the invitation.
 * Uses Framer Motion for the opening animation sequence.
 * 
 * @param {Object} props
 * @param {Function} props.onOpen - Callback when the envelope is opened
 */
const Hero = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Delay before revealing content
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        // ===== CLOSED ENVELOPE STATE =====
        <motion.div
          key="envelope-closed"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream particles-bg"
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Decorative sparkles */}
          <motion.div
            className="absolute top-20 right-10 w-2 h-2 bg-gold rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-40 left-16 w-1.5 h-1.5 bg-maroon/40 rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.div
            className="absolute bottom-32 right-20 w-2 h-2 bg-rose rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
          />
          <motion.div
            className="absolute top-60 left-8 w-1 h-1 bg-gold-light rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
          />

          {/* Envelope container */}
          <motion.div
            className="cursor-pointer"
            onClick={handleOpen}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Envelope SVG */}
            <motion.div
              className="relative w-72 h-52 envelope-shadow rounded-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-b from-cream-dark to-cream rounded-xl border-2 border-gold/30 overflow-hidden">
                {/* Inner pattern */}
                <div className="absolute inset-3 border border-gold/15 rounded-lg" />
                
                {/* Decorative lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 text-center">
                  <div className="w-full h-px bg-gold/30 mb-2" />
                  <div className="w-3/4 mx-auto h-px bg-gold/20 mb-2" />
                  <div className="w-1/2 mx-auto h-px bg-gold/15" />
                </div>
              </div>

              {/* Envelope flap (triangle) */}
              <div className="absolute -top-0.5 left-0 right-0">
                <svg viewBox="0 0 288 100" className="w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F5EDE3" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,0 288,0 144,85"
                    fill="url(#flapGradient)"
                    stroke="#C9A96E"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                </svg>
              </div>

              {/* Wax seal */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center shadow-lg border-2 border-maroon-light/30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-cream text-lg">❤</span>
              </motion.div>
            </motion.div>

            {/* "Click to open" text */}
            <motion.p
              className="mt-10 text-center font-cairo text-lg font-semibold text-maroon"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              اضغط لفتح الدعوة
            </motion.p>

            {/* Tap icon hint */}
            <motion.div
              className="mt-3 flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Bottom decorative text */}
          <motion.p
            className="absolute bottom-8 text-sm text-gold/60 font-cairo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            ✦ دعوة زفاف ✦
          </motion.p>
        </motion.div>
      ) : (
        // ===== OPENING ANIMATION STATE =====
        <motion.div
          key="envelope-opening"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Envelope opens — flap rotates up */}
          <motion.div className="relative w-72 h-52 rounded-xl">
            {/* Envelope body fades and scales down */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cream-dark to-cream rounded-xl border-2 border-gold/30"
              animate={{ scale: [1, 1.05, 0.8], opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            {/* Flap opens */}
            <motion.div
              className="absolute -top-0.5 left-0 right-0 origin-top"
              animate={{ rotateX: [0, 180] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg viewBox="0 0 288 100" className="w-full" preserveAspectRatio="none">
                <polygon
                  points="0,0 288,0 144,85"
                  fill="#F5EDE3"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
              </svg>
            </motion.div>

            {/* Card slides out */}
            <motion.div
              className="absolute inset-4 bg-white rounded-lg shadow-md flex items-center justify-center"
              animate={{ y: [0, -120], opacity: [1, 0] }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              <p className="text-maroon font-cairo font-bold text-lg">بسم الله الرحمن الرحيم</p>
            </motion.div>
          </motion.div>

          {/* Radial burst effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-gold/10 to-transparent"
            animate={{ scale: [0, 3], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hero;
