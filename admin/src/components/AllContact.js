import React, { useState, useEffect } from "react";
import "../styles/AllOrders.scss";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "./Loading";

export const AllContact = () => {
    const [messages, setMessages] = useState([]);
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
    }
    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        const response = await fetch("http://localhost:5000/api/v4/messages");
        const responseData = await response.json();
        setMessages(responseData.message);
    };

    const deleteMessage = async (id) => {
        const req = {
            method: "DELETE"
        }
        await fetch(`http://localhost:5000/api/v4/messages/${id}`, req)
        getMessages()
    }
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
    if(messages.length <= 0){
        return;
    }
    return (
        <div className="allorders">
            {messages.map((message) => {
                return (
                    <div className="order" key={message._id} style={{backgroundColor: "white", padding: "10px"}}>
                        {/* <div>
                            <img src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/386886401_2527330324095850_1357483950580613260_n.png?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFET8ovjTP9-uXrz-49yE_mSppicgWX0OZKmmJyBZfQ5p_bs3x5JUdbtf4NYHCp_ioF3LPNTlywduiU8f4GNz4r&_nc_ohc=zK_vlzGTRacAX9FYwkS&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTWOnwj7zczCkDjBHtLCHWetLUZMacUTSxvFQotHSF4Tg&oe=6581811C" alt="product-img" />
                        </div> */}
                        <div>
                            <p className="name">Customer: {message.name}</p>
                            <p className="name">Email: {message.email}</p>
                            <p className="price">Phone number: {message.phonenumber}</p>
                            <p className="price">Location: {message.location}</p>
                            <p className="price">Message: {message.message}</p>
                            <button onClick={() => deleteMessage(message._id)}>Delete</button>
                            {/* <a href={`http://localhost:3008/orders/${message._id}`} target="_blank">
                                <p className="detail">See Detail</p>
                            </a> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
