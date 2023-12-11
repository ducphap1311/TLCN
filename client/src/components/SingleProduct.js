import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/SingleProduct.scss";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const SingleProduct = () => {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    const [amount, setAmount] = useState(1);
    const [size, setSize] = useState('35');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {cartItems} = useSelector(store => store.cart)

    const getSingleProduct = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/products/${id}`
            );
            const responseData = await response.json();
            const data = responseData.product;
            setSingleProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    let settings = {
        customPaging: function (i) {
            return (
                <img
                    src={singleProduct.images[i]}
                    alt="page-img"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            );
        },
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    const increaseAmount = (totalAmount) => {
        if (totalAmount === 0) {
            return;
        }
        setAmount((prevAmount) => {
            if (prevAmount === totalAmount) {
                return totalAmount;
            }
            return prevAmount + 1;
        });
    };

    const decreaseAmount = () => {
        setAmount((prevAmount) => {
            if (prevAmount === 1) {
                return prevAmount;
            }
            return prevAmount - 1;
        });
    };

    const addToCart = (_id, amount, totalAmount, size) => {
        if (totalAmount === 0) {
            toast("The product is out of stock", {
                type: "error",
                draggable: false,
            });
            return;
        }
        if (amount > totalAmount) {
            toast("Not enough products to add", {
                type: "error",
                draggable: false,
            });
            return;
        } else {
            let flag = false;
            cartItems.forEach((item) => {
                if (item._id === _id) {
                    if (item.amount + amount > totalAmount) {
                        flag = true;
                        toast(
                            "The selected quantity exceed your purchase limit",
                            {
                                type: "error",
                                draggable: false,
                            }
                        );
                    }
                }
            });
            if (!flag) {
                toast("Add to cart successfully", {
                    type: "success",
                    draggable: false,
                });
                dispatch(addItem({ id: _id, amount, totalAmount, size }));
            } else {
                return;
            }
        }
    };

    const buyNow = (_id, amount, totalAmount, size) => {
        if (totalAmount === 0) {
            toast("The product is out of stock", {
                type: "error",
                draggable: false,
            });
            return;
        }
        if (amount > totalAmount) {
            toast("Not enough products to add", {
                type: "error",
                draggable: false,
            });
            return;
        } else {
            let flag = false;
            cartItems.forEach((item) => {
                if (item._id === _id) {
                    if (item.amount + amount > totalAmount) {
                        flag = true;
                        toast(
                            "The selected quantity exceed your purchase limit",
                            {
                                type: "error",
                                draggable: false,
                            }
                        );
                    }
                }
            });
            if (!flag) {
                toast("Add to cart successfully", {
                    type: "success",
                    draggable: false,
                });
                dispatch(addItem({ id: _id, amount, totalAmount,size }));
                navigate('/cart')
            } else {
                return;
            }
        }
    };

    const handleAmountChange = (e, totalAmount) => {
        let numOfAmount = Number(e.target.value);
        if (totalAmount === 0) return;
        if (isNaN(numOfAmount)) return;
        if (numOfAmount > totalAmount) {
            setAmount(totalAmount);
        } else if (numOfAmount <= 0) {
            return;
        } else {
            setAmount(numOfAmount);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, [id]);

    if (!singleProduct) {
        return <Loading />;
    } else {
        const { _id, images, name, price, description, totalAmount, sizes } = singleProduct;
        return (
            <div className="single-product">
                <div className="single-product-container">
                    <Slider {...settings}>
                        {images.map((image, index) => {
                            return (
                                <div
                                    className="product-img-container"
                                    key={index}
                                >
                                    <img
                                        src={image}
                                        alt="product-img"
                                        className="product-img"
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                    <div className="product-info-container">
                        <p className="product-name">{name}</p>
                        {totalAmount > 0 ? (
                            <p
                                style={{
                                    margin: "10px 0",
                                    fontSize: "15px",
                                    color: "green",
                                }}
                            >
                                {totalAmount} available products
                            </p>
                        ) : (
                            <p
                                style={{
                                    margin: "10px 0",
                                    fontSize: "15px",
                                    color: "red",
                                }}
                            >
                                Out of stock
                            </p>
                        )}
                        <p className="product-price">
                            <i className="fa-solid fa-dollar-sign"></i>
                            {price}
                        </p>
                        <div className="product-size">
                            {/* <p>Size: </p> */}
                            <ul className="size-container">
                                {sizes.map(s => {
                                    return <li className={`${size === s ? 'active-size': ''}`} onClick={() => setSize(s)}>{s}</li>
                                })}
                                {/* <li className={`${size === '36' ? 'active-size': ''}`} onClick={() => setSize('36')}>36</li>
                                <li className={`${size === '37' ? 'active-size': ''}`} onClick={() => setSize('37')}>37</li>
                                <li className={`${size === '38' ? 'active-size': ''}`} onClick={() => setSize('38')}>38</li>
                                <li className={`${size === '39' ? 'active-size': ''}`} onClick={() => setSize('39')}>39</li>
                                <li className={`${size === '40' ? 'active-size': ''}`} onClick={() => setSize('40')}>40</li>
                                <li className={`${size === '41' ? 'active-size': ''}`} onClick={() => setSize('41')}>41</li>
                                <li className={`${size === '42' ? 'active-size': ''}`} onClick={() => setSize('42')}>42</li>
                                <li className={`${size === '43' ? 'active-size': ''}`} onClick={() => setSize('43')}>43</li>
                                <li className={`${size === '44' ? 'active-size': ''}`} onClick={() => setSize('44')}>44</li> */}
                            </ul>
                        </div>
                        <p className="product-description">{description}</p>
                        <div className="product-quantity">
                            <button onClick={decreaseAmount}>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <input
                                type="text"
                                className="amount"
                                value={amount}
                                onChange={(e) =>
                                    handleAmountChange(e, totalAmount)
                                }
                            />
                            <button onClick={() => increaseAmount(totalAmount)}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <button
                            className="add-btn"
                            onClick={() => addToCart(_id, amount, totalAmount, size)}
                        >
                            Add to cart
                        </button>
                        <div className="buy-btn-container">
                            <button
                                className="buy-btn"
                                onClick={() => buyNow(_id, amount, totalAmount, size)}
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
