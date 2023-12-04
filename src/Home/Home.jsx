import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ensure the path is correct

function Home() {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

    // Function to navigate to the user's profile
    const goToProfile = () => {
        if (authUser && authUser.userID) {
            navigate(`/profile/${authUser.userID}`);
        }
    };

    // Determine if the user is an admin
    const isAdmin = authUser && authUser.role === 'admin';

    return (
        <div>
            <h2>Welcome to the Home page!</h2>
            {authUser && authUser.userID ? (
                <>
                    <p>Hi {isAdmin ? 'admin' : 'customer'}, you are logged in.</p>
                    <button onClick={goToProfile}>Go to Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
}

export default Home;
