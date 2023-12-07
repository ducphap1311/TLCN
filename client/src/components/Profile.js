import React, { useState, useEffect } from "react";
import "../styles/Profile.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import closeImg from "../assets/close.png";

export const Profile = () => {
    const [citiesList, setCitiesList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);
    const [wardsList, setwardsList] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState();
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getCitiesInformations();
    }, []);

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
    const formik = useFormik({
        initialValues: {
            username: localStorage.getItem("username")
                ? localStorage.getItem("username")
                : "",
            email: localStorage.getItem("email")
                ? localStorage.getItem("email")
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
            username: Yup.string()
                .max(20, "User name must be 20 characters or less")
                .required("User name required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email address required"),
            phone: Yup.string().required("Please provide phone number"),
            // password: Yup.string()
            //     .min(8, "Password must be at least 8 characters")
            //     .required("Password required"),
            city: Yup.string().required("Please provide your city"),
            district: Yup.string().required("Please provide your district"),
            ward: Yup.string().required("Please provide your ward"),
            address: Yup.string().required(
                "Please provide address detail detail (house number, street name)"
            ),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    city: values.city,
                    district: values.district,
                    ward: values.ward,
                    phone: values.phone,
                    address: values.address,
                }),
            };

            try {
                const response = await fetch(
                    "http://localhost:5000/api/v2/update-user",
                    requestOptions
                );
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
                    email,
                } = responseData;
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                localStorage.setItem("city", city);
                localStorage.setItem("district", district);
                localStorage.setItem("ward", ward);
                localStorage.setItem("phone", phone);
                localStorage.setItem("address", address);
                localStorage.setItem("email", email);
                toast("Update user successfully", {
                    type: "success",
                    draggable: false,
                });
                // navigate("/");
            } catch (error) {
                toast("Email used, try again!", {
                    type: "error",
                    draggable: false,
                });
                console.log(error);
            }
        },
    });

    const checkPasswordFunction = async () => {
        if(password.length < 8){
            setPasswordStatus("rejected")
            return;
        }
        setPasswordStatus("pending");
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ oldPassword, password }),
            };
            const response = await fetch(
                "http://localhost:5000/api/v2/change-password",
                requestOptions
            );
            console.log(response);
            if (!response.ok) {
                throw new Error("Invalid old password");
            }
            const responseData = await response.json();
            
            setPasswordStatus("fulfilled");
        } catch (error) {
            setPasswordStatus("rejected");
        }
    };

    return (
        <div className="profile">
            <h2>Your informations</h2>
            <form
                className="profile-informations"
                onSubmit={formik.handleSubmit}
            >
                <div className="username-container">
                    <p className="title">User Name: </p>
                    <input
                        type="text"
                        id="username"
                        name="username"
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
                    <p className="title">Email: </p>
                    <input
                        type="email"
                        id="email"
                        name="email"
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
                    <p className="title">Phone number: </p>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
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
                    <p className="title">City: </p>
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
                        <p className="city-error">{formik.errors.city}</p>
                    ) : null}
                </div>
                <div className="district-container">
                    <p className="title">District: </p>
                    <select
                        name="district"
                        value={formik.values.district}
                        onChange={handleDistrictChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value={localStorage.getItem("district")}>
                            {localStorage.getItem("district")}
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
                    <p className="title">Ward: </p>
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
                        <p className="ward-error">{formik.errors.ward}</p>
                    ) : null}
                </div>
                <div className="address-container">
                    <p className="title">Address: </p>
                    <input
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="address-input"
                    />

                    {formik.touched.address && formik.errors.address ? (
                        <p className="address-error">{formik.errors.address}</p>
                    ) : null}
                </div>
                <div className="password-container"></div>
                <div className="btn-container">
                    <button type='button' onClick={() => setShowModal(true)}>Change Password</button>
                    <button type="submit">Update</button>
                </div>
            </form>
            <div
                className={`modal ${
                    showModal && "show-modal"
                }`}
            >

                <div className="modal-container">
                    <button
                        className="close-modal-btn"
                        onClick={() => setShowModal(false)}
                    >
                        <img
                            src={closeImg}
                            alt="close modal"
                            className="close-img"
                        />
                    </button>
                    <h2 className="modal-title">Change password</h2>
                    <input
                        type="password"
                        placeholder="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="modal-email-input"
                    />
                    <input
                        type="password"
                        placeholder="Old password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="modal-email-input"
                    />
                    {passwordStatus === "rejected" ? (
                        <p className="email-rejected">Password is not suitable</p>
                    ) : passwordStatus === "fulfilled" ? (
                        <p className="email-fulfilled">
                            Change password successfully
                        </p>
                    ) : passwordStatus === "pending" ? (
                        <p className="email-pending">Loading...</p>
                    ) : null}
                    <button onClick={checkPasswordFunction} className="search-btn">
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};
