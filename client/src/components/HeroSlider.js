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
                    <img src="https://png.pngtree.com/thumb_back/fw800/background/20230611/pngtree-wall-with-shoes-on-it-image_2881393.jpg" alt="slider 1" className="slider-img" />
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
                    <img src="https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-three-pairs-of-sneakers-sitting-near-a-window-image_2911664.jpg" alt="slider 2" className="slider-img" />
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
