import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import * as followsClient from "../follows/client";


function UserDetails() {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();

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
  }, [id]);

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
          {user && (
              <h2 className="text-primary mb-3">Hi there, it's {user.username}'s profile</h2>
            )}
            {user && (
              <>
                <p className="font-weight-bold">Username: {user.username}</p>
                <p>Email: {user.email}</p>
                {isCurrentUserProfile && (
                    <>
                      <p>Date of Birth: {user.dob}</p>
                      <p>Last Name: {user.lastName}</p>
                    </>
                  )}
                <p>First Name: {user.firstName}</p>
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
        <div className="col-md-6">
          <div className="mb-3">
            <h3>Followers</h3>
            <div className="list-group">
              {followers.map((follower, index) => (
                <Link key={index} className="list-group-item" to={`/profile/${follower.follower._id}`}>
                  {follower.follower.username}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>Following</h3>
            <div className="list-group">
              {following.map((follows, index) => (
                <Link key={index} className="list-group-item" to={`/profile/${follows.followed._id}`}>
                  {follows.followed.username}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
