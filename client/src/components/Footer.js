import React from "react";
import footerImg from "../assets/logo.png";
import "../styles/Footer.scss";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-underline"></div>
                <div className="footer-info">
                    <div className="footer-header">
                        <div className="footer-header-logo">
                            <img
                                src="https://scontent.fsgn14-1.fna.fbcdn.net/v/t1.15752-9/395632490_889921132656124_1884520880595606214_n.png?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFvT_8WneC0rUb2Q_hu7R6MPWT3hYqAE7c9ZPeFioATt6sfstfZW24W1HNDMiEfeWDzW9XAlZ3ibnj4AQbKZBFa&_nc_ohc=2epuke81svYAX80k4XA&_nc_ht=scontent.fsgn14-1.fna&oh=03_AdQXHMiyh0JFhXVbZEPjKdKw6JfcAxo3stctSAFXXmvShg&oe=657FE328"
                                alt="footer-logo"
                                className="footer-header-img"
                                style={{objectFit: 'contain'}}
                            />
                        </div>
                        <p className="footer-header-subtitle">
                            Your satisfaction is our honor.
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
                                hophap1311@gmail.com
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
