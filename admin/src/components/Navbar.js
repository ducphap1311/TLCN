import React from "react";
import "../styles/Navbar.scss";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Dashboard</h1>
            <ul className="sidebar">
                <NavLink to='/'>Add product</NavLink>
                <NavLink to='/allproducts'>All products</NavLink>
                <NavLink to='/allorders'>All orders</NavLink>
                <NavLink to='/allusers'>All users</NavLink>
            </ul>
        </div>
    );
};
