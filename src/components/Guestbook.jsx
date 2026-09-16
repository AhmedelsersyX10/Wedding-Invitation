import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Guestbook Component
 *
 * Allows guests to leave congratulation messages.
 * Messages are stored in and read from Firebase Firestore in real-time.
 *
 * Firestore collection: "messages"
 * Document fields: { name, message, createdAt }
 */

const Guestbook = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // ===== Fetch messages in real-time =====
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      },
      (err) => {
        console.error("Error fetching messages:", err);
        // Don't show error to user if Firebase isn't configured yet
      },
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // ===== Handle form submission =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      // Reset form and show success
      setName("");
      setMessage("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("حدث خطأ أثناء الإرسال. تأكد من إعداد Firebase.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Format Firestore timestamp to Arabic-friendly date string
   */
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.section
      className="section-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ===== Section Title ===== */}
      <div className="text-center mb-8">
        <motion.h2
          className="font-cairo text-2xl font-bold text-maroon"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          رسائل التهنئة
        </motion.h2>
        <div className="ornament-divider mt-3">
          <span className="text-gold text-sm">✦</span>
        </div>
        <p className="font-cairo text-sm text-dark-text/50">
          شاركونا فرحتنا بكلمة طيبة
        </p>
      </div>

      {/* ===== Message Form ===== */}
      <motion.form
        onSubmit={handleSubmit}
        className="glass-card p-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Name input */}
        <div className="mb-4">
          <label className="block font-cairo text-sm font-semibold text-dark-text/70 mb-2">
            الاسم
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="أدخل اسمك الكريم"
            className="w-full px-4 py-3 rounded-xl bg-cream/80 border border-gold/20 font-cairo text-sm text-dark-text placeholder:text-dark-text/30 transition-all duration-300 focus:border-gold/50"
            maxLength={50}
          />
        </div>

        {/* Message textarea */}
        <div className="mb-4">
          <label className="block font-cairo text-sm font-semibold text-dark-text/70 mb-2">
            رسالتكم
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-cream/80 border border-gold/20 font-cairo text-sm text-dark-text placeholder:text-dark-text/30 resize-none transition-all duration-300 focus:border-gold/50"
            maxLength={300}
          />
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              className="font-cairo text-xs text-red-500 mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-l from-maroon to-maroon-light text-cream font-cairo font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                className="inline-block w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              جاري الإرسال...
            </span>
          ) : (
            "إرسال التهنئة ✨"
          )}
        </motion.button>

        {/* Success message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="font-cairo text-sm text-green-600 font-semibold">
                ✅ تم إرسال رسالتك بنجاح! شكراً لكم
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* ===== Messages List ===== */}
      <div className="space-y-4">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-4xl mb-3 block">💌</span>
              <p className="font-cairo text-sm text-dark-text/40">
                كن أول من يترك رسالة تهنئة
              </p>
            </motion.div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                className="glass-card p-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Message header */}
                <div className="flex items-center gap-3 mb-2">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon/20 to-rose/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-cairo text-sm font-bold text-maroon">
                      {msg.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-cairo text-sm font-bold text-dark-text">
                      {msg.name}
                    </p>
                    <p className="font-cairo text-[10px] text-dark-text/40">
                      {formatDate(msg.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Message body */}
                <p className="font-cairo text-sm text-dark-text/70 leading-relaxed pr-12">
                  {msg.message}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Guestbook;
