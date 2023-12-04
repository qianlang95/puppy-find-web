import React from 'react';

const Followers = ({ followerList }) => {
    return (
        <ul>
            {followerList.map((follower) => (
                <li key={follower.userID}> {/* Use a unique key, like userID */}
                    {follower.name} {/* Display the follower's name */}
                </li>
            ))}
        </ul>
    );
};

export default Followers;
