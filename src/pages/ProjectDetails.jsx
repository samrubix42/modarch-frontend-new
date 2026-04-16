import Projects from "./Projects";
import { useState } from "react";

const ProjectDetails = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <>
            <Projects
                selectedCategory={selectedCategory}
            />
        </>
    );
}
export default ProjectDetails;