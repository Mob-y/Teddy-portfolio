import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const QuestNotification = ({ isBadeline }) => {
  const [questData, setQuestData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleQuestUpdate = (event) => {
      // CORRECTION : Utilisation de l'optional chaining ?. partout
      const data = event.detail?.quest ?? event.detail;

      // CORRECTION : Vérification sécurisée du titre avec l'optional chaining
      if (data?.title && !data.title.toLowerCase().includes("niveau")) {
        setQuestData(data);
        setShow(true);
        const timer = setTimeout(() => setShow(false), 5000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("questUpdated", handleQuestUpdate);
    return () => window.removeEventListener("questUpdated", handleQuestUpdate);
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {show && questData && (
        <div 
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999999,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              minWidth: "320px",
              pointerEvents: "auto",
            }}
          >
            <div
              className={`border-4 p-4 shadow-2xl ${
                isBadeline
                  ? "bg-purple-950 border-purple-500 text-purple-100"
                  : "bg-blue-950 border-blue-500 text-blue-100"
              }`}
              style={{ imageRendering: "pixelated" }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏆</div>
                <div className="flex flex-col text-left">
                  <h4 className="text-xl font-bold uppercase tracking-tighter leading-none">
                    Quête Accomplie
                  </h4>
                  <p className="text-lg opacity-90 leading-tight font-bold">
                    {questData.title}
                  </p>
                  <p
                    className="text-sm font-bold mt-1"
                    style={{ color: isBadeline ? "#fb7185" : "#0ea5e9" }}
                  >
                    +{questData.xp ?? 0} XP
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default QuestNotification;