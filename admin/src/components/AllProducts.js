import React, { useEffect, useState } from "react";
import "../styles/AllProducts.scss";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [category, setCategory] = useState("");
    const [quality, setQuality] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [errorInput, setErrorInput] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await fetch("http://localhost:5000/api/v1/products");
        const responseData = await response.json();
        setProducts(responseData.products);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                images: images.split(","),
                sizes: sizes.split(","),
                name,
                price: Number(price),
                totalAmount: Number(price),
                category,
                quality,
                description,
            }),
        };
        const response = await fetch(
            `http://localhost:5000/api/v1/products/${id}`,
            requestOptions
        );
        if (response.status === 201) {
            toast("Edit product successfully", {
                type: "success",
                draggable: false
            })
            getProducts();
        } else {
            toast("Invalid informations, try again", {
                type: "error",
                draggable: false
            })
            setErrorInput(true);
        }
    };

    const deleteProduct = async (id) => {
        // console.log(id);
        const requestOptions = {
            method: "DELETE",
        };
        const response = await fetch(
            `http://localhost:5000/api/v1/products/${id}`,
            requestOptions
        );
        if (response.status === 201) {
            getProducts();
        }
    };

    const editProduct = async (id) => {
        const response = await fetch(
            `http://localhost:5000/api/v1/products/${id}`
        );
        const responseData = await response.json();
        const data = responseData.product;
        setImages(data.images.join(","));
        setSizes(data.sizes.join(","));
        setName(data.name);
        setPrice(data.price);
        setTotalAmount(data.totalAmount);
        setCategory(data.category);
        setQuality(data.quality);
        setDescription(data.description);
        setId(id);
    };
    return (
        <div className="allproducts">
            <form onSubmit={handleSubmit}>
                <div className="form-child">
                    <label htmlFor="images">Images</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        required
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        required
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="quality">Quality</label>
                    <input
                        type="text"
                        id="quality"
                        name="quality"
                        required
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="sizes">Sizes</label>
                    <input
                        type="text"
                        id="sizes"
                        name="sizes"
                        required
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value)}
                    />
                </div>

                <button className="add-btn" type="submit">
                    Edit
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
            <div className="allproducts-container">
                {products.map((product) => {
                    return (
                        <div className="product" key={product._id}>
                            <div>
                                <img
                                    src={product.images[0]}
                                    alt="product-img"
                                />
                            </div>
                            <div>
                                <p className="name">{product.name}</p>
                                <p className="price">${product.price}</p>
                                <div>
                                    <button
                                        className="edit-btn"
                                        onClick={() => editProduct(product._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <a href={`http://localhost:3008/products/${product._id}`} target="_blank">
                                        <button
                                            className="view-btn"
                                            
                                        >
                                            View
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
