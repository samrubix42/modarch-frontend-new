import Slider from "./Slider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { useData } from "../context/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useOutletContext } from "react-router-dom";
const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 100,
      delay: 100,
      once: false,
      mirror: true,
      easing: "ease-in-out",
    });
  }, []);
  const [activeSlug, setActiveSlug] = useState(window.location.pathname.split("/")[2]);

  const [previousSlugs, setPreviousSlugs] = useState([]);
  const rowRef = useRef(null);
  const projectRefs = useRef({});
  const { projectData } = useData();
  const selectedCategory = useOutletContext();
  useEffect(() => {
    const pathSlug = window.location.pathname.split("/").pop();
    if (pathSlug) setActiveSlug(pathSlug);
  }, []);
  const defaultCategory = 'featured';
  const filteredProjects = useMemo(() => {
    const activeCategory = selectedCategory?.selectedCategory || defaultCategory;
    return projectData?.filter((project) => {
      // Extract identifiers (e.g. slug or id) from the category object array
      const categoryIds = Array.isArray(project?.category)
        ? project.category.map((c) => (c.slug || c.id).toString())
        : project?.category
          ? [(project.category.slug || project.category.id).toString()]
          : project?.category_id
            ? project.category_id.toString().split(",")
            : [];
      return categoryIds.includes(activeCategory.toString());
    });
  }, [projectData, selectedCategory]);
  useEffect(() => {
    setActiveSlug(null);
    setPreviousSlugs([]);
  }, [selectedCategory]);
  useEffect(() => {
    if (activeSlug && filteredProjects?.length > 0) {
      document.body.classList.add("project-active");
      const isLast = filteredProjects[filteredProjects.length - 1]?.slug === activeSlug;
      if (isLast) {
        document.body.classList.add("last-project-active");
        document.body.classList.remove("last-project-prev");
      } else {
        document.body.classList.remove("last-project-active");
      }
    } else {
      document.body.classList.remove("last-project-active");
    }
  }, [activeSlug, previousSlugs, filteredProjects]);

  useEffect(() => {
    if (activeSlug && projectRefs.current[activeSlug]) {
      const el = projectRefs.current[activeSlug];
      const activeIndex = filteredProjects.findIndex(
        (p) => p.slug === activeSlug
      );
      if (activeIndex > 0) {
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          window.scrollBy({
            top: rect.top - 100,
            behavior: "smooth",
          });
        }, 650);
      }
    }
  }, [activeSlug, filteredProjects]);
  const handleClick = (slug) => {
    if (slug !== activeSlug) {
      if (activeSlug && !previousSlugs.includes(activeSlug)) {
        setPreviousSlugs((prev) =>
          prev.includes(activeSlug) ? prev : [...prev, activeSlug]
        );
      }
    }
    setActiveSlug(slug);
    window.history.pushState(
      {},
      "",
      `/${selectedCategory?.selectedCategory || defaultCategory}/${slug}`
    );
  };
  console.log('filteredProjects', filteredProjects?.length);
  return (
    <section className="projects pt-5">
      <div className="container-fluid">
        <AnimatePresence mode="wait">
          <motion.div
            ref={rowRef}
            className="row relative mobileHeight"
            style={{ transformOrigin: "center center" }}
          >
            {filteredProjects?.map((project, index) => {
              if (!project) return null;
              const {
                slug,
                id,
                project_name,
                project_address,
                project_thumbnail,
                project_main_image,
              } = project;

              const key =
                slug && slug.trim()
                  ? slug
                  : id
                    ? `id-${id}`
                    : `index-${index}`;

              const isActive = activeSlug === slug;
              const isPrevious = previousSlugs.includes(slug);

              const setRef = (el) => {
                if (slug && el) projectRefs.current[slug] = el;
              };

              // 🟩 Active Project
              if (isActive) {
                return (
                  <motion.div
                    ref={setRef}
                    key={key}
                    initial={{ opacity: 0.8, scale: 1.50, height: 'fit-content' }}
                    animate={{ opacity: 1, scale: 2.25, height: '640px' }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`bg-green-200 rounded-lg relative z-20 ${index === filteredProjects?.length - 1 ? 'last-project' : ''}`}
                    style={{ transformOrigin: "top left" }}
                  >
                    <div className={`p-6`} >
                      <Slider
                        projectId={slug}
                        onClick={() => handleClick(slug)}
                        // carouselMargin={670}
                        leftMargin={0}
                        topMargin={50}
                        opacity={1}
                        fontSize={"8px"}
                        drag={"x"}
                        index={index}
                        justified={''}
                        classs={'mobileSlider'}
                        itemClass={'item'}
                        x={'-120'}
                        isAct={1}
                        thumbWidth={"60px"}
                      />
                    </div>
                  </motion.div>
                );
              }

              // 🟨 Previous Projects
              if (isPrevious) {
                return (
                  <motion.div
                    ref={setRef}
                    key={key}
                    initial={{ scale: 1, height: 'fit-content' }}
                    animate={{ scale: 1.4, height: '400px' }}
                    transition={{ duration: 0.5 }}
                    className="bg-yellow-200 rounded-lg relative z-10 cursor-pointer"
                    style={{ transformOrigin: "top left" }}
                    onClick={() => handleClick(slug)}
                  >
                    <div className="p-6">
                      <Slider
                        projectId={slug}
                        // carouselMargin={450}
                        leftMargin={0}
                        topMargin={0}
                        opacity={0}
                        fontSize={"12px"}
                        drag={"x"}
                        index={index}
                        justified={''}
                        classs={'mobileSlider previousSlider'}
                        itemClass={'item'}
                        x={'0'}
                        isAct={0}
                        thumbWidth={"60px"}
                      />
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.div
                  ref={setRef}
                  key={key}
                  // transition={{ duration: 0.4 }}
                  className={`relative z-0 cursor-pointer slidingPrev sliders${index} ${index === filteredProjects?.length - 1 ? 'last-project' : ''}`}
                  onClick={() => handleClick(slug)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Slider
                    projectId={slug}
                    // carouselMargin={'fit-content'}
                    topMargin={0}
                    leftMargin={-200}
                    opacity={0}
                    display={"none"}
                    fontSize={"12px"}
                    drag={"x"}
                    index={index}
                    justified={'center'}
                    classs={''}
                    itemClass={'secondItem'}
                    x={'0'}
                    isAct={0}
                    thumbWidth={"140px"}

                  />
                </motion.div>
              );
            })}
            {filteredProjects?.length === 0 && (
              <div className="col-12 text-center py-5 noProject">
                No projects found for this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;