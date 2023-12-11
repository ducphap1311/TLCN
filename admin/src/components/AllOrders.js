import React, { useState, useEffect } from "react";
import "../styles/AllOrders.scss";
import { Link } from "react-router-dom";

export const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

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
                                    src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/386886401_2527330324095850_1357483950580613260_n.png?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFET8ovjTP9-uXrz-49yE_mSppicgWX0OZKmmJyBZfQ5p_bs3x5JUdbtf4NYHCp_ioF3LPNTlywduiU8f4GNz4r&_nc_ohc=zK_vlzGTRacAX9FYwkS&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTWOnwj7zczCkDjBHtLCHWetLUZMacUTSxvFQotHSF4Tg&oe=6581811C"
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
