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
        autoplayspeed: 15000,
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
                    <img src="https://files.oaiusercontent.com/file-YbPsk5DckorDhGN9K7ZCg2WC?se=2023-12-15T08%3A51%3A53Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dd099687e-b2ad-42cb-bc60-1618808f9693.webp&sig=XrKSBZS6ivW1YMmsPJGTJFOpaauqbSc7/l/xK/cZpAg%3D" alt="slider 1" className="slider-img" />
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
                    <img src="https://files.oaiusercontent.com/file-jLZer68pVRVZpss17vsJMXQ3?se=2023-12-15T08%3A54%3A17Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Df7763e8d-09cc-4f7a-b74d-09483d6366da.webp&sig=qMVerL3VH1GERbhuOwTrFq4UAmTxYjZHBA3GCo0Pk4U%3D" alt="slider 2" className="slider-img" />
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
