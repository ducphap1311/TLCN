import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Register = () => {
    const navigate = useNavigate();
    const [registerStatus, setRegisterStatus] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef();
    const [citiesList, setCitiesList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);
    const [wardsList, setwardsList] = useState([]);

    useEffect(() => {
        if (showPassword) {
            passwordRef.current.type = "text";
        } else {
            passwordRef.current.type = "password";
        }
    }, [showPassword]);

    useEffect(() => {
        getCitiesInformations();
    }, []);

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

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            phone: "",
            password: "",
            city: "",
            district: "",
            ward: "",
            address: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(20, "User name must be 20 characters or less")
                .required("User name required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email address required"),
            phone: Yup.string().required("Please provide phone number"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password required"),
            city: Yup.string().required("Please provide your city"),
            district: Yup.string().required("Please provide your district"),
            ward: Yup.string().required("Please provide your ward"),
            address: Yup.string().required(
                "Please provide address detail detail (house number, street name)"
            ),
        }),
        onSubmit: async (values) => {
            console.log(values);
            setRegisterStatus("pending");
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    city: values.city,
                    district: values.district,
                    ward: values.ward,
                    phone: values.phone,
                    address: values.address
                }),
            };

            try {
                const response = await fetch(
                    "http://localhost:5000/api/v2/register",
                    requestOptions
                );
                console.log(response);
                if (!response.ok) {
                    throw new Error("Invalid email or email used");
                }
                const responseData = await response.json();
                const {
                    token,
                    username,
                    city,
                    district,
                    ward,
                    phone,
                    address,
                } = responseData;
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                localStorage.setItem("city", city);
                localStorage.setItem("district", district);
                localStorage.setItem("ward", ward);
                localStorage.setItem("phone", phone);
                localStorage.setItem("address", address);
                navigate("/");
            } catch (error) {
                console.log(error);
                setRegisterStatus("rejected");
            }
        },
    });
    return (
        <div className="register">
            <form onSubmit={formik.handleSubmit} className="register-form">
                <h2 className="register-title">Register</h2>
                <p className="register-subtitle">
                    Please register using account detail bellow.
                </p>
                <div className="username-container">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="User Name"
                        className="username-input"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <p className="username-error">
                            {formik.errors.username}
                        </p>
                    ) : null}
                </div>
                <div className="email-container">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="email-input"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="email-error">{formik.errors.email} </p>
                    ) : null}
                </div>
                <div className="phone-container">
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        className="phone-input"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <p className="phone-error">{formik.errors.phone}</p>
                    ) : null}
                </div>
                <div className="city-container">
                    <select
                        name="city"
                        value={formik.values.city}
                        onChange={handleCityChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="" disabled selected hidden>
                            Choose city
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
                        <p className="city-error">{formik.errors.city}</p>
                    ) : null}
                </div>
                <div className="district-container">
                    <select
                        value={formik.values.district}
                        onChange={handleDistrictChange}
                        name="district"
                        onBlur={formik.handleBlur}
                    >
                        <option value="" disabled selected hidden>
                            Choose district
                        </option>
                        {districtsList.map((district, index) => {
                            return (
                                <option value={district.name} key={index}>
                                    {district.name}
                                </option>
                            );
                        })}
                    </select>
                    {formik.touched.district && formik.errors.district ? (
                        <p className="district-error">
                            {formik.errors.district}
                        </p>
                    ) : null}
                </div>
                <div className="ward-container">
                    <select
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        name="ward"
                        onBlur={formik.handleBlur}
                    >
                        <option value="" disabled selected hidden>
                            Choose ward
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
                        <p className="ward-error">{formik.errors.ward}</p>
                    ) : null}
                </div>
                <div className="address-container">
                    <input
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="address-input"
                        placeholder="House Number, Street Name"
                    />

                    {formik.touched.address && formik.errors.address ? (
                        <p className="address-error">{formik.errors.address}</p>
                    ) : null}
                </div>
                {/* <div className="city-container">
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Choose city"
                        className="city-input"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <p className="city-error">
                            {formik.errors.city}
                        </p>
                    ) : null}
                </div>
                <div className="district-container">
                    <input
                        type="text"
                        id="district"
                        name="district"
                        placeholder="Choose district"
                        className="district-input"
                        value={formik.values.district}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.district && formik.errors.district ? (
                        <p className="district-error">
                            {formik.errors.district}
                        </p>
                    ) : null}
                </div>
                <div className="ward-container">
                    <input
                        type="text"
                        id="ward"
                        name="ward"
                        placeholder="Choose ward"
                        className="ward-input"
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.ward && formik.errors.ward ? (
                        <p className="ward-error">
                            {formik.errors.ward}
                        </p>
                    ) : null}
                </div> */}
                <div className="password-container">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="password-input"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        ref={passwordRef}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="password-error">
                            {formik.errors.password}
                        </p>
                    ) : null}
                </div>

                <div className="show-password-container">
                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(!showPassword)}
                        className="checkbox-show-password"
                    />
                    <label
                        htmlFor="checkbox"
                        className="checkbox-show-password-label"
                    >
                        Show password
                    </label>
                </div>
                {registerStatus === "rejected" ? (
                    <p className="register-rejected">
                        Invalid email or email used
                    </p>
                ) : registerStatus === "pending" ? (
                    <p className="register-pending">Loading...</p>
                ) : null}
                <button type="submit" className="register-btn">
                    Register
                </button>
                <p className="options">
                    Already have an Account?
                    <Link to="/login" className="link-to-login">
                        Login now
                    </Link>
                </p>
            </form>
        </div>
    );
};
