import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Layout = ({ settings }) => {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const navigate = useNavigate();
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // navigate('/');
  };

  return (
    <div className="main">
      <Header selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
      <main className="flex-grow">
        <Outlet context={{ selectedCategory }} />
      </main>
      <Footer setSelectedCategory={handleCategoryChange} setting={settings} />
    </div>
  );
}
export default Layout;