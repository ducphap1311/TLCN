// import React, { useState, useEffect } from "react";
// import { Loading } from "./Loading";
// import Product from "./Product";

// export const SencondHand = () => {
//     const [products, setProducts] = useState([]);
//     const [loadingProducts, setLoadingProducts] = useState(true);
//     const getProducts = async () => {
//         try {
//             setLoadingProducts(true);
//             const response = await fetch(`http://localhost:5000/api/v5/offers`);
//             const responseData = await response.json();
//             const data = responseData.offers;
//             const dt = data.filter((d) => d.status === "Active");
//             setProducts(dt);
//             setLoadingProducts(false);
//         } catch (error) {
//             console.log(error);
//             setProducts([]);
//             setLoadingProducts(true);
//         }
//     };
//     useEffect(() => {
//         getProducts();
//     }, []);
//     console.log(products);
//     if (loadingProducts) {
//         return <Loading />;
//     } else if (products.length === 0) {
//         return (
//             <h2 style={{ textAlign: "center", marginTop: "250px" }}>
//                 There is no offers, please comeback later
//             </h2>
//         );
//     }
//     return (
//         <div className="second-hand">
//             {products.map((product) => {
//                 return <Product product={product} key={product._id} />;
//             })}
//         </div>
//     );
// };
