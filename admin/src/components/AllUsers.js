import React, {useEffect, useState} from 'react'
import '../styles/AllUsers.scss'

export const AllUsers = () => {
    const [users, setusers] = useState([]);

    useEffect(() => {
        getusers();
    }, []);

    const getusers = async () => {
        const response = await fetch("http://localhost:5000/api/v2/allusers");
        const responseData = await response.json();
        setusers(responseData.users)
    };
    return (
        <div className='allusers'>
            {users.map((user) => {
                return (
                    <div className="user" key={user._id}>
                        <div>
                            <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/370330930_631659042463641_7073685554668277350_n.png?_nc_cat=100&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGOBC_0yQH-3XJhtQ8OgpezmDtNZlItblmYO01mUi1uWWaVojusrZEbhUFaD_RghtG94xZiTmvbe7RLM5MWMuDx&_nc_ohc=reaAw3-dX9gAX9rW2IO&_nc_ht=scontent.fsgn5-5.fna&oh=03_AdQw6Bgenh37YQIn0NcRGPXK9MBTiKAUAzHT_1D-bEu-rg&oe=65811D0C" alt='user-img'/>
                        </div>
                        <div>
                            <p className="name">Name: {user.username}</p>
                            <p className="price">Email: {user.email}</p>
                            {/* <div>
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div> */}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
