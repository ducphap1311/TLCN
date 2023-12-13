import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "./Loading";

export const AddProduct = () => {
    // const [images, setImages] = useState([]);
    // const [name, setName] = useState("");
    // const [price, setPrice] = useState("");
    // const [amount, setAmount] = useState("");
    // const [category, setCategory] = useState("");
    // const [quality, setQuality] = useState("");
    // const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const [errorUser, setErrorUser] = useState(false);

    useEffect(() => {
        authenticateUser();
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
    const formik = useFormik({
        initialValues: {
            images: "",
            name: "",
            price: "",
            totalAmount: "",
            description: "",
            category: "",
            quality: "",
            sizes: "",
        },
        validationSchema: Yup.object({
            images: Yup.string().required("Please provide image link address"),
            name: Yup.string().required("Please provide product name"),
            price: Yup.string().required("Please provide price"),
            totalAmount: Yup.string().required("Please provide amount"),
            description: Yup.string().required(
                "Please provide description of product"
            ),
            category: Yup.string().required("Please provide category"),
            quality: Yup.string(),
            sizes: Yup.string().required("Please provide sizes"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    images: values.images.split(","),
                    name: values.name,
                    price: Number(values.price),
                    totalAmount: Number(values.totalAmount),
                    category: values.category,
                    quality: values.quality,
                    description: values.description,
                    sizes: values.sizes.split(","),
                }),
            };
            try {
                const response = await fetch(
                    "http://localhost:5000/api/v1/products",
                    requestOptions
                );
                console.log(response);
                if (response.status === 201) {
                    // getProducts()
                    toast("Add product successfully!", {
                        type: "success",
                        draggable: false,
                    });
                    navigate("/allproducts");
                } else {
                    toast("Invalid informations, try again", {
                        type: "error",
                        draggable: false,
                    });
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        },
    });
    if (isLoading) {
        return <Loading />;
    } else if (!token || errorUser) {
        return (
            <div
                className="login-to-continue"
                style={{
                    textAlign: "center",
                    marginTop: "150px",
                    fontSize: "25px",
                    fontFamily: "sans-serif",
                }}
            >
                <p>Please login to continue</p>
                <Link to="/login" className="login-link" style={{color: "#56B280"}}>
                    Login here
                </Link>
            </div>
        );
    }
    return (
        <div className="addproduct">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-child">
                    <label htmlFor="images">Images</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        required
                        value={formik.values.images}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.images ? <p>{formik.errors.images}</p> : null} */}
                </div>
                <div className="form-child">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.name ? <p>{formik.errors.name}</p> : null} */}
                </div>
                <div className="form-child">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.price ? <p>{formik.errors.price}</p> : null} */}
                </div>
                <div className="form-child">
                    <label htmlFor="totalAmount">Amount</label>
                    <input
                        type="text"
                        id="totalAmount"
                        name="totalAmount"
                        required
                        value={formik.values.totalAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.totalAmount ? <p>{formik.errors.totalAmount}</p> : null} */}
                </div>
                <div className="form-child">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        name="description"
                        required
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.description ? <p>{formik.errors.description}</p> : null} */}
                </div>
                <div className="form-child">
                    <label htmlFor="category">Category</label>
                    <select
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="category"
                        style={{ width: "300px", padding: "10px 10px" }}
                        required
                    >
                        <option value=""></option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        {/* <option value="kids">Kids</option> */}
                    </select>
                    {/* {formik.errors.category ? <p>{formik.errors.category}</p> : null} */}
                    {/* <input
                        type="text"
                        id="category"
                        name="category"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    /> */}
                </div>
                <div className="form-child">
                    <label htmlFor="quality">Quality</label>
                    <input
                        type="text"
                        id="quality"
                        name="quality"
                        // required
                        value={formik.values.quality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.quality ? <p>{formik.errors.quality}</p>: null} */}
                </div>
                <div className="form-child">
                    <label htmlFor="sizes">Sizes</label>
                    <input
                        type="text"
                        id="sizes"
                        name="sizes"
                        // required
                        value={formik.values.sizes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.errors.quality ? <p>{formik.errors.quality}</p>: null} */}
                </div>

                <button className="add-btn" type="submit">
                    Add
                </button>
                {/* <button
                    className="clear-btn"
                    type="button"
                    onClick={() => {
                        setImages("");
                        setName("");
                        setPrice("");
                        setTotalAmount("");
                        setDescription("");
                        setCategory("");
                        setQuality("");
                    }}
                >
                    Clear
                </button> */}
            </form>
        </div>
    );
};
