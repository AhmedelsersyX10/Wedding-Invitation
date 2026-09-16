import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Countdown from "./components/Countdown";
import ActionButtons from "./components/ActionButtons";
import Guestbook from "./components/Guestbook";
import AudioPlayer from "./components/AudioPlayer";

/**
 * App Component — Root Orchestrator
 *
 * Manages the invitation flow:
 * 1. Envelope (Hero) is shown first
 * 2. On click → envelope opens → reveals all content sections
 * 3. AudioPlayer floats above everything
 */

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream particles-bg font-cairo">
      {/* ===== Mobile-First Container ===== */}
      {/* Centers content like a phone screen on desktop */}
      <div className="relative max-w-md mx-auto min-h-screen bg-cream shadow-2xl shadow-maroon/5">
        {/* ===== Envelope Hero ===== */}
        <AnimatePresence mode="wait">
          {!isOpen && <Hero onOpen={() => setIsOpen(true)} />}
        </AnimatePresence>

        {/* ===== Main Invitation Content ===== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="invitation-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Top decorative header */}
              <div className="relative overflow-hidden">
                {/* Decorative top arc */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-maroon/5 to-transparent" />

                {/* Floating corner decorations */}
                <motion.div
                  className="absolute top-4 right-4 text-gold/20 text-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ✦
                </motion.div>
                <motion.div
                  className="absolute top-4 left-4 text-gold/20 text-2xl"
                  animate={{ rotate: [360, 0] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ✦
                </motion.div>
              </div>

              {/* Main Content — Bismillah, Names, Date */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <MainContent />
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Countdown />
              </motion.div>

              {/* Section Divider */}
              <div className="w-full px-12">
                <div className="h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
              </div>

              {/* Action Buttons — Calendar & Maps */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <ActionButtons />
              </motion.div>

              {/* Section Divider */}
              <div className="w-full px-12">
                <div className="h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
              </div>

              {/* Guestbook — Messages */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Guestbook />
              </motion.div>

              {/* ===== Footer ===== */}
              <motion.footer
                className="section-container text-center pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <div className="ornament-divider">
                  <span className="text-gold text-sm">✦</span>
                </div>
                <p className="font-cairo text-sm text-dark-text/40 mt-4">
                  نتشرف بحضوركم ومشاركتنا فرحتنا
                </p>
                <motion.p
                  className="font-cairo text-lg text-maroon/60 mt-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤
                </motion.p>
                <p className="font-cairo text-[14px] text-dark-text/30 mt-4">
                  صُممت بكل الحب بواسطة
                </p>
                <p className="font-cairo text-[22px] text-dark-text mt-4">
                  Ahmed Elsersy
                </p>
                <p className="font-cairo text-[10px] text-dark-text/60 mt-2">
                  Software Developer - Flutter Developer
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Floating Audio Player ===== */}
        {/* {isOpen && <AudioPlayer />} */}
      </div>
    </div>
  );
};

export default App;
