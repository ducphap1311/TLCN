import React from "react";
import "../styles/About.scss";
import aboutImg from "../assets/about-us.jpg";

export const About = () => {
    return (
        <div className="about">
            <div className="about-container">
                <div className="about-header">
                    <div className="about-img-container">
                        <img
                            src="https://bizweb.dktcdn.net/100/446/974/products/giay-mlb-chunky-liner-mid-denim-boston-red-sox-d-blue-3asxcdn3n-43bld-1.jpg?v=1678035198720"
                            alt="about-img"
                            className="about-img"
                            // style={{ width: "600px" }}
                        />
                    </div>
                    <div className="about-text">
                        <h2 className="title">About DP Sneaker</h2>
                        <p className="info">
                            "Along with the continuous development of world
                            fashion, many brands have launched genuine men's
                            shoes with a variety of styles, designs, colors,
                            sizes... A key high-end men's watch The brand
                            portrays a true value when it comes to luxury
                            accessories for men. Nowadays, shoes are essential
                            fashion accessories for today's modern man. On the
                            wrists of successful men there is always a place for
                            a high-end men's watch"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
