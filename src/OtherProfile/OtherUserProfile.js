import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import defaultAvatar from './dog.jpg';
import './Profile.css';
import Posts from '../Profile/Posts';
import Following from '../Profile/Following';
import Followers from '../Profile/Followers';
import Favorites from '../Profile/Favorites';

const OtherUserProfile = () => {
    const { authUser } = useAuth();
    const { userID } = useParams();
    const [userInfo, setUserInfo] = useState({
        avatar: defaultAvatar,
        name: '',
        email: '',
        birthDate: '',
        address: ''
    });
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        // It's important to check if authUser is not null to avoid null reference errors
        if (authUser && authUser.userID === userID) {
            // Redirect to the user's own profile page or home page
            window.location.href = `/profile/${authUser.userID}`;
            return;
        }
    
        // Fetch the user's profile information
        axios.get(`http://localhost:3001/profile/${userID}`)
            .then(response => {
                setUserInfo(response.data);
                setIsFollowing(response.data.isFollowing);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    
        // Fetch the list of users this user is following
        axios.get(`http://localhost:3001/following/${userID}`)
            .then(response => {
                setFollowingList(response.data);
            })
            .catch(error => {
                console.error('Error fetching following data:', error);
            });
    
        // Fetch the list of users following this user
        axios.get(`http://localhost:3001/followers/${userID}`)
            .then(response => {
                setFollowersList(response.data);
            })
            .catch(error => {
                console.error('Error fetching followers data:', error);
            });
    
    }, [userID]); // Removed authUser and navigate from dependencies to avoid unwanted effect triggers
    
    const handleFollowUnfollow = () => {
    const action = isFollowing ? 'unfollow' : 'follow';
    
    axios.post(`http://localhost:3001/${action}`, { follower: authUser.userID, followed: userID })
        .then(response => {
            setIsFollowing(!isFollowing);
            // 可能还需要更新 followingList 状态
            updateFollowingList(); // 这应该是一个获取最新关注列表的函数
        })
        .catch(error => {
            console.error(`Error in ${action}:`, error);
        });
};

const updateFollowingList = () => {
    axios.get(`http://localhost:3001/following/${authUser.userID}`)
        .then(response => {
            setFollowingList(response.data);
        })
        .catch(error => {
            console.error('Error fetching following data:', error);
        });
};


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

    return (
        <div className="profile-container">
            <div className="user-info">
                <img src={userInfo.avatar || defaultAvatar} alt="User Avatar" className="avatar-image" />
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                <p>Birth Date: {userInfo.birthDate || 'Not Provided'}</p>
                <p>Address: {userInfo.address || 'Not Provided'}</p>
                {/* Render follow/unfollow button only if the authUser is not null */}
                {authUser && (
                    <button onClick={handleFollowUnfollow}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>
            
            <div className="user-interactions-container">
            <div className="user-section">
                        <h3>Following</h3>
                        <Following followingList={followingList} />
                    </div>

                        <div className="user-section">
                            <h3>Followers</h3>
                            <Followers followerList={followersList} />
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
            </div>
    );
};

export default OtherUserProfile;
