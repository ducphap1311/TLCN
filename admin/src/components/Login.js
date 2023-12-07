import React, {useState, useRef, useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom'
import "../styles/Login.scss"

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef();
    const [loginStatus, setLoginStatus] = useState();
    
    useEffect(() => {
        if (showPassword) {
            passwordRef.current.type = "text";
        } else {
            passwordRef.current.type = "password";
        }
    }, [showPassword]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email address required")
                .email("Invalid email address"),
            password: Yup.string()
                .required("Password required")
                .min(8, "Password must be at least 8 characters"),
        }),
        onSubmit: async (values) => {
            setLoginStatus("pending");
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            };
            try {
                const response = await fetch(
                    "http://localhost:5000/api/v2/login",
                    requestOptions
                );
                if (!response.ok) {
                    throw new Error("Invalid email or password");
                }
                const responseData = await response.json();
                const {
                    username,
                    token,
                } = responseData;
                localStorage.setItem("username", username);
                localStorage.setItem("token", token);
                navigate("/");
            } catch (error) {
                setLoginStatus("rejected");
            }
        },
    });

    return (
        <div className="login">
            <form onSubmit={formik.handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">
                    Please login using account detail bellow.
                </p>
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
                        <p className="email-error">{formik.errors.email}</p>
                    ) : null}
                </div>
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
                <div className="show-password">
                    <div className="show-password-container">
                        <input
                            type="checkbox"
                            id="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(!showPassword)}
                            className="checkbox-input"
                        />
                        <label htmlFor="checkbox" className="checkbox-label">
                            Show password
                        </label>
                    </div>
                    {/* <button
                        type="button"
                        className="forgot-password-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Forgot password?
                    </button> */}
                </div>
                {loginStatus === "rejected" ? (
                    <p className="login-rejected">
                        Email or password is incorrect
                    </p>
                ) : loginStatus === "pending" ? (
                    <p className="login-pending">Loading...</p>
                ) : null}
                <button type="submit" className="sign-in-btn">
                    Sign in
                </button>
            </form>
        </div>
    );
};
