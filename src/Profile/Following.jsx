import React from 'react';

const Following = ({ followingList }) => {
    return (
        <ul>
            {followingList.map((following) => (
                <li key={following.userID}> {/* Use a unique key, like userID */}
                    {following.name} {/* Display the following user's name */}
                </li>
            ))}
        </ul>
    );
};

export default Following;
