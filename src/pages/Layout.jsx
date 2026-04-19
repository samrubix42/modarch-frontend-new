import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Layout = ({ settings }) => {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // navigate('/');
  };

  return (
    <div className={`main ${isMobile ? 'is-mobile' : ''}`}>
      <Header selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
      <main className="flex-grow">
        <Outlet context={{ selectedCategory }} />
      </main>
      <Footer setSelectedCategory={handleCategoryChange} setting={settings} />
    </div>
  );
}
export default Layout;