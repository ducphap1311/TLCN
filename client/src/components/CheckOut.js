import React, { useState, useEffect } from "react";
import "../styles/CheckOut.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const CheckOut = () => {
    const { total, cartItems, amount } = useSelector((store) => store.cart);
    const [errorUser, setErrorUser] = useState(false);
    const [citiesList, setCitiesList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);
    const [wardsList, setwardsList] = useState([]);
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const shippingPrice = 5;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [needUpdatingProducts, setNeedUpdatingProducts] = useState();

    useEffect(() => {
        authenticateUser();
        if (!errorUser) {
            getCitiesInformations();
            getNeedUpdatingProducts();
        }
    }, []);

    const authenticateUser = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(
                "http://localhost:5000/api/v2/dashboard",
                requestOptions
            );
            const responseData = await response.json();
            const success = responseData.msg;
            if (success !== "success") {
                throw new Error("Invalid user");
            }
            setErrorUser(false);
            setIsLoading(false);
        } catch (error) {
            setErrorUser(true);
            setIsLoading(false);
        }
    };

    const getNeedUpdatingProducts = () => {
        let idsList = cartItems.map((item) => {
            return item._id;
        });
        let productsList = [];
        idsList.forEach(async (id) => {
            const response = await fetch(
                `http://localhost:5000/api/v1/products/${id}`
            );
            const responseData = await response.json();
            const data = responseData.product;
            productsList.push(data);
        });
        setNeedUpdatingProducts(productsList);
    };

    const getCitiesInformations = async () => {
        try {
            const response = await fetch(
                "https://provinces.open-api.vn/api/?depth=3"
            );
            const responseData = await response.json();
            setCitiesList(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCityChange = (e) => {
        const districts = citiesList.filter(
            (add) => add.name === e.target.value
        );
        setDistrictsList(districts[0].districts);
        formik.handleChange(e);
    };

    const handleDistrictChange = (e) => {
        const wards = districtsList.filter(
            (dis) => dis.name === e.target.value
        );
        setwardsList(wards[0].wards);
        formik.handleChange(e);
    };

    const updateProducts = async () => {
        needUpdatingProducts.forEach((product) => {
            cartItems.forEach((item) => {
                if (product._id === item._id) {
                    try {
                        const putRequestOptions = {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                totalAmount: product.totalAmount - item.amount,
                            }),
                        };
                        fetch(
                            `http://localhost:5000/api/v1/products/${product._id}`,
                            putRequestOptions
                        )
                            .then((res) => {})
                            .catch((error) => {
                                console.log(error);
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        });
    };
    const formik = useFormik({
        initialValues: {
            name: localStorage.getItem("username")
                ? localStorage.getItem("username")
                : "",
            phone: localStorage.getItem("phone")
            ? localStorage.getItem("phone")
            : "",
            city: localStorage.getItem("city")
                ? localStorage.getItem("city")
                : "",
            district: localStorage.getItem("district")
                ? localStorage.getItem("district")
                : "",
            ward: localStorage.getItem("ward")
                ? localStorage.getItem("ward")
                : "",
            address: localStorage.getItem("address")
            ? localStorage.getItem("address")
            : "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please provide your name"),
            phone: Yup.string().required("Please provide phone number"),
            city: Yup.string().required("Please provide city"),
            district: Yup.string().required("Please provide district"),
            ward: Yup.string().required("Please provide ward"),
            address: Yup.string().required(
                "Please provide address detail (house number, street name...)"
            ),
        }),
        onSubmit: async (values) => {
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    phone: values.phone,
                    address: `${values.address}, ${values.ward}, ${values.district}, ${values.city}`,
                    orderTotal: total + shippingPrice,
                    cartItems: cartItems,
                    amount: amount,
                }),
            };
            try {
                const response = await fetch(
                    "http://localhost:5000/api/v3/orders",
                    requestOptions
                );
                if (!response) {
                    throw new Error("something wrong here!");
                }
                const responseData = await response.json();
                const data = responseData.order
                const request = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("email"),
                        id: data._id
                    })
                }
                await fetch("http://localhost:5000/api/v2/confirm-order", request)
                toast("Order successfully", {
                    type: "success",
                    draggable: false
                })
                localStorage.removeItem("cartItems");
                // localStorage.setItem("city", values.city)
                // localStorage.setItem("ward", values.ward)
                // localStorage.setItem("district", values.district)
                // localStorage.setItem("phone", values.phone)
                // localStorage.setItem("username", values.name)
                // localStorage.setItem("address", values.address)
                dispatch(clearCart());
                updateProducts();
                navigate("/orders");
            } catch (error) {
                console.log(error);
            }
        },
    });
    if (isLoading) {
        return <Loading />;
    } else if (!token || errorUser) {
        return (
            <div className="login-to-continue">
                <p>Please login to continue</p>
                <Link to="/login" className="login-link">
                    Login here
                </Link>
            </div>
        );
    } else if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <Link to="/products" className="fill-link">
                    Fill it
                </Link>
            </div>
        );
    }
    return (
        <div className="checkout">
            <div className="checkout-title">
                <h2>Place Your Order</h2>
            </div>
            <div className="checkout-information-container">
                <div className="checkout-information">
                    <p>Shipping Information</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="name-information">
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <p className="name-error">
                                    {formik.errors.name}
                                </p>
                            ) : null}
                        </div>
                        <div className="name-information">
                            <label>Your Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <p className="name-error">
                                    {formik.errors.phone}
                                </p>
                            ) : null}
                        </div>
                        <div className="city-information">
                            <label>City</label>
                            <select
                                name="city"
                                value={formik.values.city}
                                onChange={handleCityChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value={localStorage.getItem("city")}>
                                    {localStorage.getItem("city")}
                                </option>
                                {citiesList.map((city, index) => {
                                    return (
                                        <option key={index} value={city.name}>
                                            {city.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {formik.touched.city && formik.errors.city ? (
                                <p className="city-error">
                                    {formik.errors.city}
                                </p>
                            ) : null}
                        </div>
                        <div className="district-information">
                            <label>District</label>
                            <select
                                value={formik.values.district}
                                onChange={handleDistrictChange}
                                name="district"
                                onBlur={formik.handleBlur}
                            >
                                <option
                                    value={localStorage.getItem("district")}
                                >
                                    {localStorage.getItem("district")}
                                </option>
                                {districtsList.map((district, index) => {
                                    return (
                                        <option
                                            value={district.name}
                                            key={index}
                                        >
                                            {district.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {formik.touched.district &&
                            formik.errors.district ? (
                                <p className="district-error">
                                    {formik.errors.district}
                                </p>
                            ) : null}
                        </div>
                        <div className="ward-information">
                            <label>Ward</label>
                            <select
                                value={formik.values.ward}
                                onChange={formik.handleChange}
                                name="ward"
                                onBlur={formik.handleBlur}
                            >
                                <option value={localStorage.getItem("ward")}>
                                    {localStorage.getItem("ward")}
                                </option>
                                {wardsList.map((ward, index) => {
                                    return (
                                        <option value={ward.name} key={index}>
                                            {ward.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {formik.touched.ward && formik.errors.ward ? (
                                <p className="ward-error">
                                    {formik.errors.ward}
                                </p>
                            ) : null}
                        </div>
                        <div className="address-information">
                            <label>Address Detail (house number, street name)</label>
                            <input
                                type="text"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <p className="address-error">
                                    {formik.errors.address}
                                </p>
                            ) : null}
                        </div>
                        <button type="submit">place your order</button>
                    </form>
                </div>
                <div className="price-information">
                    <div className="subtotal">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="shipping">
                        <p>Shipping</p>
                        <p>${shippingPrice.toFixed(2)}</p>
                    </div>
                    <div className="order-total">
                        <p>Order Total</p>
                        <p>${(total + shippingPrice).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
