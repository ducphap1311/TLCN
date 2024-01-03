import React, { useState, useEffect } from "react";
import "../styles/AllOrders.scss";
import {useNavigate, Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { Loading } from "./Loading";

export const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
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

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await fetch("http://localhost:5000/api/v3/allorders");
        const responseData = await response.json();
        setOrders(responseData.orders);
    };

    const updateOrder = async (id, orderStatus) => {
        console.log(id, orderStatus);
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: orderStatus
            })
        }
        await fetch(`http://localhost:5000/api/v3/allorders/${id}`, requestOptions)
        getOrders()
    };
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

    if (orders.length <= 0) {
        return;
    }

    return (
        <div className="allorders">
            {orders.map((order) => {
                return (
                    <div className="order" key={order._id}>
                        <div>
                            <a href={`http://localhost:3008/orders/${order._id}`} target="_blank">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3496/3496155.png"
                                    alt="product-img"
                                />

                            </a>
                        </div>
                        <div>
                            <p className="code">{order._id}</p>
                            <p className="amount">Amount: {order.amount}</p>
                            <p className="name">Customer: {order.name}</p>
                            <p className="price">
                                Total Price: ${order.orderTotal}
                            </p>
                            <select value={order.status} onChange={(e) => updateOrder(order._id, e.target.value)}>
                                <option
                                    // selected={order.status === "Unpack"}
                                    value="Unpack"
                                >
                                    Unpack
                                </option>
                                <option
                                    // selected={order.status === "Packed"}
                                    value="Packed"
                                >
                                    Packed
                                </option>
                                <option
                                    // selected={order.status === "Shipping"}
                                    value="Shipping"
                                >
                                    Shipping
                                </option>
                                <option
                                    // selected={order.status === "Shipped"}
                                    value="Shipped"
                                >
                                    Shipped
                                </option>
                            </select>
                            {/* <Link to="/orderdetail">
                                <p className="detail">See Detail</p>
                            </Link> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
