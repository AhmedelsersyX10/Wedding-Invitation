import { motion } from "framer-motion";

/**
 * MainContent Component
 *
 * Displays the core invitation content:
 * - Bismillah / Quranic verse
 * - Ornamental dividers
 * - Bride and Groom names
 * - Couple illustration placeholder
 * - Wedding date
 */

// Animation variants for staggered reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const MainContent = () => {
  return (
    <motion.section
      className="section-container text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ===== Bismillah ===== */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="text-2xl md:text-3xl font-cairo font-bold text-maroon leading-relaxed">
          بسم الله الرحمن الرحيم
        </p>
      </motion.div>
      {/* ===== Quranic Verse ===== */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="decorative-frame">
          <p className="text-sm md:text-base font-cairo text-dark-text/80 leading-loose">
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
          </p>
        </div>
      </motion.div>
      {/* ===== Ornamental Divider ===== */}
      <motion.div variants={itemVariants} className="ornament-divider">
        <span className="text-gold text-xl">✦</span>
      </motion.div>

      {/* ===== Couple Illustration Placeholder ===== */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative w-64 h-64 mx-auto">
          {/* Decorative ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-rose/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          {/* Illustration circle */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-rose-light/50 to-cream-dark flex items-center justify-center overflow-hidden border border-gold/20">
            <div className="text-center">
              <img src="public/couple.png" alt="Couple" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== Bride & Groom Names ===== */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative py-6">
          {/* Groom name */}
          <motion.h1
            className="font-cairo text-4xl md:text-5xl font-bold text-maroon mb-8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            عمرو
          </motion.h1>

          {/* Ampersand / Connector */}
          <div className="flex items-center justify-center gap-8 my-8">
            <div className="w-16 h-px bg-gradient-to-l from-gold to-transparent" />
            <motion.span
              className="text-3xl text-gold font-cairo"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>

          {/* Bride name */}
          <motion.h1
            className="font-cairo text-4xl md:text-5xl font-bold text-maroon"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            آية
          </motion.h1>
        </div>

        {/* ===== Ornamental Divider ===== */}
        <motion.div variants={itemVariants} className="ornament-divider">
          <span className="text-gold text-xl">✦</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <p className="font-cairo text-base text-dark-text/70 leading-relaxed">
            بكل الحب والسعادة، يتشرفان بدعوتكم لمشاركتهما فرحة الزفاف
          </p>
        </motion.div>
      </motion.div>

      {/* ===== Wedding Date ===== */}
      <motion.div variants={itemVariants} className="mb-4">
        <p className="font-cairo text-sm text-dark-text/60 mb-2">بتاريخ</p>
        <div className="glass-card p-10 inline-block">
          <p className="font-cairo text-4xl md:text-4xl font-bold text-maroon">
            الخميس
          </p>
          <p className="font-cairo text-4xl md:text-4xl font-black text-shimmer mt-4">
            1 أكتوبر 2026
          </p>
          <p className="font-cairo text-lg text-gold-dark mt-4">
            الساعة 8 :00 مساءً
          </p>
        </div>
      </motion.div>
      {/* ===== Bottom Ornament ===== */}
      <motion.div variants={itemVariants} className="ornament-divider mt-8">
        <span className="text-gold text-xl">✦</span>
      </motion.div>
    </motion.section>
  );
};

export default MainContent;
