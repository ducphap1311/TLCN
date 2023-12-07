import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const userName = localStorage.getItem("username") || null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };



    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("city");
        localStorage.removeItem("district");
        localStorage.removeItem("ward");
        localStorage.removeItem("phone");
        localStorage.removeItem("address");
    };



    return (
        <div className="navbar">
            <div className="navbar-header">
                <div className="menu-btn-container">
                    <button
                        className="menu-btn"
                        onClick={() => setShowSidebar(true)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
                <div className="navbar-logo-container">
                    <Link to="/">
                        <img src="https://scontent.fsgn14-1.fna.fbcdn.net/v/t1.15752-9/395632490_889921132656124_1884520880595606214_n.png?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFvT_8WneC0rUb2Q_hu7R6MPWT3hYqAE7c9ZPeFioATt6sfstfZW24W1HNDMiEfeWDzW9XAlZ3ibnj4AQbKZBFa&_nc_ohc=2epuke81svYAX80k4XA&_nc_ht=scontent.fsgn14-1.fna&oh=03_AdQXHMiyh0JFhXVbZEPjKdKw6JfcAxo3stctSAFXXmvShg&oe=657FE328" style={{ width: '130px', height: 'auto', objectFit: 'contain' }} alt="logo" className="logo-img" />
                    </Link>
                </div>



                <div className="navbar-usercart-container">
                    <div className="navbar-user">
                        {userName ? (
                            <>
                                <p
                                    className="username"
                                    onClick={() =>
                                        setShowDropDown(!showDropDown)
                                    }
                                    style={{ color: 'black' }}
                                >
                                    {userName}
                                </p>
                                <div
                                    className={`login-register-container ${showDropDown && "show-dropdown"
                                        }`}
                                >
                                    <Link to="/profile">My Profile</Link>
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/login" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    className="user-icon-btn"
                                    onClick={() =>
                                        setShowDropDown(!showDropDown)
                                    }
                                >
                                    <i className="fa-solid fa-user"></i>
                                </button>
                                <div
                                    className={`login-register-container ${showDropDown && "show-dropdown"
                                        }`}
                                >
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </div>
                            </>
                        )}
                    </div>


                </div>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" className="link">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about-us" className="link">
                        About Us
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className="link">
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sellshoes" className="link">
                        Sell Shoes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="link">
                        Contact
                    </NavLink>
                </li>
            </ul>
            <div className={`sidebar ${showSidebar && "show-sidebar"}`}>
                <div
                    className={`sidebar-container ${showSidebar && "show-sidebar-container"
                        }`}
                >



                    <ul className="sidebar-links">
                        <li>
                            <Link to="/" className="link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="link">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="link">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/sellshoes" className="link">
                                Sell shoes
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="link">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <button
                    className="close-sidebar-btn"
                    onClick={() => setShowSidebar(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <button onClick={scrollToTop} className="navbar-scroll-to-top-btn">
                <i className="fa-solid fa-arrow-up"></i>
            </button>
        </div>
    );
};
