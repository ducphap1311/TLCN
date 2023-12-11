import React from "react";
import "../styles/Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import userImg from "../assets/user.png";

export const Navbar = () => {
    const navigate = useNavigate();
    const loginFunction = () => {
        navigate("/login");
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
                <div className="login-container">
                    <img
                        src={userImg}
                        alt="user"
                        style={{ width: "30px" }}
                        onClick={loginFunction}
                    />
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
