import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import defaultAvatar from './dog.jpg';
import './Profile.css';
import Posts from './Posts';
import Following from './Following';
import Followers from './Followers';
import Favorites from './Favorites';

const UserProfile = () => {
    const { authUser } = useAuth(); // Use useAuth to get the authenticated user
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        avatar: defaultAvatar,
        name: '',
        email: '',
        birthDate: '',
        address: ''
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!authUser) {
            navigate('/login'); // Redirect to login page if not authenticated
            return;
        }

        axios.get(`http://localhost:3001/profile/${authUser.userID}`)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [authUser, navigate]);
    



    // Dummy data for Following, Followers, Posts, and Favorites
    const dummyFollowing = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
        // ... more following data
    ];
    const dummyFollowers = [
        { id: 3, name: 'Alice Johnson' },
        { id: 4, name: 'Bob Brown' }
        // ... more followers data
    ];
    const dummyPosts = [
        { id: 1, content: 'First post content' },
        { id: 2, content: 'Second post content' }
        // ... more posts data
    ];
    const dummyFavorites = [
        { id: 1, item: 'Favorite Item 1' },
        { id: 2, item: 'Favorite Item 2' }
        // ... more favorites data
    ];

    const handleInputChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:3001/updateProfile/${authUser.userID}`, userInfo)
          .then(response => {
            console.log("Profile updated successfully:", response.data);
          })
          .catch(error => {
            console.error('Error updating profile:', error);
          });

        setEditMode(false);
    };
    
    
    const isBirthDateEmpty = !userInfo.birthDate;
    const isAddressEmpty = !userInfo.address;

    return (
        <div className="profile-container">
            {!editMode ? (
                <>
                    <div className="user-info">
                    <img src={userInfo.avatar || 'path/to/default/avatar.jpg'} alt="User Avatar" className="avatar-image" />
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                {isBirthDateEmpty && <p className="reminder">Birth Date: Not Provided</p>}
                {!isBirthDateEmpty && <p>Birth Date: {userInfo.birthDate}</p>}
                {isAddressEmpty && <p className="reminder">Address: Not Provided</p>}
                {!isAddressEmpty && <p>Address: {userInfo.address}</p>}
                        <button onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                    
                    <div className="user-interactions-container">
                        <div className="user-section">
                            <h3>Following</h3>
                            <Following followingList={dummyFollowing} />
                        </div>

                        <div className="user-section">
                            <h3>Followers</h3>
                            <Followers followerList={dummyFollowers} />
                        </div>

                        <div className="user-section">
                            <h3>Posts</h3>
                            <Posts postList={dummyPosts} />
                        </div>

                        <div className="user-section">
                            <h3>Favorites</h3>
                            <Favorites favoritesList={dummyFavorites} />
                        </div>
                    </div>
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
                    <div>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditMode(false)}>Return to Profile</button>
                    </div>
                </form>
            )}

        </div>
    );
};

export default UserProfile;
