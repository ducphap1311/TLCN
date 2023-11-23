import React, { useState, useEffect } from "react";
import "../styles/AllOrders.scss";

export const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await fetch("http://localhost:5000/api/v3/allorders");
        const responseData = await response.json();
        setOrders(responseData.orders);
    };

    return (
        <div className="allorders">
            {orders.map((order) => {
                return (
                    <div className="order" key={order._id}>
                        <div>
                            <img src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/386886401_2527330324095850_1357483950580613260_n.png?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFET8ovjTP9-uXrz-49yE_mSppicgWX0OZKmmJyBZfQ5p_bs3x5JUdbtf4NYHCp_ioF3LPNTlywduiU8f4GNz4r&_nc_ohc=zK_vlzGTRacAX9FYwkS&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTWOnwj7zczCkDjBHtLCHWetLUZMacUTSxvFQotHSF4Tg&oe=6581811C" alt="product-img" />
                        </div>
                        <div>
                            <p className="code">Order Code: {order._id}</p>
                            <p className="amount">Amount: {order.amount}</p>
                            <p className="name">Customer: {order.name}</p>
                            <p className="price">Total Price: ${order.orderTotal}</p>
                            <p className="detail">See Detail</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
