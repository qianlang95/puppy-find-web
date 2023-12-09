import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import * as followsClient from "../follows/client";
import * as likesClient from "../userLikes/client";
import * as postsClient from "../userPosts/client";
import Navbar from "../Home/Navbar/navbar";
import './details.css';
import FooterNav from "../Home/Footer";


function UserDetails() {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchLikes = async () => {
    const likes = await likesClient.findBreedThatUserLikes(id);
    setLikes(likes);
  };

  const fetchPosts = async () => {
    const posts = await postsClient.findPostsOfUser(id);
    setPosts(posts);
  };

  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
  };

  const followUser = async () => {
    try {
      const status = await followsClient.userFollowsUser(id);
      if (status) {
        setFollowers(prevFollowers => [...prevFollowers, { follower: { _id: currentUser._id, username: currentUser.username } }]);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async () => {
    try {
      const status = await followsClient.userUnfollowsUser(id);
      if (status) {
        setFollowers(prevFollowers => prevFollowers.filter(f => f.follower._id !== currentUser._id));
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const fetchFollowers = async () => {
    const followers = await followsClient.findFollowersOfUser(id);
    setFollowers(followers);
  };

  const fetchFollowing = async () => {
    const following = await followsClient.findFollowedUsersByUser(id);
    setFollowing(following);
  };

  const alreadyFollowing = () => {
    return followers.some(follows => follows.follower._id === currentUser._id);
  };

  const isCurrentUserProfile = currentUser && currentUser._id === id;

  useEffect(() => {
    fetchUser();
    fetchFollowers();
    fetchFollowing();
    fetchLikes();
    fetchPosts()
  }, [id]);

  return (
    <div id="detail-page" className="profile-container">
      <Navbar/>
      <div className="container mt-4 flex-grow-1">
  
        {/* First Row - Profile Information */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body profile-info-card">
              {/* Profile Information */}
              {user && (
                <h2 className="text-primary mb-3">Hi there, it's {user.username}'s profile</h2>
              )}
              {user && (
                <>
                  <p><span className="profile-info-label">Username:</span><span className="profile-info-value">{user.username}</span></p>
                  <p><span className="profile-info-label">Email:</span><span className="profile-info-value">{user.email}</span></p>
                  {isCurrentUserProfile && (
                    <>
                      <p><span className="profile-info-label">Date of Birth:</span><span className="profile-info-value">{user.dob}</span></p>
                      <p><span className="profile-info-label">Last Name:</span><span className="profile-info-value">{user.lastName}</span></p>
                    </>
                  )}
                  <p><span className="profile-info-label">First Name:</span><span className="profile-info-value">{user.firstName}</span></p>
                  {currentUser && currentUser._id !== id && (
                    <div className="mt-3">
                      {alreadyFollowing() ? (
                        <button onClick={unfollowUser} className="btn btn-danger btn-block">
                          Unfollow
                        </button>
                      ) : (
                        <button onClick={followUser} className="btn btn-warning btn-block">
                          Follow
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  
        {/* Second Row - Followers and Following */}
        <div className="row mb-4">
          {/* Followers */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body overflow-auto" style={{ maxHeight: '300px' }}>
                <h3>Followers</h3>
                <div className="list-group">
                {followers.length > 0 ? (
        followers.map((follower, index) => (
          <Link key={index} className="list-group-item" to={`/profile/${follower.follower._id}`}>
            {follower.follower.username}
          </Link>
        ))
      ) : (
        <p>Seems like nothing here</p>
      )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Following */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body overflow-auto" style={{ maxHeight: '300px' }}>
                <h3>Following</h3>
                <div className="list-group">
                {following.length > 0 ? (
        following.map((follows, index) => (
          <Link key={index} className="list-group-item" to={`/profile/${follows.followed._id}`}>
            {follows.followed.username}
          </Link>
        ))
      ) : (
        <p>Seems like nothing here</p>
      )}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Third Row - Liked Breeds and Posts */}
        <div className="row mb-5">
          {/* Liked Breeds */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body overflow-auto" style={{ maxHeight: '300px' }}>
                <h3>Liked Breed</h3>
                <div className="list-group">
                {likes.length > 0 ? (
        likes.map((like, index) => (
          <a key={index} href={`#`} className="list-group-item profile-list-item">
            {like.breedId}
          </a>
        ))
      ) : (
        <p>Seems like nothing here</p>
      )}
                </div>
              </div>
            </div>
          </div>
  
          {/* My Posts */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body overflow-auto" style={{ maxHeight: '300px' }}>
                <h3>My Posts</h3>
                <div className="list-group">
                {posts && posts.length > 0 ? ( 
        posts.map((post, index) => (
          <a key={index} href={`#`} className="list-group-item profile-list-item">
            {post.name}
          </a>
        ))
      ) : (
        <p>Seems like nothing here</p>
      )}
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
      <FooterNav/>
    </div>
  )
}


export default UserDetails;