import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import defaultAvatar from './dog.jpg';
import './Profile.css';
import Posts from './Posts';
import Following from './Following';
import Followers from './Followers';
import Favorites from './Favorites';

const UserProfile = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const { userID } = useParams();
    const [userInfo, setUserInfo] = useState({
        avatar: defaultAvatar,
        name: '',
        email: '',
        birthDate: '',
        address: ''
    });
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const [followersList, setFollowersList] = useState([]);

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!authUser) {
            navigate('/login'); // Redirect to login page if not authenticated
            return;
        }
    
        // 获取用户信息
        axios.get(`http://localhost:3001/profile/${userID}`)
            .then(response => {
                setUserInfo(response.data);
                setIsFollowing(response.data.isFollowing);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    
        // 获取关注列表
        axios.get(`http://localhost:3001/following/${userID}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setFollowingList(response.data);
                } else {
                    console.error('Expected an array from the API');
                    setFollowingList([]);
                }
            })
            .catch(error => {
                console.error('Error fetching following data:', error);
                setFollowingList([]);
            });
    
        // 获取粉丝列表
        axios.get(`http://localhost:3001/followers/${userID}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setFollowersList(response.data); // 假设您有一个状态叫 setFollowersList
                } else {
                    console.error('Expected an array from the API');
                    setFollowersList([]); // 确保处理非数组响应
                }
            })
            .catch(error => {
                console.error('Error fetching followers data:', error);
                setFollowersList([]); // 出错时设置为空数组
            });
    
    }, [authUser, userID, navigate]); // 如果 setFollowingList 和 setFollowersList 是状态设置函数，则也应包含在依赖列表中
    

    const handleFollowUnfollow = () => {
        if (authUser.userID === userID) {
            console.error("Attempted to follow oneself.");
            // 显示错误消息给用户
            return;
        }
        
        const action = isFollowing ? 'unfollow' : 'follow';
        console.log(`Initiating ${action} request:`, { follower: authUser.userID, followed: userID });
    
        axios.post(`http://localhost:3001/${action}`, { follower: authUser.userID, followed: userID })
            .then(response => {
                setIsFollowing(!isFollowing);
                console.log(`${action} response:`, response.data);
                // 可能的成功消息显示
            })
            .catch(error => {
                console.error(`Error in ${action}:`, error);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                    // 根据错误类型显示不同的用户提示消息
                    if (error.response.data.message === 'Already following') {
                        // 显示用户友好的消息，例如：“您已经关注了这个用户。”
                    }
                }
            });
    };
    
    
    
    
    



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
                    <button onClick={handleFollowUnfollow}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
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
