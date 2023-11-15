import React from 'react';

function DefaultPage({ onFormSwitch }) {
  return (
    <div>
      <h1>Welcome to the App!</h1>
      <button onClick={() => onFormSwitch('login')}>Login</button>
      <button onClick={() => onFormSwitch('register')}>Register</button>
      <button onClick={() => onFormSwitch('profile')}>Profile</button>
    </div>
  );
}

export default DefaultPage;
