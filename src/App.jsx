import './App.css'
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Layout from './pages/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails'
import { useEffect, useState } from 'react';
import api from "../src/api/api";

function App() {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    api
      .get("/settings")
      .then((response) => {
        if (response.data.success) {
          setSettings(response?.data?.data);
        }
      })
      .catch((error) => console.error("Error fetching Jobs:", error));
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout settings={settings} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact settings={settings} />} />
            <Route path="careers" element={<Careers />} />
            <Route path="/:category" element={<Projects />} />
            <Route path=":slug" element={<ProjectDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
