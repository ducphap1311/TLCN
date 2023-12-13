import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/AllOrders.scss";
import { Link } from "react-router-dom";
import "../styles/AllOffers.scss";
import { useNavigate} from "react-router-dom";
import { Loading } from "./Loading";
import { toast } from "react-toastify";

export const AllOffer = () => {
    const [offers, setOffers] = useState([]);
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
    useEffect(() => {
        getOffers();
    }, []);

    const getOffers = async () => {
        const response = await fetch("http://localhost:5000/api/v5/offers");
        const responseData = await response.json();
        setOffers(responseData.offers);
    };

    const updateOffer = async (id, st) => {
        const req = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                status: st
            })
        }
        await fetch(`http://localhost:5000/api/v5/offers/${id}`, req)
        toast("Update successfully", {
            type: "success",
            draggable: false
        })
        getOffers()
    }

    const deleteOffer = async (id) => {
        const req = {
            method: "DELETE",
        };
        await fetch(`http://localhost:5000/api/v5/offers/${id}`, req);
        getOffers();
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
    
    if (offers.length <= 0) {
        return;
    }
    
    return (
        <div
            className="offers"
            style={{ marginLeft: "300px", marginTop: "50px" }}
        >
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Product Name</th>
                        <th>Sizes</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    {offers.map((offer) => {
                        return (
                            <tr className="user" key={offer._id}>
                                <td className="price">{offer.name}</td>
                                <td
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Link
                                        to={`/detailoffer/${offer._id}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        <img
                                            src={offer.images[0]}
                                            alt="user-img"
                                            style={{ width: "100px" }}
                                        />
                                        <span className="name">
                                            {offer.productName}
                                        </span>
                                    </Link>
                                </td>
                                <td className="price">
                                    {offer.sizes.map((size) => {
                                        return <span>{size}, </span>;
                                    })}
                                </td>
                                <td className="price">{offer.totalAmount}</td>
                                <td className="price">${offer.price}</td>
                                <td className="price">{offer.status}</td>
                                <td
                                    className="price"
                                    style={{
                                        color: "rgb(23, 176, 92)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => updateOffer(offer._id, "Active")}
                                >
                                    Accept
                                </td>
                                <td
                                    className="price"
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => updateOffer(offer._id, "Unactive")}
                                >
                                    Decline
                                </td>
                                <td
                                    className="price"
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => deleteOffer(offer._id)}
                                >
                                    Delete
                                </td>
                                {/* <div>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </div> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
