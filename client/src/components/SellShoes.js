import React, { useState } from "react";
import "../styles/SellShoes.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SellShoes = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            phoneNumber: '',
            productName: '',
            size: '',
            price: '',
            images: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please provide your name"),
            productName: Yup.string()
                .required("Please provide your product name"),
            phoneNumber: Yup.string()
                .min(10, "Please provide valid phone number")
                .required("Please provide your phone number"),
            price: Yup.string().required("Please provide your expected price"),
            size: Yup.string().required("Please provide size of your product"),
            images: Yup.string().required("Please provide images link address"),
            description: Yup.string().required("Please provide your product description"),

        }),
        onSubmit: (values) => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: values.name,
                    images: values.images.split(","),
                    productName: values.productName,
                    phonenumber: Number(values.phoneNumber),
                    price: values.price,
                    size: values.size,
                    description: values.description,
                }),
            };

            fetch("http://localhost:5000/api/v4/messages", requestOptions)
                .then((res) => {
                    toast("Your Order sent successfully", {
                        type: "success",
                        draggable: false,
                    });
                })
                .catch((error) => { });
        },
    });

    return (
        <div className="sellShoes" >
            <div className="contact-container">
                <div style={{ fontWeight: 'bold', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    You have old shoes you want to sell to us ?
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Send the offer now.
                </div>
                <div className="contact-message">
                    <form onSubmit={formik.handleSubmit} className="contact-form">
                        <div className="name-container">
                            <input
                                type="text"
                                className="name-input"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Your name"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <p className="name-error">{formik.errors.name}</p>
                            ) : null}

                        </div>

                        <div className="phonenumber-container">
                            <input
                                type="text"
                                name="phoneNumber"
                                className="phonenumber-input"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Phone number"
                            />
                            {formik.touched.phoneNumber &&
                                formik.errors.phoneNumber ? (
                                <p className="phone-error">{formik.errors.phoneNumber}</p>
                            ) : null}

                        </div>
                        <div className="email-container">
                            <input
                                type="text"
                                name="productName"
                                className="email-input"
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Product Name"
                            />
                            {formik.touched.productName && formik.errors.productName ? (
                                <p className="email-error">{formik.errors.productName}</p>
                            ) : null}
                        </div>

                        <div className="location-container">
                            <input
                                type="number"
                                name="Size"
                                className="location-input"
                                value={formik.values.size}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Size"
                            />
                            {formik.touched.size && formik.errors.size ? (
                                <p className="location-error">{formik.errors.size}</p>
                            ) : null}
                        </div>

                        <div className="email-container">
                            <input
                                type="text"
                                name="price"
                                className="email-input"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Desired Price"
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <p className="email-error">{formik.errors.price}</p>
                            ) : null}
                        </div>
                        <div className="email-container">

                            <input
                                type="text"
                                placeholder="Images"
                                name="images"
                                className="email-input"
                                required
                                value={formik.values.images}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.images && formik.errors.images ? (
                                <p className="message-error">{formik.errors.images}</p>
                            ) : null}
                        </div>
                        <div className="message-container">
                            <textarea
                                placeholder="Product Description"
                                name="description"
                                className="message-textarea"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <p className="message-error">{formik.errors.description}</p>
                            ) : null}
                        </div>
                        <button type="submit" className="send-btn">
                            Send Your Offer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};