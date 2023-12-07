import React from "react";
import footerImg from "../assets/darklogo.png";
import "../styles/Footer.scss";

export const Footer = () => {
    return (
        <div className="footer" style={{ backgroundColor: 'black' }}>
            <div className="footer-container">
                <div className="footer-underline"></div>
                <div className="footer-info">
                    <div className="footer-header">
                        <div className="footer-header-logo">
                            <img
                                src={footerImg}
                                alt="footer-logo"
                                className="footer-header-img"
                                style={{ objectFit: 'contain', width: 200, height: 200 }}
                            />
                        </div>
                        <p className="footer-header-subtitle">
                            A Shoes Shop In HCM City.
                        </p>
                    </div>
                    <div className="contact-info">
                        <h4>CONTACT INFO</h4>
                        <div className="info">
                            <p>
                                <i className="fa fa-map-marker"></i>Thu Duc City, Ho Chi Minh City
                            </p>
                            <p>
                                <i className="fa fa-phone"></i>0825 820 709
                            </p>
                            <p>
                                <i className="fa fa-envelope"></i>
                                dhsneakerHCM@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="about-us">
                        <h4>ABOUT US</h4>
                        <div className="info">
                            <p>
                                <i className="fa fa-arrow-right"></i>About DH Sneaker
                            </p>
                            <p>
                                <i className="fa fa-arrow-right"></i>DH Sneaker
                                Devices
                            </p>
                            <p>
                                <i className="fa fa-arrow-right"></i>Sneaker
                                Science
                            </p>
                        </div>
                    </div>
                    <div className="connect-with-us">
                        <h4>CONNECT WITH US</h4>
                        <div className="info">
                            <p>
                                <a
                                    href="https://www.facebook.com/ducphap1311"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fab fa-facebook"></i>
                                    <span>FaceBook</span>
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://www.facebook.com/ducphap1311"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fab fa-instagram"></i>
                                    <span>Instagram</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
