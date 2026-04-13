import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import "./Header.css";

const Header = ({ selectedCategory, setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openCategoryId, setOpenCategoryId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    useEffect(() => {
        api
            .get("/category")
            .then((response) => {
                if (response.data.status) {
                    setCategories(response.data.data);
                }
            })
            .catch((error) => console.error("Error fetching Categories:", error));
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
                        <li><Link to="/" class="dropdown-item" onClick={() => setSelectedCategory()}>Home</Link></li>
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
                            {categories?.map(({ id, category_name, subcategories = [] }) => (
                                <li key={id} data-id={id} className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link px-2 py-2 ${selectedCategory == id ? "active-category" : "active"
                                            } d-flex small justify-content-between align-items-center`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (isMobile) {
                                                setOpenCategoryId(openCategoryId === id ? null : id);
                                            } else {
                                                setSelectedCategory(id);
                                            }
                                        }}
                                    >
                                        {category_name}
                                        {isMobile && subcategories.length > 0 && (
                                            <span
                                                className={`arrow ms-2 ${openCategoryId === id ? "rotate-arrow" : ""
                                                    }`}
                                            >
                                                ▼
                                            </span>
                                        )}
                                    </Link>

                                    {/* Mobile Subcategories */}
                                    {isMobile && openCategoryId === id && subcategories.length > 0 && (
                                        <ul className="list-unstyled ps-4 mb-2">
                                            {subcategories.map((sub) => (
                                                <li key={sub.id}>
                                                    <Link
                                                        to="#"
                                                        className="nav-link text-secondary py-1 small"
                                                        onClick={() => {
                                                            setSelectedCategory(id);
                                                            setMenuOpen(false);
                                                        }}
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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

            {/* Desktop Subcategories */}
            {!isMobile && selectedCategory && (
                <div className="subheader ">
                    <ul className="d-flex flex-wrap justify-content-center list-unstyled mb-0 py-0 px-2 gap-2">
                        {categories
                            .find((cat) => cat.id === selectedCategory)
                            ?.subcategories?.map((sub) => (
                                <li key={sub.id} className="nav-item">
                                    <Link
                                        to="#"
                                        className="nav-link text-dark px-3 py-1 rounded hover-link"
                                    >
                                        {sub.title}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
