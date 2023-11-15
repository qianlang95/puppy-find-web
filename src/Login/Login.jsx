import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('customer'); // 默认为 'customer'

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, role);
        // 你可以在这里添加对角色的处理逻辑
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">EMAIL</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">PASSWORD</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                <label htmlFor="role">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role">
                    <option value="admin">Admin</option>
                    <option value="business">Business</option>
                    <option value="customer">Customer</option>
                </select>
                <br />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onGuestContinue()}>Continue as Guest</button>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
