import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Countdown Component
 *
 * Displays a live countdown timer to the wedding date.
 * Shows Days, Hours, Minutes, and Seconds in styled boxes with Arabic labels.
 *
 * @param {Object} props
 * @param {string} props.targetDate - ISO date string for the wedding date
 */

// Target wedding date — change this to your actual wedding date
const WEDDING_DATE = new Date("2026-10-01T20:00:00");

/**
 * Calculate the time remaining until the target date
 */
const calculateTimeLeft = () => {
  const now = new Date();
  const difference = WEDDING_DATE - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

/**
 * Individual countdown box component
 */
const CountdownBox = ({ value, label, index }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-maroon/20 to-gold/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />

      {/* Box */}
      <div className="relative glass-card w-[72px] h-[80px] md:w-20 md:h-24 flex items-center justify-center">
        <motion.span
          key={value}
          className="font-cairo text-3xl md:text-4xl font-black text-maroon"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
    </div>

    {/* Label */}
    <p className="font-cairo text-xs md:text-sm text-gold-dark mt-2 font-semibold">
      {label}
    </p>
  </motion.div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ];

  return (
    <motion.section
      className="section-container text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Section title */}
      <motion.p
        className="font-cairo text-lg font-semibold text-dark-text/70 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        الوقت المتبقي على الحفل
      </motion.p>

      {/* Countdown boxes */}
      <div className="flex justify-center gap-3 md:gap-5 direction-ltr">
        {timeUnits.map((unit, index) => (
          <CountdownBox
            key={unit.label}
            value={unit.value}
            label={unit.label}
            index={index}
          />
        ))}
      </div>

      {/* Decorative bottom */}
      <motion.div
        className="mt-8 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-gold/40">✦</span>
        <span className="text-rose/40">✦</span>
        <span className="text-gold/40">✦</span>
      </motion.div>
    </motion.section>
  );
};

export default Countdown;
