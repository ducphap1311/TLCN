import React, {useState} from "react";
import "../styles/Navbar.scss";
import { NavLink, useNavigate, Link  } from "react-router-dom";
import userImg from "../assets/user.png";

export const Navbar = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const userName = localStorage.getItem("username")

    const navigate = useNavigate();
    const loginFunction = () => {
        navigate("/login");
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
            <div
                className="navbar-container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                }}
            >
                <h1>Hi, Welcome back 👋</h1>
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
                                    className={`login-register-container ${showDropDown && "show-dropdown2"
                                        }`}
                                >
                                    {/* <Link to="/profile">My Profile</Link> */}
                                    {/* <Link to="/orders">My Orders</Link> */}
                                    <Link to="/login" onClick={handleLogout} style={{textDecoration: "none"}}>
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
                                    style={{border: "none", backgroundColor: "transparent"}}
                                >
                                    <i className="fa-solid fa-user" style={{fontSize: "23px"}}></i>
                                </button>
                                <div
                                    className={`login-register-container ${showDropDown && "show-dropdown1"
                                        }`}
                                >
                                    <Link to="/login" style={{textDecoration: "none"}}>Login</Link>
                                    {/* <Link to="/register">Register</Link> */}
                                </div>
                            </>
                        )}
                    </div>
            </div>
            <ul className="sidebar">
                <NavLink to="/">
                    <i className="fa-solid fa-cart-plus"></i>Add Product
                </NavLink>
                <NavLink to="/allproducts">
                    <i className="fa-solid fa-cart-flatbed-suitcase"></i>
                    Products
                </NavLink>
                <NavLink to="/allorders">
                    <i className="fa-solid fa-box"></i>Orders
                </NavLink>
                <NavLink to="/allusers">
                    <i className="fa-solid fa-user-group"></i>Users
                </NavLink>
                <NavLink to="/alloffer">
                    <i className="fa-solid fa-briefcase"></i>Offers
                </NavLink>
                <NavLink to="/allcontact">
                    <i className="fa-solid fa-comments"></i>Messages
                </NavLink>
            </ul>
        </div>
    );
};
