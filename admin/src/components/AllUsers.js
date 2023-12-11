import React, { useEffect, useState } from "react";
import "../styles/AllUsers.scss";
import { toast } from "react-toastify";

export const AllUsers = () => {
    const [users, setusers] = useState([]);

    useEffect(() => {
        getusers();
    }, []);

    const getusers = async () => {
        const response = await fetch("http://localhost:5000/api/v2/allusers");
        const responseData = await response.json();
        setusers(responseData.users);
    };

    const deleteUser = async (id) => {
        const requestOptions = {
            method: "DELETE",
            
        }
        const response = await fetch(
            `http://localhost:5000/api/v2/delete-user/${id}`, requestOptions
        );
        if(!response.ok){
            toast("Error happened, try later", {
                type: "error",
                draggable: false
            })
            return;
        }
        toast("Delete user successfully", {
            type: "success",
            draggable: false
        })
        getusers()
    };
    return (
        <div className="allusers">
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                {users.map((user) => {
                    return (
                        <tr className="user" key={user._id}>
                            <td
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/370330930_631659042463641_7073685554668277350_n.png?_nc_cat=100&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGOBC_0yQH-3XJhtQ8OgpezmDtNZlItblmYO01mUi1uWWaVojusrZEbhUFaD_RghtG94xZiTmvbe7RLM5MWMuDx&_nc_ohc=reaAw3-dX9gAX9rW2IO&_nc_ht=scontent.fsgn5-5.fna&oh=03_AdQw6Bgenh37YQIn0NcRGPXK9MBTiKAUAzHT_1D-bEu-rg&oe=65811D0C"
                                    alt="user-img"
                                />
                                <span className="name">{user.username}</span>
                            </td>
                            <td className="price">{user.email}</td>
                            <td className="price">{user.phone}</td>
                            <td className="price">
                                {user.address} {user.ward} {user.district}{" "}
                                {user.city}
                            </td>
                            <td
                                className="price"
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => deleteUser(user._id)}
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
