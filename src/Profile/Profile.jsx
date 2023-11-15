import React, { useState } from 'react';
import defaultAvatar from './dog.jpg'; // Import the dog.jpg as the default avatar
import './Profile.css';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        avatar: defaultAvatar, // Set the imported image as the default avatar
        name: 'John Doe', // Default name
        email: 'johndoe@example.com', // Default email
        birthDate: '1990-01-01', // Default birth date
        address: '123 Main St, Anytown' // Default address
    });
    const [editMode, setEditMode] = useState(false);

    // Handles changes to the input fields
    const handleInputChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    };

    // Handles the form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Logic to submit the form
        setEditMode(false); // Exit edit mode after submitting
    };

    return (
        <div className="profile-container">
            {!editMode ? (
                <>
                    <div className="user-info">
                        <img src={userInfo.avatar} alt="User Avatar" className="avatar-image" />
                        <p>Name: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Birth Date: {userInfo.birthDate}</p>
                        <p>Address: {userInfo.address}</p>
                    </div>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <div className="avatar-section">
                        <img src={userInfo.avatar} alt="User Avatar" className="avatar-image" />
                        <input type="file" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <input
                        type="date"
                        name="birthDate"
                        value={userInfo.birthDate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                    <button type="submit">Save Changes</button>
                </form>
            )}

            <div className="user-cards">
                <div className="card"><a href="#"><h3>Following</h3></a></div>
                <div className="card"><a href="#"><h3>Followers</h3></a></div>
                <div className="card"><a href="#"><h3>Reviews</h3></a></div>
                <div className="card"><a href="#"><h3>Favorites</h3></a></div>
            </div>
        </div>
    );
};

export default Profile;
