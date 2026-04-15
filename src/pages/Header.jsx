import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import "./Header.css";
import { useParams } from "react-router-dom";

const Header = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const category = window.location.pathname.split("/")[1];
  if (category) {
    setSelectedCategory(category);
  }
  useEffect(() => {
    api
      .get("/categories")
      .then((response) => {
        if (response?.data?.success) {
          setCategories(response?.data?.data);
        }
      })
      .catch((error) => console.error("Error fetching Categories:", error));
  }, []);

  return (
    <header className="header bg-white shadow-sm sticky-top p-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-white p-0">
        <div className="container-fluid px-2 px-md-5 d-flex align-items-center justify-content-between">
          {/* Logo */}
          <button className=" navbar-toggler men border-0 navbar-brand d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}frontend/images/modarchindia/logo-green.png`}
              alt="Modarch Logo"
              className="mlogo"
              style={{ height: "45px", objectFit: "contain" }}
            />
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}uploads/ham.svg`}
              alt="Modarch Logo"
              className="ham"
              style={{ height: "45px", objectFit: "contain" }}
            />
          </button>
          <ul class="dropdown-menu">
            <li><Link to="/" class="dropdown-item">Home</Link></li>
            <li><Link to="/about" class="dropdown-item" >About Us</Link></li>
            <li><Link to="/careers" class="dropdown-item" >Careers</Link></li>
            <li><Link to="/contact" class="dropdown-item" >Contact Us</Link></li>
          </ul>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div
            className={`collapse navbar-collapse justify-content-end ${menuOpen ? "show" : ""
              }`}
          >
            <ul className="navbar-nav text-center mt-3 mt-lg-0 align-items-center gap-lg-3">
              {categories?.map(({ id, name, slug }) => (
                <li key={id} data-id={id} className="nav-item">
                  <Link
                    to={slug}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`nav-link px-2 py-2 d-flex ${(category ? slug === category : slug === "featured")
                      ? "active-category"
                      : ""
                      } small justify-content-between align-items-center`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Right Button */}
            <div className="text-center mt-3 mt-lg-0 ms-lg-4">
              <Link to="/contact" class="btn btn-success px-4 py-2 rounded-pill fw-semibold" >Get in Touch</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
