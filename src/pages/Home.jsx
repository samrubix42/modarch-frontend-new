import { useState, useEffect } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Projects from "./Projects";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
    const [showPreloader, setShowPreloader] = useState(() => {
        return !sessionStorage.getItem("preloaderShown");
    });

    return (
        <>
            <AnimatePresence mode="wait">
                {showPreloader && <Preloader key="preloader" />}
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        delay: showPreloader ? 6.5 : 0
                    }}
                >
                    <Projects />
                </motion.div>
            </AnimatePresence>
        </>
    );
};
export default Home;