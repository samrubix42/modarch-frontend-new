import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useData } from "../context/DataContext";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function MotionSlider({ projectId, carouselMargin = 40, topMargin = 50, fontSize = "16px", opacity = 1, display, drag = "x", index, justified, classs, itemClass, xs }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,       // Animation duration
      offset: 100,          // How far from viewport the animation should trigger
      delay: 100,           // Delay between elements
      once: false,          // Run every time you scroll up/down
      mirror: true,         // Run again when scrolling back up
      easing: "ease-in-out", // Smooth easing
      // anchorPlacement: "top-bottom", // Where the trigger happens
    });
  }, []);
  const carouselRef = useRef();
  const innerCarouselRef = useRef();
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [hasNudged, setHasNudged] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (justified === 'start') {
      x.set(0);
    }
  }, [justified, x]);

  const { projectData } = useData();
  // filter the project using slug key
  const project = projectData.find((item) => item.slug === projectId);
  const mediaItems = project?.content;

  useEffect(() => {
    let intervalId;
    const updateWidth = () => {
      if (carouselRef.current && innerCarouselRef.current) {
        // Iterate children to sum width to completely bypass WebKit flex scrollWidth truncation bugs
        let totalWidth = 0;
        const children = Array.from(innerCarouselRef.current.children);
        children.forEach(c => {
          const style = window.getComputedStyle(c);
          totalWidth += c.offsetWidth + (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
        });

        const offsetWidth = carouselRef.current.offsetWidth;
        const rect = carouselRef.current.getBoundingClientRect();
        const scale = offsetWidth > 0 ? rect.width / offsetWidth : 1;

        // Calculate how much unscaled width is actually visible on the screen
        const visibleOnScreen = (window.innerWidth - rect.left) / scale;

        // Use the smaller of container width or visible screen space to determine logical visible portion
        const availableScreenLocal = Math.min(offsetWidth, visibleOnScreen);

        // No extra buffer, so the slider stops perfectly at the end of the last item
        let requiredWidth = totalWidth - availableScreenLocal;
        if (requiredWidth < 0) requiredWidth = 0;

        setWidth(requiredWidth);
      }
    };

    // Run immediately and setup a short interval to catch late layout shifts (like fonts or images loading)
    updateWidth();
    intervalId = setInterval(updateWidth, 500);

    // Give it a full 10 seconds to catch very slow loading images on bad network
    const timeoutId = setTimeout(() => clearInterval(intervalId), 10000);

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [mediaItems, project]);

  return (
    <div className="p-0">
      <motion.div
        ref={carouselRef}
        initial={{ marginBottom: 40 }}
        animate={{ marginBottom: carouselMargin }}
        transition={{
          duration: 0.5
        }}
        whileTap={{ cursor: "grabbing" }}
        className={`carouselMargin ${classs}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            ref={innerCarouselRef}
            className={`inner-carousel mb-5 d-flex ${index !== 0 ? "styled-box" : ""
              }`}
            drag={drag}
            style={{ x }}
            // dragConstraints={{ right: 0, left: -width }}
            // dragElastic={0.15}
            // dragMomentum={true}
            // initial={{ justifyContent: justified }}
            // animate={{ justifyContent: justified }}
            initial={{ x: 0, justifyContent: justified }}
            animate={
              isMobile && hasNudged
                ? { x: xs } // 👈 move right and stay there
                : { justifyContent: justified }
            }
            transition={{
              duration: 0.9,
              ease: [0.25, 1, 0.5, 1], // premium feel
            }}
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.15}
            dragMomentum={true}

          >
            {project && (
              <motion.div className="item firstItem">
                <div className="project_box" style={{ padding: "5px" }}>
                  {project.project_thumbnail && (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${project.project_thumbnail}`}
                      alt={project.project_name}
                      className="img-fluid rounded mb-2"
                      style={{ cursor: "zoom-in" }}
                    />
                  )}
                  {/* Project title & address */}
                  {project.project_name && <h3 style={{ fontSize }}>{
                    (() => {
                      const words = project.project_name.trim().split(" ");
                      if (words.length > 2) {
                        return (
                          <>
                            {words[0] + " " + words[1]}
                            <br />
                            {words[2]}
                          </>
                        );
                      } else if (words.length > 3) {
                        return (
                          <>
                            {words[0] + " " + words[1]}
                            <br />
                            {words[2] + " " + words[3]}
                          </>
                        );
                      } else if (words.length > 4) {
                        return (
                          <>
                            {words[0] + " " + words[1]}
                            <br />
                            {words[2] + " " + words[3]}
                            <br />
                            {words[4]}
                          </>
                        );
                      }
                      return project.project_name;
                    })()
                  }</h3>}
                  {project.project_address && <p style={{ fontSize }}>{project.project_address}</p>}
                  {/* Project details */}
                  <motion.div
                    className="details"
                    initial={{ display: display }}
                    animate={{ display: display }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {
                      project.category_name && (
                        <>
                          <p className="head">Service</p>
                          <p className="head2">{project.category_name}</p>
                        </>
                      )
                    }
                    {
                      project.client_name && (
                        <>
                          <p className="head">Client</p>
                          {project.client_name && <p className="head2">{
                            (() => {
                              const words = project.client_name.trim().split(" ");
                              if (words.length > 2) {
                                return (
                                  <>
                                    {words[0] + " " + words[1]}
                                    <br />
                                    {words[2]}
                                  </>
                                );
                              } else if (words.length > 3) {
                                return (
                                  <>
                                    {words[0] + " " + words[1]}
                                    <br />
                                    {words[2] + " " + words[3]}
                                  </>
                                );
                              } else if (words.length > 4) {
                                return (
                                  <>
                                    {words[0] + " " + words[1]}
                                    <br />
                                    {words[2] + " " + words[3]}
                                    <br />
                                    {words[4]}
                                  </>
                                );
                              }
                              return project.client_name;
                            })()
                          }</p>}
                        </>
                      )
                    }
                    {
                      project.site_area && (
                        <>
                          <p className="head">Site Area</p>
                          <p className="head2">{project.site_area}</p>
                        </>
                      )
                    }
                    {
                      project?.tags && (
                        <>
                          <p className="head">Tags</p>
                          <p className="head2">{project.tags?.title}</p>
                        </>
                      )
                    }
                    {
                      project.built_up_area && (
                        <>
                          <p className="head">Built-up</p>
                          <p className="head2">{project.built_up_area}</p>
                        </>
                      )
                    }
                    {
                      project.project_status && (
                        <>
                          <p className="head">Status</p>
                          <p className="head2">{project.project_status.charAt(0).toUpperCase() + project.project_status.slice(1).toLowerCase()}</p>
                        </>
                      )
                    }
                  </motion.div>
                </div>
              </motion.div>
            )}

            {project?.project_main_image && (
              <motion.div className={`item ${itemClass} ${isMobile ? 'secondItem' : ''}`} style={{
                cursor: "zoom-in", padding: "5px",
              }}>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${project.project_main_image}`}
                  alt={`media-project_main_image`}
                  style={{ objectFit: "contain", }}
                />
                <div className="mobileDetails">
                  <div className="row">
                    <div className="col-3">
                      {
                        project.project_thumbnail && (
                          <img
                            src={`${import.meta.env.VITE_IMG_URL}${project.project_thumbnail}`}
                            alt={project.project_name}
                            className="img-fluid rounded mb-2"
                            style={{ cursor: "zoom-in" }}
                          />
                        )
                      }
                    </div>
                    <div className="col-9 p-0">
                      {/* Project title & address */}
                      {project.project_name && <h3 style={{ fontSize }}>{
                        (() => {
                          const words = project.project_name.trim().split(" ");
                          if (words.length > 2) {
                            return (
                              <>
                                {words[0] + " " + words[1]}
                                <br />
                                {words[2]}
                              </>
                            );
                          } else if (words.length > 3) {
                            return (
                              <>
                                {words[0] + " " + words[1]}
                                <br />
                                {words[2] + " " + words[3]}
                              </>
                            );
                          } else if (words.length > 4) {
                            return (
                              <>
                                {words[0] + " " + words[1]}
                                <br />
                                {words[2] + " " + words[3]}
                                <br />
                                {words[4]}
                              </>
                            );
                          }
                          return project.project_name;
                        })()
                      }</h3>}
                      {project.project_address && <p style={{ fontSize }}>{project.project_address}</p>}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
            {mediaItems.map((item, index) => (
              <motion.div key={index} className={`item ${item?.type === 'description' ? isMobile ? "descriptions" : "description" : 'image'}`} style={{
                width: item?.type === "description" ? "20%" : '',
                maxWidth: item?.type === "description" ? "15%" : '',
                minWidth: item?.type === "description" ? "5%" : '',
                padding: "5px",

              }}
                initial={{ display: display }}
                animate={{ display: display }}
              >
                {item?.type === "image" && item?.image && (

                  <motion.img
                    src={`${import.meta.env.VITE_IMG_URL}${item?.image}`}
                    alt={`media-${index}`}
                    style={{ height: "280px", objectFit: "contain", width: "100%" }}
                    whileHover={{ scale: 1.05 }}
                  />
                )}
                {item?.type === "video" && item?.video && (
                  <div style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    borderRadius: "8px",
                    background: "#000",
                  }}>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ height: "80%", objectFit: "contain" }}
                    >
                      <source src={`${import.meta.env.VITE_IMAGE_URL}/${item?.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {item?.type === "description" && item?.description && (
                  <div dangerouslySetInnerHTML={{ __html: item?.description }} style={{
                    width: "auto",
                    background: "",
                    borderRadius: "8px",
                    fontSize: "8px",
                    lineHeight: "1.6",
                    color: "#333",
                    textAlign: "justify",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div >
    </div >
  );
}
