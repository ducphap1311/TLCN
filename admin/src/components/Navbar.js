import React from "react";
import "../styles/Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import userImg from '../assets/user.png'

export const Navbar = () => {
    const navigate = useNavigate()
    const loginFunction = () => {
        navigate("/login")
    }
    return (
        <div className="navbar">
            <div className="navbar-container" style={{display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"}}>
                <h1>Dashboard</h1>
                <div className="login-container">
                    <img src={userImg} alt="user" style={{width: "30px"}} onClick={loginFunction}/>
                </div>
            </div>
            <ul className="sidebar">
                <NavLink to="/">Add Product</NavLink>
                <NavLink to="/allproducts">Products</NavLink>
                <NavLink to="/allorders">Orders</NavLink>
                <NavLink to="/allusers">Users</NavLink>
            </ul>
        </div>
    );
};
