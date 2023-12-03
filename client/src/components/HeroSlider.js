import React from "react";
import slider1 from "../assets/slide-bg-1.jpg";
import slider2 from "../assets/slide-bg-2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HeroSlider.scss";
import {Link} from 'react-router-dom'

export const HeroSlider = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplayspeed: 10000,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="hero-slider">
            <Slider {...settings}>
                <div className="slider-child">
                    <img src="https://ak.picdn.net/shutterstock/videos/24991910/thumb/6.jpg" alt="slider 1" className="slider-img" />
                    <div className="slider-text">
                        <h1 className="title">DH Sneaker</h1>
                        <p className="info">
                            Along with the continuous development of world
                            fashion, many brands have launched genuine men's
                            shoes with a variety of styles, designs, colors,
                            sizes...
                        </p>
                        <Link to='/products'>
                            <button className="watch-btn">See More</button>
                        </Link>
                    </div>
                </div>
                <div className="slider-child">
                    <img src="https://t3.ftcdn.net/jpg/01/43/24/52/360_F_143245237_SVQZjbi1djHK4qv5yyHxOYCeaHSPNDEg.jpg" alt="slider 2" className="slider-img" />
                    <div className="slider-text">
                        <p className="title">DH Sneaker</p>
                        <p className="info">
                            Along with the continuous development of world
                            fashion, many brands have launched genuine men's
                            shoes with a variety of styles, designs, colors,
                            sizes...
                        </p>
                        <Link to='/products'>
                            <button className="watch-btn">See More</button>
                        </Link>
                    </div>
                </div>
            </Slider>
        </div>
    );
};
