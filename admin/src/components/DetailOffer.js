import React, { useState, useEffect } from "react";
import "../styles/DetailOffer.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const DetailOffer = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState();

    useEffect(() => {
        getSingleOffer();
    }, []);

    const getSingleOffer = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/v5/offers/${id}`
            );
            if (!response.ok) {
                throw new Error("Invalid order id");
            }
            const responseData = await response.json();
            const data = responseData.offer;
            setOffer(data);
        } catch (error) {
            console.log(error);
        }
    };
    if (!offer) {
    } else {
        return (
            <div
                className="order-detail"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2>Offer information</h2>
                <Link to="/alloffer" className="back-orders-link">
                    Back to offers
                </Link>
                <div className="shipping-informations" style={{marginBottom: "30px"}}>
                    <p style={{margin: "5px"}}>Name: {offer.name}</p>
                    <p style={{margin: "5px"}}>Phone number: {offer.phone}</p>
                    <p style={{margin: "5px"}}>Description: {offer.description}</p>
                </div>
                <div className="detail-container"  style={{width: "60%"}}>
                    <div className="overflow-x-auto"  style={{width: "100%"}}>
                        <table  style={{width: "100%"}}>
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Size</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="products-info" style={{display: "flex", alignItems: "center"}}>
                                            <img
                                                src={offer.images[0]}
                                                alt="product-img"
                                                className="product-img"
                                                style={{width: "150px"}}
                                            />
                                            <p>{offer.productName}</p>
                                    </td>
                                    <td>{offer.sizes}</td>
                                    <td>{offer.totalAmount}</td>
                                    <td>${offer.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};
