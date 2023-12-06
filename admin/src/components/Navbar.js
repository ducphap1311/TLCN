import React from "react";
import "../styles/Navbar.scss";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Dashboard</h1>
            <ul className="sidebar">
                <NavLink to='/'>Add Product</NavLink>
                <NavLink to='/allproducts'>All Products</NavLink>
                <NavLink to='/allorders'>All Orders</NavLink>
                <NavLink to='/allusers'>All Users</NavLink>
            </ul>
        </div>
    );
};
