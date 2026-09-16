import { motion } from "framer-motion";

/**
 * ActionButtons Component
 *
 * Provides two action cards:
 * 1. Add event to Google Calendar
 * 2. Navigate to the wedding venue via Google Maps
 */

// Google Calendar event details — customize these
const CALENDAR_EVENT = {
  title: "حفل زفاف عمرو وآية",
  date: "20261225T200000", // Format: YYYYMMDDTHHMMSS
  endDate: "20261226T010000", // End time
  location: "قاعة بيلا",
  description: "يسعدنا حضوركم حفل زفاف عمرو وآية",
};

// Google Maps coordinates — customize these
const VENUE = {
  name: "قاعة بيلا",
  address: "أول طريق جنزور ، شبين الكوم",
  lat: "24.7136",
  lng: "46.6753",
};

/**
 * Generate a Google Calendar event URL
 */
const generateCalendarUrl = () => {
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CALENDAR_EVENT.title,
    dates: `${CALENDAR_EVENT.date}/${CALENDAR_EVENT.endDate}`,
    location: CALENDAR_EVENT.location,
    details: CALENDAR_EVENT.description,
  });
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generate a Google Maps URL
 */
const generateMapsUrl = () => {
  return `https://maps.app.goo.gl/h3qF4C5LVT4SsATW9`;
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const ActionButtons = () => {
  return (
    <motion.section
      className="section-container space-y-5"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {/* ===== Google Calendar Button ===== */}
      <motion.a
        href={generateCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="block"
      >
        <div className="glass-card p-5 flex items-center gap-4 cursor-pointer hover:border-maroon/30 transition-all duration-300 group">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-maroon to-maroon-light flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
            <svg
              className="w-7 h-7 text-cream"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-right">
            <p className="font-cairo text-base font-bold text-dark-text">
              أضف الحدث إلى تقويم جوجل
            </p>
            <p className="font-cairo text-xs text-dark-text/50 mt-1">
              احفظ الموعد في تقويمك
            </p>
          </div>

          {/* Arrow */}
          <svg
            className="w-5 h-5 text-gold flex-shrink-0 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
      </motion.a>

      {/* ===== Google Maps / Location Card ===== */}
      <motion.div variants={itemVariants}>
        <div className="glass-card overflow-hidden">
          {/* Location header */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p className="font-cairo text-base font-bold text-dark-text">
                  {VENUE.name}
                </p>
                <p className="font-cairo text-xs text-dark-text/50">
                  {VENUE.address}
                </p>
              </div>
            </div>

            {/* Mini map placeholder */}
            <div className="w-full h-32 rounded-xl bg-gradient-to-br from-cream-dark to-rose-light/30 flex items-center justify-center border border-gold/20 mb-4">
              <div className="text-center">
                <svg
                  className="w-8 h-8 text-maroon/40 mx-auto mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                <p className="text-xs text-dark-text/40 font-cairo">
                  الموقع على الخريطة
                </p>
              </div>
            </div>

            {/* Navigate button */}
            <motion.a
              href={generateMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-xl bg-gradient-to-l from-maroon to-maroon-light text-cream font-cairo font-bold text-sm text-center shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                الوصول للقاعة عبر الخريطة
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ActionButtons;
