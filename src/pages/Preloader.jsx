import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [startSlide, setStartSlide] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Start sliding text & bg together after some delay
    const timer = setTimeout(() => {
      setStartSlide(true);

      // Remove preloader after slide animation finishes
      const mainContentTimer = setTimeout(() => {
        setShowMainContent(true);
      }, 2000); // match slide duration

      return () => clearTimeout(mainContentTimer);
    }, 4500); // wait for initial letter animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!showMainContent && (
        <motion.div
          key="preloader-bg"
          className="preloader-bg"
          initial={{ y: 0 }}
          animate={{ y: startSlide ? "-100%" : 0}}
          transition={{duration: 2, ease: "easeInOut" }}
        >
          <div id="preloader">
            <motion.div
              id="letter-box"
              className={`letter-container ${startSlide ? "slide-preloader" : ""}`}
              animate={{ y: startSlide ? "-100%" : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <span className="letter">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}frontend/images/modarchindia/logo-green.png`}
                  alt="logo"
                />
              </span>
              {"MODARCHINDIA".split("").map((char, i) => (
                <span className="letter" key={i}>
                  {char}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
