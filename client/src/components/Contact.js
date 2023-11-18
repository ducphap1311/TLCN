import React, { useState} from "react";
import "../styles/Contact.scss";
import { toast } from "react-toastify";

export const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            email === "" ||
            phoneNumber === "" ||
            location === "" ||
            message === ""
        ) {
            setErrorMessage(true);
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                phonenumber: phoneNumber,
                location,
                message,
            }),
        };

        fetch("http://localhost:5000/api/v4/messages", requestOptions)
            .then((res) => {
                setErrorMessage(false);
                setName("");
                setEmail("");
                setPhoneNumber("");
                setLocation("");
                setMessage("");
                toast("Message sent successfully", {
                    type: "success",
                    draggable: false,
                });
            })
            .catch((error) => {
                setErrorMessage(true);
            });
    };

    return (
        <div className="contact">
            <div className="contact-container">
                <div className="contact-message">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="name-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                        <input
                            type="text"
                            className="email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            className="phonenumber-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone number"
                        />
                        <input
                            type="text"
                            className="location-input"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                        />
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        {errorMessage && (
                            <p style={{ color: "red" }}>
                                Please provide valid informations
                            </p>
                        )}
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
